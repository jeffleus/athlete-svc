'use strict';
var Athletes = require('./Athletes');
const AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
var sns = new AWS.SNS();

module.exports.get = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var response = {
    statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
    })
  };
    //check the event path params for an employee id to use during lookup
    var id = (event.pathParameters && event.pathParameters.aid) ? event.pathParameters.aid : null;
    var filter = ['MBB','WBB'];     //event.queryStringParameters.filter.split(',');
    filter = ((event.queryStringParameters != null) && (event.queryStringParameters.filter != null))?event.queryStringParameters.filter.split(','):null;
    console.log(filter);
    Athletes.get(id,filter).then(function(result) {
        if (result.count == 0) response.statusCode = 404;
        response.body = JSON.stringify({
            message: 'Successful get command found: ' + result.count,
            athletes: result.athletes
        });
        callback(null, response);
    }).catch(function(err) {
        console.log('there was an error during the get call');
        console.error(err);
    }).finally(function() {
        console.info('completed the employee model get');
    });
};

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var response = {
    statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
    })
  };
    
    var json = JSON.parse(event.body);
    var athlete;
    
    Athletes.create(json).then(function(ath) {
        athlete = ath;
        response.body = JSON.stringify({
            message: 'Successfully created a new employee: ' + athlete.AthleteID,
            athlete: athlete
        });
        callback(null, response);
    }).catch(function(err) {
        console.log('there was an error creating and athlete');
        console.error(err);
    }).finally(function() {
        console.info('completed the athlete model create');
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var response = {
    statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
    })
  };
    var json = JSON.parse(event.body);
    var id = (event.pathParameters && event.pathParameters.aid) ? event.pathParameters.aid : null;
	
  Athletes.update(json).then(function(athlete) {
      console.log('athlete updated using the EMP utility module');
      callback(null, response);
  }).catch(function(err) {
      console.log('There was an error updating the athlete record');
      console.error(err);
      callback(err);
  });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var response = {
    statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
    })
  };

  var id = (event.pathParameters && event.pathParameters.aid) ? event.pathParameters.aid : null;
  if (!id) {
      callback(null, {
          statusCode: 400,
          body: JSON.stringify({ message: 'Valid athlete id was not passed to the delete method.' })
      })
  }
	
  Athletes.delete(id).then(function(count) {
      console.log('(' + count + ') - athlete successfully deleted');
      callback(null, response);
  }).catch(function(err) {
      console.log('There was an error deleting the athlete record');
      console.error(err);
      callback(err);
  });
};
