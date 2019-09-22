# share_your_moments

## Overview
This project is implemented to share articles including the photos

## Description
Users can post, publish and share various articles.
By using the comment function for the article,
This project provides a place where all users can communicate through articles.

## Demo
TBD

## VS. 
Refer to Instagram

## Requirement
* Ruby 2.5.1
* Rails 5.2.3

## Usage
Start your server:

```bash
rails s
```

Open the browser and access to the link below.

```bash
http://localhost:3000/
```

## Install
Clone the repository:
```bash
git clone https://github.com/kazkosa/share_your_moments.git
```
Install the dependencies:

```bash
bundle install
```

Create your database:

```bash
rake db:create
```

Migrate the database tables:

```bash
rake db:migrate
```

Populate your development database with sample data:

```bash
rake db:seed
```

## Contribution
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Features
* Articles list page
* Detail page of each article
* Editable / Deletable article submission
* Comments on the article by Ajax
* User authentication with Devise
* Dismissable flash notifications
* Uploading Image files with carrierWave/mini_magic 
* Pagination with Kaminari
* Unit Test with RSpec
* System Tesw with RSpec

## Test
Test is run by excuting the following commands.

- Unit Test

```bash
TBD
```

- System Test

```bash
TBD
```

## DB schema
### users table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index:true|
|email|string|null: false|
|password|string|null: false|

Association
- has_many :comments
- has_many :posts


### posts table
|Column|Type|Options|
|------|----|-------|
|title|text|null: false, index:true|
|content|texty||
|image|text||
|user_id|references|foreign_key: true, on_delete: :cascade|

Association
- belongs_to :user
- has_many :comments
- has_many :posts_tags
- has_many :tags, through: :posts_tags

### comments table
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|references|foreign_key: true, on_delete: :cascade|
|post_id|references|foreign_key: true, on_delete: :cascade|

Associtation
- belongs_to :user
- belongs_to :post

### tags table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

Association
- has_many :posts_tags
- has_many :posts, through: :posts_tags

### posts_tags
|Column|Type|Options|
|------|----|-------|
|post_id|references|foreign_key: true, on_delete: :cascade|
|tag_id|references|foreign_key: true, on_delete: :cascade|

Association
- belongs_to :post
- belongs_to :tag

## Licence
Copyright (c) 2019 Kazuyuki Kosaka
Released under the MIT license
https://opensource.org/licenses/mit-license.php

## Author
Kazuyuki Kosaka
