(function () {
    const header = document.querySelector('.header');
    window.onscroll = () => {
        if (window.pageYOffset > 50) {
            header.classList.add('header_active');
        } else {
            header.classList.remove('header_active');
        }
    }
}());

// Burger menu handler
(function () {
    const burger = document.querySelector('.burger');
    const burgerOpen = document.querySelector('.burger__icon');
    const burgerClose = document.querySelector('.burger__close');
    const burgerLinks = document.querySelectorAll('.burger__item');

    burgerOpen.addEventListener('click', () => {
        burger.classList.remove('hidden');
    })
    burgerClose.addEventListener('click', () => {
        burger.classList.add('hidden');
    });

    // if (window.innerWidth < 768) {
    for (let i = 0; i < burgerLinks.length; i += 1) {
        burgerLinks[i].addEventListener('click', () => {
            burger.classList.add('hidden');
        });
    };
}());

// active menu on scroll
window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;

	if (window.innerWidth > 768) {
		document.querySelectorAll('.block__scroll').forEach((el, i) => {
			if (el.offsetTop - document.querySelector('.header').clientHeight <= scrollDistance) {
				document.querySelectorAll('.header__list .header__item').forEach((el) => {
					if (el.classList.contains('active')) {
						el.classList.remove('active');
					}
				});

				document.querySelectorAll('.header__list .header__item')[i].classList.add('active');
			}
		});
	}
});

// smooth scroll to anchors
(function () {
    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());

// change tabs
let tab = function(tabNavigation, tabContent) {
    let tabNav = document.querySelectorAll(tabNavigation);
    let tabDetails = document.querySelectorAll(tabContent);
    let tabName;

    tabNav.forEach(item => {
        item.addEventListener('click', selectTabNav);
    });

    function selectTabNav() {
        tabNav.forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
        tabName = this.getAttribute('data-block');
        selectTabContent(tabName);
    };

    function selectTabContent(tabName) {
        tabDetails.forEach(item => {
            item.classList.contains(tabName) ? item.classList.add('active') : item.classList.remove('active');
        });
    };
};

// change philosophy__tabs
tab('.philosophy__tabs .block__item', '.philosophy__details');

// change facilities__tabs
tab('.facilities__tabs .block__item', '.facilities__details');

// change costs__tabs
tab('.costs__tabs .block__item', '.costs__cards');

// change invitation__tabs
tab('.invitation__tabs .block__item', '.invitation__form');

// open popup__facilities
const popups = document.querySelectorAll('.popup');
const images = document.querySelectorAll('.facilities__image');
const zoom = document.querySelectorAll('.facilities__zoom');
const close = document.querySelectorAll('.popup__close');

function openFacilitiesImage(array, index) {
    array.addEventListener('click', () => {
        popups[index].classList.remove('hidden');
        close[index].addEventListener('click', () => {
            popups[index].classList.add('hidden');
        })
    })
}

for (let i = 0; i < images.length; i += 1) {
    openFacilitiesImage(images[i], i);
    openFacilitiesImage(zoom[i], i);
}

// open popup__request
const buttonLegal = document.querySelectorAll('.button__legal');
const buttonPrivate = document.querySelectorAll('.button__private');
const popupLegal = document.querySelector('.popup__legal');
const popupPrivate = document.querySelector('.popup__private');
const popupExit = document.querySelectorAll('.popup__request');

function popupShow(button, popup) {
    button.forEach(item => {
        item.addEventListener('click', function() {
            popup.classList.remove('hidden');
            popupExit.forEach(exit => {
                exit.addEventListener('click', function() {
                    popup.classList.add('hidden');
                })
            })
        });
    });
};

popupShow(buttonLegal, popupLegal);
popupShow(buttonPrivate, popupPrivate);

// show usability__block buttons on hover

(function() {
    const cards = document.querySelectorAll('.usability__item');

    cards.forEach(item => {
        if (!item.classList.contains('active')) {
            cards[2].classList.add('active');
        }
        item.addEventListener('mouseover', () => {
            if (cards[2].classList.contains('active')) {
                cards[2].classList.remove('active');
            }
            item.classList.add('active');
        })
        item.addEventListener('mouseout', () => {
            item.classList.remove('active');
            cards[2].classList.add('active');
        })
    })
}());