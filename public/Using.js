"use strict";
const form = document.getElementById('userForm');
const successMessage = document.getElementById('successMessage');
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let Firstname = document.getElementById('firstname').value;
    let Lastname = document.getElementById('lastname').value;
    let Email = document.getElementById('email').value;
    let Phonenumber = document.getElementById('phoneno').value;
    let password = document.getElementById('password').value;
    let date = new Date();
    let formatteddate = (`${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`);
    const newuser = {
        "Firstname": Firstname,
        "Lastname": Lastname,
        "Email": Email,
        "Phonenumber": Phonenumber,
        "password": password,
        "Signuptime": formatteddate
    };
    fetch('http://localhost:3000/userdata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newuser })
    })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(data => {
        console.log("Registration Successful", data);
        successMessage.textContent = "You have successfully signed up!";
        successMessage.style.display = 'block';
        //simulated a token for each user
        const token = btoa(`${data.Email}:${Date.now()}`);
        localStorage.setItem('usertoken', token);
        form.reset();
    })
        .catch((error) => {
        console.error('Error:', error);
    });
});
// var submit = document.getElementById('Submit')as HTMLFormElement;
//  submit.addEventListener('click', function(event) {
//   event.preventDefault(); // Prevents the default form submission
//   const firstname = (document.getElementById('firstname') as HTMLInputElement).value;
//   const lastname = (document.getElementById('lastname') as HTMLInputElement).value;
//   const email = (document.getElementById('email') as HTMLInputElement).value;
//   const phoneno = (document.getElementById('phoneno') as HTMLInputElement).value;
//   const password = (document.getElementById('password') as HTMLInputElement).value;
//   // Create an object with the form data
//   const UserData = {
//       firstname,
//       lastname,
//       email,
//       phoneno,
//       password
//   };
//   fetch('http://localhost:3000/userdata', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(UserData)
// })
// .then(response => response.json())
// .then(data => console.log('Success:', data))
// .catch(error => console.error('Error:', error));
// });
