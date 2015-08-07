requirejs(["mainPluginLoader"], boot);

function boot() {
	require(["services/registerComponents", "modules/dbConnection", "services/appservice"], function(renderComponents, dbConnection, appservice) {
		var test;

		dbConnection.info().then(function (info) {
		  console.log(info);
		});

		appservice.start();
	
	});
}