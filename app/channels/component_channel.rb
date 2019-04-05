class ComponentChannel < ApplicationCable::Channel
  include CableReady::Broadcaster

  def subscribed
    stream_from "ComponentChannel#{user_id}"
  end

  def receive(data)
    data = ActionController::Parameters.new(data)
    name = data[:operation][:name]

    case name
    when 'GREET'
      html = HomeController.renderer.render(
        partial: '/home/example_controller',
        locals: { message: %w[Hi! Hello Namaste Ohio Tak Nazdar Ahoy!].sample }
      )

      cable_ready["ComponentChannel#{user_id}"].morph(
        selector: '#example-controller',
        html: html
      )

    when 'FORM'
      email = data[:operation][:email]
      age = data[:operation][:age]

      user = User.new(email: email, age: age)
      user.valid?

      html = HomeController.renderer.render(
        partial: '/home/user_form',
        assigns: {
          user: user
        }
      )

      cable_ready["ComponentChannel#{user_id}"].morph(
        selector: '#user-form',
        html: html
      )

    end

    cable_ready.broadcast
  end
end
