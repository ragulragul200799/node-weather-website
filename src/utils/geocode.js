const request = require( 'request' )


const geocode = (address,callback) =>
{
    // " + encodeURIComponent( address ) + "
    const geourl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent( address )+".json?access_token=pk.eyJ1IjoicmFndWxyYWd1bDg3MyIsImEiOiJja3AzenZtNnMwMjBmMm9xdGE0cjV5aHFtIn0.bttJ21ifMxuaiYzZhFS_fA&limit=1"
    
    request( { url: geourl, json: true }, ( error, respose ) =>
    {
        if ( error )
        {
            callback( "Unable to connect to the location server" ,undefined);
        }
        else if ( respose.body.features.length === 0 )
        {
            callback( "Unable to find the location, Try another search", undefined );
        }
        else
        {
            const features = respose.body.features[ 0 ];
            const latitude = features.center[ 0 ];
            const longitude = features.center[ 1 ];
            const placeName = features.place_name
            callback( undefined , data = {
                latitude,
                longitude,
                placeName
            })
        }
    } )
}

module.exports = geocode;