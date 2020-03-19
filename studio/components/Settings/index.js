import PropTypes from 'prop-types'
import React from 'react'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import {setIfMissing} from 'part:@sanity/form-builder/patch-event'
import {FormBuilderInput, withDocument} from 'part:@sanity/form-builder'

const locales = ['en', 'ja']

const toggleFieelds = function (type, value) {
  locales.forEach(locale => {
    const localeSelector = type.fields[0].name
    const fields = document.querySelectorAll(`div[data-focus-path=${locale}]`)

    if (value && value[localeSelector] && value[localeSelector].includes(locale)) {
      fields.forEach(el => {
        el.style.display = 'block'
      })
    } else {
      fields.forEach(el => {
        el.style.display = 'none'
      })
    }
  })
}

class Settings extends React.PureComponent {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string
    }).isRequired,
    level: PropTypes.number,
    value: PropTypes.shape({
      _type: PropTypes.string
    }),
    focusPath: PropTypes.array.isRequired,
    onFocus: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  }

  firstFieldInput = React.createRef()

  constructor (props) {
    super(props)
    this.state = {val: []}
  }

  componentDidMount () {
    const {type, value} = this.props
    toggleFieelds(type, value)
  }

  componentDidUpdate () {
    const {type, value} = this.props
    toggleFieelds(type, value)
  }

  handleFieldChange = (field, fieldPatchEvent) => {
    const {onChange, type} = this.props
    onChange(fieldPatchEvent.prefixAll(field.name).prepend(setIfMissing({_type: type.name})))
  }

  focus () {
    this.firstFieldInput.current.focus()
  }

  render () {
    const {type, value, level, focusPath, onFocus, onBlur} = this.props
    return (
      <Fieldset level={level} legend={type.title} description='' >
        {type.fields
          .map((field, i) => (
            <FormBuilderInput
              level={level + 1}
              ref={i === 0 ? this.firstFieldInput : null}
              key={field.name}
              type={field.type}
              value={value && value[field.name]}
              onChange={patchEvent => this.handleFieldChange(field, patchEvent)}
              path={[field.name]}
              focusPath={focusPath}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          ))}
      </Fieldset>
    )
  }
}

export default withDocument(Settings)
