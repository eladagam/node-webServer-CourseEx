const request = require('request')

const geoCode= (address, callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZWxhZGFnYW0iLCJhIjoiY2traDh3Z2FrMXNzbzMwb2NoOGlobHZ5ayJ9.cMuwad9ySbmX0fa6xbgA7Q&limit=1'

    request ({url, json: true},(error, {body}={}) => //destructure of response.body ==> body + url is shorthand var
    {
        if (error)
        {
            callback('Unable to fetch location',undefined)
        }
        else if (body.features.length === 0)
        {
            callback('Unable to find address',undefined)
        }
        else
        {
            callback(undefined, {
                long: body.features[0].center[0],
                lat: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geoCode: geoCode
}