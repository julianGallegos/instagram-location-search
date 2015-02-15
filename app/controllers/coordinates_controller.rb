class CoordinatesController < ApplicationController

	def search_coordinates
		location = params[:location]
		api_key = params[:api_key]

	
	  url = 'https://maps.googleapis.com/maps/api/geocode/json?address=disneyland&key=AIzaSyDoHl-9Ezqgu7Mcs7ddjtiCzUBnGlssU-0'
		
		response = HTTParty.get(url)

		puts "this is the response #{response}"

		render json: response

	end

end
