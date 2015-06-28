jest.dontMock('../index.js');

var user = Object.freeze({
  name: 'ben'
});

describe('List', () => {

  it('render the correct name', () => {
    var List = require('../index');
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;

    var list = TestUtils.renderIntoDocument(
      <List user={user} />
    );

    var p = TestUtils.findRenderedDOMComponentWithTag(list, 'p');
    var el = React.findDOMNode(p);
    expect(el.textContent).toBe('Hello ben');
  });

});
