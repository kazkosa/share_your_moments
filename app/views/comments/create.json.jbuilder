json.text         @comment.text
json.created_at   @comment.created_at.to_s if @comment.created_at.present?
json.user_name    @comment.user.name
json.user_avatar  url_for(@comment.user.avatar) if @comment.user.avatar.attached?