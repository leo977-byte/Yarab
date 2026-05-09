document.addEventListener('DOMContentLoaded', function () {

    function updateNavbar() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const navLinks = document.querySelector('#nav-links');

        const loginLink = document.querySelector('#login');
        const signupLink = document.querySelector('#signup');

        if (loggedInUser) {
            if (loginLink) {
                loginLink.innerHTML = `<i class="fa-solid fa-utensils"></i><span> Recipes</span>`;
                loginLink.href = "Recipes_List.html";
            }

            if (signupLink) {
                signupLink.innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket"></i> <span>Logout</span>`;
                signupLink.href = "#";

                signupLink.onclick = function (e) {
                    e.preventDefault();
                    localStorage.removeItem('loggedInUser');
                    showNotification('You have been logged out successfully!');
                    setTimeout(() => location.reload(), 1000);
                };
            }

        } else {
            if (loginLink) {
                loginLink.innerHTML = `<i class="fa-solid fa-circle-user"></i> Log In`;
                loginLink.href = "log_in.html";
            }

            if (signupLink) {
                signupLink.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i> Sign Up`;
                signupLink.href = "Sign_Up.html";
            }
        }
    }

    function showNotification(message) {
        let notification = document.querySelector('.notification');
        if (notification) notification.remove();

        notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        notification.style.cssText = `
            position: fixed;
            top: 40px;
            right: 600px;
            background: #e8D8C4;
            color: black;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 2px 5px rgba(0,0,0,0.7);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();}, 3000);
    }

    window.addEventListener('load', function () {
        showNotification('✨ Welcome to Piece of Cake! ✨');
    });

    updateNavbar();
});