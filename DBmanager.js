var oracledb = require('oracledb-for-lambda');

var connectionPool;

function createPool(callback) {
    oracledb.createPool(
        {
            user: "admin",
            password: "password",
            connectString: "testdb.cxxho8n0rgx6.us-east-1.rds.amazonaws.com:1521/ORCL",
            poolMin: 2,
            poolMax: 20,
            poolIncrement: 2,
            poolTimeout: 120
        },
        function(err, pool) {
            if (err) throw err;

            connectionPool = pool;

            callback();
        }
    );
}

module.exports.createPool = createPool;

function getPool() {
    return connectionPool;
}

module.exports.getPool = getPool;
