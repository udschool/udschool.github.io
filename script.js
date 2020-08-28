console.log('123');
// Initialize the application
EcwidApp.init({
  app_id: "custom-app-35020171", // use your application client_id
  autoloadedflag: true, 
  autoheight: true
});

var storeData = EcwidApp.getPayload();

var storeId = storeData.store_id;
var accessToken = storeData.access_token;
console.log(accessToken);
console.log(storeId);
EcwidApp.ready();