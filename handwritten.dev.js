var Handwritten;

Handwritten = window.Handwritten || {};

window.Handwritten = Handwritten;

Handwritten.dev = {
  enabled: true,
  mountPoint: null
};

var hasProp = {}.hasOwnProperty;

Handwritten.writing = function() {
  var baseline, coerce, color, draw, height, lineFunction, margin, randomize, transform, variability, width;
  draw = function(selection) {
    return selection.each(function(d, i) {
      var element, letter, letterPaths, path, results, values;
      element = d3.select(this);
      element.selectAll('path').remove();
      results = [];
      for (letter in d) {
        if (!hasProp.call(d, letter)) continue;
        values = d[letter];
        letterPaths = randomize(values);
        results.push((function() {
          var j, len, results1;
          results1 = [];
          for (j = 0, len = letterPaths.length; j < len; j++) {
            path = letterPaths[j];
            results1.push(element.append('path').attr('d', lineFunction(path)).attr('stroke', color));
          }
          return results1;
        })());
      }
      return results;
    });
  };
  lineFunction = d3.svg.line().x(function(d) {
    return d.x;
  }).y(function(d) {
    return d.y;
  }).interpolate('basis');
  margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  };
  width = 900 - margin.left - margin.right;
  height = 500 - margin.bottom - margin.top;
  variability = 5;
  transform = 100;
  baseline = 0;
  color = '#000000';
  draw.width = function(value) {
    if (!arguments.length) {
      return width;
    }
    width = value;
    return draw;
  };
  draw.height = function(value) {
    if (!arguments.length) {
      return height;
    }
    height = value;
    return draw;
  };
  draw.variability = function(value) {
    if (!arguments.length) {
      return variability;
    }
    variability = value;
    return draw;
  };
  draw.transform = function(value) {
    if (!arguments.length) {
      return transform;
    }
    transform = value;
    return draw;
  };
  draw.baseline = function(value) {
    if (!arguments.length) {
      return baseline;
    }
    baseline = value;
    return draw;
  };
  draw.color = function(value) {
    if (!arguments.length) {
      return color;
    }
    color = value;
    return draw;
  };
  randomize = function(letterPaths) {
    var j, len, path, paths;
    paths = _.cloneDeep(letterPaths);
    for (j = 0, len = paths.length; j < len; j++) {
      path = paths[j];
      path = path.map(coerce);
    }
    return paths;
  };
  coerce = function(d) {
    d.x = (d.x + Math.random() * variability - variability / 2) * (transform / 100);
    d.y = (d.y + Math.random() * variability - variability / 2) * (transform / 100) + baseline;
    return d;
  };
  return draw;
};

