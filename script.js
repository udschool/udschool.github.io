Ecwid.OnPageLoaded.add(function(page) {
	if (page.type == "ACCOUNT_SETTINGS") {
		Ecwid.OnSetProfile.add(function(customer) {
			$.get(`https://app.ecwid.com/api/v3/35020171/orders?customer=${customer.email}&token=secret_dYSNe7rT6hY73H8HhAZeJNQMdmXxifLz`, function(data) {
				printProductsInCart(data, renderProducts.bind(this));
			});
		});
		removeHeaderBanner();
		removeIp();
		hidePreloader('.grid__products');
  	} else if (page.type == "SIGN_IN") {
  		removeHeaderBanner();
		removeIp();
		hidePreloader('.ec-signin');
  	} else if (page.type == "CATEGORY") {
  		window.ec = window.ec || Object();
		window.ec.config = window.ec.config || Object();
		window.ec.config.navigation_scrolling = "DISABLED";
  		Ecwid.openPage('search');
  	} else if (page.type == "SEARCH") {
  		$('.in_cart').hide();
  		$('.in_buy').hide();
  		printHeaderBanner();
  		a = document.querySelectorAll('.grid-product')
		a.forEach(function(element){
			let inCart = document.createElement('div');
			inCart.classList.add('in_cart')
			inCart.innerHTML = "В корзине";
			element.querySelector('.grid-product__wrap-inner').append(inCart);

			let inBuy = document.createElement('div');
			inBuy.classList.add('in_buy');
			inBuy.innerHTML = "скачать";
			element.querySelector('.grid-product__wrap-inner').append(inBuy);

			let addHeight = document.createElement('div');
			addHeight.classList.add('add_height');
			element.querySelector('.grid-product__wrap-inner').append(addHeight);
		});

		Ecwid.OnSetProfile.add(function(customer) {
			customerProducts(customer, inBuyProductStatus.bind(this))
		});

		Ecwid.Cart.get(function(cart) {
		  cartProducts(cart, inCartProductStatus.bind(this))
		});

  		printIp();

		hidePreloader('.grid__products');
  	} else if (page.type == "PRODUCT") {
  		addVersionToProductDetail ();
  		Ecwid.OnSetProfile.add(function(customer) {
			$.get(`https://app.ecwid.com/api/v3/35020171/orders?customer=${customer.email}&token=secret_dYSNe7rT6hY73H8HhAZeJNQMdmXxifLz`, function(data) {
				downloadInsteadOfBuy(data);
			});
		});
		removeHeaderBanner();
  		removeIp();
		hidePreloader('.product-details');
  	} else if (page.type == "CART") {
  		removeIp();
  		hidePreloader('.ec-cart');
  	}
});

function customerProducts(customer, callback) {
	var bought_product = [];
    $.get(`https://app.ecwid.com/api/v3/35020171/orders?customer=${customer.email}&token=secret_dYSNe7rT6hY73H8HhAZeJNQMdmXxifLz`, function(data) {
        data.items.forEach(function (orders) {
            orders.items.forEach(function(item) {
                bought_product.push(item.productId)
                console.log(item)
            })
        })
    });
    callback(bought_product);
}

function cartProducts(cart, callback) {
	var cart_product = []
	cart.items.forEach(function(item) {
		cart_product.push(item.product.id);
	});
	callback(cart_product);
}


function inCartProductStatus(products) {
	allProducts = document.querySelector('.grid-product')
	products.forEach(function(product) {
		if (document.querySelector(`.grid-product--id-${product}`)) {
			document.querySelector(`.grid-product--id-${product}`).querySelector('.in_cart').style.display = "block";
		}
	})
}

function inBuyProductStatus(products) {
	console.log(products)
	allProducts = document.querySelector('.grid-product')
	products.forEach(function(product) {
		if (document.querySelector(`.grid-product--id-${product}`)) {
			document.querySelector(`.grid-product--id-${product}`).querySelector('.in_buy').style.display = "block";
		}
	})
}


function inCartProductsStorefront(products) {
    products.forEach(function(product) {
    	let element  = `.grid-product--id-${product.product.id}`;
    	let p = document.createElement('p');
    	p.classList.add('inCartStorefront')
		p.innerHTML = "В корзине";
		document.querySelector(element).querySelector(".grid-product__button").replaceWith(p)
    });
}

function showPreloader() {
	document.querySelector('#banner__search').style.display = "block";
}

function hidePreloader(element) {
	if (document.querySelector(element)) {
		// window.scrollTo(0,0);
		// document.querySelector('#banner__search').style.display="none";
		document.querySelector('#banner__search').style.display = "none";
	} else {
		setTimeout(function(){
			// window.scrollTo(0,0);
			// document.querySelector('#banner__search').style.display="none";
			document.querySelector('#banner__search').style.display = "none";
		}, 4000);
	}
}

function addVersionToProductDetail () {
	let li = document.createElement('li');
	li.innerHTML = "модель для версии SketchUp'18 и выше";
	document.querySelector('.product-details__product-description div ul').append(li);
}

