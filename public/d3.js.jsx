/** @jsx React.DOM */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function() {
  //Define los datos aleatorios con fechas subsecuentes para la gráfica
  var data = [];
  var tamanio = 20;

  for (var i = 0; i < tamanio; i++) {
    data.push({
      fecha: new Date(2015, 1, i),
      valor: getRandomInt(0, 100),
    });
  }

  //Crea el componente
  D3ChartComponent = React.createClass({
    //Calcula el valor mínimo y máximo del arreglo para definir 
    //dominio de las gráficas
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
    //Valores por default del props
    getDefaultProps: function() {
      return ({
        margin: {
          bottom: 10,
          left: 60,
          right: 60,
          top: 10,
        },
        height: 400,
        width: 800,
      });
    },
    componentDidMount: function() {
      //Manda a llamar a todas las funciones necesarias para la gráfica
      this.inciarGrafica();
      this.renderEjes();
      this.renderBarras();
    },
    inciarGrafica: function() {
      var svg = this.refs.chart.getDOMNode();
      this.conf = {};

      this.conf.svg = d3.select(svg)
        .attr('height', this.props.height)
        .attr('width', this.props.width);
    },
    renderEjes: function() {
      var data =        this.props.data;
      var minDate =     this.props.data[0].fecha;
      var maxDate =     this.props.data[this.props.data.length - 1].fecha;
      var minMax =      this.getMinMax();
      var scaleWidth =  this.props.width - this.props.margin.left - this.props.margin.right;
      var scaleHeigth = this.props.height - this.props.margin.top - this.props.margin.bottom;

      //Define las escalas con sus rangos y dominios de valores
      var xScale = d3.time.scale()
        .domain([new Date(minDate), new Date(maxDate)])
        .range([0, scaleWidth]);

      var yScale = d3.scale.linear()
        .domain([
          minMax[1],
          minMax[0],
        ])
        .range([0, scaleHeigth]);

      //Define la configuración de los ejes (ticks y posición)
      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom');

      var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left');

      //Agrega contenedor de gráfica
      var gContent = this.conf.svg
        .append('g')
        .attr('transform', 'translate(60, -10)');

      //Dibuja las lineas de las gráficas
      gContent.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, 380)')
        .call(xAxis);

      gContent.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

      this.conf.xScale =    xScale;
      this.conf.yScale =    yScale;
      this.conf.gContent =  gContent;
    },
    renderBarras: function() {
      var _this =       this;
      var data =        this.props.data;
      var scaleHeigth = this.props.height - this.props.margin.top - this.props.margin.bottom;

      //Agrega las barras (Una por cada elemento del arreglo data)
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
        .attr('width', 20)
        .style('fill', 'orange')
        .attr('y', function(d, i) {
          return scaleHeigth - (_this.conf.yScale(d.valor));
        });
    },
    render: function() {
      return (<div className='chart-container'>
        <svg ref='chart' className='d3-chart'>
        </svg>
      </div>);
    }
  });

  //Manda a renderear el component Chart con 'data' como props
  React.render(
    <D3ChartComponent 
      data={data} />,
    document.getElementById('container')
  );
});