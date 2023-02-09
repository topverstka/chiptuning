// // ===== Вспомогательные функции =====

// Проверка поддержки webp, добавление класса webp или no-webp для HTML
isWebp()
function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
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
		clickable: true,
	}
});

// Скролл при клике по кнопке "Scroll down"
const scrollDownBtn = document.querySelector('.scroll-down.is-main')

scrollDownBtn.addEventListener('click', () => {
	const academySection = document.querySelector('.academy')

	window.scrollTo(0, academySection.getBoundingClientRect().top)
})

// Маска для номера телефона
const inputPhone = document.querySelector('[data-input-phone]')
Inputmask({mask: "+7 (999) 999-9999", showMaskOnHover: false}).mask(inputPhone)

/**
 * Модальное окно
 *
 * INFO: Атрибуты (все атрибуты находятся в св-ве attrs)
 * data-modal-id="<id-modal>" - (modalId) каждая модалка имеет этот атрибут, в котором мы указываем ее id
 * data-close-on-bg - (modalCloseOnBg) модалка, которая должна закрываться при клике по ее фону, должна иметь этот атрибут
 * data-modal-open="<id-modal>" - (btnModalOpen) имеет элемент, при нажатии на который открывается модалка
 * data-modal-close="<id-modal || Null>" - (btnModalClose) имеет элемент, при нажатии на который, модальное окно закрывается. Если елемент находится внутри модалки, которую он должен закрыть, в значении атрибута указывать id модалки необязательно (можно оставить его пустым). Значение стоит указывать, если элемент, который должен закрыть модалку, находится вне контейнера с атрибутом data-modal-id
 *
 * INFO: Свойства
 * attrs - (Object) названия атрибутов
 * classNames - (Object) названия классов
 * modalList - (NodeList) список всех модальных окон (для обновления списка использовать updateModalList())
 * openingBtnList - (NodeList) список открывающих кнопок
 * modalIsShow - (Boolean) модальное окно показано
 * modalShow - (Element) показанное модальное окно
 * modalShowId - (String) id показанного модального окна
 * keyEsc - (Boolean) закрывать модалки при нажатии клавиши Esc. По умолчанию - true
 * useHash - (Boolean) использовать хеш. Если в url указан хеш равный id модалки, модалка откроется. По умолчанию - true
 * historyHash - (Boolean) сохранять хеш в истории браузера. Если useHash === false, то historyHash будет равен false. По умолчанию - false
 * hash - (String) значение хеша
 *
 * INFO: Функции
 * open(<String || Element>) - метод, открывающий модалку
 * close(<String || Element || Null>) - метод, закрывающий модалку. Если скобки оставить пустыми, закроется открытая модалка
 * update() - метод, обновляющий список модалок (this.modalList) и список кнопок (this.openingBtnList)
 * updateModalList() - метод, обновляющий список модалок (this.modalList)
 * updateOpeningBtnList() - метод, обновляющий список кнопок (this.openingBtnList)
 *
 *
 * TODO: Что еще можно сделать
 * (Атрибуты data-modal-hash и data-modal-hash-history. В случае если this.useHash === false)
 * data-modal-hash - указывается у модалки, которая должна открываться по хешу
 * data-modal-hash-history - указывается у модалки, которая должна быть сохранена в истории ( использовать вместе с первым атрибутом )
 * Прописать возомжные ошибки
 * Анимацию появления с помощью js
 * Если указан id модалки при загрузке страницы, то модалка должна открываться без плавной анимации
 * События
 * Если при this.useHash = true, до открытия модалки в url был указан хеш не принадлежащий ни к одной модалке, то при закрытии модалки в url должен указываться тот самый хеш
 * Возможность открытия нескольких модалок
 * Закрытие/открытие модалок по таймеру
 */
class Modals {
	attrs = {
		modalId: 'data-modal-id',
		modalCloseOnBg: 'data-close-on-bg',
		btnModalOpen: 'data-modal-open',
		btnModalClose: 'data-modal-close',
	}
	classNames = {
		modalShow: 'is-show',
		modalBg: 'modal__bg',
	}
	modalList = document.querySelectorAll(`[${this.attrs.modalId}]`)
	openingBtnList = document.querySelectorAll(`[${this.attrs.btnModalOpen}]`)
	openBtn = null
	modalIsShow = false
	modalShow = null
	modalShowId = null
	keyEsc = true
	useHash = true
	historyHash = !this.useHash ? false : false
	hash = null

	constructor(options) {
		this._init()
	}

	// Открыть модальное окно
	open(modal) {
		if (typeof modal === 'string') {
			modal = document.querySelector(`[${this.attrs.modalId}=${modal}]`)
		}

		this.modalIsShow = true
		this.modalShow = modal
		this.modalShowId = modal.dataset.modalId

		this._modalBgClose()
		modal.classList.add(this.classNames.modalShow)
		bodyLock()

		// Событие открытия модалки
		const _eModalOpenStart = new Event('modal-open')
		_eModalOpenStart.data = { ...this }

		modal.dispatchEvent(_eModalOpenStart)
	}

	// Закрыть модальное окно
	close(modal) {
		if (typeof modal === 'undefined') {
			if (this.modalShow != null) {
				modal = this.modalShow
			}
			else {
				console.error('[Modals]: Все модальные окна закрыты')
				return
			}
		}
		if (typeof modal === 'string') {
			modal = document.querySelector(`[${this.attrs.modalId}=${modal}]`)
		}
		if (this.modalShow.dataset.closeOnBg != undefined) {
			this._modalBg.removeEventListener('click', this._bgEvent)
		}

		// Событие закрытия модалки
		const _eModalOpenClose = new Event('modal-close')
		_eModalOpenClose.data = { ...this }

		modal.dispatchEvent(_eModalOpenClose)

		this.modalIsShow = false
		this.modalShow = null
		this.modalShowId = null

		modal.classList.remove(this.classNames.modalShow)
		bodyUnlock()
	}

