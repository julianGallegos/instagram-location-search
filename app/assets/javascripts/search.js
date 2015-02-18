// 	$("#button").click(function(){
// 		var lat = $('#lat').val();
// 		var lon = $('#lon').val();
// 		var token = "<%= session['access_token'] %>"
// 		getResults(lat,lon,token);

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
this.instagram_pics_rendered = "#results .instagram_pics"
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

View.prototype.showInstagramInfo = function(){
	console.log("showing instagram stuff")
	// $('.names a').on('mouseenter', function(evt){
 //    $('.popup').css({left: evt.pageX+30, top: evt.pageY-15}).show();
 //    $(this).on('mouseleave', function(){
 //        $('.popup').hide();
    // });
// });
}



//===============================CONTROLLER=============================


function Controller(model, view){
	this.model = model;
	this.view = view;
}

Controller.prototype.clearResults = function(){
	this.view.resetSearch();
}

Controller.prototype.displayInstagramInfo = function(){
	this.view.showInstagramInfo()
}

Controller.prototype.getLocationInput = function(){
	console.log("using google maps api")
	var requestToGoogleMaps = $.ajax({
		url: "/coordinates",
		type: "GET",
		data: {location: encodeURIComponent($(this.view.locationSearch).val())},
		
		dataType: "json"
	});
	requestToGoogleMaps.done(function(event){
		console.log(event.results[0].geometry)
		var secondRequestToInstagram = $.ajax({
			url: "/results",
			type: "POST",
			// for some reason the scope of this.view can't be reached inside of this ajax call
			// had to find token by using jquery rather than the view
			data: {lat:(event.results[0].geometry.location.lat), lon:(event.results[0].geometry.location.lng), access_token:$('#token').text()},
			dataType: "json"
		})
		secondRequestToInstagram.done(function(msg){
			debugger
			console.log(msg)
			for (var i = 0; i < msg.data.length; i ++){
		  $('.results').append('<img class="instagram_pics col-md-4" src=' + msg.data[i].images.standard_resolution.url + '>');
			}
		})
	});	
}

Controller.prototype.createEventHandlers = function(){
	$(this.view.searchButton).on('click', this.getLocationInput.bind(this));
	$(this.view.resetButton).on('click', this.clearResults.bind(this));
	$(this.view.results).hover(this.displayInstagramInfo.bind(this))
}


$(document).ready(function(){
		var myInstagramSearch = new Controller(new Model(), new View());
		myInstagramSearch.createEventHandlers();
})




