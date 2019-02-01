import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'
import ButtonWithIcon from '../ButtonWithIcon'

class InputWithAction extends Component {
  static propTypes = {
    /** Icon for the action button */
    buttonIcon: PropTypes.node,
    /** Whether the action button should be in a disabled state or not, keeping the input enabled.
     * Contrast with the disabled prop */
    buttonDisabled: PropTypes.bool,
    /** Label for the action button */
    buttonLabel: PropTypes.string,
    /** Position for the icon on the action button */
    buttonIconPosition: PropTypes.oneOf(['left', 'right']),
    /** Sets a loading state only on the action button, but keeps the input open.
     * Contrast with the loading prop */
    buttonLoading: PropTypes.bool,
    /** Error state for the entire component */
    error: PropTypes.bool,
    /** Disabled state for the entire component */
    disabled: PropTypes.bool,
    /** Loading state for the entire component, disabling the input */
    loading: PropTypes.bool,
    /** Text of the input label */
    label: PropTypes.node,
    /** Help text */
    helpText: PropTypes.node,
    /** Error message */
    errorMessage: PropTypes.node,
    /** Size of the component */
    size: PropTypes.oneOf(['small', 'regular', 'large']),
    /** Event called when the action button or enter/return is pressed */
    onSubmit: PropTypes.func.isRequired,
    /** @ignore Internal prop used for ref forwarding */
    forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    /** Type attribute for the input */
    type: PropTypes.string,
    /** Token mode for the input element */
    token: PropTypes.bool,
    /** onChange event*/
    onChange: PropTypes.func,
    /** onKeyDown event */
    onKeyDown: PropTypes.func,
    /** onKeyPress event */
    onKeyPress: PropTypes.func,
    /** onKeyUp event */
    onKeyUp: PropTypes.func,
    /** onFocus event */
    onFocus: PropTypes.func,
    /** onBlur event */
    onBlur: PropTypes.func,
    /** Input value */
    value: PropTypes.string,
    /** Input prefix */
    prefix: PropTypes.node,
    /** Input suffix */
    suffix: PropTypes.node,
    /** name attribute of the input element */
    name: PropTypes.string,
    /** id attribute for the input element */
    id: PropTypes.string,
    /** Spec attribute */
    accept: PropTypes.string,
    /** Spec attribute */
    autoComplete: PropTypes.string,
    /** Spec attribute */
    autoCorrect: PropTypes.string,
    /** Spec attribute */
    autoFocus: PropTypes.bool,
    /** Spec attribute */
    autoSave: PropTypes.string,
    /** Spec attribute */
    dataAttributes: PropTypes.object,
    /** Spec attribute */
    defaultValue: PropTypes.string,
    /** Spec attribute */
    inputMode: PropTypes.string,
    /** Spec attribute */
    list: PropTypes.string,
    /** Spec attribute */
    max: PropTypes.string,
    /** Spec attribute */
    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Spec attribute */
    min: PropTypes.string,
    /** Spec attribute */
    minLength: PropTypes.string,
    /** Spec attribute */
    multiple: PropTypes.bool,
    /** Spec attribute */
    pattern: PropTypes.string,
    /** Spec attribute */
    placeholder: PropTypes.string,
    /** Spec attribute */
    step: PropTypes.string,
    /** Spec attribute */
    src: PropTypes.string,
    /** Spec attribute */
    readOnly: PropTypes.bool,
    /** Spec attribute */
    required: PropTypes.bool,
    /** Spec attribute */
    spellCheck: PropTypes.string,
  }

  state = {
    active: false,
    hover: false,
  }

  constructor(props) {
    super(props)
    this.input = React.createRef()
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
    if (this.props.loading || this.props.buttonLoading) {
      return
    }
    const inputElement = this.input.current
    event.value = this.props.value || (inputElement && inputElement.value)
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
      buttonLoading,
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
              ref={this.input}
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
              isLoading={loading || buttonLoading}
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
