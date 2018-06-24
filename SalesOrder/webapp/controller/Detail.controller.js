/*global location */
sap.ui.define([
	"com/rizing/demo/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.rizing.demo.controller.Detail", {

		onInit: function() {
			this.getRouter().getRoute("object").attachPatternMatched({}, this._onObjectMatched, this);
			
			this.oTable = this.byId("table");
			this.oTemplate = this.byId("cli").clone();
		},
		
		bindTable: function() {
			var oSorter = new sap.ui.model.Sorter({
				path: "ProductId",
				descending: true,
				group: function(oContext) {
					return oContext.getProperty("ProductId");
				}
			});
			
			// oTable.bindItems({
			// 	path: "/SalesOrderItemSet",
			// 	template: oTemplate
			// });
			this.oTable.bindAggregation("items", {
				path: "SalesOrderItems",
				template: this.oTemplate,
				sorter: oSorter
			});
		},
		
		onSearchFieldSearch: function(oEvent) {
			// Get the search query, regardless of the triggered event 
			// ('query' for the search event, 'newValue' for the liveChange one).
			var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue");
			var aFilters = [];
			// 1) Search filters (with OR)
			if (sQuery && sQuery.length > 0) {
				aFilters.push(new sap.ui.model.Filter("ProductId", sap.ui.model.FilterOperator.Contains, sQuery));
			}
			this.oTable.bindAggregation("items", {
				path: "SalesOrderItems",
				template: this.oTemplate,
				filters: aFilters
			});
		},

		_onObjectMatched: function(oEvent) {
			var sObjectId = oEvent.getParameter("arguments").objectId;
			this.getModel().metadataLoaded().then(function() {
				var sObjectPath = this.getModel().createKey("SalesOrderSet", {
					SoId: sObjectId
				});
				
				this.getView().bindElement({
					path: "/" + sObjectPath,
					parameters: {
						expand: "SalesOrderItems"
					}
				});
			}.bind(this));
			
			this.bindTable();
		},
		
		openDialog: function() {
			if (!this.pressDialog) {
				this.pressDialog = sap.ui.xmlfragment("com.rizing.demo.view.fragment.AddFragment", this);
				
				//to get access to the global model
				this.getView().addDependent(this.pressDialog);
			}
			
			this.pressDialog.open();
		},
		
		dialogClose: function() {
			this.pressDialog.close();
		}
	});
});