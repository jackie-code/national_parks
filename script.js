'use strict';

const apiKey = "20Lh1xHV8zd8vgbmc9UGM00bU4DqK8CD5xOLFJnD";
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
  console.log()
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // Because we'll likely be handling multiple videos in the search results, we iterate over the items array
  for (let i = 0; i < responseJson.data.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      <br>
      <br>
      <a href='${responseJson.data[i].directionsInfo}'> directions to park </a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};



function getParks(query, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResults,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;


fetch(url) //get data from url
    .then(response => { //I promise when respons is ready...
    console.log(response)
      if (response.ok) { // if response is true...
        return response.json(); //return the json object
      }
      throw new Error(response.statusText); //otherwise create an error
    })
    .then(responseJson =>   displayResults(responseJson))  //I promise when the responseJson is ready, to display the results to page
    .catch(err => {  //if something messes up display this error:
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#state-search').val();
    const maxResults = $('#max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);
