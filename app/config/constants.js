const firebase = require("firebase");
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyCAk9zwjotk-H5og7_zFaw9Q9xGeB9lIQ4",
  authDomain: "hobbes-e64a1.firebaseapp.com",
  databaseURL: "https://hobbes-e64a1.firebaseio.com",
  projectId: "hobbes-e64a1",
  storageBucket: "hobbes-e64a1.appspot.com",
  messagingSenderId: "379730693792"
};

firebase.initializeApp(config);

export const db = firebase.firestore();

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const breeds = [
  "Labrador Retriever",
  "German Shepherd",
  "Poodle",
  "Chihuahua",
  "Golden Retriever",
  "Yorkshire Terrier",
  "Dachshund",
  "Beagle",
  "Boxer",
  "Miniature Schnauzer",
  "Shih Tzu",
  "Bulldog",
  "German Spitz",
  "English Cocker Spaniel",
  "Cavalier King Charles Spaniel",
  "French Bulldog",
  "Pug",
  "Rottweiler",
  "English Setter",
  "Maltese",
  "English Springer Spaniel",
  "German Shorthaired Pointer",
  "Staffordshire Bull Terrier",
  "Border Collie",
  "Shetland Sheepdog",
  "Dobermann",
  "West Highland White Terrier",
  "Bernese Mountain Dog",
  "Great Dane",
  "Brittany Spaniel",
  "Other",
];

export const pupSizes = [
  {
    key: 'X-Small (1 - 10 lbs)',
    value: 'Yorkies, Chihuahuas, Pomeranians, Maltese, Papillons',
  },
  {
    key: 'Small (11 - 25 lbs)',
    value: 'Shih Tzu, Pug, Dachshunds, Boston Terrier, Minature Pinschers, Bichons Frises, West Highland Terriers, French Bulldog',
  },
  {
    key: 'Medium (26 - 40 lbs)',
    value: 'Beagles, Minature Schnauzers, Shetland Sheepdogs, Cavalier King Charles, Scottish Terriers, American Staffordshite Terriers',
  },
  {
    key: 'Large (41 - 70 lbs)',
    value: 'Boxer, Bull Dog, Cocker Spaniels, Basset Hounds, Austrailian Shepherds, Bull Terriers, Shar Pei, Wheaten Terriers',
  },
  {
    key: 'X-Large (71 - 90 lbs)',
    value: 'Labrador Retrievers, Golden Retrievers, German Shepards, Rottweilers, Doberman Pinschers, Siberian Huskies, Chow Chows, Standard Poodles, Border Collie',
  },
  {
    key: 'XX-Large (91 - 110 lbs)',
    value: 'Alaskan Malamute, Bernese Mountain Dog, Great Dane, St Bernard, Old English Sheepdog',
  }
];

export const relationships = [
  "Owner",
  "Friend",
  "Walker",
  "Nanny",
  "Uncle",
  "Aunt",
  "Family",
  "Observer",
];

export const emailLists = [
  {
    key: 'Tips',
    value: 'Get weekly (at most) emails with tips on training, activities, and healthy options for your pup.',
    exclusive: false,
    selected: false,
  },
  {
    key: 'App Updates',
    value: 'Get monthly (at most) emails about updates to the Hobbes app.',
    exclusive: false,
    selected: false,
  },
  {
    key: 'None',
    value: 'Do not subscrube me to any email lists.',
    exclusive: true,
    selected: false,
  },
];