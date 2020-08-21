// callbacks
function updateSortVis(value) {
	var urlElse = window.location.href.split('&vis')[0];
	var urlIf = window.location.href.split('?vis')[0];
	var currentUrl = window.location.href;
	var ifCategory = window.location.search.toString();
	if ((currentUrl.indexOf('filter') == -1) & (currentUrl.indexOf('search') == -1)) {
		if ((value == 'Все') && (currentUrl.indexOf('vis') == -1)) {
			console.log('Возвращаем Все продукты');
		} else if((value == 'Все') && (currentUrl.indexOf('vis') != -1)) {
			window.location.replace(urlIf);
		} else if ((value == 'без визуализации') && (currentUrl.indexOf('vis=false') == -1)) {
			window.location.replace(urlIf + `?vis=false`);
		} else if ((value == 'без визуализации') && (currentUrl.indexOf('vis=false') != -1)) {
			console.log('Возвращаем без визуализации');
		} else if ((value == 'с визуализацией') && (currentUrl.indexOf('vis=true') == -1)) {
			window.location.replace(urlIf + `?vis=true`);
		} else if ((value == 'с визуализацией') && (currentUrl.indexOf('vis=true') != -1)) {
			console.log('Возвращаем с визуализацией');
		}
	} else {
		if ((value == 'Все') && (currentUrl.indexOf('vis') == -1)) {
			console.log('Возвращаем Все продукты по категории');
		} else if ((value == 'Все') && (currentUrl.indexOf('vis') != -1)) {
			window.location.replace(urlElse);
		} else if ((value == 'без визуализации') && (currentUrl.indexOf('vis=false') == -1)) {
			window.location.replace(urlElse + `&vis=false`);
		} else if ((value == 'без визуализации') && (currentUrl.indexOf('vis=false') != -1)) {
			console.log('Возвращаем без визуализации');
		} else if ((value == 'с визуализацией') && (currentUrl.indexOf('vis=true') == -1)) {
			window.location.replace(urlElse + `&vis=true`);
		} else if ((value == 'с визуализацией') && (currentUrl.indexOf('vis=true') != -1)) {
			console.log('Возвращаем с визуализацией');
		}
	}
}

function putSearchUrl() {
  var url = window.location.href.split('?')[0];
  var searchUrl = document.getElementById('search-value').value;
  window.location.replace(url + `?search=${searchUrl}`);
}

function putParamsUrl (category) {
	var url = window.location.href.split('?')[0];
	window.location.replace(url + `?filter=${category}`);
}

function putProductId (product_id) {
	var url = window.location.href.split('?')[0];
	window.location.replace(url + `?product=${product_id}`);
}

function printProductInfo(product_id) {
	var productLayout = ['<div id="my-store-35020171"></div><div>'];
	productLayout.push(`<div id="my-store-35020171"></div><div><script data-cfasync="false" type="text/javascript" src="https://app.ecwid.com/script.js?35020171&data_platform=code&data_date=2020-08-18" charset="utf-8">${"</sc"+"ript>"}<script type="text/javascript">window.ec=window.ec||{}; window.ec.storefront=window.ec.storefront||{}; window.ec.storefront.enable_navigation=true;window.ec.storefront.product_details_layout="TWO_COLUMNS_SIDEBAR_ON_THE_RIGHT";window.ec.storefront.product_details_gallery_layout="SINGLE_IMAGE";window.ec.storefront.product_details_two_columns_with_right_sidebar_show_product_description_on_sidebar=true;window.ec.storefront.product_details_two_columns_with_left_sidebar_show_product_description_on_sidebar=false;window.ec.storefront.product_details_show_product_name=true;window.ec.storefront.product_details_show_breadcrumbs=false;window.ec.storefront.product_details_show_product_sku=true;window.ec.storefront.product_details_show_product_price=true;window.ec.storefront.product_details_show_in_stock_label=false;window.ec.storefront.product_details_show_number_of_items_in_stock=false;window.ec.storefront.product_details_show_qty=false;window.ec.storefront.product_details_show_wholesale_prices=false;window.ec.storefront.product_details_show_product_options=true;window.ec.storefront.product_details_show_product_description=true;window.ec.storefront.product_details_show_share_buttons=true;window.ec.storefront.product_details_position_product_name=100;window.ec.storefront.product_details_position_breadcrumbs=200;window.ec.storefront.product_details_position_product_sku=300;window.ec.storefront.product_details_position_product_price=400;window.ec.storefront.product_details_position_product_options=500;window.ec.storefront.product_details_position_buy_button=600;window.ec.storefront.product_details_position_wholesale_prices=700;window.ec.storefront.product_details_position_product_description=800;window.ec.storefront.product_details_position_share_buttons=900;xProductBrowser("categoriesPerRow=3","views=grid(20,3) list(60) table(60)","categoryView=grid","searchView=list","defaultProductId=${product_id}","id=my-store-35020171");${"</sc"+"ript>"}</div>`);
	$('#t').html(productLayout.join(""));
}