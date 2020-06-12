function checkEmailsInputs(selector) {
    const emailInputs = document.querySelectorAll(selector);

    // if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
    //     input.style.border = '1px solid red';
    // } else {
    //     input.style.border = 'none';
    // }

    emailInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                e.preventDefault();
            }
        });
    });
}

export default checkEmailsInputs;