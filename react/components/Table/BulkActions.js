import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '../Button'
import ButtonWithIcon from '../ButtonWithIcon'
import ActionMenu from '../ActionMenu'
import Close from '../icon/Close'

const close = <Close />

class BulkActions extends PureComponent {
  render() {
    const {
      hasPrimaryBulkAction,
      hasSecondaryBulkActions,
      selectedRows,
      bulkActions,
      allLinesSelected,
      onSelectAllLines,
      onDeselectAllLines,
    } = this.props

    const hasBulkActions = hasPrimaryBulkAction || hasSecondaryBulkActions
    const hasRowsSelected = selectedRows.length > 0

    const bulkActionsReturnedParameters = allLinesSelected
      ? { allLinesSelected: true }
      : { selectedRows }

    return (
      <div
        className={classNames(
          'flex flex-row justify-between bg-action-primary c-on-action-primary br3 br--top ph4',
          {
            pv4: hasRowsSelected,
          }
        )}
        style={{
          height: hasRowsSelected ? '56px' : 0,
          overflow: hasRowsSelected ? 'auto' : 'hidden',
          transition: 'height 0.3s ease-out, padding 0.3s ease',
        }}>
        {hasBulkActions && (
          <div className="flex flex-row">
            {hasPrimaryBulkAction && (
              <div className="mr4">
                <Button
                  variation="secondary"
                  size="small"
                  onClick={() =>
                    bulkActions.main.onClick(bulkActionsReturnedParameters)
                  }>
                  {bulkActions.main.label}
                </Button>
              </div>
            )}
            {hasSecondaryBulkActions && (
              <ActionMenu
                label={bulkActions.texts.secondaryActionsLabel}
                buttonProps={{ variation: 'secondary', size: 'small' }}
                options={bulkActions.others.map(el => ({
                  label: el.label,
                  onClick: () => el.onClick(bulkActionsReturnedParameters),
                }))}
              />
            )}
          </div>
        )}
        <div className="tr flex flex-row items-center">
          {!allLinesSelected && bulkActions && bulkActions.texts && (
            <span className="mr4 c-muted-4">
              {selectedRows.length} {bulkActions.texts.rowsSelected}
            </span>
          )}
          <span className="mr2">
            {allLinesSelected ? (
              bulkActions &&
              bulkActions.texts && (
                <span>
                  {bulkActions.texts.allRowsSelected}{' '}
                  <span className="b">{bulkActions.totalItems}</span>
                </span>
              )
            ) : (
              <Button onClick={() => onSelectAllLines()}>
                <span className="ttu">
                  {bulkActions &&
                    `${bulkActions.texts && bulkActions.texts.selectAll} ${
                      bulkActions.totalItems
                    }`}
                </span>
              </Button>
            )}
          </span>
          <ButtonWithIcon icon={close} onClick={() => onDeselectAllLines()} />
        </div>
      </div>
    )
  }
}

BulkActions.defaultProps = {
  hasPrimaryBulkAction: false,
  hasSecondaryBulkActions: false,
  allLinesSelected: false,
  selectedRows: [],
  bulkActions: {},
  onSelectAllLines: () => {},
}

BulkActions.propTypes = {
  hasPrimaryBulkAction: PropTypes.bool,
  hasSecondaryBulkActions: PropTypes.bool,
  allLinesSelected: PropTypes.bool,

  selectedRows: PropTypes.array,
  bulkActions: PropTypes.object,

  onSelectAllLines: PropTypes.func,
  onDeselectAllLines: PropTypes.func.isRequired,
}

export default BulkActions
