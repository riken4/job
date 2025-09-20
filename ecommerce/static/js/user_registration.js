function loginUser(event) {
    event.preventDefault(); // prevent form from reloading the page

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Example check (replace with real authentication in backend)
    if (email === "admin@gmail.com" && password === "12345678@") {
        alert("Login successful!");
        // ✅ Redirect to Laravel route instead of .blade.php
        window.location.href = "{{ url('/home') }}";
    } else {
        alert("Invalid username or password!");
    }
}
function switchToLogin() {
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}

function switchToSignup() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.remove('hidden');
}

function showForgotPassword() {
    alert('Forgot password functionality would be implemented here.');
}