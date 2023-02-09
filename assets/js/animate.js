// Является ли устройство сенсорным
let isMobile = {
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

// Анимация
const OFFSET_Y = window.innerWidth > 768 ? 200 : 100

// Главный экран
const tlMain = gsap.timeline({
	defaults: {
		duration: 1,
	},
	scrollTrigger: {
		trigger: ".main-inner",
		start: "top top",
		pin: true,
		scrub: 1,
	}
})

tlMain.to(".header", {
	yPercent: -100,
	opacity: 0,
})
tlMain.to(".main__title", {
	y: -OFFSET_Y,
	scale: .9,
	opacity: 0,
})
tlMain.to(".main__text", {
	y: -OFFSET_Y,
	scale: .9,
	opacity: 0,
}, '>-0.5')
tlMain.to(".scroll-down.is-main",
	window.innerWidth <= 900 ?
	{
		y: -100,
		opacity: 0,
	} :
	{}
)


tlMain.to(".main__img", {
	y: () => {
		const mainImgRect = document.querySelector('.main__img').getBoundingClientRect()
		const mainImgHeight = mainImgRect.height

		return ((mainImgRect.top - window.innerHeight / 2) + mainImgHeight / 2) * -1
	},
	duration: 3,
	scale: 1.05
}, ">-0.5")

tlMain.to(".main__img", {
	x: -document.querySelector('.main__img').getBoundingClientRect().left - 50,
	xPercent: -100,
	duration: 3
})

// Расстояние скролла и соц. сетей от нижней части экрана на главном экране

// window.addEventListener('scroll', e => {
// 	const mainToolsRect = document.querySelector('.main__tools').getBoundingClientRect()
// 	const mainScreen = document.querySelector('.main').getBoundingClientRect()

// 	// console.log(window.innerHeight - mainToolsRect.bottom)

// 	// console.log(mainScreen.top + mainScreen.height - mainToolsRect.top - mainToolsRect.height)
// })

// Анимированное открытие меню
const menu = document.querySelector('.menu')
const burger = document.querySelector('.burger')
const menuCloseBtn = document.querySelector('.menu__close')

const tlMenu = gsap.timeline({
	defaults: {
		duration: .3,
		ease: 'none',
	}
})

gsap.set('.menu__item a', {
	yPercent: 100
})
gsap.set('.menu__socials', {
	opacity: 0,
})

burger.addEventListener('click', e => {
	menu.classList.add('is-show')
	bodyLock()

	tlMenu
		.to('.menu__item a', {
			stagger: {
				each: .05,
			},
			yPercent: 0,
		})
		.to('.menu__socials', {
			opacity: 1,
		})
})

menuCloseBtn.addEventListener('click', e => {
	tlMenu
		.to('.menu__item a', {
			stagger: {
				each: .05,
			},
			yPercent: 100,
		})
		.to('.menu__socials', {
			opacity: 0,
		})
		.then(e => {
			menu.classList.remove('is-show')
			bodyUnlock()
		})
})

// Экран "Академия чиптюнинга"
const tlAcademy = gsap.timeline({
	defaults: {
		duration: 0.6,
	},
	scrollTrigger: {
		trigger: '.academy',
		start: 'top center',
		toggleActions: "play pause resume reverse",
	}
})

tlAcademy
	.from(".academy__title", {
		y: OFFSET_Y,
	})
	.addLabel('academyImg')
	.from(".academy__text", {
		y: OFFSET_Y,
		opacity: 0,
	}, '>-0.5')
	.from(".academy__btn", {
		y: OFFSET_Y,
		opacity: 0,
	}, '>-0.5')
	.from(".academy__img", {
		opacity: 0,
		duration: 1,
	}, 'academyImg-=.6')


// Раздел "Advant"
const tlAdvant = gsap.timeline({
	defaults: {
		duration: .7,
	},
	scrollTrigger: {
		trigger: '.advant',
		start: 'top top',
		toggleActions: "play pause resume none",
	}
})

tlAdvant
	.from(".advant__title", {
		y: 200,
		opacity: 0,
	})
	.from(".advant__text", {
		y: 200,
		opacity: 0,
	}, "<0.25")
	.from(".advant__button", {
		y: 200,
		opacity: 0,
	}, "<0.25")
	.from(".advant-block__num", {
		stagger: {
			each: .3,
		},
		y: 50,
		opacity: 0,
	}, '<-.3')
	.from(".advant-block__text", {
		stagger: {
			each: .3,
		},
		y: 50,
		opacity: 0,
	}, '<-.3')
	.from(".advant-block__num span", {
		textContent: 0,
		duration: 1.5,
		ease: "power1.in",
		snap: {
			textContent: 1
		},
		stagger: {
			onUpdate: function() {
				this.targets()[0].innerHTML = Math.ceil(this.targets()[0].textContent);
			},
		}
	}, '>-.2')


// Раздел "learn"
const tlLearn = gsap.timeline({
	scrollTrigger: {
		trigger: '.learn',
		start: "top 20%",
		toggleActions: "play pause resume reverse",
	}
})

tlLearn
	.from('.gsap-learn .learn__title', {
		y: OFFSET_Y,
		opacity: 0,
	})
	.from('.gsap-learn .learn__text', {
		y: OFFSET_Y,
		opacity: 0,
	}, '<.2')
	.from('.gsap-learn .c-learn', {
		y: OFFSET_Y,
		opacity: 0,
		stagger: {
			each: .3,
		}
	}, '<')


// Раздел "applic"
const tlApplic = gsap.timeline({
	scrollTrigger: {
		trigger: ".applic",
		start: "top 20%",
		toggleActions: "play pause resume none",
	}
})

tlApplic
	.from('.applic__title', {
		y: OFFSET_Y,
		opacity: 0,
	})
	.from('.applic__text', {
		y: OFFSET_Y,
		opacity: 0,
	}, '<.2')
	.from('.applic__tf', {
		x: -100,
		opacity: 0,
	}, '<.2')
	.from('.applic__send', {
		x: 100,
		opacity: 0,
	}, '<')


// Изображение авто в разделе "applic"
const tlCarApplic = gsap.timeline({
	scrollTrigger: {
		trigger: ".applic",
		start: "top 20%",
		end: "bottom 20%",
		scrub: 1,
	}
})

const applicCar = document.querySelector('.applic__img')
const applicCarRect = applicCar.getBoundingClientRect()

tlCarApplic
	.fromTo(applicCar,
		{
			x: applicCarRect.right,
			xPercent: 100
		},
		{
			x: -applicCarRect.left,
			xPercent: -100
		}
	)


// Раздел "reviews"
const tlReviews = gsap.timeline({
	scrollTrigger: {
		trigger: ".reviews",
		start: "top 20%",
		toggleActions: "play pause resume none",
	}
})

tlReviews
	.from('.reviews__title', {
		y: OFFSET_Y,
		opacity: 0,
	})
	.from('.reviews__text', {
		y: OFFSET_Y,
		opacity: 0,
	}, '>-.2')
	.from('.c-reviews', {
		stagger: {
			each: .3,
		},
		y: OFFSET_Y,
		opacity: 0,
	}, '>-.2')
	.from('.reviews__arrow', {
		opacity: 0,
	}, '>-.2')
	.from('.reviews__pagin', {
		opacity: 0
	}, '<')


// Раздел "artic"
const tlArtic = gsap.timeline({
	scrollTrigger: {
		trigger: ".artic",
		start: "top 20%",
		toggleActions: "play pause resume none",
	}
})

tlArtic
	.from('.artic__title', {
		y: OFFSET_Y,
		opacity: 0,
	})
	.from('.c-artic', {
		stagger: {
			each: .15,
		},
		opacity: 0,
	}, '>-.2')


// Раздел "artic"
const tlAbout = gsap.timeline({
	scrollTrigger: {
		trigger: ".about",
		start: "top 20%",
		toggleActions: "play pause resume none",
	}
})

tlAbout
	.from('.about__title', {
		y: OFFSET_Y,
		opacity: 0,
	})
	.from('.about__title-line', {
		width: 0,
		duration: .5,
	}, '<')
	.from('.about__text', {
		y: OFFSET_Y,
		opacity: 0,
	}, '>-.5')
	.from('.c-about', {
		opacity: 0,
	}, '>-.2')
	.from(".c-about__num span", {
		textContent: 0,
		duration: 1.5,
		ease: "power1.in",
		snap: {
			textContent: 1
		},
		stagger: {
			onUpdate: function() {
				this.targets()[0].innerHTML = Math.ceil(this.targets()[0].textContent);
			},
		}
	}, '>-.1')

// Анимация фона зависимого от курсора
if (isMobile.any()) {
	const OFFSET_COVER = 100

	window.addEventListener('mousemove', e => {
		const xPerc = Math.round(e.clientX / window.innerWidth * 100) / 100
		const yPerc = Math.round(e.clientY / window.innerHeight * 100) / 100

		gsap.to('.about', {
			duration: .5,
			"--cover-offset-x": xPerc * OFFSET_COVER,
			"--cover-offset-y": yPerc * OFFSET_COVER,
		})
	})
}


// Раздел "certif"
const tlCertif = gsap.timeline({
	scrollTrigger: {
		trigger: '.certif',
		start: "top 20%",
		toggleActions: "play pause resume none",
	}
})

tlCertif
	.from('.certif__title', {
		y: OFFSET_Y,
		opacity: 0,
	})
	.from('.certif__text', {
		y: OFFSET_Y,
		opacity: 0,
	}, '<.2')
	.from('.c-certif', {
		y: OFFSET_Y,
		opacity: 0,
		stagger: {
			each: .3,
		}
	}, '<')


// Раздел "get"
const tlGet = gsap.timeline({
	scrollTrigger: {
		trigger: '.get',
		start: `top ${window.innerWidth > 500 ? '20%' : 'center'}`,
		toggleActions: "play pause resume none",
	}
})

tlGet
	.from('.get__title', {
		y: OFFSET_Y,
		opacity: 0,
	})
	.from('.get__text', {
		y: OFFSET_Y,
		opacity: 0,
	}, '<.2')

const tlCarGet = gsap.timeline({
	scrollTrigger: {
		trigger: '.get',
		start: "top bottom",
		end: "bottom top",
		scrub: 1,
	}
})

tlCarGet.fromTo('.get',
	{
		"--cover-pos-y": 0,
	},
	{
		"--cover-pos-y": "50%",
	}
)