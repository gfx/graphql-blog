Rails.application.routes.draw do

  root "articles#root"

  resources :articles
end