if (Handwritten.dev.enabled) {
  d3.json('../graph.json', function(error, letters) {
    Handwritten.dev.mountPoint = d3.select('body').append('svg').attr('width', Handwritten.writing().width()).attr('height', Handwritten.writing().height()).datum(letters).on("click", Handwritten.dev.addCoordinates);
    Handwritten.dev.gui = new dat.GUI();
    Handwritten.dev.params = (function() {
      this.variability = 5;
      this.transform = 100;
      this.baseline = 0;
      this.color = '#000000';
      return this;
    }).bind(this);
    Handwritten.dev.input = new Handwritten.dev.params();
    return (function() {
      var drawing, mountPoint;
      drawing = Handwritten.writing();
      mountPoint = Handwritten.dev.mountPoint;
      return Handwritten.dev.gui_controller = {
        variability: Handwritten.dev.gui.add(Handwritten.dev.input, 'variability', 0, 100).onChange(function() {
          drawing.variability(Handwritten.dev.input.variability);
          return drawing(mountPoint);
        }),
        transform: Handwritten.dev.gui.add(Handwritten.dev.input, 'transform', 0, 200).onChange(function() {
          drawing.transform(Handwritten.dev.input.transform);
          return drawing(mountPoint);
        }),
        baseline: Handwritten.dev.gui.add(Handwritten.dev.input, 'baseline', 0, 100).onChange(function() {
          drawing.baseline(Handwritten.dev.input.baseline);
          return drawing(mountPoint);
        }),
        color: Handwritten.dev.gui.add(Handwritten.dev.input, 'color').onChange(function(value) {
          drawing.color(Handwritten.dev.input.color);
          return drawing(mountPoint);
        })
      };
    })();
  });
  Handwritten.dev.addCoordinates = (function() {
    var coordinates;
    coordinates = d3.mouse(this);
    if (!this.data.newLetter) {
      this.data.newLetter = [[]];
    }
    this.data.newLetter[0].push({
      x: coordinates[0] / Handwritten.writing().transform() * 100,
      y: coordinates[1] / Handwritten.writing().transform() * 100
    });
    return Handwritten.writing().draw(Handwritten.dev.mountPoint);
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiLCJ3cml0ZS5jb2ZmZWUiLCJkZXYuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsV0FBQSxHQUFjLE1BQU0sQ0FBQyxXQUFQLElBQXNCOztBQUNwQyxNQUFNLENBQUMsV0FBUCxHQUFxQjs7QUFHckIsV0FBVyxDQUFDLEdBQVosR0FDRTtFQUFBLE9BQUEsRUFBUyxJQUFUO0VBQ0EsVUFBQSxFQUFZLElBRFo7OztBQ0xGLElBQUE7O0FBQUEsV0FBVyxDQUFDLE9BQVosR0FBc0IsU0FBQTtBQUVwQixNQUFBO0VBQUEsSUFBQSxHQUFPLFNBQUMsU0FBRDtXQUNMLFNBQVMsQ0FBQyxJQUFWLENBQWdCLFNBQUMsQ0FBRCxFQUFJLENBQUo7QUFDZCxVQUFBO01BQUEsT0FBQSxHQUFVLEVBQUUsQ0FBQyxNQUFILENBQVUsSUFBVjtNQUNWLE9BQU8sQ0FBQyxTQUFSLENBQWtCLE1BQWxCLENBQXlCLENBQUMsTUFBMUIsQ0FBQTtBQUVBO1dBQUEsV0FBQTs7O1FBQ0UsV0FBQSxHQUFjLFNBQUEsQ0FBVSxNQUFWOzs7QUFDZDtlQUFBLDZDQUFBOzswQkFDRSxPQUFPLENBQUMsTUFBUixDQUFlLE1BQWYsQ0FDRSxDQUFDLElBREgsQ0FDUSxHQURSLEVBQ2EsWUFBQSxDQUFhLElBQWIsQ0FEYixDQUVFLENBQUMsSUFGSCxDQUVRLFFBRlIsRUFFa0IsS0FGbEI7QUFERjs7O0FBRkY7O0lBSmMsQ0FBaEI7RUFESztFQWFQLFlBQUEsR0FBZSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQVAsQ0FBQSxDQUNiLENBQUMsQ0FEWSxDQUNWLFNBQUMsQ0FBRDtXQUNELENBQUMsQ0FBQztFQURELENBRFUsQ0FHWixDQUFDLENBSFcsQ0FHVCxTQUFDLENBQUQ7V0FDRixDQUFDLENBQUM7RUFEQSxDQUhTLENBS1osQ0FBQyxXQUxXLENBS0MsT0FMRDtFQU9mLE1BQUEsR0FDRTtJQUFBLEdBQUEsRUFBSyxFQUFMO0lBQ0EsS0FBQSxF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RDtNQUNBLENBQUEsRUFBRyxXQUFZLENBQUEsQ0FBQSxDQUFaLEdBQWlCLFdBQVcsQ0FBQyxPQUFaLENBQUEsQ0FBcUIsQ0FBQyxTQUF0QixDQUFBLENBQWpCLEdBQXFELEdBRHhEO0tBREY7V0FJQSxXQUFXLENBQUMsT0FBWixDQUFBLENBQXFCLENBQUMsSUFBdEIsQ0FBMkIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUEzQztFQVRnQyxDQUFGLEVBNUNsQyIsImZpbGUiOiJoYW5kd3JpdHRlbi5kZXYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJIYW5kd3JpdHRlbiA9IHdpbmRvdy5IYW5kd3JpdHRlbiBvciB7fVxud2luZG93LkhhbmR3cml0dGVuID0gSGFuZHdyaXR0ZW5cblxuIyBnZW5lcmFsIHNldHRpbmdzXG5IYW5kd3JpdHRlbi5kZXYgPVxuICBlbmFibGVkOiB0cnVlXG4gIG1vdW50UG9pbnQ6IG51bGxcbiIsIkhhbmR3cml0dGVuLndyaXRpbmcgPSAtPlxuXG4gIGRyYXcgPSAoc2VsZWN0aW9uKSAtPlxuICAgIHNlbGVjdGlvbi5lYWNoKCAoZCwgaSkgLT5cbiAgICAgIGVsZW1lbnQgPSBkMy5zZWxlY3QoQClcbiAgICAgIGVsZW1lbnQuc2VsZWN0QWxsKCdwYXRoJykucmVtb3ZlKClcblxuICAgICAgZm9yIG93biBsZXR0ZXIsIHZhbHVlcyBvZiBkXG4gICAgICAgIGxldHRlclBhdGhzID0gcmFuZG9taXplKHZhbHVlcylcbiAgICAgICAgZm9yIHBhdGggaW4gbGV0dGVyUGF0aHNcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cignZCcsIGxpbmVGdW5jdGlvbihwYXRoKSlcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBjb2xvcilcbiAgICApXG5cbiAgbGluZUZ1bmN0aW9uID0gZDMuc3ZnLmxpbmUoKVxuICAgIC54KChkKSAtPlxuICAgICAgZC54XG4gICAgKS55KChkKSAtPlxuICAgICAgZC55XG4gICAgKS5pbnRlcnBvbGF0ZSgnYmFzaXMnKVxuXG4gIG1hcmdpbiA9KFxuICAgIHRvcDogMjBcbiAgICByaWdodDogMjBcbiAgICBib3R0b206IDIwXG4gICAgbGVmdDogMjApXG5cbiAgd2lkdGggPSA5MDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodFxuICBoZWlnaHQgPSA1MDAgLSBtYXJnaW4uYm90dG9tIC0gbWFyZ2luLnRvcFxuICB2YXJpYWJpbGl0eSA9IDVcbiAgdHJhbnNmb3JtID0gMTAwXG4gIGJhc2VsaW5lID0gMFxuICBjb2xvciA9ICcjMDAwMDAwJ1xuXG4gICMgYWNjZXNzb3IgZnVuY3Rpb25zXG4gIGRyYXcud2lkdGggPSAodmFsdWUpIC0+XG4gICAgcmV0dXJuIHdpZHRoIHVubGVzcyBhcmd1bWVudHMubGVuZ3RoXG4gICAgd2lkdGggPSB2YWx1ZVxuICAgIGRyYXdcblxuICBkcmF3LmhlaWdodCA9ICh2YWx1ZSkgLT5cbiAgICByZXR1cm4gaGVpZ2h0IHVubGVzcyBhcmd1bWVudHMubGVuZ3RoXG4gICAgaGVpZ2h0ID0gdmFsdWVcbiAgICBkcmF3XG5cbiAgZHJhdy52YXJpYWJpbGl0eSA9ICh2YWx1ZSkgLT5cbiAgICByZXR1cm4gdmFyaWFiaWxpdHkgdW5sZXNzIGFyZ3VtZW50cy5sZW5ndGhcbiAgICB2YXJpYWJpbGl0eSA9IHZhbHVlXG4gICAgZHJhd1xuXG4gIGRyYXcudHJhbnNmb3JtID0gKHZhbHVlKSAtPlxuICAgIHJldHVybiB0cmFuc2Zvcm0gdW5sZXNzIGFyZ3VtZW50cy5sZW5ndGhcbiAgICB0cmFuc2Zvcm0gPSB2YWx1ZVxuICAgIGRyYXdcblxuICBkcmF3LmJhc2VsaW5lID0gKHZhbHVlKSAtPlxuICAgIHJldHVybiBiYXNlbGluZSB1bmxlc3MgYXJndW1lbnRzLmxlbmd0aFxuICAgIGJhc2VsaW5lID0gdmFsdWVcbiAgICBkcmF3XG5cbiAgZHJhdy5jb2xvciA9ICh2YWx1ZSkgLT5cbiAgICByZXR1cm4gY29sb3IgdW5sZXNzIGFyZ3VtZW50cy5sZW5ndGhcbiAgICBjb2xvciA9IHZhbHVlXG4gICAgZHJhd1xuXG4gIHJhbmRvbWl6ZSA9IChsZXR0ZXJQYXRocykgLT5cbiAgICBwYXRocyA9IF8uY2xvbmVEZWVwKGxldHRlclBhdGhzKVxuICAgIGZvciBwYXRoIGluIHBhdGhzXG4gICAgICBwYXRoID0gcGF0aC5tYXAoY29lcmNlKVxuICAgIHBhdGhzXG5cbiAgY29lcmNlID0gKGQpIC0+XG4gICAgZC54ID0gKGQueCArIE1hdGgucmFuZG9tKCkgKiB2YXJpYWJpbGl0eSAtIHZhcmlhYmlsaXR5IC8gMikgKlxuICAgICAgKHRyYW5zZm9ybSAvIDEwMClcbiAgICBkLnkgPSAoZC55ICsgTWF0aC5yYW5kb20oKSAqIHZhcmlhYmlsaXR5IC0gdmFyaWFiaWxpdHkgLyAyKSAqXG4gICAgICAodHJhbnNmb3JtIC8gMTAwKSArIGJhc2VsaW5lO1xuICAgIGRcblxuICAjIHJldHVybiBtYWluIHVwZGF0ZSBmdW5jdGlvblxuICBkcmF3XG4iLCJpZiBIYW5kd3JpdHRlbi5kZXYuZW5hYmxlZFxuICBkMy5qc29uKCcuLi9ncmFwaC5qc29uJywgKGVycm9yLCBsZXR0ZXJzKSAtPlxuICAgIEhhbmR3cml0dGVuLmRldi5tb3VudFBvaW50ID0gZDMuc2VsZWN0KCdib2R5JykuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgSGFuZHdyaXR0ZW4ud3JpdGluZygpLndpZHRoKCkpXG4gICAgICAuYXR0cignaGVpZ2h0JywgSGFuZHdyaXR0ZW4ud3JpdGluZygpLmhlaWdodCgpKVxuICAgICAgLmRhdHVtKGxldHRlcnMpXG4gICAgICAub24oXCJjbGlja1wiLCBIYW5kd3JpdHRlbi5kZXYuYWRkQ29vcmRpbmF0ZXMpO1xuXG4gICAgSGFuZHdyaXR0ZW4uZGV2Lmd1aSA9IG5ldyBkYXQuR1VJKClcbiAgICBIYW5kd3JpdHRlbi5kZXYucGFyYW1zID0gKC0+XG4gICAgICBALnZhcmlhYmlsaXR5ID0gNVxuICAgICAgQC50cmFuc2Zvcm0gPSAxMDBcbiAgICAgIEAuYmFzZWxpbmUgPSAwXG4gICAgICBALmNvbG9yID0gJyMwMDAwMDAnXG4gICAgICBAXG4gICAgKS5iaW5kKEApXG5cbiAgICBIYW5kd3JpdHRlbi5kZXYuaW5wdXQgPSBuZXcgSGFuZHdyaXR0ZW4uZGV2LnBhcmFtcygpXG5cbiAgICAoLT5cbiAgICAgIGRyYXdpbmcgPSBIYW5kd3JpdHRlbi53cml0aW5nKClcbiAgICAgIG1vdW50UG9pbnQgPSBIYW5kd3JpdHRlbi5kZXYubW91bnRQb2ludFxuICAgICAgSGFuZHdyaXR0ZW4uZGV2Lmd1aV9jb250cm9sbGVyID0gKFxuICAgICAgICB2YXJpYWJpbGl0eTogSGFuZHdyaXR0ZW4uZGV2Lmd1aS5hZGQoSGFuZHdyaXR0ZW4uZGV2LmlucHV0LFxuICAgICAgICAgICd2YXJpYWJpbGl0eScsIDAsIDEwMCkub25DaGFuZ2UoXG4gICAgICAgICAgLT5cbiAgICAgICAgICAgIGRyYXdpbmcudmFyaWFiaWxpdHkoSGFuZHdyaXR0ZW4uZGV2LmlucHV0LnZhcmlhYmlsaXR5KVxuICAgICAgICAgICAgZHJhd2luZyhtb3VudFBvaW50KSlcbiAgICAgICAgdHJhbnNmb3JtOiBIYW5kd3JpdHRlbi5kZXYuZ3VpLmFkZChIYW5kd3JpdHRlbi5kZXYuaW5wdXQsICd0cmFuc2Zvcm0nLCAwLCAyMDApLm9uQ2hhbmdlKFxuICAgICAgICAgIC0+XG4gICAgICAgICAgICBkcmF3aW5nLnRyYW5zZm9ybShIYW5kd3JpdHRlbi5kZXYuaW5wdXQudHJhbnNmb3JtKVxuICAgICAgICAgICAgZHJhd2luZyhtb3VudFBvaW50KSlcbiAgICAgICAgYmFzZWxpbmU6IEhhbmR3cml0dGVuLmRldi5ndWkuYWRkKEhhbmR3cml0dGVuLmRldi5pbnB1dCwgJ2Jhc2VsaW5lJywgMCwgMTAwKS5vbkNoYW5nZShcbiAgICAgICAgICAtPlxuICAgICAgICAgICAgZHJhd2luZy5iYXNlbGluZShIYW5kd3JpdHRlbi5kZXYuaW5wdXQuYmFzZWxpbmUpXG4gICAgICAgICAgICBkcmF3aW5nKG1vdW50UG9pbnQpKVxuICAgICAgICBjb2xvcjogSGFuZHdyaXR0ZW4uZGV2Lmd1aS5hZGQoSGFuZHdyaXR0ZW4uZGV2LmlucHV0LCAnY29sb3InKS5vbkNoYW5nZShcbiAgICAgICAgICAodmFsdWUpIC0+XG4gICAgICAgICAgICBkcmF3aW5nLmNvbG9yKEhhbmR3cml0dGVuLmRldi5pbnB1dC5jb2xvcilcbiAgICAgICAgICAgIGRyYXdpbmcobW91bnRQb2ludCkpXG4gICAgICAgIClcbiAgICApKClcbiAgKVxuXG4gIEhhbmR3cml0dGVuLmRldi5hZGRDb29yZGluYXRlcyA9KCAtPlxuICAgIGNvb3JkaW5hdGVzID0gZDMubW91c2UoQClcbiAgICBpZiAhQGRhdGEubmV3TGV0dGVyXG4gICAgICBAZGF0YS5uZXdMZXR0ZXIgPSBbW11dXG5cbiAgICBAZGF0YS5uZXdMZXR0ZXJbMF0ucHVzaChcbiAgICAgIHg6IGNvb3JkaW5hdGVzWzBdIC8gSGFuZHdyaXR0ZW4ud3JpdGluZygpLnRyYW5zZm9ybSgpICogMTAwLFxuICAgICAgeTogY29vcmRpbmF0ZXNbMV0gLyBIYW5kd3JpdHRlbi53cml0aW5nKCkudHJhbnNmb3JtKCkgKiAxMDBcbiAgICApXG4gICAgSGFuZHdyaXR0ZW4ud3JpdGluZygpLmRyYXcoSGFuZHdyaXR0ZW4uZGV2Lm1vdW50UG9pbnQpXG4gICkiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
