import { monthNames } from '../config/constants';

export const makePossesive = (string) => {
  console.log('string', string);
  console.log(typeof string)
  if(!string || typeof string !== 'string') {
    console.log('wut');
    return null;
  }
  if(string.slice(-1) === 's' || string.slice(-1) === 'S') {
    return `${string}'`;
  } else {
    return `${string}'s`;
  }
}

export const toTitleCase = (str) =>
{
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatDate = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export const formateDateString = (date) => {
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const time = formatDate(date);
  return `${month} ${day} at ${time}`;
}