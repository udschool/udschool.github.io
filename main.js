//api variables
var all_products_url = 'https://app.ecwid.com/api/v3/35020171/products?lang=ru&token=public_uwAb5iCSEMGGH2eD1wgQ3NNGuf9E44Xd';
var all_categories_url = 'https://app.ecwid.com/api/v3/35020171/categories?hidden_categories=true&lang=ru&token=public_uwAb5iCSEMGGH2eD1wgQ3NNGuf9E44Xd';
var visOptions = ['Все', 'без визуализации', 'с визуализацией'];

$(document).ready(function() {
	var currentUrl = window.location.href;
	var url = (new URL(currentUrl)).searchParams;
	var filterParam = 'filter';
	var productParam = 'product';
	var visParam = 'vis';
	var catFilter = url.get(filterParam);
	var productInfo = url.get(productParam);
	var visOption = url.get(visParam);
	if ((currentUrl.indexOf(filterParam) == -1) && (currentUrl.indexOf(productParam) == -1) && (currentUrl.indexOf(visParam) == -1)) {
		$.get(all_products_url, function(data) {
		printProducts(data, renderProducts.bind(this));
		});
		$.get(all_categories_url, function(data) {
		printCategories(data, renderCategories.bind(this));
		});
		printSortVis();
		setValueVisOption();
	} else if ((currentUrl.indexOf(filterParam) != -1) && (currentUrl.indexOf(visParam) == -1)) {
		scrolldiv('shop-body');
		$.get(`https://app.ecwid.com/api/v3/35020171/products?keyword="${catFilter}"&lang=ru&token=public_uwAb5iCSEMGGH2eD1wgQ3NNGuf9E44Xd`, function(data) {
		printProducts(data, renderProducts.bind(this));
		});
		$.get(all_categories_url, function(data) {
		printCategories(data, renderCategories.bind(this));
		});
		printSortVis();
		setValueVisOption();
	} else if ((currentUrl.indexOf(filterParam) != -1) && (currentUrl.indexOf(visParam) != -1)) {
		scrolldiv('shop-body');
		$.get(`https://app.ecwid.com/api/v3/35020171/products?keyword="${catFilter}"&lang=ru&token=public_uwAb5iCSEMGGH2eD1wgQ3NNGuf9E44Xd`, function(data) {
		printProductsVis(data, visOption, renderProducts.bind(this));
		});
		$.get(all_categories_url, function(data) {
		printCategories(data, renderCategories.bind(this));
		});
		printSortVis();
		setValueVisOption();
	} else if ((currentUrl.indexOf(filterParam) == -1) && (currentUrl.indexOf(visParam) != -1)) {
		scrolldiv('shop-body');

		$.get(all_products_url, function(data) {
		printProductsVis(data, visOption, renderProducts.bind(this));
		});

		$.get(all_categories_url, function(data) {
		printCategories(data, renderCategories.bind(this));
		});
		printSortVis();
		setValueVisOption();
	} else if (currentUrl.indexOf(productParam) != -1) {
		scrolldiv('shop-body');
		printProductInfo(productInfo);
		$.get(all_categories_url, function(data) {
		printCategories(data, renderCategories.bind(this));
		});
	}
});

function printProducts(data, callback) {
	var productsLayout = [];
	data.items.forEach(function(item) {
		let id = item.id;
		productsLayout.push(`<div class="item ecsp ecsp-SingleProduct-v2 ecsp-SingleProduct-v2-bordered ecsp-Product ec-Product-${id}" itemscope itemtype="http://schema.org/Product" data-single-product-id="${id}"> <a onclick="putProductId('${id}')"> <div itemprop="image"></div><div class="ecsp-title" itemprop="name" content="ПУФ"></div><div itemtype="http://schema.org/Offer" itemscope itemprop="offers"> </a> <div class="ecsp-productBrowser-price ecsp-price" itemprop="price" content="1"> <div itemprop="priceCurrency" content="RUB"></div></div></div><div customprop="options"></div><div customprop="addtobag"></div></div>`);
	});
	callback(productsLayout);
}

