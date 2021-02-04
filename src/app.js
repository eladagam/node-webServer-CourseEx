const path = require('path') //core node module - no need to install in NPM
const express = require ('express')
const hbs = require ('hbs')

const app = express()
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

//for heroku
const port = process.env.PORT || 3000


//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))  //go back a folder and in public ==> cd ../public 

//define path for express config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views') //to replace 'views default name'
const partialsPath = path.join(__dirname,'../templates/partials') //to replace 'views default name'


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Use a static HTML dir for head route (will ignore next route)
app.use(express.static(publicPath)) 


app.get('', (req , res)=> {   //app get has 2 params - route, and CB function (req,res)
    res.render('index',{    //render is HBS related function - build a page dynamically with parameters
        title:'Weather',
        name:'Elad Agam'
    })
})

app.get('/weather', (req , res)=> {   
    
    if (!req.query.address){
        return res.send({
            error:"Address query is mandatory"
        })    
    }

    geoCode.geoCode(req.query.address, (error,{lat,long,location} = {})=>{   //destructure + set default 
        if (error)
        {
            return  res.send({
                error: error
            })
        }
        else{
            forecast(lat,long,  (err, fcData) => {
                if (err)
                    return  res.send({
                        error: err
                    })
                

                res.send({
                    Address: location,
                    Forecast: fcData
                })
            })
        }
      //console.log('Error '+ error)
      //console.log('Data '+ JSON.stringify(data))
    })
    



    
    
})


app.get('/about', (req , res)=> {   //app get has 2 params - route, and CB function (req,res)
    res.render('about',{
        title:'About Me',
        name:'Elad Agam'
    })
})

app.get('/help', (req , res)=> {   //app get has 2 params - route, and CB function (req,res)
    res.render('help',{
        title:'Help',
        help:'Some helpful text',
        name:'Elad Agam'
    })
})

app.get('/help/*', (req , res)=> {   //* = Default route
    res.render('error',{
        error:'Help Page not found',
        title:'404',
        name:'Elad Agam'
    })
})

app.get('*', (req , res)=> {   //* = Default route
    res.render('error',{
        error:'Page not found',
        title:'404',
        name:'Elad Agam'
    })
})


// app.get('', (req , res)=> {   //app get has 2 params - route, and CB function (req,res)
//     res.send('hello express')
// })



// app.get('/weather', (req , res)=> {   //app get has 2 params - route, and CB function (req,res)

//     res.send('this is the weather')
    
// })


// app.listen(3000,()=>{
//     console.log('start server')

// }) //start the server = listen to 3000


app.listen(port,()=>{
    console.log('start server')

}) //start the server = listen to 3000