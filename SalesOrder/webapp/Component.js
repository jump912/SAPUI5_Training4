sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/rizing/demo/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.rizing.demo.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this method, the device models are set and the router is initialized.
		 * @public
		 * @override
		 */
		init: function() {
			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// call the base component's init function and create the App view
			UIComponent.prototype.init.apply(this, arguments);
			
			// create the views based on the url/hash
			this.getRouter().initialize(); 
		}

	});

});