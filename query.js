var client=require ('./connection.js');
var argv = require('yargs').argv;

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var results = function(target) {
  client.search({
    index: 'tbc',
    type: 'blogpost',
    //_source: ['signature_count','action'],
    //"_source": { "includes": [ "title", "url" ] },
    //"query": {
    //    "match": {
    //        "text": "change colour"
    //    }
    //}
    body: {
      query: {
        match: { "text": target }
      },
    }
  },function (error, response,status) {
      if (error){
        console.log("search error: "+error)
      }
      else {
        //console.log("--- Response ---");
        //console.log(response);
        console.log(response.hits.total.toString() + ' blogpost hits:');
        //console.log("--- Hits ---");
        response.hits.hits.forEach(function(hit){
          var doc = hit._source;
          var s = '  ' + pad(doc.nr, 4)
            + ' ' + doc.title
            + ' (' + hit._score.toString() + ')';
          console.log( s );
        })
      }
  });
}

var results_qa = function(target) {
  client.search({
    index: 'tbc',
    type: 'qa',
    body: {
      query: {
        match: { "q": target }
      },
    }
  },function (error, response,status) {
      if (error){
        console.log("search error: "+error)
      }
      else {
        console.log(response.hits.total.toString() + ' Q&A hits:');
        response.hits.hits.forEach(function(hit){
          if (1 < hit._score) {
            var doc = hit._source;
            var s = '  ' + doc.q + ' ' + doc.a
              + ' (' + hit._score.toString() + ')';
            console.log( s );
          }
        })
      }
  });
}

if (argv.search) {
  var target=argv.search;
  console.log("Search term: "+target);
  results_qa(target);
  results(target);
}

// test by calling
// $ node query --search="create model line"
