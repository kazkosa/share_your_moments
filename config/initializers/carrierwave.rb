require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  if Rails.env.development? || Rails.env.test? #開発とテストは今まで通りに
    config.storage = :file
  elsif Rails.env.production? #本番はS3に保存する
    config.storage = :fog
    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      provider: 'AWS',
      # aws_access_key_id: Rails.application.secrets.aws_access_key_id,
      # aws_secret_access_key: Rails.application.secrets.aws_secret_access_key,
      aws_access_key_id: eval(Rails.application.credentials.aws[:aws_access_key_id]),
      aws_secret_access_key: eval(Rails.application.credentials.aws[:aws_secret_access_key]),
      secret_key_base: eval(Rails.application.credentials.secret_key_base),
      region: 'ap-northeast-1' #例 'ap-northeast-1'
    }

    config.fog_directory  = 'backet191031'
    config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/backet191031'
  end
end