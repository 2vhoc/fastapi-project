document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username1 = document.getElementById('username').value;
    const password1 = document.getElementById('password').value;
    const formUser = {
        user: username1,
        password: password1,
    };


    const response = await fetch('http://127.0.0.1:8000/login/forms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formUser),
    });
    //
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        if (data.success) {
            //window.location.href = "/index"
            alert('Login successful');
            window.location.href = "/index"
        } else {
            alert('Sai ok')
        }

    } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.detail}`);
    }

});




//     if (username === 'admin' && password === '12345') {
//         alert('Login successful!');
//         window.location.href = 'home.html';
//     } else {
//         document.getElementById('errorMessage').textContent = 'Invalid username or password!';
//     }
// });

document.getElementById("backHome").onclick = function() {
    window.location.href = "/"

};