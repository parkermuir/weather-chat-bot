const express =  require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const dialogflowResponse = {
  fulfillmentText: '',
};

app.post('/weather', ( req, res ) => {
  console.log('server was hit!');
  // console.log( req.body );
  const city = req.body.queryResult.parameters['geo-city'];
  console.log( { city });
  
  //get location id (woeID) for the city

  //get temperature from the woeID

  //return temperature

  //send back temperature to dialgoflow

  
  dialogflowResponse.fulfillmentText = city;
  res.json(dialogflowResponse);
});

app.listen(3000, () => console.log('Whether or not server listening on port 3000'));