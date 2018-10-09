/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var github = require('./promisification');
var request = require('request');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  var user;
  var jBody;
  var A = function() {
    var read = new Promise((resolve, reject) => {
      fs.readFile(readFilePath, (err, file) => {
        if (err) {
          reject(err);
        } else {
          user = file.toString().split('\n')[0];
          resolve(file);
        }
      });
    });
    return read;
  }
  
  var B = function() {
    var options = {
      url: 'https://api.github.com/users/' + user, 
      headers: { 'User-Agent': 'request'},
      json: true
    };
    
    var promise = new Promise((resolve, reject) => {
      request.get(options, function(err, res, body) {
        if(err) {
          reject(err);
        } else if(body.message) {
          reject(new Error('Failed to get GitHub profile: '+body.message));
        } else {
          jBody = body;
          resolve(body);
        }
      });
    }); 
    return promise;
  }
  
  var C = function() {
    var write = new Promise((resolve, reject) => {
      fs.writeFile(writeFilePath, JSON.stringify(jBody) ,(err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }); 
    });
    return write;
  }
  
  return A()
  .then(B)
  .then(C);

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
