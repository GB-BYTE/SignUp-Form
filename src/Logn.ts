interface UserInput {
    Firstname: string;
    Lastname: string;
    Email: string;
    Phonenumber: string;
    password: string;
    Signuptime: string;
  }
  const Loginform = document.getElementById('LoginForm') as HTMLFormElement;

  Loginform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = (document.getElementById('loginemail') as HTMLInputElement).value;
    const password = (document.getElementById('loginpassword') as HTMLInputElement).value;
    let LoginMessage = document.querySelector('.loginMessage') as HTMLDivElement;
    let NotFound = document.querySelector('.notfound') as HTMLDivElement;
    let seeactivity = document.querySelector('.seeactivity') as HTMLDivElement;

  const details: string | null = localStorage.getItem('userdetails');
  
  if (details) {
    const maindetails: UserInput = JSON.parse(details);

    // Check if password and email match
    if (password === maindetails.password && email === maindetails.Email) {
      const token: string = btoa(`${maindetails.Email}:${Date.now()}`);
      localStorage.setItem('usertoken', token);
      seeactivity.style.display = 'block';
      LoginMessage.style.display = 'none';
    } else {
      LoginMessage.textContent = 'Invalid email or password';
      LoginMessage.style.display = 'block';
      Loginform.reset();
    }
  } else {
    NotFound.textContent = 'User not found';
    NotFound.style.display = 'block';
  }
})

