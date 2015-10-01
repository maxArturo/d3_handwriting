if Handwritten.dev.enabled
  d3.json('../graph.json', (error, letters) ->
    Handwritten.dev.mountPoint = d3.select('body').append('svg')
      .attr('width', Handwritten.writing().width())
      .attr('height', Handwritten.writing().height())
      .datum(letters)
      .on("click", Handwritten.dev.addCoordinates);

    Handwritten.dev.gui = new dat.GUI()
    Handwritten.dev.params = (->
      @.variability = 5
      @.transform = 100
      @.baseline = 0
      @.color = '#000000'
      @
    ).bind(@)

    Handwritten.dev.input = new Handwritten.dev.params()

    (->
      drawing = Handwritten.writing()
      mountPoint = Handwritten.dev.mountPoint
      Handwritten.dev.gui_controller = (
        variability: Handwritten.dev.gui.add(Handwritten.dev.input,
          'variability', 0, 100).onChange(
          ->
            drawing.variability(Handwritten.dev.input.variability)
            drawing(mountPoint))
        transform: Handwritten.dev.gui.add(Handwritten.dev.input, 'transform', 0, 200).onChange(
          ->
            drawing.transform(Handwritten.dev.input.transform)
            drawing(mountPoint))
        baseline: Handwritten.dev.gui.add(Handwritten.dev.input, 'baseline', 0, 100).onChange(
          ->
            drawing.baseline(Handwritten.dev.input.baseline)
            drawing(mountPoint))
        color: Handwritten.dev.gui.add(Handwritten.dev.input, 'color').onChange(
          (value) ->
            drawing.color(Handwritten.dev.input.color)
            drawing(mountPoint))
        )
    )()
  )

  Handwritten.dev.addCoordinates =( ->
    coordinates = d3.mouse(@)
    if !@data.newLetter
      @data.newLetter = [[]]

    @data.newLetter[0].push(
      x: coordinates[0] / Handwritten.writing().transform() * 100,
      y: coordinates[1] / Handwritten.writing().transform() * 100
    )
    Handwritten.writing().draw(Handwritten.dev.mountPoint)
  )