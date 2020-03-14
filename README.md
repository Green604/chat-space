# DB設計 
## users table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false, unique: true|
|password|string|null: false, unique: true|

### Association
- has_many :group, through::group_users
- has_many :group_users
- has_many :messages

## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|

### Association
- has_many :users, through::group_users
- has_many :group_users
- has_many :messages

## messages table
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## group_users table

|Column|Type|Options|
|———|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer| null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user