const form = document.querySelector('#loginForm');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');


emailInput.focus();


form.addEventListener('submit', async e => {
    e.preventDefault(); 

    let isValid = true;


    validateField(emailInput, () => checkEmail(emailInput.value));

    validateField(passwordInput, () => checkPassword(passwordInput.value));

    if (isValid) {
        try {
            await simulateServerResponse();
            alert('Успешная авторизация!'); 
            window.location.href = "./index.html"; 
        } catch(error) {
            console.error(error);
            alert('Ошибка авторизации.');
        }
    }
});


async function simulateServerResponse() {
    return new Promise(resolve => setTimeout(() => resolve(), 1500));
}

`
function validateField(inputEl, validationFn) {
    const errorMessage = inputEl.nextElementSibling;
    const value = inputEl.value.trim();

    if (!validationFn(value)) {
        showError(inputEl, errorMessage, ${inputEl.id} некорректен.);
        return false;
    }

    hideError(inputEl, errorMessage);
    return true;
}
`