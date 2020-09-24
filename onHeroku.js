var path = require('path');
var querystring = require("querystring");
var express = require('express');
const fs = require('fs');

var app = express();

app.use(express.static(path.join(__dirname, './src')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('port', process.env.PORT || 8080);


function encodeToken() {
    return 'Basic ' + Buffer.from(process.env.API_TOKEN).toString('base64');

}

//アクセストークンを返却します
function createToken() {
    let conf = axios.create(
        {
            headers: {
                'Authorization': encodeToken(),
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },

        }
    )

    return conf.post('https://api.twitter.com/oauth2/token', querystring.stringify({ grant_type: 'client_credentials' }));

}

function postToSearch(token, id, nextToken) {
    let conf = axios.create(
        {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }
    )

    let param = '(from:' + id + ')';

    let obj = {
        query: param,
        next: nextToken
    }

    return conf.post('https://api.twitter.com/1.1/tweets/search/30day/search.json', obj)


}


if (process.env.ENV === 'PROD') {
    app.post('/', async function (req, res) {
        let barerToken;
        let response;
        let nextToken;
        let resultTweets = [];

        await createToken().then(res => barerToken = res.data.access_token);

        await postToSearch(barerToken, req.body.userId).then(res => response = res).catch(e => console.log(e.response));
        nextToken = response.data.next;
        resultTweets = response.data.results;

        while (typeof nextToken !== "undefined") {
            await postToSearch(barerToken, response.data.nezxt).then(res => response = res).catch(e => console.log(e.response));
            nextToken = response.data.next;
            resultTweets = resultTweets.concat(response.data.results);
        }
        //並び替え
        resultTweets.sort(sortRuleFav);
        res.writeHead(200, {
            'Content-Type': 'text/json',
            'Access-Control-Allow-Origin': process.env.DOMAIN+':*',
            'Access-Control-Max-Age': '10',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end(JSON.stringify(resultTweets));
    }
    )
}
var server = app.listen(app.get('port'), function () {
    console.log(process.env.ENV);
});

function sortRuleFav(tweet1, tweet2) {
    if (tweet1.favorite_count > tweet2.favorite_count) {
        return -1;
    }
    if (tweet1.favorite_count < tweet2.favorite_count) {
        return 1;
    }
    if (tweet1.favorite_count == tweet2.favorite_count) {
        return 0;
    }

}

function sortRuleRet(tweet1, tweet2) {
    if (tweet1.retweet_count > tweet2.retweet_count) {
        return -1;
    }
    if (tweet1.retweet_count < tweet2.retweet_count) {
        return 1;
    }
    if (tweet1.retweet_count == tweet2.retweet_count) {
        return 0;
    }

}


if (process.env.ENV === 'develop') {
    app.post('/', function (req, res) {

        res.writeHead(200, {
            'Content-Type': 'text/json',
            'Access-Control-Allow-Origin': process.env.DOMAIN,
            'Access-Control-Max-Age': '10',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end(fs.readFileSync('./response_sample.txt', 'utf8'));
    }
    )
};