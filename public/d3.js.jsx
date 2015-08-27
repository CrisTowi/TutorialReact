/** @jsx React.DOM */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function() {
  //Define los datos para la gráfica
  var data = [];
  var tamanio = 20;
  var neg = 1;

  for (var i = 0; i < tamanio; i++) {
    data.push({
      fecha: new Date(2015, 1, i),
      valor: getRandomInt(0, 100),
    });
  }

  //Crea el componente
  D3ChartComponent = React.createClass({
    componentDidMount: function() {
      this.inciarGrafica();
      this.renderEjes();
      this.renderBarras();
    },
    inciarGrafica: function() {
      var svg = this.refs.chart.getDOMNode();
      this.conf = {};

      this.conf.svg = d3.select(svg)
        .attr('height', 400)
        .attr('width', 800);

    },
    getMinMax: function() {
      var data = this.props.data;
      var menor = 0;
      var mayor = 0;
      data.forEach(function(elemento, index) {
        if (elemento.valor < menor) {
          menor = elemento.valor;
        }
        if (elemento.valor > mayor) {
          mayor = elemento.valor;
        }
      });

      return ([menor, mayor]);
    },
    renderEjes: function() {
      var data = this.props.data;
      var minDate = this.props.data[0].fecha;
      var maxDate = this.props.data[this.props.data.length - 1].fecha;
      var minMax = this.getMinMax();

      var xScale = d3.time.scale()
        .domain([new Date(minDate), new Date(maxDate)])
        .range([0, 780]);

      console.log(minMax);

      var yScale = d3.scale.linear()
        .domain([
          minMax[1],
          minMax[0],
        ])
        .range([0, 380]);

      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom');

      var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left');

      //Append graphic container
      var gContent = this.conf.svg
        .append('g')
        .attr('class', 'g-content')
        .attr('transform', 'translate(60, -10)');

      var xaxisLine = gContent.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, 380)')
        .call(xAxis);

      var yaxisLine = gContent.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

        this.conf.xScale = xScale;
        this.conf.yScale = yScale;
        this.conf.gContent = gContent;
    },
    renderBarras: function() {
      var data = this.props.data;
      var _this = this;
      console.log(data);
      this.conf.gContent
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', function(d, i) {
          return _this.conf.xScale(new Date(d.fecha));
        })
        .attr('height', function(d, i) {
          return _this.conf.yScale(d.valor); 
        })
        .attr('width', 10)
        .style('fill', 'orange')
        .attr('y', function(d, i) {
          return 0;
        });
    },
    render: function() {
      return (<div className='chart-container'>
        <svg ref='chart' className='d3-chart'>
        </svg>
      </div>);
    }
  });

  //Manda a renderear el component Chart
  React.render(
    <D3ChartComponent 
      data={data} />,
    document.getElementById('container')
  );
});