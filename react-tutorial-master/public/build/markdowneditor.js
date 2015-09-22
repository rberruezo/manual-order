var MarkdownEditor = React.createClass({displayName: "MarkdownEditor",
  getInitialState: function() {
    return {value: 'Type some *markdown* here!'};
  },
  handleChange: function() {
    this.setState({value: React.findDOMNode(this.refs.textarea).value});
  },
  render: function() {
    return (
      React.createElement("div", {className: "MarkdownEditor"}, 
        React.createElement("h3", null, "Input"), 
        React.createElement("textarea", {
          onChange: this.handleChange, 
          ref: "textarea", 
          defaultValue: this.state.value}), 
        React.createElement("h3", null, "Output"), 
        React.createElement("div", {
          className: "content", 
          dangerouslySetInnerHTML: {
            __html: marked(this.state.value, {sanitize: true})
          }}
        )
      )
    );
  }
});

React.render(
	React.createElement(MarkdownEditor, null),
	document.getElementById('content')
);