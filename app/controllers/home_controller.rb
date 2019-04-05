class HomeController < ApplicationController
  def show
    @value ||= 1
  end
end