function printHeaderBanner() {
	if (!document.querySelector('.banner-wrapper') || !document.querySelector('.banner__mobile')) {
		if (screen.width > 981) {
			// document.querySelector('#banner1').style.display="block";
			$('#banner__head').html(`<div class="banner-wrapper" id="banner1"><video autoplay muted loop id="myVideo"> <source src="https://fs.getcourse.ru/fileservice/file/download/a/27025/sc/235/h/2cb6f7fd72890ab31af7a2ec300149d8.mp4" type="video/mp4"> Your browser does not support HTML5 video.</video><div class="banner"> <div class="banner__logo"> <img src="https://static.tildacdn.com/tild6235-3762-4261-b532-653439373339/logo_banner.png" alt="logo"> </div><div class="banner__desc"> Качественные модели<br>для SketchUp </div></div></div>`);
		} else {
			// document.querySelector('.banner__mobile').style.display="block";
			$('#banner__head').html(`<div class="banner__mobile uk-background-cover uk-height-medium uk-panel uk-flex uk-flex-center uk-flex-middle" style="background-image: url(https://static.tildacdn.com/tild6561-3035-4266-a139-666438313665/Enscape_2020-09-09-1.jpg);"> <div class="banner__logo-wrapper"> <img src="https://static.tildacdn.com/tild6235-3762-4261-b532-653439373339/logo_banner.png" alt="logo" class="banner__logo"> <p class="banner__desc">Качественные модели <br>для SketchUp</p></div></div>`);
		}
	}
}

function removeHeaderBanner() {
	if (document.getElementById('banner1')) {
		document.getElementById('banner__head').removeChild(document.getElementById('banner1'));
	}
}

function printIp() {
	$('#Ip').html('Индивидуальный предприниматель Афонская Полина Викторовна <br>ОГРНИП 318784700077123<br>ИНН: 246212605306<br>Расчетный счет: 40802810732250001716<br>Название Банка: ФИЛИАЛ "САНКТ-ПЕТЕРБУРГСКИЙ" АО "АЛЬФА-БАНК"<br>Кор.счет: 30101810600000000786<br>БИК: 044030786<br>');
}

function removeIp() {
	if (document.getElementById('parentRemove')) {
		document.getElementById('parentRemove').removeChild(document.getElementById('childRemove'));
	}
}

function printProductsInCart (orders, callback) {
	if(orders.items.length !== 0) {
		var productsLayout = [`<div class="grid__products grid__products--classic grid__products--appearance-frame grid__products--layout-center grid__products--small-items grid__products--aspect-ratio-1" data-items="15" data-cols="5" style="max-width: 10000px;">`];
	} else {
		var productsLayout = 0;
	}
	orders.items.forEach(function(entry) {
		entry.items.forEach(function(entry) {
			productsLayout.push(`<div class="grid-product__wrap-inner" style="width: 200px; margin: 10px" onclick="openProductDetail(${entry.productId})"> <div class="grid-product__spacer"> <div class="grid-product__spacer-inner"></div></div><div class="grid-product__bg" style="background-color: rgb(255, 255, 255);"></div><div class="grid-product__image-wrap" style="margin-bottom: 36%;"><img src="${entry.imageUrl}" title="${entry.name}" class="grid-product__picture" srcset="${entry.imageUrl} 1x, ${entry.imageUrl} 2x" style="width: 100%;height: 100%;"></div><div class="grid-product__shadow ec-text-muted"> <div class="grid-product__shadow-inner" style="z-index: 1;text-align: center;">${entry.name}</div></div><div class="grid__clearfix"></div><div class="grid-product__hover-wrap"></div><div class="grid-product__title-inner" style="z-index:1; text-align: center;">${entry.name}</div><a href="${entry.files[0].customerUrl}" style="text-decoration: inherit;color:inherit"> <div class="grid-product__button grid-product__buy-now" style="text-align: center;"> <div class="form-control form-control--button form-control--small form-control--secondary form-control--animated form-control--done"> <button class="form-control__button form-control__button--icon-center" type="button"> <span class="form-control__button-text">Скачать</span> <span class="form-control__button-svg"> <span class="svg-icon"> <svg width="27" height="23" viewBox="0 0 27 23" xmlns="http://www.w3.org/2000/svg"> <path class="svg-line-check" d="M1.97 11.94L10.03 20 25.217 2" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path> </svg> </span> </span> </button> </div></div></a></div>`);
		});
	});
	if(orders.items.length !== 0) {
		productsLayout.push(`</div>`);
	}
	callback(productsLayout);
}

function renderProducts(layout) {
	if (layout.length > 0) {
			$('.ec-confirmation__steps').html(layout.join(""));
	}
}