	// Получить модальное окно
	get(modalName) {
		if (typeof modalName === 'string') {
			return Array.from(this.modalList).find(e => e.getAttribute(`${this.attrs.modalId}`) === modalName) || null
		}
		else if (typeof modalName === 'object') {
			return modalName.map(modalName => this.modalList.find(e => e.getAttribute(`${this.attrs.modalId}`) === modalName) || null)
		}
		else {
			return this.modalList
		}
	}

	// Обновляет список модалок и кнопок
	update() {
		this.updateModalList()
		this.updateOpeningBtnList()
	}

	// Обновить список модальных окон
	updateModalList() {
		this.modalList = document.querySelectorAll(`[${this.attrs.modalId}]`)
	}

	// Обновить список кнопок, открывающих модальные окна
	updateOpeningBtnList() {
		this.openingBtnList = document.querySelectorAll(`[${this.attrs.btnModalOpen}]`)
	}

	// Инизиализация Modal
	_init() {
		if (!document.querySelector('[data-modal-id]')) {
			console.warn('[Modals]: Модальные окна не найдены!')
			return
		}
		this._btnOpen()
		this._btnClose()
		if (this.keyEsc) this._keyEscClose()
		if (this.useHash) this._watchHash()
	}

	// Открыть модалку при клике по кнопке c атрибутом this.attrs.btnModalOpen
	_btnOpen() {
		document.addEventListener('click', e => {
			if (e.target.dataset.modalOpen != undefined || e.target.closest(`[${this.attrs.btnModalOpen}]`)) {
				const btnOpenModal = e.target.dataset.modalOpen != undefined ? e.target : e.target.closest(`[${this.attrs.btnModalOpen}]`)

				this.openBtn = btnOpenModal

				this.open(btnOpenModal.dataset.modalOpen)
				if (this.useHash) this._setHash()
			}
		})
	}

	// Закрыть модалку при клике по кнопке с атрибутом this.attrs.btnModalClose
	_btnClose() {
		document.addEventListener('click', e => {
			if (e.target.dataset.modalClose != undefined || e.target.closest(`[${this.attrs.btnModalClose}]`)) {
				if (this.useHash) this._clearHash()
				this.close(document.querySelector(`[${this.attrs.modalId}=${this.modalShowId}]`))
			}
		})
	}

	// Закрытие модалки при клике по фону. Работает только у модалок, у которых ест атрибут this.attrs.modalCloseOnBg
	_modalBgClose() {
		if (this.modalShow.dataset.closeOnBg === undefined) return

		this._modalBg = this.modalShow.querySelector(`.${this.classNames.modalBg}`)
		this._bgEvent = () => {
			if (this.useHash) this._clearHash()
			this.close(this.modalShow)
		}

		this._modalBg.addEventListener('click', this._bgEvent, { once: true })
	}

	// Закрытие модалки при нажатии клавиши Esc
	_keyEscClose() {
		document.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				if (this.useHash) this._clearHash()
				this.close()
			}
		})
	}

	// Следим за хешем
	_watchHash() {
		this._checkHash()
		if (this.historyHash) {
			window.addEventListener('hashchange', e => {
				this._checkHash()
			})
		}
	}

	// Проверка хеша
	_checkHash() {
		const hash = window.location.hash.replace('#', '')
		this.hash = (hash === '') ? null : hash

		if (hash != '' && document.querySelector(`[data-modal-id=${hash}]`)) {
			this.open(hash)
		}
		if (hash === '' && this.historyHash && this.modalShow) {
			this.close()
		}
	}

	// Установка хеша, равного id модалки
	_setHash() {
		const href = location.origin + location.pathname + '#' + this.modalShowId
		history[this.historyHash ? 'pushState' : 'replaceState']({}, '', href)
	}

	// Удаление хеша
	_clearHash() {
		const href = location.href.replace(/#[\w-]+/, '');
		history[this.historyHash ? 'pushState' : 'replaceState']({}, '', href)
	}
}
const modals = new Modals()


// Lazy video youtube
lazyVideo()
function lazyVideo() {
    const videoBlockElems = document.querySelectorAll('[data-video]')

    for (let i = 0; i < videoBlockElems.length; i++) {
        const videoBlock = videoBlockElems[i];
        const thumbSrc = videoBlock.dataset.videoThumb

        if (thumbSrc != '') {
            const img = document.createElement('img')
            img.classList.add('video__thumb')
            img.src = thumbSrc

            videoBlock.append(img)
        }

        videoBlock.addEventListener('click', e => {

			const src = videoBlock.dataset.video

			if (src.match(/http(s)?:/)) {
				const iframe = document.createElement('iframe')
				iframe.src = src + '?autoplay=true'
				iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
				iframe.setAttribute('allowfullscreen', '')
				iframe.classList.add('lv-video')

				modals.get('review-video').querySelector('.modal__window').append(iframe)
			}
			else {
				const video = document.createElement('video')
				video.src = src
				video.setAttribute('autoplay', '')
				video.setAttribute('controls', '')
				video.classList.add('lv-video')

				modals.get('review-video').querySelector('.modal__window').append(video)
			}

			videoBlock.classList.add('is-playing')
			modals.open('review-video')
        })
    }
}

// Close modal with review video
const modalReviewVideo = modals.get('review-video')
const MRVBackground = modalReviewVideo.querySelector('.modal__bg')

MRVBackground.addEventListener('click', e => {
	const lvVideo = modalReviewVideo.querySelector('.lv-video')

	lvVideo.remove()
	modals.close('review-video')
})
