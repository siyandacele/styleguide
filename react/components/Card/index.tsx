import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

interface Props {
  children: React.ReactNode
  noPadding: boolean
}

class Card extends PureComponent<Props> {
  public static propTypes = {
    /** Content of the card */
    children: PropTypes.node.isRequired,
    /** Use the full size of the card. */
    noPadding: PropTypes.bool,
  }

  public render() {
    const { children, noPadding } = this.props
    const padding = noPadding ? '' : 'pa6'

    return (
      <div
        style={{ boxShadow: '0 3px 9px 0 rgba(61, 62, 64, 0.2)' }}
        className={`vtex-card card w-100 b2 br2 bg-base c-on-base ${padding}`}>
        {children}
      </div>
    )
  }
}

export default Card
