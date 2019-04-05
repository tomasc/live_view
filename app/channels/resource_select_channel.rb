class ResourceSelectChannel < ApplicationCable::Channel
  include CableReady::Broadcaster

  def subscribed
    stream_from "ResourceSelectChannel#{user_id}"
  end

  def receive(data)
    data = ActionController::Parameters.new(data)
    name = data[:operation][:name]
    str = data[:operation][:str]
    ids = data[:operation][:ids]

    items = Item.find(ids)

    search = Item.search(str).reject do |item|
      items.map(&:id).include?(item.id)
    end

    html = HomeController.renderer.render(
      partial: '/home/resource_select',
      locals: {
        items: items,
        search: search,
        str: str
      }
    )

    cable_ready["ResourceSelectChannel#{user_id}"].morph(
      selector: '#resource-select',
      html: html
    )

    cable_ready.broadcast
  end
end
