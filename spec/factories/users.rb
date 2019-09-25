FactoryBot.define do
  factory :user do
    name                  {"abe"}
    # email                 {"aaa@gmail.com"}
    sequence(:email) {Faker::Internet.email}
    password              {"00000000"}
    password_confirmation {"00000000"}
  end
end