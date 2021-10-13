/* Global Variables */
let zipCode;

let temperature;

let queryURL = ``;

const myKey = "1c1a4348800c34f21b2f1dccb926fc72";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) +'.'+ d.getDate()+'.'+ d.getFullYear();

/*------------- Capturing the elements of interest -------------*/
const userZipCode = document.getElementById('zip'); // Zipcode input field
const userFeelings = document.getElementById('feelings'); // Feelings input field
const generateButton = document.getElementById('generate'); // The generate button

/* The callback function to be passed to the event listener on clicking the generate button */
async function getZipCode()
{
    /*---------------- capturing the values of the zipcode & feelings fields ---------------*/
    zipCode = userZipCode.value;
    feelings = userFeelings.value;
    /*------------------------------------------------------------------------------------- */

    /*------------- Generating the URL that will be passed to the fetch method -------------*/
    queryURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${myKey}&units=metric`;

    /*---------------------- The function's try and catch block ----------------------------*/
    try
    {
        const res = await fetch(queryURL); // Fetching the weather data
        const data = await res.json();     // Converting the unreadable data to json
        temperature = data.main.temp;      // Getting the temperature from the parsed data
        console.log(temperature);          // Testing

    /*---------------- Saving the required data to the server ----------------*/
        await fetch('/saveQueryData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: newDate,
                temperature,
                feelings,
            })
        });
    /*---------------- Fetching the required data from the server ----------------*/
        let fetchedData = await fetch('/getQueryData');
        let queryData = await fetchedData.json();
        console.log(queryData); // Testing

        /*---------------- Updating the UI ----------------*/
        document.getElementById('date').innerHTML = `Today is ${queryData.date}`;
        document.getElementById('temp').innerHTML = `Temperature is ${queryData.temperature}°C`;
        document.getElementById('content').innerHTML = `That's why you're feeling ${queryData.feelings}`;
    }
    catch(error)
    {
        console.log('Ops', error);
    }
    

    /*---------------- Two lines to test code ----------------*/
    // console.log(zipCode);
    // console.log(queryURL);
    /*------------------------------------------------------- */
}



generateButton.addEventListener('click', getZipCode);
