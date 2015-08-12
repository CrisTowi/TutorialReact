/** @jsx React.DOM */
$(document).ready(function() {
  ReactClientComponent = React.createClass({
    getInitialState: function() {
      return ({});
    },
    componentDidMount: function() {
      var promise = $.get('https://www.reddit.com/.json');
      var _this = this;

      promise.done(function(response){
        var data = response.data.children;
        _this.setState({
          data: data
        });
      });
    },
    render: function() {
      var content;
      if(this.state.data) {
        content = this.state.data.map(function(element, index){
          return (
            <li>
              <a href={element.data.url}>
                {element.data.title}
              </a>
            </li>
          );
        }); 
      }
      return (
        <div>
          <h1>Reddit and ReactJS RULEAN!</h1>
          <ul>
            {content}
          </ul>
        </div>
      );
    }
  });

  React.render(
    <ReactClientComponent />,
    document.getElementById('container')
  );
});