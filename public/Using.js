"use strict";
const form = document.getElementById('userForm');
const successMessage = document.getElementById('successMessage');
const activityMessage = document.querySelector('.useractivity');
const h2Element = activityMessage.querySelector('h2');
const inputtracking = document.querySelector('.inputtracking');
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let Firstname = document.getElementById('firstname').value;
    let Lastname = document.getElementById('lastname').value;
    let Email = document.getElementById('email').value;
    let Phonenumber = document.getElementById('phoneno').value;
    let password = document.getElementById('password').value;
    let date = new Date();
    let formattedDate = `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
    const newuser = {
        "Firstname": Firstname,
        "Lastname": Lastname,
        "Email": Email,
        "Phonenumber": Phonenumber,
        "password": password,
        "Signuptime": formattedDate
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
        h2Element.style.display = 'block';
        // Display the user input activity summary stated in feature (3)
        inputtracking.innerHTML = `
          <p>You typed the following:</p>
          <p>First Name: ${Firstname}</p>
          <p>Last Name: ${Lastname}</p>
          <p>Email: ${Email}</p>
          <p>Phone Number: ${Phonenumber}</p>
      `;
        // Simulate token generation for the user stated in feature (2)
        const token = btoa(`${data.Email}:${Date.now()}`);
        localStorage.setItem('usertoken', token);
        form.reset();
    })
        .catch((error) => {
        console.error('Error:', error);
    });
});
