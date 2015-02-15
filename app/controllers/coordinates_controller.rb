class CoordinatesController < ApplicationController


	def search_coordinates

		location = params[:location]

		p "these are the params #{location}"

		# need to figure out a way to get parameter like san fran to appear as san+fran from input parameters

		# for some reason the app can't recognize spaces and then throws an error
		

	  api_key = ENV['google_maps_api']


	  p url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{location}&key=#{api_key}"
		
		response = HTTParty.get(url)

		puts "this is the response #{response}"
		render json: response
	end

	# def add_plus_sign(input_params)
	# 	p split_string = input_params.split(" ")
	# 	split_string.each do |char|
	# 		if char == ""
	# 			char = "+"
	# 		end
	# 	end
	# 	p split_string.join("")
	# end	


end
