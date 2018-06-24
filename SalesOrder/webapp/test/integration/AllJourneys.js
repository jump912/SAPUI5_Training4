jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 SalesOrderSet in the list
// * All 3 SalesOrderSet have at least one SalesOrderItems

sap.ui.require([
	"sap/ui/test/Opa5",
	"com/rizing/demo/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/rizing/demo/test/integration/pages/App",
	"com/rizing/demo/test/integration/pages/Browser",
	"com/rizing/demo/test/integration/pages/Master",
	"com/rizing/demo/test/integration/pages/Detail",
	"com/rizing/demo/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.rizing.demo.view."
	});

	sap.ui.require([
		"com/rizing/demo/test/integration/MasterJourney",
		"com/rizing/demo/test/integration/NavigationJourney",
		"com/rizing/demo/test/integration/NotFoundJourney",
		"com/rizing/demo/test/integration/BusyJourney"
	], function () {
		QUnit.start();
	});
});