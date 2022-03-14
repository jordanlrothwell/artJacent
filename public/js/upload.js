const form = doxument.getElementById("form");       // Get the form element with the ID form


// Function to listen for file upload and set the file to the correct format to be sent and accepted into the database
form.addEventListener("change", (e) => {
    e.preventDefault();

    const file = document.getElementById("file");       // Get the input for with the ID file
    
    // add the file to a new isntance of FormData() which can be sent in binary form to the database
    let formData = new FormData();
    formData.append('file', file.files[0]);     // Get the file from the input element and add it to the form data

    sendResume(formData);       // Send the form data to the api 
})

// Function to send the file to the api
const sendResume = async (data) => { 
    const response = await fetch('/upload', {       // Send the file to the /upload endpoint
        method: 'POST',
        mode: "no-cors",
        headers: {
            'Accept': '*/*'
        },
        body: data
    })
    .then( res => {
        return res
    })
    .then( data => {
        console.log(data);
    })
    .catch(err => {
        console.log("Error \n" + err)
    })
}