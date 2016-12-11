'use strict';

var oracledb = require('oracledb-for-lambda');


function getDepartment(queryStr, queryParam, callback) {
oracledb.getConnection({
     user: "admin",
     password: "password",
     connectString: "testdb.cxxho8n0rgx6.us-east-1.rds.amazonaws.com:1521/ORCL"
}, function(err, connection) {
     if (err) {
          console.error(err.message);
          return;
     }
     connection.execute(queryStr,
     queryParam,
     function(err, results) {
          if (err) {
               console.error(err.message);
               doRelease(connection);
               return;
          }
          console.log(results.metaData);
          console.log(results.rows);
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

}
module.exports.hello = (event, context, callback) => {
  getDepartment("SELECT department_id depId, department_name depName FROM departments WHERE department_id = :1", {
     1: 180
  });
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
