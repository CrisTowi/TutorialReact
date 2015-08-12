/** @jsx React.DOM */

$(document).ready(function() {

	GeneralComponent = React.createClass({
		getInitialState: function() {
			return ({
				mensaje: 'Hola mundo'
			});
		},
		handleClick: function() {
			this.setState({
				mensaje: 'Adios mundo'
			});
		},
		render: function() {
			return (
				<div>
					<DivComponent 
						texto={this.state.mensaje} />
					<ButtonComponent 
						handleClick={this.handleClick} />
				</div>
			);
		}
	});

	DivComponent = React.createClass({
		render: function() {
			return (
				<div>
					<h1>{this.props.texto}</h1>
				</div>
			);
		}
	});

	ButtonComponent = React.createClass({
		handleClick: function() {
			this.props.handleClick();
		},
		render: function() {
			return (
				<button onClick={this.handleClick}>Cambiar mensaje</button>
			);
		}
	});

	React.render(
		<GeneralComponent />,
		document.getElementById('container')
	);
});