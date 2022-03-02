import { Swiper, Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

export default function businessSlider() {
    const elements = Array.from(document.querySelectorAll('.js-business-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        new Swiper(container, {
            slidesPerView: 'auto',
            watchOverflow: true,
            speed: 700,
            spaceBetween: 10,
            threshold: 10
        });
    });
}
