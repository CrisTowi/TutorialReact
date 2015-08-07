/** @jsx React.DOM */

$(document).ready(function(){
	DivComponent = React.createClass({
		render: function() {
			return (
				<div>
					<h1>Hola mundo</h1>
				</div>
			);
		}
	});

	React.render(
		<DivComponent />,
		document.getElementById('container')
	);
});