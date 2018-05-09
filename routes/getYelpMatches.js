var express = require('express');
var router = express.Router();
const yelp = require('yelp-fusion');


router.get('/', function (req, res) {
    var YELP_ID = "CMtBgncyN7TNiZowQ-Lun5bL7_SpWyI7uwtFz_jz7WfKlTNS_hhp-L91vkKhk7uN8kcSzXiB9RG57PZHqYLW2Xgy7jeowqoc-hlJsnl-BfkYO2fNmozYwxlZ8DmwWnYx";
    const client = yelp.client(YELP_ID);
    var name = req.query.matchName;
    var address1 = req.query.matchAddress1;
    var address2 = req.query.matchAddress2;
    var city = req.query.matchCity;
    var state = req.query.matchState;
    var country = req.query.matchCountry;
    var zipCode = req.query.matchZipCode;
    var output = {};
    if(name &&address1 &&address2&&city&&state&&country){
        client.businessMatch('lookup', {
            name: name,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            country: country
        }).then( function(response){
            var result = response.jsonBody.businesses[0];
            if(result.location.zip_code == zipCode){
                var bestId = result.id;
                output.bestId = bestId;
                output.error = 0;
                res.send(JSON.stringify(output));
            } else{
                output.error = 1;
                output["error message"] = "No Records has been found";
                res.send(JSON.stringify(output));
            }
    }).catch(function(e){
            output.error = 1;
            output["error message"] = e;
            res.send(JSON.stringify(output));
    });
    } else {
        output.error = 1;
        output["error message"] = "No Records has been found";
        res.send(JSON.stringify(output));
    }
});

module.exports = router;
