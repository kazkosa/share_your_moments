FactoryBot.define do
  factory :post_image do
    image { Rack::Test::UploadedFile.new(File.join(Rails.root, 'public/Logo.png'))}
    post_id {1}
  end
end