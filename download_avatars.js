var request = require('request');

function getRepoContributors(repoOwner, repoName, cb) {

  getRepoContributors("https://github.com/nodejs/node", function (err, result) {
    console.log("Errors: ", err);
    console.log("Result: ", result);
  });

}

console.log('Welcome to the GitHub Avatar Downloader!');