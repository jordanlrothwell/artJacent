const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    // const name = document.getElementById("name").value;
    const file = document.getElementById("image");

    let formData = new FormData();
    // formData.append("name", name);
    formData.append('file', file.files[0]);

  
    sendFile(formData);
})

const sendFile = async (data) => {
    await fetch("/api/user/upload", {
        method: "POST",
        body: data
    }).then(response => {
        return response;
    }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    })
}