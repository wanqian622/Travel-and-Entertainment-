var express = require('express');
var router = express.Router();
const yelp = require('yelp-fusion');


router.get('/', function (req, res) {
    var YELP_ID = "CMtBgncyN7TNiZowQ-Lun5bL7_SpWyI7uwtFz_jz7WfKlTNS_hhp-L91vkKhk7uN8kcSzXiB9RG57PZHqYLW2Xgy7jeowqoc-hlJsnl-BfkYO2fNmozYwxlZ8DmwWnYx";
    const client = yelp.client(YELP_ID);
    var getId = req.query.getId;
    var output = {};
    if(getId){
        client.reviews(getId).then(function(response){
            var data = response.jsonBody.reviews;
            output.error = 0;
            output.data = data;
            res.send(JSON.stringify(output));
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