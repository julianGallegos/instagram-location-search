class SearchController < ApplicationController
	protect_from_forgery :except => :results 

	def results 
		lat = params[:lat]
		lon = params[:lon]
		access_token = params[:access_token]

		url = "https://api.instagram.com/v1/media/search?lat=#{lat}&lng=#{lon}&access_token=#{access_token}"

		response = HTTParty.get(url)

		puts response.body, response.code, response.message, response.headers.inspect

		render json: response

	end


end
