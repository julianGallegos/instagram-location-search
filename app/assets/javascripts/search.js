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
this.locationSearch ="#locationSearch"
}

View.prototype.getParamCoordinates = function(){
	console.log('getting user input')
}

View.prototype.getUserSearchInput = function(){
	encodeURIComponent($(this.locationSearch).val())
}

View.prototype.resetSearch = function(){
	$(this.results).html('')
}



//===============================CONTROLLER=============================


function Controller(model, view){
	this.model = model;
	this.view = view;
}

// Controller.prototype.getInstagramPictures = function(){
// 		var request = $.ajax({
// 			url: "/results",
// 			type: "POST",
// 			data: {lat:$(this.view.lat).val() , lon:$(this.view.longitute).val() , access_token:$(this.view.token).text() },
// 			dataType: "json"
// 			});

// 		request.done(function(msg) {
// 			console.log(msg);
// 			for (var i = 0; i < msg.data.length; i ++){
// 		  $('.results').append('<img src=' + msg.data[i].images.standard_resolution.url + '>');
// 			}
// 		});

// 		request.fail(function(jqXHR, textStatus) {
// 		  alert( "Request failed: " + textStatus );
// 		});

	// }

Controller.prototype.clearResults = function(){
	this.view.resetSearch();
}

Controller.prototype.getLocationInput = function(){
	console.log("using google maps api")
	var request = $.ajax({
		url: "/coordinates",
		type: "GET",
		data: {location: encodeURIComponent($(this.view.locationSearch).val())},
		
		dataType: "json"
	});
	request.done(function(event){
		console.log(event.results[0].geometry)
		var secondRequest = $.ajax({
			url: "/results",
			type: "POST",
			// for some reason the scope of this.view can't be reached inside of this ajax call
			// had to find token by using jquery rather than the view
			data: {lat:(event.results[0].geometry.location.lat), lon:(event.results[0].geometry.location.lng), access_token:$('#token').text()},
			dataType: "json"
		})
		secondRequest.done(function(msg){
			for (var i = 0; i < msg.data.length; i ++){
		  $('.results').append('<img class="instagram_pics col-md-4" src=' + msg.data[i].images.standard_resolution.url + '>');
			}
		})
	});	
}

Controller.prototype.createEventHandlers = function(){
	// $(this.view.searchButton).on('click', this.getInstagramPictures.bind(this));
	$(this.view.searchButton).on('click', this.getLocationInput.bind(this));
	$(this.view.resetButton). on('click', this.clearResults.bind(this));
}


$(document).ready(function(){
		var myInstagramSearch = new Controller(new Model(), new View());
		myInstagramSearch.createEventHandlers();
})

