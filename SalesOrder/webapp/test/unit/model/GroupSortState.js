sap.ui.define([
		"com/rizing/demo/model/GroupSortState",
		"sap/ui/model/json/JSONModel"
	], function (GroupSortState, JSONModel) {
	"use strict";

	QUnit.module("GroupSortState - grouping and sorting", {
		beforeEach: function () {
			this.oModel = new JSONModel({});
			// System under test
			this.oGroupSortState = new GroupSortState(this.oModel, function() {});
		}
	});

	QUnit.test("Should always return a sorter when sorting", function (assert) {
		// Act + Assert
		assert.strictEqual(this.oGroupSortState.sort("GrossAmount").length, 1, "The sorting by GrossAmount returned a sorter");
		assert.strictEqual(this.oGroupSortState.sort("SoId").length, 1, "The sorting by SoId returned a sorter");
	});

	QUnit.test("Should return a grouper when grouping", function (assert) {
		// Act + Assert
		assert.strictEqual(this.oGroupSortState.group("GrossAmount").length, 1, "The group by GrossAmount returned a sorter");
		assert.strictEqual(this.oGroupSortState.group("None").length, 0, "The sorting by None returned no sorter");
	});


	QUnit.test("Should set the sorting to GrossAmount if the user groupes by GrossAmount", function (assert) {
		// Act + Assert
		this.oGroupSortState.group("GrossAmount");
		assert.strictEqual(this.oModel.getProperty("/sortBy"), "GrossAmount", "The sorting is the same as the grouping");
	});

	QUnit.test("Should set the grouping to None if the user sorts by SoId and there was a grouping before", function (assert) {
		// Arrange
		this.oModel.setProperty("/groupBy", "GrossAmount");

		this.oGroupSortState.sort("SoId");

		// Assert
		assert.strictEqual(this.oModel.getProperty("/groupBy"), "None", "The grouping got reset");
	});
});