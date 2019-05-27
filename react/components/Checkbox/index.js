import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CheckIcon from '../icon/Check'
import CheckPartial from '../icon/CheckPartial'

class Checkbox extends PureComponent {
  handleChange = e => !this.props.disabled && this.props.onChange(e)

  render() {
    const {
      checked,
      disabled,
      id,
      label,
      name,
      required,
      value,
      partial,
    } = this.props

    return (
      <div
        className={classNames('flex items-center relative', {
          pointer: !disabled,
        })}>
        <div className={classNames('relative mr3 w1 h1', { mr3: label })}>
          <div
            className={classNames('h1 w1 absolute ba bw1 br1 ', {
              'b--muted-4 pointer': !checked && !disabled,
              'b--disabled bg-muted-5 c-disabled': !checked && disabled,
              'b--action-primary bg-action-primary': checked && !disabled,
              'b--muted-5 bg-muted-5': partial && !checked && disabled,
              'b--disabled bg-disabled': checked && disabled,
              mr3: label,
            })}
            style={{
              transition: 'background 20ms, border 100ms',
              backgroundColor: partial && !checked && !disabled && '#dbe9fd',
              borderColor: partial && !checked && !disabled && '#dbe9fd',
            }}
          />
          <div
            className="absolute w1 h1 flex o-100"
            style={{
              left: 0,
              top: label && 1, // The lack of label creates a small gap
            }}>
            <div
              className={`absolute top-0 left-0 bottom-0 overflow-hidden w-100 flex items-center align-center justify-center ${
                disabled ? 'c-on-disabled' : 'c-on-action-primary'
              }`}
              style={{ transition: 'right 110ms ease-in-out 30ms' }}>
              {checked ? (
                <CheckIcon size={12} color="currentColor" />
              ) : (
                partial && (
                  <CheckPartial
                    size={12}
                    color={disabled ? '#979899' : '#1346d8'}
                  />
                )
              )}
            </div>
          </div>
          <input
            checked={checked}
            className={classNames('h1 w1 absolute o-0', {
              pointer: !disabled,
            })}
            disabled={disabled}
            required={required}
            id={id}
            name={name}
            onChange={this.handleChange}
            type="checkbox"
            value={value}
            tabIndex={0}
          />
        </div>
        {label && (
          <label
            className={classNames(
              { 'c-disabled': disabled },
              { 'c-on-base pointer': !disabled }
            )}
            htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    )
  }
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  required: false,
  partial: false,
}

Checkbox.propTypes = {
  /** (Input spec attribute) */
  checked: PropTypes.bool,
  /** (Input spec attribute) */
  disabled: PropTypes.bool,
  /** (Input spec attribute) */
  id: PropTypes.string.isRequired,
  /** Checkbox label */
  label: PropTypes.string,
  /** (Input spec attribute) */
  name: PropTypes.string.isRequired,
  /** onChange event */
  onChange: PropTypes.func.isRequired,
  /** (Input spec attribute) */
  required: PropTypes.bool,
  /** (Input spec attribute) */
  value: PropTypes.string.isRequired,
  /** Partial state */
  partial: PropTypes.bool,
}

export default Checkbox
