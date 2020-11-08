var cfenv = require('cfenv');
var express = require('express');
var cors = require('cors');
const Web3 = require('web3');
const ethTx = require('ethereumjs-tx');
var request = require('request');

const authToken = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwNHIzcHo3Y25MX25IVFZqbWYyUDJYZGRQZHNxUG4tRExwTXExcEVEanlFIn0.eyJleHAiOjE1OTQ5NjIwNzcsImlhdCI6MTU5MjM3MDA3NywianRpIjoiOTg3NTA1NzktODY2NC00MWQ2LWFkZWItZTcxYzVhNWI4MjcxIiwiaXNzIjoiaHR0cHM6Ly9jaGFpbnpkZXYtaWFtLnNrY2MuY29tL2F1dGgvcmVhbG1zL2NoYWlueiIsImF1ZCI6WyJrZXktbWFuYWdlbWVudC1zZXJ2aWNlIiwidG9rZW4tc2VydmljZSIsImFjY291bnQiXSwic3ViIjoiYWNkZDlmNmItMmYyMC00YmY1LTk5N2QtYmUwZTBlZTI0OTdmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoia3JzLXRlc3QiLCJzZXNzaW9uX3N0YXRlIjoiNmE0NWE2NmEtYzQ5Mi00Mjc3LTk2NzItYTFmMjYzZjVjZjY4IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJPUEVSQVRPUiIsIm9mZmxpbmVfYWNjZXNzIiwiUFJPVklERVIiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIkFETUlOIiwiVVNFUiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgYnRzLXNjb3BlIGtycy1zY29wZSBwcm9maWxlIiwiY2xpZW50SG9zdCI6IjIxMS40NS42MC4xIiwiY2xpZW50SWQiOiJrcnMtdGVzdCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYXV0aC1pZCI6InNlcnZpY2UtYWNjb3VudC1rcnMtdGVzdCIsInByb3ZpZGVyLWNvZGUiOiJrcnMtdGVzdCIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1rcnMtdGVzdCIsImNsaWVudEFkZHJlc3MiOiIyMTEuNDUuNjAuMSIsImF1dGhvcml0aWVzIjpbIlJPTEVfT1BFUkFUT1IiLCJST0xFX29mZmxpbmVfYWNjZXNzIiwiUk9MRV9QUk9WSURFUiIsIlJPTEVfVVNFUiIsIlJPTEVfdW1hX2F1dGhvcml6YXRpb24iLCJST0xFX0FETUlOIiwiUk9MRV9PUEVSQVRPUiIsIlJPTEVfb2ZmbGluZV9hY2Nlc3MiLCJST0xFX1BST1ZJREVSIiwiUk9MRV9VU0VSIiwiUk9MRV91bWFfYXV0aG9yaXphdGlvbiIsIlJPTEVfQURNSU4iXX0.hcggzp6NQZ8nulcj-xk0XkbeSjwmDODFWI--K2D3X5dpyowcxfAHbTmtrEql75exB90drFCrqR8F8OxYdMKFYkPe2-RiffHO1pGGcpXUuGCcMopxgKvSFi1-aUJFgaHxPcAR4kMC2msePvV4HmxrhA4rvH-GZyVDFXQWIu5tNH809wNJDrL7J-O0AcsYqdqEX0eO5r-kNi-atljPSPI2QqNRR52iaETx3Y39QSuHwsY4DH_NO943sPlg1QMVepGQUS1dLl8KL5AjsCUC4oy3VB_CUpN0lpD5-TrvWjthoM95gAwHBVpup_AqTPGTGDKRPhICH8h70n9tgqNRj_ASuQ';

// 새로운 express 서버 생성
var app = express();

var http = require('http').Server(app);

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start the server
http.listen(appEnv.port, function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});

var bodyParser = require('body-parser');
app.use (bodyParser.urlencoded ({limit : '50mb', extended : true}));
app.use (bodyParser.json ({limit : '50mb', extended : true}));

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));

// CORS 설정
app.use(cors());

let krsUrl = "http://localhost";
let krsPort = ":5000";

app.post('/signCreateCertificate', function(req, res) {

    console.log("from: " + req.body.from);

    const from = req.body.from;
    const privateKey = req.body.privateKey;

    const bID = req.body.bID;
    const evID = req.body.evID;
    const soh = req.body.soh;
    const grade = req.body.grade;
    const expirationDate = req.body.expirationDate;
    const certificateHash = req.body.certificateHash;

    const preparationUrl = krsUrl + krsPort + '/api/v1/certificate/preparation/newInfo/from/' + from + '/bID/' + bID + '/evID/' + evID + '/soh/' + soh + '/grade/' + grade + '/expirationDate/' + expirationDate + '/certificateHash/' + certificateHash;
    const sendSignedUrl = krsUrl + krsPort + '/api/v1/certificate/sign';

    var OPTIONS = {
        headers: {'Content-Type': 'application/json', 'Authorization': authToken},
        url: preparationUrl
    };

    request.get(OPTIONS, function (err, response, result) {

        var infoObject = result;
        console.log("infoObject: " + infoObject);

        const web3 = new Web3();
        web3.transactionConfirmationBlocks = 1;

        const privKey = Buffer.from(privateKey, 'hex');
        console.log("privKey :" + privKey);
        var tx = new ethTx(JSON.parse(infoObject).result);
        tx.sign(privKey);                                         //privateKey로 sign

        var serializedTx = tx.serialize();                        //sign 결과 값을 직렬화 함
        var signedData = '0x' + serializedTx.toString('hex');       //hex 값으로 변경
        console.log("signedData : " + signedData);

        var OPTIONS = {
            headers: {'Content-Type': 'application/json', 'Authorization': authToken},
            url: sendSignedUrl,
            body: JSON.stringify({
                "signedData": signedData
            })
        };

        request.post(OPTIONS, function (err, response, result) {
            let txResult = result;
            console.log("txResult: " + txResult);
            res.json(JSON.parse(txResult));
        });

    });

});

app.get('/certificateInfo/bID/:bID/cID/:cID', function(req, res) {

    const bID = req.params.bID;
    const cID = req.params.cID;

    console.log("bID : " + req.params.bID);

    const getInfoUrl = krsUrl + krsPort + '/api/v1/certificate/certificateInfo/bID/' + bID + '/cID/' + cID;

    var OPTIONS = {
        headers: {'Content-Type': 'application/json', 'Authorization': authToken},
        url: getInfoUrl
    };

    request.get(OPTIONS, function (err, response, result) {
        console.log("result: " + result);
        res.json(JSON.parse(result));
    });
});

app.get('/checkLatestCertificate/bID/:bID/cID/:cID/certificateHash/:certificateHash', function(req, res) {

    const bID = req.params.bID;
    const cID = req.params.cID;
    const certificateHash = req.params.certificateHash;

    console.log("bID : " + req.params.bID);

    const getInfoUrl = krsUrl + krsPort + '/api/v1/certificate/certificateInfo/bID/' + bID + '/cID/' + cID + '/certificateHash/' + certificateHash;

    var OPTIONS = {
        headers: {'Content-Type': 'application/json', 'Authorization': authToken},
        url: getInfoUrl
    };

    request.get(OPTIONS, function (err, response, result) {
        console.log("result: " + result);
        res.json(JSON.parse(result));
    });
});


