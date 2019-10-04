json.array! @posts do |post|
  json.id                           post.id
  json.image_url                    post.image.url
  json.likes_current_user           post.likes.find_by(user_id:current_user.id)
  json.likes_count                  post.likes.count
  json.likes_comments_current_user  post.comments.find_by(user_id:current_user.id)
  json.comments_count               post.comments.count
  json.favorites_current_user       post.favorites.find_by(user_id:current_user.id)
end


