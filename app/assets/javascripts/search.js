// 	$("#button").click(function(){
// 		var lat = $('#lat').val();
// 		var lon = $('#lon').val();
// 		var token = "<%= session['access_token'] %>"
// 		getResults(lat,lon,token);
// 		console.log(token)
// 	});

// 	function getResults(lat,lon,token) {

// 		var request = $.ajax({
// 		  url: "/results",
// 		  type: "POST",
// 		  data: {lat:lat, lon:lon, access_token:token},
// 		  dataType: "json"
// 		});

// 		request.done(function(msg) {
// 			console.log("It worked");
// 		  $("#button").html( msg );
// 		});

// 		request.fail(function(jqXHR, textStatus) {
// 		  alert( "Request failed: " + textStatus );
// 		});

// 	}





//===============================MODELS=============================

function Model(){
	this.searchTerms = null;
}

Model.prototype.enterSearch = function(){
	console.log("the model is searching")
}

//===============================VIEWS=============================

function View(){
this.searchButton = "#button"
this.resetButton = "#reset"
this.lat = "#lat"
this.longitute = "#lon"
this.token = "#token"
this.results = ".results"
}

View.prototype.getParamCoordinates = function(){
	console.log('getting user input')
}

View.prototype.resetSearch = function(){
	$(this.results).html('')
}



//===============================CONTROLLER=============================


function Controller(model, view){
	this.model = model;
	this.view = view;
}

Controller.prototype.getInstagramPictures = function(){
		console.log('making request')
		
		var request = $.ajax({
			url: "/results",
			type: "POST",
			data: {lat:$(this.view.lat).val() , lon:$(this.view.longitute).val() , access_token:$(this.view.token).text() },
			dataType: "json"
			});

		request.done(function(msg) {
			console.log(msg);
			for (var i = 0; i < msg.data.length; i ++){
		  $('.results').append('<img src=' + msg.data[i].images.standard_resolution.url + '>');
			}
		});

// 		request.fail(function(jqXHR, textStatus) {
// 		  alert( "Request failed: " + textStatus );
// 		});

	}

Controller.prototype.clearResults = function(){
	this.view.resetSearch();
}

Controller.prototype.createEventHandlers = function(){
	$(this.view.searchButton).on('click', this.getInstagramPictures.bind(this));
	$(this.view.resetButton). on('click', this.clearResults.bind(this));
}


$(document).ready(function(){
		var myInstagramSearch = new Controller(new Model(), new View());
		myInstagramSearch.createEventHandlers();
})

