Rails.application.config.middleware.use OmniAuth::Builder do
	provider :instagram, "25cfe2db69844d1288db328490992cf7", "8385712df9be496099574c0ec673a81d"
end