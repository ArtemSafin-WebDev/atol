import { Swiper, Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

export default function automateSlider() {
    const elements = Array.from(document.querySelectorAll('.js-automate-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        new Swiper(container, {
            slidesPerView: 'auto',
            watchOverflow: true,
            speed: 700,
            spaceBetween: 10,
            threshold: 10,
            
        });
    });
}