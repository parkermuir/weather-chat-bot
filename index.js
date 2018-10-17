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
      return woeid;
    })
    .then( woeid => axios.get(urls.getWeather + woied))
    .then( res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
      let errorResponse = `Oops! The programmer made a mistake. Please try a different query!`;
      dialogflowResponse.fulfillmentText = errorResponse;
      response.json(dialogflowResponse);
    });
    
  //get temperature from the woeID

  //return temperature

  //send back temperature to dialgoflow

  
  dialogflowResponse.fulfillmentText = city;
  res.json(dialogflowResponse);
});

app.listen(3000, () => console.log('Whether or not server listening on port 3000'));