var express = require('express');
var router = express.Router();
const axios = require('axios');
const services = require('./services.json');

let bodyparser = require('body-parser');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
router.use(bodyparser.json());


router.all('/:apiname/:path', async function (req, res, next) {
    if (services.services[req.params.apiname]) {
        let url = services.services[req.params.apiname].url + req.params.path;
        console.log(url);
        if (req.method.toString() === "GET") {
            axios.get(url)
                .then(response => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(response.data);
                })
                .catch(error => {
                    console.log(error);
                });

        } else if (req.method.toString() === "POST") {
            axios.post(url, req.body)
                .then(function (response) {
                    console.log(response.data);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (req.method.toString() === "PUT") {
            axios.put(url, req.body)
                .then(function (response) {
                    console.log(response.data);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (req.method.toString() === "DELETE") {
            console.log("Body",req.body)
            axios.delete(url, req.body)
                .then(function (response) {
                    console.log(response.data);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }
});


module.exports = router;
