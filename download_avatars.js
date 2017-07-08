// Lines 2 to 6 -- Step 2: Loading the Request Module
var request = require('request');
var fs = require('fs');
require('dotenv').config();

console.log('Welcome to the Avatar Downloader!');


// Line 10 -- Step 3: Creating the getRepoContributors Function
function getRepoContributors(repoOwner, repoName, callback) {

  // Lines 13 to 18 -- Step 4: Creatingn the request URL
  var user = process.env.GITHUB_USER;

  var token = process.env.GITHUB_TOKEN;

  var requestURL = 'https://'+ user + ':' + token + '@api.github.com/repos/'
  + repoOwner + '/' + repoName + '/contributors';

  // Line 21 to 28 -- Step 5: Making the API Request
  var requestInfo  = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  }

  request(requestInfo, function(error, response, body) {

      //Line 30 to 38 -- Step 6: Printing Results
      try {
        var data = JSON.parse(body);
        callback(getAvatarURLs(data));
      } catch (err) {
        console.log('Failed to parse content body');
      }
    });
}

//Step 6 - Continued - Printing AvatarURLs
function getAvatarURLs(data) {
  var avatarURLs = [];

  for (var i = 0; i < data.length; i++) {
     avatarURLs.push(data[i].avatar_url);
  };
  return avatarURLs;
};

//Lines 55 to 67 -- Step 7: Implement Image Download
function downloadImageByURL(url, filePath){
  request.get(url)
       .pipe(fs.createWriteStream(filePath));
};

//Step 8 -- Allow User to Select Who to Download From
getRepoContributors(`${process.argv[2]}`, `${process.argv[3]}`, avatarFind);

