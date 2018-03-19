var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'orchard10.ciqkxj8b112q.us-east-2.rds.amazonaws.com',
  user     : 'orchard10',
  password : 'orchard10',
  database : 'orchard10',
  port: '3306'
});

//Query to add all data for restaurants into database
let addInto = function(data, callback) {
  connection.query(`INSERT INTO items (name, grade, cuisine, zipcode) VALUES ('${data.name}', '${data.grade}', '${data.cuisine}', '${data.zipcode}')`, function(err, results, fields) {
    if (err) {
      callback(err)
    } else {
      callback(null, results)
    }
  })
}

//Query to add all data for zipcodes into database
let addIntoZips = function(zipcode, callback) {
  connection.query(`INSERT INTO zips (zipcode, count) VALUES ('${zipcode.zip}', '${zipcode.count}')`, function(err, results, fields) {
    if (err) {
      callback(err)
    } else {
      callback(null, results)
    }
  })
}

//Query to select the top ten restaurants (given more time, would also have sorted by score)
let selectAll = function(callback) {
  connection.query(`SELECT * FROM items ORDER BY grade ASC LIMIT 10`, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

//Limit 1000
//Query to select all of the zipcodes
let selectFromZip = function(callback) {
  connection.query(`SELECT * FROM zips LIMIT 1500`, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.addInto = addInto;
module.exports.selectFromZip = selectFromZip;
module.exports.addIntoZips = addIntoZips;
