"use strict";
const Loginform = document.getElementById('LoginForm');
Loginform.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpassword').value;
    let LoginMessage = document.querySelector('.loginMessage');
    let NotFound = document.querySelector('.notfound');
    let seeactivity = document.querySelector('.seeactivity');
    const details = localStorage.getItem('userdetails');
    if (details) {
        const maindetails = JSON.parse(details);
        // Check if password and email match
        if (password === maindetails.password && email === maindetails.Email) {
            const token = btoa(`${maindetails.Email}:${Date.now()}`);
            localStorage.setItem('usertoken', token);
            seeactivity.style.display = 'block';
            LoginMessage.style.display = 'none';
        }
        else {
            LoginMessage.textContent = 'Invalid email or password';
            LoginMessage.style.display = 'block';
            Loginform.reset();
        }
    }
    else {
        NotFound.textContent = 'User not found';
        NotFound.style.display = 'block';
    }
});
