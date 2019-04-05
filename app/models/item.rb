class Item
  def self.all
    [
      "Please Won't Please",
      "Imagining What To Do",
      "Echo for Camperdown Curio",
      "Fantasma Vaga",
      "Pais Nublado",
      "Running",
      "Seen My Aura",
      "Sabana de luz",
      "November 7",
      "Todo Lo Que Me Falta",
      "Two Lucky",
      "My Name Is For My Friends"
    ].each_with_index.map do |title, index|
      Item.new(id: index, title: title)
    end
  end

  def self.find(ids)
    ids = ids.reject(&:blank?)
    return [] unless ids.present?

    ids = ids.map(&:to_i)

    all.select do |item|
      ids.include?(item.id)
    end
  end

  def self.search(str)
    return unless str.length > 0

    all.select do |item|
      item.title =~ /#{str}/i
    end
  end

  include Virtus.model

  attribute :id, Integer
  attribute :title, String
end
