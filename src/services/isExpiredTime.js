import moment from 'moment';

const isExpired = function(timestamp) {
  return moment().isAfter(moment.unix(timestamp));
}

export default {
  isExpired
};