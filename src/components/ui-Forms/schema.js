import React, {Component, PropTypes } from 'react';
import _ from 'lodash';

function isRequired(v){
  return !!v;
}

var schema = [
  {
    name: 'name',
    type: 'text',
    validation: isRequired
  },
  {
    name: 'surname',
    type: 'text',
    validation: isRequired
  }
];




class Field {

  static createField(options, callback){
    options = options || {};
    const field = new Field(options);
    return field;
  }

  constructor(options){
    this.options = options;
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    validate: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  render(){
    return (
      <div>
        <label>
          {this.props.label}
          <input
            ref='input'
            type='text'
            name={this.props.name}
            placeholder={this.props.placeholder}
            value={this.props.value}
          />
        </label>
      </div>
    )
  }
}

function isRequired(v){
  return !!v;
}

const Person = (
  <Schema>
    <Field name='name' type='text' validate={isRequired} />
    <Field name='surname' type='text' validate={isRequired} />
  </Schema>
)

class Form extends Component {

  static propTypes = {
  }

  constructor(props){
    super(props);
    this.state = {
      name: 'ben',
      surname: 'mcma'
    };
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        {}
      </form>
    );
  }

  renderSchema(schema){
    return
  }
}

// //
// //
// //
//
// var doc = {
//   name: 'Ben McMahen',
//   age: 30,
//   citations: ['Newspaper, 2011', 'TV, 2014']
// };
//
// var Person = (
//   <Schema>
//     <Property type='text' name='name' label='Your Name' />
//     <Property type='text' name='age' type='age' label='Your Age' />
//   </Schema>
// );
//
// var Animal = (
//   <Schema>
//     <Property type='text' name='name' label='Your Name' />
//     <Property type='date' name='date' label='Birth Date' />
//     <List name='tags'>
//       <Property type='text' label='Tag' />
//     </List>
//   </Schema>
// );
//
// <Form doc={doc} schema={Animal} ref='form' />
//
// render(){
//   let schemas = [Person, Animal];
//
//   return (
//     <Form
//       schema={schemas}
//       onSubmit={this.onSubmit.bind(this)}
//       value={this.props.doc}>
//
//       <Property type='text' name='name' label='Your Name' />
//       <Property type='text' name='age' type='age' />
//       <List name='citations'>
//         <Property type='text'label='Citation Information' />
//       </List>
//       <Property type='submit' label='Submit' />
//     </Form>
//   );
// }
