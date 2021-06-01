const request = require( 'request' );

const weatherStack = ({latitude,longitude},callback) =>
{
    
    const url = `http://api.weatherstack.com/current?access_key=c3e7bba804a1bb62a196e745c0beed1d&query=${longitude},${latitude}&units=f`;
    request( { url: url , json:true }, (error,respose) =>
    {
    if ( error )
    {
        callback( "Unable to connect to the weather service",undefined );
    }
    else if ( respose.body.error )
    {
        callback( "Unable to find the location",undefined);
    }
    else
    {
        const currentWather = respose.body.current;
        const temp = currentWather.temperature;
        const likelytemp = currentWather.feelslike;
        callback( undefined, res = {
            temp,
            likelytemp,
            currentWather
        })
    }
})
}

module.exports = weatherStack;