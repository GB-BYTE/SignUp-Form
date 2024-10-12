"use strict";
const Activityform = document.getElementById('ActivityForm');
const activityMessage = document.querySelector('.useractivity');
const activitytracking = document.querySelector('.activitytracking');
Activityform.addEventListener('submit', (e) => {
    e.preventDefault();
    const Nickname = document.getElementById('texts').value;
    activitytracking.innerHTML = `<h3>Your Nickname is <span style="color:green;">${Nickname}</span> ✔</h3>`;
});
