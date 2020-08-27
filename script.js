document.addEventListener('DOMContentLoaded', function() {
   printCustomerEmail();
}, false);
function printCustomerEmail() {
	Ecwid.OnSetProfile.add(function(customer) {
	  $('.tn-elem__2233100061598348258199').children(".tn-atom").html(Array.from(customer ? ('Личный кабинет('+customer.email+')') : "Войти").join(""))
	});
}