const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'fitspace-sports-venue-booking-website-frontend',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

