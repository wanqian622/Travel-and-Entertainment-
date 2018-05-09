var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var api_key = "AIzaSyA0TgG8WO6h1YnWcc41_kkS_xFD7tFT1dw";

    if(req.query.pageToken && req.query.pageToken != ''){
        var pageToken = req.query.pageToken;
        var new_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=' + pageToken + '&key=' + api_key;
        nextPage(new_url, res);
    }else {
        var lat = req.query.lat;
        var lng = req.query.lng;
        var radius = req.query.radius;
        var type = req.query.type;
        var keyword = req.query.keyword;
        var request_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat + ',' + lng + '&radius=' + radius + '&type=' + type+ '&keyword=' + keyword + '&key=' + api_key;
        firstPage(request_url, res);
    }
});

function firstPage(request_url, res) {
    var request = require('request');
    request(request_url, function (error, response, body) {
        var output = {};
        if (!error) {
            try {
                var data = JSON.parse(body);
                if (data.results && data.results.length >= 1) {
                    var entities = data.results;
                    var entitiesRes = [];
                    var nextPage = '';
                    if(data.next_page_token && data.next_page_token != ''){
                        nextPage  = data.next_page_token;
                    }

                    for(var i = 0; i < entities.length; i++) {
                        var category_icon = entities[i]["icon"];
                        var place_name = entities[i]["name"];
                        var place_address = entities[i]["vicinity"];
                        var place_id = entities[i]["place_id"];
                        var lat = entities[i]["geometry"]["location"]["lat"];
                        var lng = entities[i]["geometry"]["location"]["lng"];
                        var resObj = {"category_icon":category_icon, "place_name":place_name, "place_address":place_address,"place_id":place_id , "place_lat":lat, "place_lng":lng};
                        entitiesRes.push(resObj);
                    }

                    output.error = 0;
                    output.data = entitiesRes;
                    if(nextPage != '') {
                        output.nextPageToken = nextPage;
                    }

                }
                else {
                    output.error = 1;
                    output["error message"] = "No Records has been found";
                }
                res.send(JSON.stringify(output));
            } catch (err) {
                output.error = 1;
                output["error message"] = "No Records has been found";
                res.send(JSON.stringify(output));
            }
        } else {
            output.error = 1;
            output["error message"] = "No Records has been found";
            res.send(JSON.stringify(output));
        }
    });

}

function nextPage(new_url, res){
    var request = require('request');
    var output = {};
    request(new_url, function (error, response, body) {
        if (!error) {
            try {
                var data = JSON.parse(body);
                if (data.results && data.results.length >= 1) {
                    var entities = data.results;
                    var entitiesRes = [];
                    var nextPage = '';
                    if(data.next_page_token && data.next_page_token != ''){
                        nextPage  = data.next_page_token;
                    }

                    for(var i = 0; i < entities.length; i++) {
                        var category_icon = entities[i]["icon"];
                        var place_name = entities[i]["name"];
                        var place_address = entities[i]["vicinity"];
                        var place_id = entities[i]["place_id"];
                        var lat = entities[i]["geometry"]["location"]["lat"];
                        var lng = entities[i]["geometry"]["location"]["lng"];
                        var resObj = {"category_icon":category_icon, "place_name":place_name, "place_address":place_address,"place_id":place_id,"place_lat":lat, "place_lng":lng};
                        entitiesRes.push(resObj);
                    }
                    output.error = 0;
                    output.data = entitiesRes;
                    if(nextPage != '') {
                        output.nextPageToken = nextPage;
                    }
                    
                }
                else {
                    output.error = 1;
                    output["error message"] = "No Records has been found";
                }
                res.send(JSON.stringify(output));

            } catch (err) {
                output.error = 1;
                output["error message"] = "No Records has been found";
                res.send(JSON.stringify(output));
            }
        } else {
            output.error = 1;
            output["error message"] = "No Records has been found";
            res.send(JSON.stringify(output));
        }
    });

}




module.exports = router;

