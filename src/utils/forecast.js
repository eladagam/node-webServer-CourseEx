const request = require ('request')

const forecast = (lat, long , callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=079ed2bed2798820ce112eb377866b11&query='+lat+','+long
    request({url, json: true}, (error, {body}={}) => //url - in ES6 shorthand writing 
    {
        if (error){
            callback(error, undefined)            
        }
        else if (body.error)
        {
            callback(body.error,undefined)
        }  
        else{
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }      
    })
}


module.exports = forecast