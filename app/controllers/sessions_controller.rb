class SessionsController < ApplicationController

  def create
    # @user = User.find_or_create_from_auth_hash(auth_hash)
    # self.current_user = @user
    auth = request.env["omniauth.auth"]

    access_token = auth.credentials.token
    name = auth.info.name
    uid = auth.info.uid
    nickname = auth.info.nickname

    session[:access_token] = access_token
    session[:name] = name
    session[:uid] = uid
    session[:nickname] = nickname

    puts "The access token is #{access_token}"

    redirect_to search_path
  end

def destroy
  session[:token] = nil
  redirect_to root_url, :notice => "Signed out!"
end  

  # protected

  # def auth_hash
  #   request.env['omniauth.auth']
  # end

end
