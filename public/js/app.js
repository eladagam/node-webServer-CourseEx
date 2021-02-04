console.log('Client side java script file is loaded')


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    //fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    fetch('/weather?address=' + location).then((response)=>{        
        response.json().then((body)=>{
            if(body.error)
            {
                msg1.textContent = body.error
                return //console.log('error: ' +body.error)
            }
            //console.log(body)
            msg1.textContent = body.Address
            msg2.textContent = 'Temp: ' + body.Forecast.temperature + ' - Feels like: '+body.Forecast.feelslike
            //JSON.stringify(body.Forecast)

            
        })
    })
})