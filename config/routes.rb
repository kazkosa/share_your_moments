Rails.application.routes.draw do
  devise_for :users
  root 'posts#index'
  resources :users,   only: [:edit, :update, :show] do
    get 'edit_avatar'
    post 'update_avatar'   
  end
  resources :relationships, only: [:create, :destroy]
  resources :posts,   only: [:index, :new, :create, :edit, :update, :destroy, :show] do
    resources :comments,  only: [:new, :create]
    resources :likes,     only: [:create,:destroy]
    resources :favorites, only: [:create,:destroy]
    collection do
      get 'search'
    end
  end
end
