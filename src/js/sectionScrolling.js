import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function sectionScrolling() {
    if (window.matchMedia('(max-width: 640px)').matches) return;
    const sections = document.querySelectorAll('section');

    // this scrolling object just allows us to conveniently call scrolling.enable(), scrolling.disable(), and check if scrolling.enabled is true.
    // some browsers (like iOS Safari) handle scrolling on a separate thread and can cause things to get out of sync (jitter/jumpy), so when we're animating the scroll position, force an update of GSAP tweens when there's a scroll event in order to maintain synchronization)
    const scrolling = {
        enabled: true,
        events: 'scroll,wheel,touchmove,pointermove'.split(','),
        prevent: e => e.preventDefault(),
        disable() {
            if (scrolling.enabled) {
                scrolling.enabled = false;
                window.addEventListener('scroll', gsap.ticker.tick, { passive: true });
                scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, { passive: false }));
            }
        },
        enable() {
            if (!scrolling.enabled) {
                scrolling.enabled = true;
                window.removeEventListener('scroll', gsap.ticker.tick);
                scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
            }
        }
    };

    // scrolling.disable();

    function goToSection(section, anim, i) {
        if (scrolling.enabled) {
            // skip if a scroll tween is in progress
            scrolling.disable();
            gsap.to(window, {
                scrollTo: { y: section, autoKill: false },
                onComplete: scrolling.enable,
                duration: 1
            });

            if (anim) {
                anim && anim.restart();
            }
        }
    }

    sections.forEach((section, i) => {
        // const intoAnim = gsap.from(section.querySelector('.right-col'), { yPercent: 50, duration: 1, paused: true });

        ScrollTrigger.create({
            trigger: section,
            start: 'top bottom-=1',
            end: 'bottom top+=1',
            onEnter: () => goToSection(section),
            onEnterBack: () => goToSection(section)
        });
    });

    const scrollByHash = hash => {
        const elementToScroll = document.querySelector(hash);
        if (elementToScroll && elementToScroll.matches('.section') && !elementToScroll.matches('.js-modal')) {
            if (window.menuOpen && typeof window.closeMenu === 'function') {
                window.closeMenu();
            } else if (window.activeModal && typeof window.closeModal === 'function') {
                window.closeModal(window.activeModal);
            }

            goToSection(elementToScroll);
        } else {
            console.error('No element to scroll');
        }
    };
    document.addEventListener('click', event => {
        if (event.target.matches('a') || event.target.closest('a')) {
            const link = event.target.matches('a') ? event.target : event.target.closest('a');
            const hash = link.hash;

            // console.log('Hash', hash);

            const url = new URL(link.href);
            const pageUrl = new URL(window.location);

            if (pageUrl.pathname !== url.pathname) return;

            if (hash) {
                event.preventDefault();
                scrollByHash(hash);
            }
        }
    });

    if (window.location.hash) {
        console.log('Scrolling by hash', window.location.hash);
        scrollByHash(window.location.hash);
    }
}
