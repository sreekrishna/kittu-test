'use strict';

var oracledb = require('oracledb-for-lambda');


module.exports.hello = (event, context, callback) => {
oracledb.getConnection({
     user: "admin",
     password: "password",
     connectString: "testdb.cxxho8n0rgx6.us-east-1.rds.amazonaws.com:1521/ORCL"
}, function(err, connection) {
      console.log("Inside connection");
     if (err) {
          console.error(err.message);
          return;
     }
     connection.execute( "SELECT department_id, department_name FROM departments WHERE department_id = 180",
     [],
     function(err, result) {
          if (err) {
               console.error(err.message);
               doRelease(connection);
               return;
          }
          console.log(result.metaData);
          console.log(result.rows);
          doRelease(connection);
     });
});

function doRelease(connection) {
     connection.release(
          function(err) {
               if (err) {console.error(err.message);}
          }
     );
}

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!!!'
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
