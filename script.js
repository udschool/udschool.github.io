Ecwid.OnPageLoaded.add(function(page) {
	if (page.type == "ACCOUNT_SETTINGS") {
		Ecwid.OnSetProfile.add(function(customer) {
			printLk(customer.email);
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
			$.get(`https://app.ecwid.com/api/v3/35020171/orders?customer=${customer.email}&token=secret_dYSNe7rT6hY73H8HhAZeJNQMdmXxifLz`, function(data) {
		        customerProducts(data, buyProductStatus.bind(this))
		    });
			
		});

		Ecwid.Cart.get(function(cart) {
		  cartProducts(cart, inCartProductStatus.bind(this))
		});

		listenClickProduct()

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


function listenClickProduct() {
	elements = document.querySelectorAll('.form-control__button--icon-center');
	elements.forEach(function(element) {
		element.addEventListener("click", function(e) {
			product = e.target.closest('.grid-product')
			product.querySelector('.in_cart').style.display='block'
		})
	})
}

function customerProducts(data, callback) {
	var buy_product = [];
    data.items.forEach(function (orders) {
        orders.items.forEach(function(item) {
            buy_product.push(item.productId)
        })
    })
    callback(buy_product);
}

function cartProducts(cart, callback) {
	var cart_product = []
	cart.items.forEach(function(item) {
		cart_product.push(item.product.id);
	});
	callback(cart_product);
}

function buyProductStatus(products) {
	products.forEach(function(product) {
		if (document.querySelector(`.grid-product--id-${product}`)) {
			document.querySelector(`.grid-product--id-${product}`).querySelector('.in_buy').style.display = "block";
		}
	})
}

function inCartProductStatus(products) {
	products.forEach(function(product) {
		if (document.querySelector(`.grid-product--id-${product}`)) {
			document.querySelector(`.grid-product--id-${product}`).querySelector('.in_cart').style.display = "block";
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
			productsLayout.push(`<div class="grid-product__wrap-inner" style="width: 200px; margin: 10px" onclick="openProductDetail(${entry.productId})"> <a href="https://3dud.ru/?store-page=${entry.nameTranslated.ru}-p${entry.productId}"> <div class="grid-product__spacer"> <div class="grid-product__spacer-inner"></div></div><div class="grid-product__bg" style="background-color: rgb(255, 255, 255);"></div><div class="grid-product__image-wrap" style="margin-bottom: 36%;"><img src="${entry.imageUrl}" title="${entry.name}" class="grid-product__picture" srcset="${entry.imageUrl} 1x, ${entry.imageUrl} 2x" style="width: 100%;height: 100%;"></div><div class="grid-product__shadow ec-text-muted"> <div class="grid-product__shadow-inner" style="z-index: 1;text-align: center;">${entry.name}</div></div><div class="grid__clearfix"></div><div class="grid-product__hover-wrap"></div></a> <div class="grid-product__title-inner" style="z-index:1; text-align: center;">${entry.name}</div><a href="${entry.files[0].customerUrl}" style="text-decoration: inherit;color:inherit"> <div class="grid-product__button grid-product__buy-now" style="text-align: center;"> <div class="form-control form-control--button form-control--small form-control--secondary form-control--animated form-control--done"> <button class="form-control__button form-control__button--icon-center" type="button"> <span class="form-control__button-text">Скачать</span> <span class="form-control__button-svg"> <span class="svg-icon"> <svg width="27" height="23" viewBox="0 0 27 23" xmlns="http://www.w3.org/2000/svg"> <path class="svg-line-check" d="M1.97 11.94L10.03 20 25.217 2" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path> </svg> </span> </span> </button> </div></div></a></div>`);
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
			console.log(entry.sku)
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

function printLk(email) {
    console.log(email)
    "use strict";

	const e = React.createElement;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	class App extends React.Component {
	  constructor(...args) {
	    super(...args);

	    _defineProperty(this, "state", {
	      selectedCategoryId: null,
	      activeProducts: [],
	      products: [],
	      activeCategories: [],
	      categories: [{
	        id: '01',
	        name: 'Мебель'
	      }, {
	        id: '02',
	        name: 'Детская'
	      }, {
	        id: '03',
	        name: 'Сантехника. Мебель для сан. узла'
	      }, {
	        id: '04',
	        name: 'Освещение. Электрика'
	      }, {
	        id: '05',
	        name: 'Техника'
	      }, {
	        id: '06',
	        name: 'Элементы интерьера'
	      }, {
	        id: '07',
	        name: 'Декор для кухни'
	      }, {
	        id: '08',
	        name: 'Декор для ванной'
	      }, {
	        id: '09',
	        name: 'Декор для детской'
	      }, {
	        id: '10',
	        name: 'Декор универсальный'
	      }, {
	        id: '11',
	        name: 'Растения'
	      }, {
	        id: '12',
	        name: 'Модели для животных'
	      }, {
	        id: '13',
	        name: 'Другие'
	      }, {
	        id: '14',
	        name: 'Отделочные материалы'
	      }],
	      loading: true
	    });
	  }

	  categoryClickHandler(category) {
	    if (category) {
	      console.log(category.id);
	      const activeProducts = [];
	      this.state.products.forEach(product => {
	        if (product.sku.substring(0, 2) === category.id) {
	          activeProducts.push(product);
	        }
	      });
	      this.setState({
	        selectedCategoryId: category.id,
	        activeProducts: activeProducts
	      });
	    } else {
	      this.setState({
	        selectedCategoryId: null,
	        activeProducts: this.state.products
	      });
	    }
	  }

	  fetchCategories(productList) {
	    const activeCategories = [];
	    productList.forEach(product => {
	      if (activeCategories.indexOf(product.sku.substring(0, 2)) === -1) {
	        activeCategories.push(product.sku.substring(0, 2));
	      }
	    });
	    this.state.categories.forEach((category, index) => {
	      if (activeCategories.indexOf(category.id) !== -1) {
	        this.setState({
	          activeCategories: this.state.activeCategories.concat(category)
	        });
	      }
	    });
	  }

	  printProducts(products) {
	    return products.map((product, index) => {
	      return product.name === "Подписка 3dud" || product.name === "Покупка всех моделей, загруженных до 13.10.2020" ? null : /*#__PURE__*/React.createElement("div", {
	        key: index,
	        className: "product__wrap-inner",
	        style: {
	          "width": "200" + "px",
	          "margin": "10" + "px"
	        },
	        onClick: `openProductDetail(${product.productId})`
	      }, /*#__PURE__*/React.createElement("a", {
	        href: `https://3dud.ru/?store-page=${product.nameTranslated.ru}-p${product.productId}`
	      }, /*#__PURE__*/React.createElement("div", {
	        className: "product__spacer"
	      }, /*#__PURE__*/React.createElement("div", {
	        className: "product__spacer-inner"
	      })), /*#__PURE__*/React.createElement("div", {
	        className: "product__bg",
	        style: {
	          "backgroundColor": "rgb(255, 255, 255)"
	        }
	      }), /*#__PURE__*/React.createElement("div", {
	        className: "product__image-wrap"
	      }, /*#__PURE__*/React.createElement("img", {
	        src: `${product.imageUrl}`,
	        title: product.name,
	        className: "product__picture",
	        srcSet: `${product.imageUrl} 1x, ${product.imageUrl} 2x`,
	        style: {
	          "width": "100%",
	          "height": "100%"
	        }
	      })), /*#__PURE__*/React.createElement("div", {
	        className: "product__shadow ec-text-muted"
	      }, /*#__PURE__*/React.createElement("div", {
	        className: "product__shadow-inner",
	        style: {
	          "zIndex": "1",
	          "textAlign": "center"
	        }
	      }, product.name)), /*#__PURE__*/React.createElement("div", {
	        className: "clearfix"
	      }), /*#__PURE__*/React.createElement("div", {
	        className: "product__hover-wrap"
	      })), product.files[0] ? /*#__PURE__*/React.createElement("a", {
	        href: `${product.files[0].customerUrl}`,
	        style: {
	          "textDecoration": "inherit",
	          "color": "inherit"
	        }
	      }, /*#__PURE__*/React.createElement("div", {
	        className: "product__button product__buy-now",
	        style: {
	          "textAlign": "center"
	        }
	      }, /*#__PURE__*/React.createElement("div", {
	        className: "form-control form-control--button form-control--small form-control--secondary form-control--animated form-control--done"
	      }, /*#__PURE__*/React.createElement("button", {
	        className: "form-control__button form-control__button--icon-center",
	        type: "button"
	      }, /*#__PURE__*/React.createElement("span", {
	        className: "form-control__button-text"
	      }, "\u0421\u043A\u0430\u0447\u0430\u0442\u044C"))))) : /*#__PURE__*/React.createElement("div", {
	        className: "product__button product__buy-now",
	        style: {
	          "textAlign": "center"
	        }
	      }, /*#__PURE__*/React.createElement("div", {
	        className: "form-control form-control--button form-control--small form-control--secondary form-control--animated form-control--done"
	      }, /*#__PURE__*/React.createElement("button", {
	        className: "form-control__button form-control__button--icon-center",
	        type: "button"
	      }, /*#__PURE__*/React.createElement("span", {
	        className: "form-control__button-text"
	      }, "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E")))));
	    });
	  }

	  printCategories(categories) {
	    const selectedCategoryId = this.state.selectedCategoryId;
	    return categories.map((category, index) => {
	      const cls = ['grid__category-inner'];

	      if (selectedCategoryId === category.id) {
	        cls.push('category__selected');
	      }

	      return /*#__PURE__*/React.createElement("div", {
	        className: cls.join(' '),
	        key: index,
	        style: {
	          "cursor": "pointer"
	        },
	        onClick: () => {
	          this.categoryClickHandler(category);
	        }
	      }, /*#__PURE__*/React.createElement("p", null, category.name));
	    });
	  }

	  async componentDidMount() {
	    try {
	      const products = [];
	      const token = 'secret_dYSNe7rT6hY73H8HhAZeJNQMdmXxifLz';
	      const email = this.props.email;
	      const response = await axios.get(`https://app.ecwid.com/api/v3/35020171/orders?customer=${email}&token=${token}`);
	      response.data.items.forEach(obj => {
	        obj.items.forEach(item => {
	          products.push(item);
	        });
	      });
	      this.setState({
	        activeProducts: products,
	        products: products,
	        loading: false
	      });
	      this.fetchCategories(this.state.products);
	    } catch (e) {
	      console.log(e);
	    }
	  }

	  render() {
	    return /*#__PURE__*/React.createElement("div", {
	      className: "account-page__wrapper"
	    }, this.state.loading ? /*#__PURE__*/React.createElement("p", {
	      style: {
	        "textAlign": "right"
	      }
	    }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 ...") : /*#__PURE__*/React.createElement("div", {
	      style: {
	        'display': 'flex'
	      }
	    }, /*#__PURE__*/React.createElement("div", {
	      className: "categories__wrapper"
	    }, this.state.selectedCategoryId ? /*#__PURE__*/React.createElement("div", {
	      className: "grid__category-inner",
	      style: {
	        "cursor": "pointer"
	      },
	      onClick: () => {
	        this.categoryClickHandler();
	      }
	    }, /*#__PURE__*/React.createElement("p", null, "\u0412\u0441\u0435")) : /*#__PURE__*/React.createElement("div", {
	      className: "grid__category-inner category__selected",
	      style: {
	        "cursor": "pointer"
	      },
	      onClick: () => {
	        this.categoryClickHandler();
	      }
	    }, /*#__PURE__*/React.createElement("p", null, "\u0412\u0441\u0435")), this.printCategories(this.state.activeCategories)), /*#__PURE__*/React.createElement("div", {
	      className: "products__wrapper",
	      style: {
	        'display': 'flex',
	        'flexWrap': 'wrap'
	      }
	    }, this.state.activeProducts.length !== 0 ? this.printProducts(this.state.activeProducts) : /*#__PURE__*/React.createElement("p", null, "\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 \u043F\u0443\u0441\u0442."))));
	  }

	}

	const domContainer = document.querySelector('.ec-cart');
	ReactDOM.render(e(App,{
	      email: email
	    }), domContainer);
	}