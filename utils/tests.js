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


                // New array to push the posts with new distance attributes
                const newPostsArray = [];

                // psuedo code for finding the distance between users and posts
                const userLong;     // Set the value to the correct attribute in the user response
                const userLat;      // Set the value to the correct attribute in the user response
                for (let i=0; i<response.length; i++) {     // Change response.length to the array of posts
                    const postLong; // Set the value to the correct attribute in the post response
                    const postLat; // Set the value to the correct attribute in the post response

                    // Set the distance variables
                    const longDist = userLong - postLong;
                    const latDist = userLat - postLat;

                    // Find the single value distance between the post and the user using the longDist, latDist

                    // Get the absolute value of the single value distance of the post from the user
                    // Possibly from the distance.js file

                    const post = { 
                        postImage,  // reference to the image
                        distance    // distance value between the post and the user
                    };

                    // Add the new post object to the array
                    newPostsArray.push(post);
                }

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