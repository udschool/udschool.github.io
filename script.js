console.log('123');
// Initialize the application
EcwidApp.init({
  app_id: "custom-app-35020171", // use your application client_id
  autoloadedflag: true, 
  autoheight: true
});

EcwidApp.openPage('products');
console.log(accessToken);
console.log(storeId);
EcwidApp.ready();