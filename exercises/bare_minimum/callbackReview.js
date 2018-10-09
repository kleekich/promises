/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data.toString().split('\n')[0]);
    }
    
  });
  // TODO
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request
    .get(url, (err, response) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, response.statusCode);
      }
    });    
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
