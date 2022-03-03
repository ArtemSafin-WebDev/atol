import { Swiper, Navigation, Pagination, EffectFade, Controller } from 'swiper';

Swiper.use([Navigation, Pagination, EffectFade, Controller]);

export default function reviews() {
    const elements = Array.from(document.querySelectorAll('.js-reviews'));

    elements.forEach(element => {
        const quotesSliderContainer = element.querySelector('.reviews__quotes-slider .swiper-container');
        const authorSliderContainer = element.querySelector('.reviews__authors-slider .swiper-container');
        const progress = element.querySelector('.reviews__slider-progress');

        const quotesSlider = new Swiper(quotesSliderContainer, {
            watchOverflow: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            slidesPerView: 1,
            navigation: {
                nextEl: element.querySelector('.reviews__arrow--next'),
                prevEl: element.querySelector('.reviews__arrow--prev')
            },
            // autoHeight: window.matchMedia("(max-width: 640px)").matches ? true : false,
            pagination: {
                el: element.querySelector('.reviews__pagination'),
                type: 'fraction'
            },
            on: {
                init: swiper => {
                    progress.style.setProperty('--progress', swiper.progress);
                },
                slideChange: swiper => {
                    progress.style.setProperty('--progress', swiper.progress);
                }
            }
        });

        const authorSlider = new Swiper(authorSliderContainer, {
            watchOverflow: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            // autoHeight: window.matchMedia("(max-width: 640px)").matches ? true : false,
            allowTouchMove: window.matchMedia("(max-width: 640px)").matches ? true : false,
            slidesPerView: 1
        });

        quotesSlider.controller.control = authorSlider;
    });
}
