class CoordinatesController < ApplicationController


	def search_coordinates

		p location = params[:location]

		# need to figure out a way to get parameter like san fran to appear as san+fran from input parameters

		# for some reason the app can't recognize spaces and then throws an error
		

	  api_key = ENV['google_maps_api']


	  url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{location}&key=#{api_key}"
		
		response = HTTParty.get(url)

		puts "this is the response #{response}"
		render json: response
	end

	private

end
