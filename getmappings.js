var client = require('./connection.js');

client.indices.getMapping({  
    index: 'tbc',
    type: 'blogpost',
  },
  function (error,response) {  
    if (error){
      console.log(error.message);
    }
    else {
      console.log("Blogpost mappings:\n",response.tbc.mappings.blogpost.properties);
    }
});
