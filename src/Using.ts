//localStorage.clear()
interface UserInput {
  Firstname: string;
  Lastname: string;
  Email: string;
  Phonenumber: string;
  password: string;
  Signuptime: string;
}

const form = document.getElementById('userForm') as HTMLFormElement;
const successMessage = document.getElementById('successMessage') as HTMLDivElement;
const inputtracking = document.querySelector('.inputtracking') as HTMLDivElement

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let Firstname = (document.getElementById('firstname') as HTMLInputElement).value;
  let Lastname = (document.getElementById('lastname') as HTMLInputElement).value;
  let Email = (document.getElementById('email') as HTMLInputElement).value;
  let Phonenumber = (document.getElementById('phoneno') as HTMLInputElement).value;
  let password = (document.getElementById('password') as HTMLInputElement).value;
  let date = new Date();
  let formattedDate = `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;

  const newuser: UserInput = {
      "Firstname": Firstname,
      "Lastname": Lastname,
      "Email": Email,
      "Phonenumber": Phonenumber,
      "password": password,
      "Signuptime": formattedDate
  };

  localStorage.setItem('userdetails', JSON.stringify(newuser))


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



