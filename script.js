Ecwid.OnPageLoaded.add(function(page) {
	if (page.type == "ACCOUNT_SETTINGS") {
		Ecwid.OnSetProfile.add(function(customer) {
			$.get(`https://app.ecwid.com/api/v3/35020171/orders?customer=${customer.email}&token=secret_dYSNe7rT6hY73H8HhAZeJNQMdmXxifLz`, function(data) {
				printProductsInCart(data, renderProducts.bind(this));
			});
		});
  	} else if (page.type == "SEARCH") {
  		Ecwid.OnSetProfile.add(function(customer) {
			$.get(`https://app.ecwid.com/api/v3/35020171/orders?customer=${customer.email}&token=secret_dYSNe7rT6hY73H8HhAZeJNQMdmXxifLz`, function(data) {
				hiddenProductsFromStorefront(data);
			});
		});
  		setTimeout(addTextBelowFilter(), 4000);
  	} else if (page.type == "PRODUCT") {
  		Ecwid.OnSetProfile.add(function(customer) {
			$.get(`https://app.ecwid.com/api/v3/35020171/orders?customer=${customer.email}&token=secret_dYSNe7rT6hY73H8HhAZeJNQMdmXxifLz`, function(data) {
				downloadInsteadOfBuy(data);
			});
		});
  	}
});

function printProductsInCart (orders, callback) {
	if(orders.items.length !== 0) {
		var productsLayout = [`<div class="grid__products grid__products--classic grid__products--appearance-frame grid__products--layout-center grid__products--small-items grid__products--aspect-ratio-1" data-items="15" data-cols="5" style="max-width: 10000px;">`];
	} else {
		var productsLayout = 0;
	}
	orders.items.forEach(function(entry) {
		entry.items.forEach(function(entry) {
			productsLayout.push(`<div class="grid-product__wrap-inner" style="width: 200px; margin: 10px"> <div class="grid-product__spacer"> <div class="grid-product__spacer-inner"></div></div><div class="grid-product__bg" style="background-color: rgb(255, 255, 255);"></div><div class="grid-product__image-wrap" style="margin-bottom: 36%;"><img src="${entry.imageUrl}" title="${entry.name}" class="grid-product__picture" srcset="${entry.imageUrl} 1x, ${entry.imageUrl} 2x" style="width: 100%;height: 100%;"></div><div class="grid-product__shadow ec-text-muted"> <div class="grid-product__shadow-inner" style="z-index: 1;text-align: center;">${entry.name}</div></div><div class="grid__clearfix"></div><div class="grid-product__hover-wrap"></div><div class="grid-product__title-inner" style="z-index:1; text-align: center;">${entry.name}</div><a href="${entry.files[0].customerUrl}" style="text-decoration: inherit;color:inherit"> <div class="grid-product__button grid-product__buy-now" style="text-align: center;"> <div class="form-control form-control--button form-control--small form-control--secondary form-control--animated form-control--done"> <button class="form-control__button form-control__button--icon-center" type="button"> <span class="form-control__button-text">Скачать</span> <span class="form-control__button-svg"> <span class="svg-icon"> <svg width="27" height="23" viewBox="0 0 27 23" xmlns="http://www.w3.org/2000/svg"> <path class="svg-line-check" d="M1.97 11.94L10.03 20 25.217 2" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path> </svg> </span> </span> </button> </div></div></a></div>`);
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

function addTextBelowFilter(){
	let div = document.createElement('div');
	div.className = 'ec-filter__alert'
	div.innerHTML = "<strong>ФИЛЬТРЫ:</strong>";
	document.querySelector('.ec-filter--attribute-041c043e04340435043b0438-0434043b044f-043604380432043e0442043d044b0445').append(div);
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