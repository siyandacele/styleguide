import React from 'react'
import PropTypes from 'prop-types'

const Box = ({ children, noPadding }) => {
  const padding = noPadding ? '' : 'pa7-ns'
  return (
    <div
      className={`styleguide__box bg-base t-body c-on-base ${padding} br3-ns b--muted-4 bt bb bl-ns br-ns`}>
      {children}
    </div>
  )
}

Box.propTypes = {
  /** Content of the box */
  children: PropTypes.node.isRequired,
  /** Use the full size of the box. */
  noPadding: PropTypes.bool,
}

export default Box
