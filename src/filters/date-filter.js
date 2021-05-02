const moment = require('moment');
moment.locale('da');

module.exports = value => {
  const dateObject = moment(value);
  return `${dateObject.format('Do MMMM YYYY')}`;
};