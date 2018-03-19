var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
var fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));


//Lines 13 - 67 are reading through the csv file, one line at a time, and storing each of the lines in storage.
//I then check each element in that storage, and filtering it based on the specified criteria (Thai, A or B rating)
//before storing it in the database for to improve loading time.

//Additionally, I check each of the filtered items' zipcodes, and create a count that will be stored in relation to the zipcode,
//and later used for the data for the heatmap.

// let zipCount = {}
// const stream = fs.createReadStream('./DOHMH_New_York_City_Restaurant_Inspection_Results.csv', {encoding: 'utf8'});
//    stream.on('data', data => {
//      header = data.split(/\n/);
//      let results = []
//      header.forEach((head) => {
//        results.push(head.split(','))
//      })
//
//       // let results = results1.slice(0, 1000)
//        // for (let j = 0 ; j < results.length; j++) {
//        results.forEach((res) => {
//          if (res !== undefined &&
//            res.length === 18 &&
//            res[7]=== "Thai" &&
//            (res[14] === "A" || res[14] === "B") ) {
//                let eachRest = {
//                  name: (res[1] !== undefined) ? res[1].split("'").join("") : null,
//                  grade: (res[14] !== undefined) ? res[14].split("'").join("") : null,
//                  score: (res[13] !== undefined) ? res[13].split("'").join("") : null,
//                  cuisine: (res[7] !== undefined) ? res[7].split("'").join("") : null,
//                  zipcode: (res[5] !== undefined) ? res[5] : null
//                }
//
//               if (zipCount[res[5]] === undefined) {
//                 zipCount[res[5]] = {zip: res[5], count: 1}
//               } else {
//                 zipCount[res[5]].count++
//               }
//                items.addInto(eachRest, function(err, res){
//                  if (err) {
//                    console.log(err)
//                  } else {
//                    console.log('success')
//                  }
//                })
//            }
//          })
//             for (let key in zipCount) {
//               items.addIntoZips(zipCount[key], function(err, data) {
//                 if (err) {
//                   console.log('add into error: ', err);
//                 } else {
//                   console.log('success in zips')
//                 }
//               })
//             }
//        // stream.destroy();
//    });
//
//    stream.on('close', () => {
//      console.log('stream done')
//  });

//The following funcionality communicates with the database to send the information to the client.
app.get('/items', function (req, res) {
  console.log('server side get')
  items.selectAll(function(err, data) {
    if(err) {
      console.log('what is the err', err)
      res.sendStatus(500);
    } else {
      console.log('we here!')
      res.json(data);
    }
  });
});

app.get('/zip', function(req, res) {
  items.selectFromZip(function(err, data){
    if (err) {
      res.sendStatus(500)
    } else {
      res.json(data)
    }
  })
})


app.listen(process.env.PORT || 3306, function() {
  console.log('listening on port 3306!');
});
