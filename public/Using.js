"use strict";
const form = document.getElementById('userForm');
const successMessage = document.getElementById('successMessage');
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
    localStorage.setItem('userdetails', JSON.stringify(newuser));
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
        successMessage.style.display = 'block';
        form.reset();
    })
        .catch((error) => {
        console.error('Error:', error);
    });
});
