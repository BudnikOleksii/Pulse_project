function forms() {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо за вашу заявку! Наш менеджер свяжется с вами в ближайшее время!',
        failure: 'Что-то пошло не так...',
        spinner: 'icons/forms/spinner.svg',
        ok:'icons/forms/ok.png',
        fail:'icons/forms/fail.png'
    };

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.parentNode.append(statusMessage);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.append(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.append(textMessage);

            const formData = new FormData(form);

            // convert to json
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                });
        });
    });
}

export default forms;