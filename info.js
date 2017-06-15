var client = require('./connection.js');

client.cluster.health({},function(err,resp,status) {  
  console.log("-- Client Health --",resp);
});

client.count({index: 'tbc',type: 'blogpost'},function(err,resp,status) {  
  console.log('blogpost',resp);
});