function hiddenProductsFromStorefront(orders) {
	orders.items.forEach(function (entry){
		entry.items.forEach(function(entry){
			let element = `.grid-product--id-${entry.productId}`;
			// $(element).html(`<div class="grid-product__wrap"> <div class="grid-product__scroller--id-${entry.productId} grid-product__scroller"></div><div class="grid-product__wrap-inner"> <a class="grid-product__image" title="${entry.name}" href="${entry.files[0].customerUrl}"> <div class="grid-product__spacer"> <div class="grid-product__spacer-inner"></div></div><div class="grid-product__bg" style="background-color: rgb(255, 255, 255);"></div><div class="grid-product__image-wrap" style="order: 1;"><img src="${entry.smallThumbnailUrl}" title="${entry.name}" alt="${entry.name}" class="grid-product__picture" srcset="${entry.smallThumbnailUrl} 1x, ${entry.smallThumbnailUrl} 2x" style="width: 100%; height: 100%;"></div><div class="grid-product__shadow ec-text-muted"> <div class="grid-product__shadow-inner">${entry.name}</div></div><div class="grid__clearfix"></div><div class="grid-product__hover-wrap"></div></a> <a class="grid-product__title" href="${entry.files[0].customerUrl}" style="order: 2;"> <div class="grid-product__title-inner">${entry.name}</div></a> <div class="grid-product__price" style="order: 3;"> <div class="grid-product__price-amount"> <div class="grid-product__price-value ec-price-item">Приобретено</div></div></div><div class="grid-product__button grid-product__buy-now"> <div class="form-control form-control--button form-control--small form-control--secondary form-control--animated form-control--done"> <button class="form-control__button form-control__button--icon-center" type="button"> <span class="form-control__button-text">Скачать</span> <span class="form-control__button-svg"> <span class="svg-icon"> <svg width="27" height="23" viewBox="0 0 27 23" xmlns="http://www.w3.org/2000/svg"> <path class="svg-line-check" d="M1.97 11.94L10.03 20 25.217 2" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path> </svg> </span> </span> </button> </div></div></div></div>`);
			$(element).children('.grid-product__wrap').children('.grid-product__wrap-inner').children('.grid-product__button').html(`<a href="${entry.files[0].customerUrl}"> <div class="download__wrapper"> <div class="download__btn" onclick="openProductDetail(${entry.productId})"> <span class="download__text">Скачать</span> </div> </div></a>`);
			// document.getElementsByClassName(element)[0].style.display = 'none';
		});
	});
}

function downloadInsteadOfBuy(orders) {
	orders.items.forEach(function (entry){
		entry.items.forEach(function(entry){
			let element = `.ecwid-productBrowser-ProductPage-${entry.productId}`;
			if ($(element).length !== 0) {
				$('.details-product-purchase').html(`<div class="form-control form-control--flexible form-control--animated form-control__button--icon-center form-control--done"> <a href="${entry.files[0].customerUrl}"> <button class="form-control__button" type="button" style="background-color: #333; color: #fff;"> <span class="form-control__button-text">Скачать</span> <span class="form-control__button-svg"> <span class="svg-icon"> <svg width="27" height="23" viewBox="0 0 27 23" xmlns="http://www.w3.org/2000/svg"> <path class="svg-line-check" d="M1.97 11.94L10.03 20 25.217 2" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path> </svg> </span> </span> </button> </a></div>`);
			}
		});
	});
}

function openProductDetail(productId) {
	Ecwid.openPage('product', {'id': productId});
}

function printFilterMenu() {
	'use strict';

	const e = React.createElement;

	class LikeButton extends React.Component {
		constructor(props) {
			super(props);
			this.state = { liked: false };
		}

		render() {
			const state = {
				attrs: [
					{name: 'Визуализация', means:['С визуализацией']},
					{name: 'Мебель', means:['стол журнальный', 'диван / софа', 'кровать', 'кресло', 'пуф', 'комоды и тумбы', 'прикроватная тумбочка', 'стеллаж', 'стол обеденный', 'стул']},
					{name: 'Сантехника. Мебель для сан.узла', means:['ванна', 'смеситель']},
					{name: 'Освещение. Электрика', means:['бра', 'люстра', 'точечный светильник / прожектор']},
					{name: 'Элементы интерьера', means:['радиаторы', 'двери', 'окна']},
					{name: 'Декор для кухни', means:['декоративные сеты для кухни', 'сервировка']},
					{name: 'Декор для ванной', means:['аксессуары']},
					{name: 'Декор универсальный', means:['постельное белье', 'ковры', 'другой декор универсальный', 'книги', 'скульптуры', 'часы', 'шторы']},
					{name: 'Растения', means:['букеты в вазах']},
					{name: 'Модели для животных', means:['модели для животных']},
				]
			};

			return /*#__PURE__*/React.createElement("div", {
				className: "filter-wrapper",
				id: "Hello"
			}, /*#__PURE__*/React.createElement("ul", {
				"uk-accordion": "multiple: true"
			}, state.attrs.map((attr, index) => {
				return /*#__PURE__*/React.createElement("li", {
					key: index
				}, /*#__PURE__*/React.createElement("a", {
					className: "uk-accordion-title",
					href: "#"
				}, attr.name), /*#__PURE__*/React.createElement("div", {
					className: "uk-accordion-content"
				}, attr.means.map((mean, key) => {
					return /*#__PURE__*/React.createElement("p", {
						key: key
					}, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
						className: "uk-checkbox",
						type: "checkbox"
					}), " ", mean));
				})));
			})));
		}
	}

	const domContainer = document.querySelector('.ec-filters__wrap-inner');
	ReactDOM.render(e(LikeButton), domContainer);
}