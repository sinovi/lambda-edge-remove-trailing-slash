var test = require('tape');
let lambda = require('../src/index.js');

const invokeLambda = (uri, callback) => {
    lambda.handler( {
        "Records": [
          {
            "cf": {
              "config": {
                "distributionDomainName": "d111111abcdef8.cloudfront.net",
                "distributionId": "EDFDVBD6EXAMPLE",
                "eventType": "viewer-request",
                "requestId": "4TyzHTaYWb1GX1qTfsHhEqV6HUDd_BzoBZnwfnvQc_1oF26ClkoUSEQ=="
              },
              "request": {
                "clientIp": "203.0.113.178",
                "headers": {
                  "host": [
                    {
                      "key": "Host",
                      "value": "d111111abcdef8.cloudfront.net"
                    }
                  ],
                  "user-agent": [
                    {
                      "key": "User-Agent",
                      "value": "curl/7.66.0"
                    }
                  ],
                  "accept": [
                    {
                      "key": "accept",
                      "value": "*/*"
                    }
                  ]
                },
                "method": "GET",
                "querystring": "",
                "uri": `${uri}`
              }
            }
          }
        ]
      }, //event
      {}, //content
      callback
    )
}

test('Ensure open redirect does not occur', function (t) {
    t.plan(0);

    const uri = '/redirect//google.com/'
    const expectedUri = '/redirect/google.com'

    const expectedResp = {
      'status': '301',
      'statusDescription': 'Permanently moved',
      'headers': {
        'location': [
          {
            'key': 'Location',
            'value': expectedUri
          }
        ]
      }};

    invokeLambda(uri, (data, resp) => {
      t.deepEquals(resp, expectedResp, 'Redirected to URI without double slashes')
    })
});

test('URI with trailing slash - /with-trailing-slash/', function (t) {
    t.plan(2);

    const uri = '/with-trailing-slash/'

    invokeLambda(uri, (data, resp) => {

      t.equals(resp.status, '301', 'Response 301 moved permanently')

    })

    const expectedResp = {
      "clientIp": "203.0.113.178",
      "headers": {
        "host": [
          {
            "key": "Host",
            "value": "d111111abcdef8.cloudfront.net"
          }
        ],
        "user-agent": [
          {
            "key": "User-Agent",
            "value": "curl/7.66.0"
          }
        ],
        "accept": [
          {
            "key": "accept",
            "value": "*/*"
          }
        ]
      },
      "method": "GET",
      "querystring": "",
      "uri": `${uri}`
    }

    invokeLambda(uri, (data, resp) => {

      t.notDeepEqual(resp, expectedResp, 'Uri has a trailing slash so is redirected. original request is not passed through')

    })
});

test('URI without a trailing slash - /no-trailing-slash', function (t) {
  t.plan(2);

  const uri = '/no-trailing-slash'

  invokeLambda(uri, (data, resp) => {
    
    const expectedResp = {
      "clientIp": "203.0.113.178",
      "headers": {
        "host": [
          {
            "key": "Host",
            "value": "d111111abcdef8.cloudfront.net"
          }
        ],
        "user-agent": [
          {
            "key": "User-Agent",
            "value": "curl/7.66.0"
          }
        ],
        "accept": [
          {
            "key": "accept",
            "value": "*/*"
          }
        ]
      },
      "method": "GET",
      "querystring": "",
      "uri": `${uri}`
    }

    t.deepEquals(resp, expectedResp, 'No trailing slash, so request passed through')

    invokeLambda(uri, (data, resp) => {

      t.notEquals(resp.status, '301', 'No redirection as original request is passed through')

    })

  })
});