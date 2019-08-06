$(document).ready(function(){

	var modelSpecs,
		modelPrice,
		modelSpecsHolder,
		modelPriceHolder,
		modelPriceUAHHolder;

	modelSpecsHolder = $('#modelSpecs');
	modelPriceHolder = $('#modelPrice');
	modelPriceUAHHolder = $('#modelPriceUAH');

	modelPrice = 0;
	modelSpecs = '';

	// page start
	calculatePrice();
	compileSpecs();
	// calculateUAH();

	// after switching radio button
	$('#autoForm input').on('change', function() {
		calculatePrice();
		compileSpecs();
		calculateUAH();
	});

	// color selection- do not influence on price
	$('#colorsSelector .colorItem').on('click', function(){
		// var imgPath;
		imgPath = $(this).attr('data-img-path');
		// console.log(imgPath);
		$('#imgHolder img').attr('src', imgPath);
	});

	function calculatePrice(){
		modelPriceEngine = $('input[name=engine]:checked', '#autoForm').val();
		modelPriceTransmission = $('input[name=transmission]:checked', '#autoForm').val();
		modelPricePackage = $('input[name=package]:checked', '#autoForm').val();
		
		modelPriceEngine = parseInt(modelPriceEngine);
		modelPriceTransmission = parseInt(modelPriceTransmission);
		modelPricePackage = parseInt(modelPricePackage);

		modelPrice = modelPriceEngine + modelPriceTransmission + modelPricePackage;
		// alert(modelPrice);
		modelPriceHolder.text( addSpace(modelPrice) + ' UAH');
	};

	function compileSpecs (){
		modelSpecs = $('input[name=engine]:checked + label', '#autoForm').text();
		modelSpecs = modelSpecs + ', ' +  $('input[name=transmission]:checked + label', '#autoForm').text();
		modelSpecs = modelSpecs + ', ' + $('input[name=package]:checked + label', '#autoForm').text();
		// alert(modelSpecs);
		modelSpecsHolder.text(modelSpecs);
	};

	function addSpace(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ' ' + '$2');
		}
		return x1 + x2;
	}

	// Get the exchange rate
	$.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function(data) {
	    // $('').html(data.Valute.UAH.Value);
	    // console.log(data.Valute.UAH.Value);
	    rurUAHRate = data.Valute.UAH.Value;
	    calculateUAH();
	});

	function calculateUAH(){
	    	modelPriceUAH = modelPrice / rurUAHRate;
	    	// alert(modelPriceUAH);
	    	modelPriceUAHHolder.text('$ ' + addSpace(modelPriceUAH.toFixed(0) ) );
	    	// toFixed reduce values after comma
	};

});