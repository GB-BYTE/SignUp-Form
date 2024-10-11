"use strict";
var section = document.querySelector('.signedupusers');
var usersno = document.querySelector('.numberofusers');
fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => {
    usersno.innerText = users.length.toString();
    users.forEach((user) => {
        var userdata = user.newuser;
        var newdiv = document.createElement('div');
        newdiv.style.marginBottom = '20px';
        newdiv.innerHTML = `
        <strong>First Name:</strong> ${userdata.Firstname} <br>
        <strong>Last Name:</strong> ${userdata.Lastname} <br>
        <strong>Email:</strong> ${userdata.Email} <br>
        <strong>Phone Number:</strong> ${userdata.Phonenumber} <br>
        <strong>Signup Time:</strong> ${userdata.Signuptime || 'N/A'} <br>
      `;
        section.appendChild(newdiv);
    });
})
    .catch(error => console.error('Error fetching users:', error));
