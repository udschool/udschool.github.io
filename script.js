Ecwid.OnPageLoaded.add(function(page) {
	console.log(page.type);
	if (page.type == "ACCOUNT_SETTINGS") {
		Ecwid.OnSetProfile.add(function(customer) {
			console.log(customer);
		})
  	}
});

function printProductsInCart (orders, callback) {
	var productsLayout = [];
	orders.items.forEach(function(entry) {
		entry.items.forEach(function(entry) {
			console.log(entry);
		});
	});
	callback(productsLayout);
}
function renderProducts(layout) {
	if (layout.length > 0) {
			// console.log('Возвращаем старый массив');
	} else if (layout.length == 0) {
			layout.push(`<div class="product__notfound-wrapper"> <p>По данному запросу нет товаров. Мы работаем над этим :)</p></div>`);
			// console.log('Возвращаем массив 404');
	}
	// $('#t').html(layout.join(""));
	// console.log(layout);
}