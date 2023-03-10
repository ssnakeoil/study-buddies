const signupHandler = async (event) => {
    event.preventDefault();
    const firstName = document.querySelector('#first_name').value.trim();
    const lastName = document.querySelector('#last_name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    if (password.length < 8) {
        alert("The minimum password length is 8 characters.");
    } else if (firstName && lastName && email && password) {
        const response = await fetch(`/api/user`, {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response)
        if (response.ok) {
            document.location.replace('/')
        } else {
            alert(response.statusText);
        }
    }
};
document.querySelector(".signupbtn").addEventListener("click", signupHandler);