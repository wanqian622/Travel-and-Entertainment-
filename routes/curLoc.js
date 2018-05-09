var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    var location = req.query.location;
    var api_key = "AIzaSyA0TgG8WO6h1YnWcc41_kkS_xFD7tFT1dw";
    if(location){
        if(req.query.loc) {
            var addr = req.query.loc;
            var request_url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(addr).replace(/%20/g, '+') + '&key=' + api_key;
            console.log(request_url);
            query_getOtherLoc(request_url, res);
        } else {
            var output = {};
            output.error = 1;
            output["error message"] = "Missing parameters!";
            res.send(JSON.stringify(output));
        }
   
    } else {
        var output = {};
        output.error = 1;
        output["error message"] = "Missing parameters!";
        res.send(JSON.stringify(output));
    }


});

// function query_getCurLoc(request_url, res) {
//     var request = require('request');
//     request(request_url, function (error, response, body) {
//         var output = {};
//         if (!error) {
//             try {
//                 var data = JSON.parse(body);
//                 if (data["lat"] && data["lon"]) {
//                     output.error = 0;
//                     output.lat = data["lat"];
//                     output.lng = data["lon"];
//                 } else {
//                     output.error = 1;
//                     output["error message"] = "Can not get current location!";
//                 }
//                 res.send(JSON.stringify(output));
//             } catch (err) {
//                 output.error = 1;
//                 output["error message"] = "Can not get current location!";
//                 res.send(JSON.stringify(output));
//             }
//         } else {
//             output.error = 1;
//             output["error message"] = "Can not get current location!";
//             res.send(JSON.stringify(output));
//         }
//     });
// }

function query_getOtherLoc(request_url, res) {
    var request = require('request');
    request(request_url, function (error, response, body) {
        var output = {};
        if (!error) {
            try {
               var data = JSON.parse(body);
                if(data.results[0].geometry.location){
                    var geoLocation = data.results[0].geometry.location;
                    if (geoLocation["lat"] && geoLocation["lng"]) {
                        output.error = 0;
                        output.lat = geoLocation["lat"];
                        output.lng = geoLocation["lng"];
                    } else {
                        output.error = 1;
                        output["error message"] = "Can not get current location!";
                    }
                    res.send(JSON.stringify(output));
                } else {
                    output.error = 1;
                    output["error message"] = "Can not get current location!";
                    res.send(JSON.stringify(output));
                }
            } catch (err) {
                output.error = 1;
                output["error message"] = "Can not get current location!";
                res.send(JSON.stringify(output));
            }
        } else {
            output.error = 1;
            output["error message"] = "Can not get current location!";
            res.send(JSON.stringify(output));
        }
    });

}

module.exports = router;
