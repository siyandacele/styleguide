import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'
import ButtonWithIcon from '../ButtonWithIcon'

class InputWithAction extends Component {
  static propTypes = {
    buttonIcon: PropTypes.node,
    buttonDisabled: PropTypes.bool,
    buttonLabel: PropTypes.string,
    buttonIconPosition: PropTypes.oneOf(['left', 'right']),
    buttonLoading: PropTypes.bool,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    label: PropTypes.node,
    helpText: PropTypes.node,
    errorMessage: PropTypes.node,
    size: PropTypes.oneOf(['small', 'regular', 'large']),
    onSubmit: PropTypes.func.isRequired,
    /** @ignore Internal prop used for ref forwarding */
    forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    type: PropTypes.string,
    token: PropTypes.bool,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    name: PropTypes.string,
    id: PropTypes.string,

    // INPUT SPEC
    accept: PropTypes.string,
    autoComplete: PropTypes.string,
    autoCorrect: PropTypes.string,
    autoFocus: PropTypes.bool,
    autoSave: PropTypes.string,
    dataAttributes: PropTypes.object,
    defaultValue: PropTypes.string,
    inputMode: PropTypes.string,
    list: PropTypes.string,
    max: PropTypes.string,
    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    min: PropTypes.string,
    minLength: PropTypes.string,
    multiple: PropTypes.bool,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    step: PropTypes.string,
    src: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    spellCheck: PropTypes.string,
  }

  state = {
    active: false,
    hover: false,
  }

  handleMouseOver = () => {
    this.setState({ hover: true })
  }

  handleMouseOut = () => {
    this.setState({ hover: false })
  }

  handleFocus = event => {
    this.setState({ active: true })
    this.props.onFocus && this.props.onFocus(event)
  }

  handleBlur = event => {
    this.setState({ active: false })
    this.props.onBlur && this.props.onBlur(event)
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit && this.props.onSubmit(event)
  }

  render() {
    const {
      helpText,
      errorMessage,
      size,
      label,
      disabled,
      buttonIcon,
      buttonDisabled,
      buttonLabel,
      buttonIconPosition,
      loading,
    } = this.props

    const { hover, active } = this.state

    const inputProps = {
      accept: this.props.accept,
      autoComplete: this.props.autoComplete,
      autoCorrect: this.props.autoCorrect,
      autoFocus: this.props.autoFocus,
      autoSave: this.props.autoSave,
      dataAttributes: this.props.dataAttributes,
      defaultValue: this.props.defaultValue,
      forwardedRef: this.props.forwardedRef,
      id: this.props.id,
      inputMode: this.props.inputMode,
      list: this.props.list,
      max: this.props.max,
      maxLength: this.props.maxLength,
      min: this.props.min,
      minLength: this.props.minLength,
      multiple: this.props.multiple,
      name: this.props.name,
      onChange: this.props.onChange,
      onKeyDown: this.props.onKeyDown,
      onKeyPress: this.props.onKeyPress,
      onKeyUp: this.props.onKeyUp,
      pattern: this.props.pattern,
      placeholder: this.props.placeholder,
      prefix: this.props.prefix,
      readOnly: this.props.readOnly,
      required: this.props.required,
      spellCheck: this.props.spellCheck,
      src: this.props.src,
      step: this.props.step,
      suffix: this.props.suffix,
      token: this.props.token,
      type: this.props.type,
      value: this.props.value,
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {label && (
            <span className="vtex-input__label db mb3 w-100 c-on-base">
              {label}
            </span>
          )}
          <div className="flex">
            <Input
              onMouseOver={this.handleMouseOver}
              onMouseOut={this.handleMouseOut}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              groupActive={active}
              groupHover={hover}
              groupRight
              size={size}
              disabled={loading || disabled}
              {...inputProps}
            />
            <ButtonWithIcon
              isLoading={loading}
              variation="tertiary"
              type="submit"
              groupActive={active}
              groupHover={hover}
              groupLeft
              icon={buttonIcon}
              iconPosition={buttonIconPosition}
              size={size}
              disabled={buttonDisabled || disabled}>
              {buttonLabel}
            </ButtonWithIcon>
          </div>
          {errorMessage && (
            <div className="c-danger t-small mt3 lh-title">{errorMessage}</div>
          )}
          {helpText && (
            <div className="c-muted-1 t-small mt3 lh-title">{helpText}</div>
          )}
        </label>
      </form>
    )
  }
}

const InputWithActionWithRef = React.forwardRef((props, ref) => (
  <InputWithAction {...props} forwardedRef={ref} />
))

InputWithActionWithRef.displayName = 'InputWithAction'

export default InputWithActionWithRef
