const router = require('express').Router();


// Get the data from the DATABASE
const getData = async () => {
    try {
        await fetch("/api/artwork", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            if (response.ok) {
                console.log(response.json());
            }
            else {
                console.log("something went wrong");
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = getData;