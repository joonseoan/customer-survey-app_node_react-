var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'afafjadfajoonseoan' }, function(err, tunnel) {
  console.log('LT running')
});