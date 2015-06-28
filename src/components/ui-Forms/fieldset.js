import React, {Component, PropTypes} from 'react';

export default class Fieldset extends Component {

  static propTypes = {
    schema: PropTypes.array.isRequired,
    content: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
  }

  render () {
    let {schema, content} = this.props;
    let fields = schema.map(field => {

      // allow user to plugin their own field
      if (field.widget) {
        return <field.widget {...field} />
      }

      return (
        <Field
          {...field}
          key={field.name}
          onChange={this.onChange.bind(this, field)}
          value={content[field.name]}
        />
      )
    });

    return (
      <div>
        {fields}
      </div>
    )
  }

  onChange (field, value) {
    this.props.onChange(field, value)
  }

}
