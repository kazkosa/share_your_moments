require 'rails_helper'

describe UsersController do
  describe 'GET #edit' do
    let(:user){create(:user)}
    context 'log in' do
      before do
        login user
        get :edit, params: { id: user }
      end
      it "assigns the requested user to @user" do
        expect(assigns :user).to eq user
      end
      it "renders the :edit template" do
        expect(response).to render_template :edit
      end
    end
    context 'not log in' do
      before do
        get :edit, params: { id: user }
      end
      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
