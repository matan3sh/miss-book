export default {
  makeId,
  getFormattedDate,
};

function getFormattedDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [day, month, year].join('-');
}

function makeId() {
  var txt = '';
  var possible = '0123456789';
  for (var i = 0; i < 4; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
