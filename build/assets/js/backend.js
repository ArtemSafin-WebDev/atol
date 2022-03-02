document.addEventListener('DOMContentLoaded', () => {
    const callbackForm = document.querySelector('#contact-modal-form');

    if (callbackForm) {
        const form = callbackForm;
        const formLayer = document.querySelector('.contact-modal__form-layer');
        const successLayer = document.querySelector('.contact-modal__form-success-layer');
        form.addEventListener('submit', event => {
            event.preventDefault();
            if (
                $(form)
                    .parsley()
                    .isValid()
            ) {
                form.reset();
                $(form)
                    .parsley()
                    .reset();
                formLayer.classList.remove('active');
                successLayer.classList.add('active');

                setTimeout(() => {
                    formLayer.classList.add('active');
                    successLayer.classList.remove('active');
                }, 6000);
            }
        });
    }
    const chooseForm = document.querySelector('#choose-form');

    if (chooseForm) {
        const form = chooseForm;
        const formLayer = document.querySelector('.contact-modal__form-layer');
        const successLayer = document.querySelector('.contact-modal__form-success-layer');
        form.addEventListener('submit', event => {
            event.preventDefault();
            if (
                $(form)
                    .parsley()
                    .isValid()
            ) {
                form.reset();
                $(form)
                    .parsley()
                    .reset();
                formLayer.classList.remove('active');
                successLayer.classList.add('active');
                window.openModal('#contact-modal');

                setTimeout(() => {
                    window.closeModal(window.activeModal);
                    formLayer.classList.add('active');
                    successLayer.classList.remove('active');
                }, 2000);
            }
        });
    }
});
