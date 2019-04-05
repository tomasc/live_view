class ExampleReflex < StimulusReflex::Reflex
  def greet(val)
    @value = val + 1
  end
end
