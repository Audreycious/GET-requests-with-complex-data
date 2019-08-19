
'use strict';

const apiKey = 'R5rpGXZXl7Wk37QpanOv8JoxW7b1mT71X54dkOjY'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    console.log(queryItems);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#render').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#render').append(
      `<li><h3>${responseJson.data[i].name}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>
      </li>`
    )};
};

function getParkInfo(stateInput, maxResults) {
    const params = {
        stateCode: stateInput,
        limit: maxResults,
        api_key: apiKey
    };
    const options = {
        headers: new Headers({
            "accept": "application/json"
        })
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url, options)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
        $('#render').text(`Something went wrong: ${err.message}`);
        });
    }

    function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const stateInput = $('#parkState').val();
        const maxResults = $('#maxResults').val();
        getParkInfo(stateInput, maxResults);
    });
}

watchForm();
