import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ButtonWithIcon from '../ButtonWithIcon'
import IconClose from '../icon/Close'

import FilterTag from './FilterTag'

const HEAVY_ICON_OPTICAL_COMPENSATION = { marginTop: '1px' }

const isStatementComplete = st => st.subject && st.verb && st.object
const filterExtraOptions = (options, alwaysVisibleFilters, statements) => {
  return Object.keys(options)
    .filter(
      key =>
        !alwaysVisibleFilters.includes(key) &&
        !statements.some(st => st.subject === key && st.object)
    )
    .reduce(
      (filteredOptions, key) => ({ ...filteredOptions, [key]: options[key] }),
      {}
    )
}

const FILTER_VALUE_LABEL_MAX_LENGTH = 17
const truncateFilterValue = filterValue =>
  `${filterValue.substring(0, FILTER_VALUE_LABEL_MAX_LENGTH)}${
    filterValue.length <= FILTER_VALUE_LABEL_MAX_LENGTH ? '' : '…'
  }`

class FilterBar extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      visibleExtraOptions: [],
    }
  }

  toggleExtraFilterOption = key => {
    const { visibleExtraOptions } = this.state
    const newVisibleExtraOptions = [
      ...(visibleExtraOptions.indexOf(key) === -1 ? [key] : []),
      ...visibleExtraOptions.filter(op => op !== key),
    ]
    this.setState({ visibleExtraOptions: newVisibleExtraOptions })
  }

  handleSubmitFilter = st => {
    const { statements } = this.props
    const hasStatement = statements.some(_st => _st.subject === st.subject)
    if (hasStatement) {
      const newStatements = statements.map(_st => {
        if (_st.subject === st.subject) {
          return {
            ..._st,
            ...st,
          }
        }
        return _st
      })
      this.changeStatementsCallback(newStatements)
    } else {
      const newStatements = statements.slice(0)
      newStatements.push(st)
      this.changeStatementsCallback(newStatements)
    }
  }

  handleMoreOptionsSelected = st => {
    if (isStatementComplete(st)) {
      this.handleSubmitFilter(st)
      this.toggleExtraFilterOption(st.subject)
    }
  }

  handleFilterClear = subject => {
    const { alwaysVisibleFilters, options, statements } = this.props
    const newStatements = statements.map(_st => {
      if (_st.subject === subject) {
        return {
          subject: subject,
          verb: options[subject].verbs[0].value,
        }
      }
      return _st
    })
    this.changeStatementsCallback(newStatements)
    !alwaysVisibleFilters.includes(subject) &&
      this.toggleExtraFilterOption(subject)
  }

  changeStatementsCallback = statements => {
    this.props.onChangeStatements(statements)
  }

  handleClearAllfilters = () => {
    this.setState({ visibleExtraOptions: [] })
    this.changeStatementsCallback([])
  }

  render() {
    const {
      options,
      moreOptionsLabel,
      alwaysVisibleFilters,
      clearAllFiltersButtonLabel,
      statements,
      collapseLeft,
      subjectPlaceholder,
      submitFilterLable,
      newFilterLable,
    } = this.props
    const { visibleExtraOptions } = this.state
    const optionsKeys = Object.keys(options)

    return (
      optionsKeys.length > 0 && (
        <div className={`flex flex-wrap ${collapseLeft ? 'nl5' : ''}`}>
          {optionsKeys
            .filter(
              key =>
                alwaysVisibleFilters.includes(key) ||
                visibleExtraOptions.includes(key)
            )
            .map(subject => {
              const statement = statements.find(st => st.subject === subject)
              return (
                <div key={`VTEX__filter_option--${subject}`} className="ma2">
                  <FilterTag
                    alwaysVisible={alwaysVisibleFilters.includes(subject)}
                    getFilterLabel={() => {
                      const label =
                        options[subject] &&
                        options[subject].renderFilterLabel(statement)
                      return (
                        (label &&
                          typeof label === 'string' &&
                          truncateFilterValue(label)) ||
                        '…'
                      )
                    }}
                    submitFilterLable={submitFilterLable}
                    subject={subject}
                    options={options}
                    statements={statements}
                    onClickClear={() => this.handleFilterClear(subject)}
                    onSubmitFilterStatement={this.handleSubmitFilter}
                  />
                </div>
              )
            })}
          {alwaysVisibleFilters.length + visibleExtraOptions.length !==
            optionsKeys.length && (
            <div className="ma2">
              <FilterTag
                isMoreOptions
                subjectPlaceholder={subjectPlaceholder}
                getFilterLabel={() => moreOptionsLabel}
                submitFilterLable={submitFilterLable}
                newFilterLable={newFilterLable}
                options={{
                  ...filterExtraOptions(
                    options,
                    alwaysVisibleFilters,
                    statements
                  ),
                }}
                statements={[]}
                onSubmitFilterStatement={this.handleMoreOptionsSelected}
              />
            </div>
          )}
          {clearAllFiltersButtonLabel &&
            statements.some(st => !!st && !!st.object) && (
              <div className="ml-auto mt1">
                <ButtonWithIcon
                  icon={
                    <span
                      className="flex items-center c-muted-2"
                      style={HEAVY_ICON_OPTICAL_COMPENSATION}>
                      <IconClose size={13} />
                    </span>
                  }
                  size="small"
                  variation="tertiary"
                  onClick={this.handleClearAllfilters}>
                  <span className="c-muted-2">
                    {clearAllFiltersButtonLabel}
                  </span>
                </ButtonWithIcon>
              </div>
            )}
        </div>
      )
    )
  }
}

FilterBar.defaultProps = {
  options: [],
  moreOptionsLabel: 'More',
  alwaysVisibleFilters: [],
  collapseLeft: false,
  subjectPlaceholder: 'Select a filter…',
  submitFilterLable: 'Ok',
  newFilterLable: 'New Filter',
}

FilterBar.propTypes = {
  /** filter options (mirroring statements from Conditions component) */
  options: PropTypes.object.isRequired,
  /** filter statements (mirroring statements from Conditions component) */
  statements: PropTypes.array,
  /** Filters change callback: returns array of statement definitions */
  onChangeStatements: PropTypes.func.isRequired,
  /** lable for MORE options */
  moreOptionsLabel: PropTypes.string,
  /** filter options that are always visible outside MORE options */
  alwaysVisibleFilters: PropTypes.arrayOf(PropTypes.string),
  /** if this label is passed, when some filter is not empty a clear all button will appear */
  clearAllFiltersButtonLabel: PropTypes.string,
  /** Cancels out left padding */
  collapseLeft: PropTypes.bool,
  /** Subject select placeholder inside 'More options' */
  subjectPlaceholder: PropTypes.string,
  /** Submit button lable for statement inside FilterTag */
  submitFilterLable: PropTypes.string,
  /** New Filter title lable for inside the 'More options' menu */
  newFilterLable: PropTypes.string,
}

export default FilterBar
