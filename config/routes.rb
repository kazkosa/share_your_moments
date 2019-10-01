Rails.application.routes.draw do
  devise_for :users
  root 'posts#index'
  resources :users,   only: [:edit, :update]
  resources :posts,   only: [:index, :new, :create, :edit, :update, :destroy, :show] do
    resources :comments, only: [:new, :create]
    resources :likes,    only: [:create,:destroy]
  end
end
