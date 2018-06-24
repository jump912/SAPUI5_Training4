jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

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
		"com/rizing/demo/test/integration/NavigationJourneyPhone",
		"com/rizing/demo/test/integration/NotFoundJourneyPhone",
		"com/rizing/demo/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});