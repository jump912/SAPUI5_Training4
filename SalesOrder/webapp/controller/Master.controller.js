/*global history */
sap.ui.define([
		"com/rizing/demo/controller/BaseController",
		"sap/ui/Device",
		"com/rizing/demo/model/formatter"
	], function (BaseController, Device) {
		"use strict";

		return BaseController.extend("com.rizing.demo.controller.Master", {

			onInit : function () {
				// Control state model
				var oList = this.byId("detailList");
				this._oList = oList;
				this._oTemplate = this.byId("detailItem").clone();
				
				this.bindList();
			},
			
			bindList: function() {
				var oSorter = new sap.ui.model.Sorter({
					path: "SoId",
					descending: false
				});
				
				this._oList.bindAggregation("items", {
					path: "/SalesOrderSet",
					template: this._oTemplate,
					sorter: oSorter
				});
			},

			onSelectionChange : function (oEvent) {
				// get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
				var oItem = oEvent.getParameter("listItem");
				
				var bReplace = !Device.system.phone;
				this.getRouter().navTo("object", {
					objectId : oItem.getBindingContext().getProperty("SoId")
				}, bReplace);
			},
			
			onUpdateFinished: function(oEvent) {
				// update the master list object counter after new data is loaded
				this._updateListItemCount(oEvent.getParameter("total"));
			},
	
			_updateListItemCount: function(iTotalItems) {
				var sTitle;
				// only update the counter if the length is final
				if (this._oList.getBinding("items").isLengthFinal()) {
					sTitle = this.getResourceBundle().getText("masterTitle", [iTotalItems]);
					this.byId("page").setTitle(sTitle);
				}
			},
			
			onSearchFieldSearch: function(oEvent) {
				// Get the search query, regardless of the triggered event 
				// ('query' for the search event, 'newValue' for the liveChange one).
				var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue");
				var aFilters = [];
				// 1) Search filters (with OR)
				if (sQuery && sQuery.length > 0) {
					aFilters.push(new sap.ui.model.Filter("SoId", sap.ui.model.FilterOperator.Contains, sQuery));
				}
				this._oList.bindAggregation("items", {
					path: "/SalesOrderSet",
					template: this._oTemplate,
					filters: aFilters
				});
			}
		});
	}
);