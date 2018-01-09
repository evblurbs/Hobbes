// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Firestore Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const cors = require('cors')({origin: true})

var Mailchimp = require('mailchimp-api-v3')
var mailchimp = new Mailchimp('837a967524273933d16f040765875ab0-us17');

const pubsubClient = require('@google-cloud/pubsub')()

var postmark = require("postmark");
var client = new postmark.Client("b82536ec-de08-4e3b-9cf2-a730cde464e5");

const publish = (topicId, data) => {
  const topic = pubsubClient.topic(topicId)
  const publisher = topic.publisher()
  let dataString
  if(typeof data === 'string') {
    dataString = data
  } else {
    dataString = JSON.stringify(data)
  }
  const message = new Buffer(dataString)
  return publisher.publish(message)
}

// Initialize Cloud Firestore through Firebase
var db = admin.firestore();

function signup (email, name) {
  var pupID;
  var ownerId;
  return db.collection('pups').add({
    name,
  })
  .then((docRef) => {
    pupID = docRef.id;
    return db.collection(`pups/${pupID}/owners`).add({
      email,
    });
  })
  .then((docRef) => {
    ownerId = docRef.id;
    db.collection('emailLookup').doc(`${email}-${name}`).set({
      id: pupID,
      ownerId: ownerId,
    });
  })
  .then(() => {
    return {
      pupID: pupID,
      bday: null,
      name: name,
      ownerName: null,
      ownerId: ownerId,
    };
  })
  .catch((error) => {
    console.log('error signup', error);
    return error;
  });
}

function login (email, name) {
  var docRef = db.collection('emailLookup').doc(`${email}-${name}`);
  return docRef.get().then((doc) => {
    if (doc.exists) {
      var data = doc.data();
      return data;
    } else {
      return null;
    }
  })
  .catch((error) => {
    console.log('error login', error);
    return error;
  });
}

function getPupData (data) {
  var docRef = db.collection('pups').doc(data.id);
  return docRef.get().then((doc) => {
    if(doc.exists) {
      var pup = doc.data();
      return {
        pupID: data.id,
        bday: pup.birthday,
        name: pup.name,
        ownerId: data.ownerId,
        ownerName: data.name,
      }
    }
  })
  .catch((error) => {
    console.log('getPupData error', error);
    return error;
  });
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

exports.login = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const email = request.body.email.toLowerCase();
    const name = toTitleCase(request.body.name);
    return login(email, name)
      .then((data) => {
        if(data && data.id) {
          return getPupData(data);
        } else {
          return signup(email, name);
        }
      })
      .then((data) => {
        return response.status(200).send(data);
      })
      .catch((error) => {
        console.log('error', error);
        return response.status(200).send({
          error,
        });
      });
  });
});

function formatEmailLists(emailLists) {
  var arr = [];
  emailLists.forEach((item, index) => arr.push(item.key));
  return arr.join(`,`);
};

function publishEmailSubscribe(email, listId) {
  return publish('email-subscribe', {
    email: email,
    listId: listId,
    status: 'subscribed',
  });
};

exports.addLog = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = request.body;
    var logsRef = db.collection(`pups/${body.pupId}/logs`);
    logsRef.add(body.data)
    .then((doc) => {
      return response.status(200).send({ logId: doc.id });
    })
    .catch((error) => console.log('error', error));
  });
});

exports.deleteLog = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = request.body;
    var logsRef = db.doc(`pups/${body.pupId}/logs/${body.logId}`);
    logsRef.delete()
    .then(() => {
      return response.status(200).send({ success: true });
    })
    .catch((error) => console.log('error', error));
  });
});

exports.updateOwner = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = request.body;
    var ownersRef = db.collection(`pups/${body.pupID}/owners`);
    var queryRef = ownersRef.where('email', '==', body.ownerEmail);
    var ownerId;
    queryRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        ownerId = doc.id;
        var ownerRef = db.doc(`pups/${body.pupID}/owners/${doc.id}`);
        return ownerRef.update({
          emailLists: formatEmailLists(body.email),
          complete: true,
          name: body.name,
          relationship: body.relationship,
        });
      });
    }).then(() => {
      var email = body.ownerEmail.toLowerCase();
      var pupName = body.pupName;
      return db.doc(`emailLookup/${email}-${pupName}`).update({ name: body.name });
    }).then(() => {
      let promises = []
      body.email.forEach((item, index) => {
        if(item.key === 'Tips') {
          promises.push(publishEmailSubscribe(body.ownerEmail, 'bbecf0c8be'));
        }
        if(item.key === 'App Updates') {
          promises.push(publishEmailSubscribe(body.ownerEmail, '08654bd373'));
        }
      });
      return Promise.all(promises);
    }).then(() => {
      return response.status(200).send({ ownerId: ownerId });
    }).catch((error) => console.log('error', error));
  });
});

function isOwner(pupId, email) {
  return db.collection(`pups/${pupId}/owners`).where('email', '==', email).get()
}

exports.inviteUser = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = request.body;
    isOwner(body.pupId, body.email)
    .then((querySnapshot) => {
      var isOwner = false;
      querySnapshot.forEach((doc) => {
        isOwner = true;
      });
      if(isOwner) {
        return response.status(200).send({ error: `${body.email} is already a user.` });
      }
      else {
        var inviteRef = db.collection(`pups/${body.pupId}/owners`);
        return inviteRef.add({
          email: body.email,
          invitedById: body.invitedById,
          invitedByName: body.invitedByName,
          complete: false,
        })
        .then((doc) => {
          return db.doc(`emailLookup/${body.email}-${body.pupName}`).set({
            id: body.pupId,
            ownerId: doc.id,
          })
        })
        .then(() => {
          return publish('postmark-template', {
            email: body.email,
            templateId: 4281661,
            data: {
              email_address: body.email,
              invited_by: body.invitedByName,
              puppy_name: body.pupName,
            },
          });
        })
        .then(() => {
          return response.status(200).send();
        })
      }
    })
    .catch((error) => console.log('error', error));
  });
});

exports.emailSubscribe = functions.pubsub.topic('email-subscribe').onPublish((event) => {
  const data = (event.data && event.data.json) ? event.data.json : null;
  return mailchimp.post(`/lists/${data.listId}/members`, {
    email_address: data.email,
    status: data.status,
  })
  .then((result) => console.log('result', result))
  .catch((error) => console.log('error', error));
});

exports.postmarkTemplate = functions.pubsub.topic('postmark-template').onPublish((event) => {
  const data = (event.data && event.data.json) ? event.data.json : null;
  client.sendEmailWithTemplate({
    "From": "reply@hobbes.dog",
    "TemplateId": data.templateId,
    "To": data.email,
    "TemplateModel": data.data
  }, (error, result) => {
    if(error) {
      console.log('error sending postmark template', error);
      return;
    }
    console.log('result sending postmark template', result);
    return;
  });
});
