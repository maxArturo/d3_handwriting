Handwritten.writing = ->

  draw = (selection) ->
    selection.each( (d, i) ->
      element = d3.select(@)
      element.selectAll('path').remove()

      for own letter, values of d
        letterPaths = randomize(values)
        for path in letterPaths
          element.append('path')
            .attr('d', lineFunction(path))
            .attr('stroke', color)
    )

  lineFunction = d3.svg.line()
    .x((d) ->
      d.x
    ).y((d) ->
      d.y
    ).interpolate('basis')

  margin =(
    top: 20
    right: 20
    bottom: 20
    left: 20)

  width = 900 - margin.left - margin.right
  height = 500 - margin.bottom - margin.top
  variability = 5
  transform = 100
  baseline = 0
  color = '#000000'

  # accessor functions
  draw.width = (value) ->
    return width unless arguments.length
    width = value
    draw

  draw.height = (value) ->
    return height unless arguments.length
    height = value
    draw

  draw.variability = (value) ->
    return variability unless arguments.length
    variability = value
    draw

  draw.transform = (value) ->
    return transform unless arguments.length
    transform = value
    draw

  draw.baseline = (value) ->
    return baseline unless arguments.length
    baseline = value
    draw

  draw.color = (value) ->
    return color unless arguments.length
    color = value
    draw

  randomize = (letterPaths) ->
    paths = _.cloneDeep(letterPaths)
    for path in paths
      path = path.map(coerce)
    paths

  coerce = (d) ->
    d.x = (d.x + Math.random() * variability - variability / 2) *
      (transform / 100)
    d.y = (d.y + Math.random() * variability - variability / 2) *
      (transform / 100) + baseline;
    d

  # return main update function
  draw
