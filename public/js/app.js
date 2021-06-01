console.log( "client side java script is running!" );

const weather = document.querySelector( 'form' );
const search = document.querySelector( 'input' );
const msg_1 = document.querySelector( "#msg_1" );
const msg_2 = document.querySelector( "#msg_2" );

weather.addEventListener( 'submit', (e) =>
{
    e.preventDefault()
    const location = search.value;
    msg_1.textContent = "Loading..."
    
    fetch( `/weather?address=${location}` ).then( ( response ) =>
    response.json().then( ( data ) =>
    {
        if ( data.error )
        {
            e_msg.textContent = '';
            console.log( data.err );
        }
        else
        {
            msg_1.textContent = data.placeName + `   Current time : ${data.local_time}`;
            msg_2.textContent = `The place has ${data.weather_desc} with temperature of ${data.temp} `
        }
    } )
 )
    
} )

