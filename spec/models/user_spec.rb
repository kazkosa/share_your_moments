require 'rails_helper'
describe User do
  describe '#create' do
    it 'is valid with a name, email, password, password_confirmation' do
      user = build(:user)
      expect(user).to be_valid
    end

    it 'is invalid without a name' do
      user = build(:user, name:"")
      user.valid?
      expect(user.errors[:name]).to include("can't be blank") 
    end

    it 'is invalid without a email' do
      user = build(:user, email:"")
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end

    it 'is invalid without a password' do
      user = build(:user, password:"")
      user.valid?
      expect(user.errors[:password]).to include("can't be blank")
    end

    it "is invalid without a password_confirmation although with a password" do
      user = build(:user, password_confirmation:"")
      user.valid?
      expect(user.errors[:password_confirmation]).to include("doesn't match Password")
    end

    it "is invalid with name that has more than 16 charcters" do
      user = build(:user, name:"123456789abcdefg")
      user.valid?
      expect(user.errors[:name]).to include("is too long (maximum is 15 characters)")
    end

    it "is valid with name that has less than 15 charcters" do
      user = build(:user, name:"123456789abcdef")
      expect(user).to be_valid
    end

    it "is valid with password that has more than 6 charcters" do
      user = build(:user, password:"123456",password_confirmation:"123456")
      expect(user).to be_valid
    end

    it "is invalid with password that has less than 5 charcters" do
      user = build(:user, password:"12345",password_confirmation:"12345")
      user.valid?
      expect(user.errors[:password]).to include("is too short (minimum is 6 characters)")
    end

    it "is invalid with a duplicate email address" do
      user = create(:user, email:"aaa@gmail.com")
      another_user = build(:user, email:"aaa@gmail.com")
      another_user.valid?
      expect(another_user.errors[:email]).to include("has already been taken")
    end
  end
  
  describe '#edit' do
    it "is valid to edit if it have singed in already" do
      @user = create(:user)
      @user.name = "Smith"
      expect(@user.save).to be_truthy
    end
  end
  describe '#destroy' do
    it "is valid to destroy if it have singed in already" do
      @user = create(:user)
      expect(@user.destroy).to be_truthy
    end
  end
end