function printProductsVis(data, isVis, callback) {
	var productsVisLayout = [];
	if (isVis == 'true') {
		data.items.forEach(function(item) {
			if (item.attributes) {
				item.attributes.forEach(function(attr) {
					if (attr.name == 'Визуализация') {
						if (attr.value == 'true') {
							let id = item.id;
							productsVisLayout.push(`<div class="item ecsp ecsp-SingleProduct-v2 ecsp-SingleProduct-v2-bordered ecsp-Product ec-Product-${id}" itemscope itemtype="http://schema.org/Product" data-single-product-id="${id}"> <a onclick="putProductId('${id}')"> <div itemprop="image"></div><div class="ecsp-title" itemprop="name" content="ПУФ"></div><div itemtype="http://schema.org/Offer" itemscope itemprop="offers"> </a> <div class="ecsp-productBrowser-price ecsp-price" itemprop="price" content="1"> <div itemprop="priceCurrency" content="RUB"></div></div></div><div customprop="options"></div><div customprop="addtobag"></div></div>`);
						}
					}
				})
			}
		});
	} else if (isVis == 'false') {
		data.items.forEach(function(item) {
			if (item.attributes) {
				item.attributes.forEach(function(attr) {
					if (attr.name == 'Визуализация') {
						if (attr.value != 'true') {
							let id = item.id;
							productsVisLayout.push(`<div class="item ecsp ecsp-SingleProduct-v2 ecsp-SingleProduct-v2-bordered ecsp-Product ec-Product-${id}" itemscope itemtype="http://schema.org/Product" data-single-product-id="${id}"> <a onclick="putProductId('${id}')"> <div itemprop="image"></div><div class="ecsp-title" itemprop="name" content="ПУФ"></div><div itemtype="http://schema.org/Offer" itemscope itemprop="offers"> </a> <div class="ecsp-productBrowser-price ecsp-price" itemprop="price" content="1"> <div itemprop="priceCurrency" content="RUB"></div></div></div><div customprop="options"></div><div customprop="addtobag"></div></div>`);
						}
					} 
				})
			} else {
				let id = item.id;
				productsVisLayout.push(`<div class="item ecsp ecsp-SingleProduct-v2 ecsp-SingleProduct-v2-bordered ecsp-Product ec-Product-${id}" itemscope itemtype="http://schema.org/Product" data-single-product-id="${id}"> <a onclick="putProductId('${id}')"> <div itemprop="image"></div><div class="ecsp-title" itemprop="name" content="ПУФ"></div><div itemtype="http://schema.org/Offer" itemscope itemprop="offers"> </a> <div class="ecsp-productBrowser-price ecsp-price" itemprop="price" content="1"> <div itemprop="priceCurrency" content="RUB"></div></div></div><div customprop="options"></div><div customprop="addtobag"></div></div>`);
			}
		});
	}
	callback(productsVisLayout);
}

function renderProducts(layout) {
	if (layout.length > 0) {
	} else if (layout.length == 0) {
			layout.push(`<div class="product__notfound-wrapper"> <p>По данному запросу нет товаров. Мы работаем над этим :)</p></div>`);
	}
	$('#t').html(layout.join(""));
}

function printCategories(data, callback) {
	var categoriesLayout = [];
	data.items.forEach(function(item) {
		let name = item.name;
		categoriesLayout.push(`<li class="category__item" onclick="putParamsUrl('${name}')">${name}</li>`);
	});
	callback(categoriesLayout);
}

function renderCategories(layout) {
	$('#categories').html(layout.join(""));
}

function scrolldiv(str) { 
    window.scroll(0, findPosition(document.getElementById(str))); 
} 
function findPosition(obj) { 
    var currenttop = 0; 
    if (obj.offsetParent) { 
        do { 
            currenttop += obj.offsetTop; 
        } while ((obj = obj.offsetParent)); 
        return [currenttop]; 
    } 
} 

function printSortVis() {
	var sortVisLayout = ['<div class="sort__body"> <label for="cars">Визуализация</label> <select name="vis" id="vis" onclick="updateSortVis(value)">'];
	visOptions.forEach(function(entry) {
		sortVisLayout.push(`<option value="${entry}">${entry}</option>`);
	});
	sortVisLayout.push('</select></div>');
	$('#sortVis').html(sortVisLayout.join(""));
}

function setValueVisOption() {
	var currentUrl = window.location.href;
	var url = (new URL(currentUrl)).searchParams;
	var visParam = 'vis';
	var visOption = url.get(visParam);
	if (currentUrl.indexOf(visParam) == -1) {
		document.getElementById("vis").value = "Все"; 	
	} else {
		if (visOption == 'false') {
			document.getElementById("vis").value = "без визуализации"; 	
		} else if (visOption == 'true') {
			document.getElementById("vis").value = "с визуализацией"; 	
		} else {
			document.getElementById("vis").value = "Все";	
		}
	}
}