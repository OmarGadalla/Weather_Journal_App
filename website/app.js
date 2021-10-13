/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const myKey = "1c1a4348800c34f21b2f1dccb926fc72";

let zipCode = 0;

let temperature;

let queryURL = ``;

const userZipCode = document.getElementById('zip');
const userFeelings = document.getElementById('feelings');
const generateButton = document.getElementById('generate');

async function getZipCode()
{
    zipCode = userZipCode.value;
    feelings = userFeelings.value;
    queryURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${myKey}&units=metric`;

    try
    {
        const res = await fetch(queryURL);
        const data = await res.json();
        temperature = data.main.temp;
        console.log(temperature);

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

        let fetchedData = await fetch('/getQueryData');
        let queryData = await fetchedData.json();
        console.log(queryData);
    }
    catch
    {
        console.error(error);
    }
    
    /*---------------- Two lines to test code ----------------*/
    console.log(zipCode);
    console.log(queryURL);
    /*------------------------------------------------------- */
}



generateButton.addEventListener('click', getZipCode);
