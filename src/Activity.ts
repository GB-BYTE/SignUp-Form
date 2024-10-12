const Activityform = document.getElementById('ActivityForm') as HTMLFormElement;
const activityMessage = document.querySelector('.useractivity') as HTMLDivElement;
const activitytracking = document.querySelector('.activitytracking') as HTMLDivElement;


Activityform.addEventListener('submit', (e) => {
    e.preventDefault();
    const Nickname = (document.getElementById('texts') as HTMLFormElement).value;
    activitytracking.innerHTML = `<h3>Your Nickname is <span style="color:green;">${Nickname}</span> ✔</h3>`;
});