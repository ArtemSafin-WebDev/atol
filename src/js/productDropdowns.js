export default function productDropdowns() {
    const icons = Array.from(document.querySelectorAll('.solutions__modal-feature-icon'));

    icons.forEach(icon => {
        icon.addEventListener('click', event => {
            event.preventDefault();
            icons.forEach(otherIcon => {
                if (otherIcon !== icon) otherIcon.parentElement.classList.remove('active');
            })
            icon.parentElement.classList.toggle('active');
        });
    });

    document.addEventListener('click', event => {
        if (!(event.target.matches('.solutions__modal-feature') || event.target.closest('.solutions__modal-feature'))) {
            icons.forEach(icon => icon.parentElement.classList.remove('active'));
        }
    })
}
