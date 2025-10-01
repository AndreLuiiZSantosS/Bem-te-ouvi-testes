document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".login-form");
    const emailInput = document.getElementById("id_username");
    const passwordInput = document.getElementById("id_password");
    const loginButton = document.querySelector(".login-button");

    // Simples validação visual
    form.addEventListener("submit", function (event) {
        if (!emailInput.value || !passwordInput.value) {
            event.preventDefault();
            loginButton.classList.add("disabled");
            setTimeout(() => loginButton.classList.remove("disabled"), 1000);
        }
    });
});