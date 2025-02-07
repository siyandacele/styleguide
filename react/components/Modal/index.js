import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ResponsiveModal from 'react-responsive-modal'

import TopBar from './TopBar'
import BottomBar from './BottomBar'
import { mh100, scrollBar } from './global.css'
import './modal.global.css'

class Modal extends PureComponent {
  constructor(props) {
    super(props)
    this.contentContainerReference = React.createRef()
    this.state = { shadowBottom: false, shadowTop: false }
  }

  componentDidMount() {
    this.setShadowState(this.contentContainerReference.current)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen)
      this.setShadowState(this.contentContainerReference.current)
  }

  handleScroll = event => {
    this.setShadowState(event.target)
  }

  setShadowState = element => {
    if (!element) return

    const { scrollTop, scrollHeight, clientHeight } = element

    this.setState({ shadowTop: scrollTop !== 0 })
    this.setState({ shadowBottom: scrollHeight - scrollTop !== clientHeight })
  }

  render = () => {
    const {
      isOpen,
      centered,
      onClose,
      closeOnEsc,
      closeOnOverlayClick,
      showCloseIcon,
      bottomBar,
      title,
      children,
      responsiveFullScreen,
    } = this.props
    const { shadowBottom, shadowTop } = this.state

    return (
      <ResponsiveModal
        open={isOpen}
        little={centered}
        onClose={onClose}
        closeOnEsc={closeOnEsc}
        closeOnOverlayClick={closeOnOverlayClick}
        showCloseIcon={false && showCloseIcon}
        classNames={{
          overlay: `vtex-modal__overlay ${
            responsiveFullScreen ? 'pa5-ns pa0' : ''
          }`,
          modal: `vtex-modal__modal ${
            responsiveFullScreen
              ? 'br2-ns w-100 w-auto-ns h-100 h-auto-ns'
              : 'br2'
          } ${mh100} flex flex-column`,
          closeIcon: 'vtex-modal__close-icon',
        }}
        styles={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 10000,
          },
          modal: {
            padding: 0,
          },
          closeIcon: {
            top: '8px',
            right: '8px',
            padding: '10px',
          },
        }}
        closeIconSize={18}>
        <TopBar
          title={title}
          onClose={onClose}
          showBottomShadow={shadowTop}
          responsiveFullScreen={responsiveFullScreen}
        />
        <div
          className={`${
            responsiveFullScreen ? 'ph7 ph8-ns' : 'ph8'
          } overflow-auto flex-shrink-1 flex-grow-1 ${
            bottomBar ? '' : 'pb8'
          } ${scrollBar}`}
          ref={this.contentContainerReference}
          onScroll={this.handleScroll}>
          {children}
        </div>
        {bottomBar ? (
          <BottomBar
            showTopShadow={shadowBottom}
            responsiveFullScreen={responsiveFullScreen}>
            {bottomBar}
          </BottomBar>
        ) : (
          ''
        )}
      </ResponsiveModal>
    )
  }
}

Modal.defaultProps = {
  isOpen: false,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  showCloseIcon: true,
}

Modal.propTypes = {
  /** Content of the modal */
  children: PropTypes.node.isRequired,
  /** Center the modal (for small content) */
  centered: PropTypes.bool,
  /** Show or hide the modal */
  isOpen: PropTypes.bool.isRequired,

  onClose: PropTypes.func.isRequired,

  /** Close the modal on ESC key press (default true) */
  closeOnEsc: PropTypes.bool,
  /** Close the modal on overlay click (default true) */
  closeOnOverlayClick: PropTypes.bool,
  /** Show the close icon on upper right corner (default true) */
  showCloseIcon: PropTypes.bool,
  /** Node to be displayed as the bottom bar of the modal. */
  bottomBar: PropTypes.node,
  /** Modal title to be displayed in top of the modal. */
  title: PropTypes.string,
  /** If true, the modal will expand to fullscreen in small view ports (e.g. mobile) */
  responsiveFullScreen: PropTypes.bool,
}

export default Modal
