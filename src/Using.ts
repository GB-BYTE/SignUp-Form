
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
const activityMessage = document.querySelector('.useractivity') as HTMLDivElement;
const h2Element = activityMessage.querySelector('h2') as HTMLHeadingElement;
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
      
      h2Element.style.display = 'block'
      // Display the user input activity summary stated in feature (3)
      inputtracking.innerHTML = `
          <p>You typed the following:</p>
          <p>First Name: ${Firstname}</p>
          <p>Last Name: ${Lastname}</p>
          <p>Email: ${Email}</p>
          <p>Phone Number: ${Phonenumber}</p>
      `;
     
      
      // Simulate token generation for the user stated in feature (2)
      const token: string = btoa(`${data.Email}:${Date.now()}`);
      localStorage.setItem('usertoken', token);

      form.reset();
  })
  .catch((error) => {
      console.error('Error:', error);
  });
});



