if Rails.env.development?

  # See https://www.gov.uk/api/organisations/cabinet-office
  cabinet_office_content_id = '96ae61d6-c2a1-48cb-8e67-da9d105ae381'

  # Create test user
  #
  unless User.find_by_email("test@example.com")
    u             = User.new
    u.email       = "test@example.com"
    u.name        = "Test User"
    u.permissions = ["signin", "admin"]
    u.organisation_content_id = cabinet_office_content_id
    u.save
  end
end

puts "To import the data from transition-config, plus Hit data, run this: "
puts "  bundle exec rake import:all"
