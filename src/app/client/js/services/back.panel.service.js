(function() {

	'use strict';

	var deps = [
		'CircleService',
		'ContainerService',
		'ImageService',
		'RectangleService',
		'PositioningService',
		'TextService',
		BackPanelService
	];
	angular.module('app').factory('BackPanelService', deps);

	function BackPanelService(circleService, containerService, imageService, rectangleService, positioningService, textService) {

		return {

			getBrandItemRevDateDateCode: function(data) {

			},
			getBrandSlogan: function(data) {

			},
			getCompanyInfo: function(data) {

			},
			getComponent: function(data) {
				// return this.getTestPattern(data);
				var container = containerService.getContainer();
				var warning = this.getWarning(data);
				container.addChild(warning);
				var directions = this.getDirections(data);
				var supplementFacts = this.getSupplementFoodInfo(data);
				positioningService.beneath(directions, warning);
				positioningService.beneath(supplementFacts, directions);
				return container;
			},
			getContactInfo: function(data) {

			},
			getCopyright: function(data) {

			},
			getDeliveryForm: function(data) {

			},
			getDirections: function(data) {

				var directionsData = this.getDirectionsTextColumnData(data);
				var colWidth = +directionsData["-Width"];
				var container = containerService.getContainer();

				var text = 'Directions: ' + directionsData.Directions.FormattedText;
				if(directionsData.Directions.Refrigerated) {
					text += directionsData.Directions.Refrigerated["#text"];	
				}
				
				var textComponent = textService.getText({
					text: text,
					color: data.Setup.DirectionsFontColor,
					x: 0,
					y: 0,
					font: 'Arial 12px', //???
					lineWidth: colWidth * 100
				});

				var textBackground = rectangleService.getRectangle({
					x: 0,
					y: 0,
					width: colWidth,
					height: textComponent.getBounds().height,
					rotation: 0
				});

				container.addChild(textBackground, textComponent);
				return container;
			},
			getDirectionsTextColumnData: function(data) {

				var columnData = null;
				function iterate(item) {
					if(item.TextColumn && item.TextColumn.Directions) {
						columnData = item.TextColumn;
					}
				}
				data.BackPanel.BPTextualData.TextSection.forEach(iterate);

				return columnData;
			},
			getIngredientRow: function(ingredientData) {
				var container = containerService.getContainer();
				var text = ingredientData.IngredientName.FormattedText;
				if(ingredientData.SourceName) {
					text += ' ' + ingredientData.SourceName.FormattedText;
				}
				var ingredientName = textService.getText({
						text: text,
						color: '#000000', //???
						x: 0,
						y: 0,
						font: 'Arial 6px',//???
						lineWidth: 150 //???
					});
				container.addChild(ingredientName);

				var apsText = ingredientData.AmountPerServing.Quantity["#text"];
				var amountPerServing = textService.getText({
					text: apsText,
					color: '#000000', //???
					x: 0,
					y: 0,
					font: 'Arial 6px', //???
					lineWidth: 100
				});

				positioningService.toRightOf(amountPerServing, ingredientName);

				//TODO: rework into custom grid component
				//TODO: include Percent Daily Value

				return container;
			},
			getIngredients: function(data) {
				//TODO: refactor using a 'grid' component of your own making
				var container = containerService.getContainer();
				var columnData = this.getSupplementTextColumnData(data);
				var colWidth = +columnData['-Width'];
				var factsBoxData = columnData.SupplementFoodInfo.SupplementFactsBox;
				var ingredients = factsBoxData.Ingredient;
				var rows = [];
				
				function iterate(ingredient, i, array) {
					var ingredientRow = this.getIngredientRow(ingredient);
					rows.push(ingredientRow);
					
					if(i > 0) {
						var previousRow = rows[i - 1];
						positioningService.beneath(ingredientRow, previousRow);
					} else {
						container.addChild(ingredientRow);
					}
				}

				ingredients.forEach(iterate, this);

				return container;
			},
			getManufacturedAddress: function(data) {

			},
			getManufacturedBy: function(data) {

			},
			getManufacturedFor: function(data) {

			},
			getManufacturedInfo: function(data) {

			},
			getOtherIngredients: function(data) {

				var columnData = this.getOtherIngredientsTextColumnData(data);
				var colWidth = +columnData['-Width'];
				var text = 
					columnData.OtherIngredients.FormattedText.Bold + ' ' + //TODO: multi-style!
					columnData.OtherIngredients.FormattedText['#text'];
				var component = textService.getText({
					text: text,
					color: '#000000', //???
					x: 0,
					y: 0,
					font: 'Arial, 12px', //???
					lineWidth: colWidth * 100  //TODO: scale inches to pixels
				});

				return component;
			},
			getOtherIngredientsTextColumnData: function(data) {
				var columnData = null;
				function iterate(item) {
					if(item.TextColumn && item.TextColumn.OtherIngredients) {
						columnData = item.TextColumn;
					}
				}
				data.BackPanel.BPTextualData.TextSection.forEach(iterate);

				return columnData;	
			},
			getPercentDailyValueColumnLabels: function(data) {

			},
			getServingSize: function(data) {
				var columnData = this.getSupplementTextColumnData(data);
				var colWidth = +columnData.SupplementFoodInfo.SupplementFactsBox['-Width'];
				var servingSize = columnData.SupplementFoodInfo.SupplementFactsBox.ServingSize;
				var deliveryForm = columnData.SupplementFoodInfo.SupplementFactsBox.DeliveryForm.Text;
				var text = 'Serving Size ' + servingSize + ' ' + deliveryForm; 
				var textComponent = textService.getText({
					text: text,
					color: '#000000',
					x: 0,
					y: 0,
					font: 'Arial 12px',//???,
					lineWidth: colWidth * 100
				});

				return textComponent;
			},
			getSupplementFactsBox: function(data) {
				var container = containerService.getContainer();
				var columnData = this.getSupplementTextColumnData(data);
				var colWidth = +columnData.SupplementFoodInfo.SupplementFactsBox['-Width'];
				var header = textService.getText({
					text: columnData.SupplementFoodInfo.SupplementFactsBox.Header,
					color: "#000000", //???
					font: "bold Arial 24px", //???
					x: 0,
					y: 0,
					lineWidth: colWidth * 100
				});
				container.addChild(header);

				var servingSize = this.getServingSize(data);
				positioningService.beneath(servingSize, header);

				var bigBarData = {
					x: 0,
					y: 0,
					width: colWidth * 100,
					height: 10,
					color: "#000000"
				};
				var headerBar = rectangleService.getRectangle(bigBarData);
				positioningService.beneath(headerBar, servingSize);

				var ingredients = this.getIngredients(data);
				positioningService.beneath(ingredients, headerBar);

				var footerBar = rectangleService.getRectangle(bigBarData);
				positioningService.beneath(footerBar, ingredients);

				var otherIngredients = this.getOtherIngredients(data);
				positioningService.beneath(otherIngredients, footerBar);

				return container;
			},
			getSupplementFoodInfo: function(data) {
				var container = containerService.getContainer();
				var factsBox = this.getSupplementFactsBox(data);
				container.addChild(factsBox);
				containerService.setBorder(container, {
					width: data.Setup.Constants.FACTS_BOX_BORDER_WIDTH,
					color: "#000000"
				});
				return container;
			},
			getSupplementTextColumnData: function(data) {
				var columnData = null;
				function iterate(item) {
					if(item.TextColumn && item.TextColumn.SupplementFoodInfo) {
						columnData = item.TextColumn;
					}
				}
				data.BackPanel.BPTextualData.TextSection.forEach(iterate);

				return columnData;	
			},
			getTestPattern: function() {
				var container = new createjs.Container();
				var redRectangle = rectangleService.getRectangle({
					color: '#FF0000',
					x: 0,
					y: 0,
					width: 100,
					height: 100,
					rotation: 0
				});

				var greenRectangle = rectangleService.getRectangle({
					color: '#00FF00',
					x: 0,
					y: 0,
					width: 100,
					height: 100,
					rotation: 0
				});

				var blueRectangle = rectangleService.getRectangle({
					color: '#0000FF',
					x: 0,
					y: 0,
					width: 100,
					height: 100,
					rotation: 0
				});

				var yellowRectangle = rectangleService.getRectangle({
					color: 'yellow',
					x: 0,
					y: 0,
					width: 100,
					height: 100,
					rotation: 0
				});

				container.addChild(redRectangle);
				positioningService.toRightOf(blueRectangle, redRectangle);
				positioningService.beneath(greenRectangle, redRectangle);
				positioningService.beneath(yellowRectangle, blueRectangle);
				console.log(container.getBounds());
				return container;
			},
			getUpcCode: function(data) {
				//http://lindell.me/JsBarcode/
				//bower install jsbarcode --save
			},
			getWarning: function(data) {

				var warningData = this.getWarningTextColumnData(data);
				var colWidth = +warningData["-Width"];
				var container = containerService.getContainer();
				var warningText = textService.getText({
					text: 'WARNING: ' + warningData.Warning.FormattedText,
					color: data.Setup.WarningFontColor,
					x: 0,
					y: 0,
					font: 'Arial 12px',
					lineWidth: colWidth * 100
				});
				var textBackground = rectangleService.getRectangle({
					color: data.Setup.WarningFillColor,
					x: 0,
					y: 0,
					width: colWidth * 100,
					height: warningText.getBounds().height,
					rotation: 0
				});
				container.addChild(textBackground, warningText);
				containerService.setBorder(container, {
					width: data.Setup.Constants.BORDERED_SECTION_BORDER_WIDTH,
					color: "#000000"
				});

				return container;
			},
			getWarningTextColumnData: function(data) {

				var columnData = null;
				function iterate(item) {
					if(item.TextColumn && item.TextColumn.Warning) {
						columnData = item.TextColumn;
					}
				}
				data.BackPanel.BPTextualData.TextSection.forEach(iterate);

				return columnData;
			}
		};
	}

})();