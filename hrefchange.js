	$( window ).on( 'hashchange', function( e ) {
		var whiteCart = 'cart';
		var whiteOrder = 'checkoutPD';
	    if ((window.location.href.indexOf(whiteCart) == -1) && (window.location.href.indexOf(whiteOrder) == -1)) {
	    	console.log(whiteCart.indexOf(window.location.href));
	        window.location.replace(window.location.href.split('#!/')[0]);
	    } else {
			console.log(window.location.href);
	    }
	} );