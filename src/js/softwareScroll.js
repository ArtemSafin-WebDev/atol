export default function softwareScroll() {
    const elements = Array.from(document.querySelectorAll('.js-software-scroll'));

    elements.forEach(element => {
        const progress = element.querySelector('.software__advantages-progress');
        const scrollWrapper = element.querySelector('.software__advantages-scroll-wrapper');

        const handleScroll = () => {
            const scrollProgress = scrollWrapper.scrollTop / (scrollWrapper.scrollHeight - scrollWrapper.clientHeight);

            progress.style.setProperty('--progress', scrollProgress.toFixed(2));

            // console.log('Scrollprogress', scrollProgress);
        };

        scrollWrapper.addEventListener('scroll', handleScroll);

        handleScroll();
    });
}
