class ApplicationController < ActionController::Base
  helper_method :user_id

  before_action do
    cookies.signed[:user_id] ||= { value: SecureRandom.uuid, expires: 1.year.from_now }
  end

  private

  def user_id
    cookies.signed[:user_id]
  end
end
