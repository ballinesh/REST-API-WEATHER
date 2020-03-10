/*Hesiquio Ballines - Practicing using JS to call REST API's
The program simply asks for an address and using two different API's the weather will be displayed for that address 
based on what the first result of the request was. NOTE: because these API's aren't free to use after a certain amount of requests I have removed my key
to use this yourself please replace the "YOUR KEY HERE" text with your own key. The API's used were locationIQ and darksky

This is simple so it has no checks to see if the request was null but for a complete application this would be taken into consideration

Future plan is to work this into a web app using HTML so I can practice using HTML and JS together
*/

let fetch = require('node-fetch'); // Import the library we'll use to make web requests

//Creating a readline interface
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

//First prompt the user for the address
readline.question('Enter Address: ', address => {

    //Address is input is then formated for the location request, then conversion to json is done
    var locationRequest = "https://us1.locationiq.com/v1/search.php?key=YOUR KEY HERE=" + address + "&format=json";
    fetch(locationRequest).then((data) => {
        
        return data.json();
    }).then((locationData) => {

        //Formatting request url for DarkSkyAPI, NOTE: I only grab the first result that LocationIQ API returns, might crash if nothing was found?
        var weatherRequest = "https://api.darksky.net/forecast/YOUR KEY HERE/" + locationData[0].lat + "," + locationData[0].lon;
        
        //Fetching and converting the result to json
        fetch(weatherRequest).then((weatherResult) => {

            return weatherResult.json();
        }).then((weatherData) => {

            //Output using the weather data, since latitude and longitude are specific we don't need to get an index
            console.log("Current Temperature: " + weatherData.currently.temperature + "*F");
            console.log("Summary: " + weatherData.currently.summary);
        });
    })
    readline.close();  
});

