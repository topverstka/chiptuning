// // ===== Вспомогательные функции =====

// Является ли устройство сенсорным
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i)
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i)
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i)
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i)
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i)
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
	}
}

// Удаляет у всех элементов items класс itemClass
function removeAllClasses(items, itemClass) {
	if (typeof items == "string") {
		items = document.querySelectorAll(items)
	}

	for (let i = 0; i < items.length; i++) {
		if (typeof (itemClass) === 'object') {
			items[i].classList.remove(...itemClass)
		}
		else {
			items[i].classList.remove(itemClass)
		}
	}
}

let bodyLockStatus = true

// Разблокировать скролл
function bodyUnlock(delay = 100) {
	let body = document.querySelector("body")

	if (bodyLockStatus) {
		let lockPadding = document.querySelectorAll("[data-lp]")

		setTimeout(() => {

			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index]

				el.style.paddingRight = '0px'
			}

			body.style.paddingRight = '0px'
			document.documentElement.classList.remove("is-lock")
		}, delay)

		bodyLockStatus = false

		setTimeout(function () {
			bodyLockStatus = true
		}, delay)
	}
}

// Заблокировать скролл
function bodyLock(delay = 100) {
	let body = document.querySelector("body")

	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]")

		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index]

			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
		}

		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
		document.documentElement.classList.add("is-lock")

		bodyLockStatus = false

		setTimeout(function () {
			bodyLockStatus = true
		}, delay)
	}
}

// Плейсхолдер текстовых полей
function labelTextfield(container = document) {
	const tfElems = container.querySelectorAll('.tf')

	for (let i = 0; i < tfElems.length; i++) {
		const textfield = tfElems[i];
		const input = textfield.querySelector('input, textarea')

		if (input.value != '') {
			textfield.classList.add('not-empty')
		}

		input.addEventListener('focus', () => {
			textfield.classList.add('is-focus')
		})

		input.addEventListener('blur', () => {
			textfield.classList.remove('is-focus')

			if (input.value !== '') {
				textfield.classList.add('not-empty')
			}
			else {
				textfield.classList.remove('not-empty')
			}
		})
	}
}
labelTextfield()



// Show menu
const menu = document.querySelector('.menu')
const burger = document.querySelector('.burger')
const menuCloseBtn = document.querySelector('.menu__close')

burger.addEventListener('click', e => {
	menu.classList.add('is-show')
	bodyLock()
})

menuCloseBtn.addEventListener('click', e => {
	menu.classList.remove('is-show')
	bodyUnlock()
})

// Swiper
const swiper = new Swiper(".reviews__slider", {
    slidesPerView: 3,
    spaceBetween: 30,
	watchSlidesProgress: true,

    breakpoints: {
        1200: {

        },
        600: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
        400: {
			slidesPerView: 2,
			spaceBetween: 20,
        },
		0: {
			slidesPerView: 1.2,
			spaceBetween: 20,
		}
    },


    navigation: {
        nextEl: ".reviews__arrow.is-next",
        prevEl: ".reviews__arrow.is-prev",
    },

	pagination: {
		el: '.reviews__pagin',
	}
});

// // Lines in academy section
// const academySection = document.querySelector('.academy')
// const academyLinesContainer = document.createElement('div')

// academyLinesContainer.classList.add('.academy__lines')
