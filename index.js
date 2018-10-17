const express =  require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());

const urls = {
  getWoeid: 'https://www.metaweather.com/api/location/search/?query=',
  getWeather: 'https://www.metaweather.com/api/location/',
};

const dialogflowResponse = {
  fulfillmentText: '',
};

app.post('/weather', ( req, res ) => {
  console.log('server was hit!');
  // console.log( req.body );
  const city = req.body.queryResult.parameters['geo-city'];
  console.log( { city });
  
  //get location id (woeID) for the city
  axios.get(urls.getWoeid + city)
    .then( res => {
      let woeID = res.data[0].woeid;
      console.log(woeID);
      return woeID;
    })
    .then( woeid => axios.get(urls.getWeather + woeid))
    .then( response => {
      let temperature = response.data.consolidated_weather[0].the_temp;
      console.log(response.data.consolidated_weather[0].the_temp);
      dialogflowResponse.fulfillmentText = `The temperature for ${city} is ${temperature} degrees`;
      res.json(dialogflowResponse);
    })
    .catch(err => {
      console.log(err);
      let errorResponse = `Oops! The programmer made a mistake. Please try a different query!`;
      dialogflowResponse.fulfillmentText = errorResponse;
      response.json(dialogflowResponse);
    });
  
});

app.listen(3000, () => console.log('Whether or not server listening on port 3000'));