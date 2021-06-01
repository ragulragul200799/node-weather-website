const express = require( 'express' );
const app = express(); // assigning the express to app
const path = require( 'path' );
const hbs = require( "hbs" );
const geocode = require( "./utils/geocode" );
const weatherStack = require( "./utils/weather" );
const port = process.env.PORT || 3000;


const publicDirectoryPath = path.join( __dirname, '../public' );
app.use( express.static( publicDirectoryPath ) );

//to use hbs
app.set( "view engine", "hbs" );

//customaize the views folder name and location
const viewsPath = path.join( __dirname, '../templates/views' );
const hbsPartialPath = path.join( __dirname, '../templates/partials' );
app.set( "views", viewsPath );
hbs.registerPartials(hbsPartialPath)

//homepage
app.get( "", ( req, res ) =>
{
    res.render( 'index', {
        title: "Weather",
        name:"Ragul A"
    })
} )

//about page
app.get( "/about", ( req, res ) =>
{
    res.render( 'about', {
        title: "About Me",
        name:"Ragul A"
    })
} )

//help page
app.get( "/help", ( req, res ) =>
{
    res.render( 'help', {
        title: "Help",
        text: "Some important help message",
        name:"Ragul A"
    })
} )

app.get( "/weather", ( req, res ) =>
{
    if ( !req.query.address )
    {
        return res.send( "Please mention the address" );
    }

    geocode( req.query.address , ( err, {latitude,longitude,placeName}={} ) =>
    {
        if ( err )
        {
            return res.send( { err } );
        }

        weatherStack( {latitude,longitude}, ( err, { temp , likelytemp,weather_desc,local_time}={}) =>
        {
            if ( err )
            {
                res.send( { err } );
            }
            else
            {
                res.send( { placeName, temp, likelytemp,weather_desc, local_time } );
            }
        } )
    
    } )
} )

app.get( "/help/*", ( req, res ) =>
{
    res.render( '404_help', {
        title:'404',
        message: "Help artical not found",
        name : "Ragul A"
     }
    );
} )

app.get( "*", (req,res) =>
{
    res.render( '404', {
        title: "404 error Message",
        name:"Ragul A"
    }
    );
})


app.listen( port, () =>
{
    console.log(`This is th server in the port ${port}`)
} )