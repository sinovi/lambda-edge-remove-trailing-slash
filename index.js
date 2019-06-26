'use strict';
exports.handler = (event, context, callback) => {    
    
    var request = event.Records[0].cf.request;

    if(request.uri !== '/' && request.uri.substr(-1) === '/') {
        
        var params = '';
        if(('querystring' in request) && (request.querystring.length > 0)) {
            params = '?'+request.querystring;
        }
        
        const response = {
            status: '301',
            statusDescription: 'Permanently moved',
            headers: {
                location: [{
                    key: 'Location',
                    value: request.uri.slice(0, -1) + params
                }]
            }
        };

        return callback(null, response);

    } else {

        return callback(null, request);

    }

    
};