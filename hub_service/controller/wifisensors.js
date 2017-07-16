const net = require("net");
const ObjectID = require('mongodb').ObjectID;
const mongo = require("../model/mongo.js");

var packet = {};
var sensor = {};
var count = 0;
var telemetry = [];

const sensorServer = net.createServer(function(socket) {
  socket.on("data", function(data) {
    try {
      packet = JSON.parse(data);

      var list = telemetry.map((elem) => { return elem.displayName; })

      if(list.indexOf(packet.displayName) === -1) {

        telemetry.push(packet);

      } else {

        if( telemetry [ list.indexOf(packet.displayName) ] !== packet) {

          telemetry.splice(list.indexOf(packet.displayName), 1, packet);

          console.log('difference: ');
          console.log(telemetry[list.indexOf(packet.displayName)]);
          console.log(packet);

        } else {
          console.log('no difference: ');
          console.log(telemetry[list.indexOf(packet.displayName)]);
          console.log(packet);
          }


        }




    } catch(err) {
      console.log('error at wireless sensor', err);
    }

    console.log(telemetry.length);
    console.log(list);


    // count++;
    //
    // if(count > 100) {
    //   packet._id = new ObjectID();
    //   mongo.collection.insert(packet, function(err) {
    //     if(err) console.log('error at sensor mongo insert', err);
    //     console.log('sensor data inserted');
    //   })
    //   count = 0;
    // }

  })
});

sensorServer.listen(3215, '192.168.10.1');

module.exports = sensor;
