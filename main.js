var products = [
	{
		id: '227713178',
		category: 'Мягкая мебель',
		vis: 'true',
	},
	{
		id: '227713175',
		category: 'Корпусная мебель',
		vis: 'false',
	},
	{
		id: '227713176',
		category: 'Мягкая мебель',
		vis: 'false',
	},
	{
		id: '227713180',
		category: 'Мягкая мебель',
		vis: 'true',
	}
];

var categories = ['Мягкая мебель', 'Корпусная мебель', 'Сантехника, мебель для санузла', 'Освещение, электрика', 'Техника, оборудование', 'Декор', 'Растения'];

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
		printProducts();
		printCategories();
		printSortVis();
		setValueVisOption();
	} else if ((currentUrl.indexOf(filterParam) != -1) && (currentUrl.indexOf(visParam) == -1)) {
		scrolldiv('shop-body');
		printProductsFromCategories(catFilter, productsNotFound.bind(this));
		printCategories();
		printSortVis();
		setValueVisOption();
	} else if ((currentUrl.indexOf(filterParam) != -1) && (currentUrl.indexOf(visParam) != -1)) {
		scrolldiv('shop-body');
		printProductsVisFromCategories(visOption, catFilter, productsNotFound.bind(this));
		printCategories();
		printSortVis();
		setValueVisOption();
	} else if ((currentUrl.indexOf(filterParam) == -1) && (currentUrl.indexOf(visParam) != -1)) {
		scrolldiv('shop-body');
		printProductsVis(visOption, productsNotFound.bind(this));
		printCategories();
		printSortVis();
		setValueVisOption();
	} else if (currentUrl.indexOf(productParam) != -1) {
		scrolldiv('shop-body');
		printProductInfo(productInfo);
		printCategories();
	}
});

function printProducts() {
	var productsLayout = [];
	products.forEach(function (entry) {
		let id = entry.id;
		productsLayout.push(`<div class="item ecsp ecsp-SingleProduct-v2 ecsp-SingleProduct-v2-bordered ecsp-Product ec-Product-${id}" itemscope itemtype="http://schema.org/Product" data-single-product-id="${id}"> <a onclick="putProductId('${id}')"> <div itemprop="image"></div><div class="ecsp-title" itemprop="name" content="ПУФ"></div><div itemtype="http://schema.org/Offer" itemscope itemprop="offers"> </a> <div class="ecsp-productBrowser-price ecsp-price" itemprop="price" content="1"> <div itemprop="priceCurrency" content="RUB"></div></div></div><div customprop="options"></div><div customprop="addtobag"></div></div>`);
	});
	// ProductsNotFound(productsLayout);
	$('#t').html(productsLayout.join(""));
}

function printCategories() {
	var categoriesLayout = [];
	categories.forEach(function(entry) {
		let name = entry;
		categoriesLayout.push(`<li class="category__item" onclick="putParamsUrl('${name}')">${name}</li>`);
		$('#categories').html(categoriesLayout.join(""));
	});
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
	var sortVisLayout = ['<div class="sort__body-wrapper"> <label for="cars">Визуализация</label> <select name="vis" id="vis" onclick="updateSortVis(value)">'];
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
		console.log('Все мейн');
	} else {
		if (visOption == 'false') {
			document.getElementById("vis").value = "без визуализации"; 	
			console.log('без визуализации');
		} else if (visOption == 'true') {
			document.getElementById("vis").value = "с визуализацией"; 	
			console.log('с визуализацией');
		} else {
			document.getElementById("vis").value = "Все";	
			console.log('Все второй');
		}
	}
}