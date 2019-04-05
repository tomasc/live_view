class ComponentChannel < ApplicationCable::Channel
  include CableReady::Broadcaster

  def subscribed
    stream_from "ComponentChannel#{user_id}"
  end

  def receive(data)
    html = HomeController.renderer.render(
      partial: '/home/controller',
      locals: {
        message: %w[Hi! Hello Namaste Ohio Tak Nazdar Ahoy!].shuffle.first
      }
    )

    cable_ready["ComponentChannel#{user_id}"].morph(
      selector: 'section#my-component',
      html: html
    )
    
    cable_ready.broadcast
  end
end
