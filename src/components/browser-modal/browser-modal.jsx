import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { isRendererSupported, isNewFunctionSupported, findIncompatibleUserscripts } from '../../lib/tw-environment-support-prober.js';
import styles from '../tw-settings-modal/settings-modal.css';
import unhappyBrowser from './unsupported-browser.svg';
import CloseButton from '../close-button/close-button.jsx'; // Import CloseButton component

const messages = defineMessages({
    label: {
        id: 'gui.unsupportedBrowser.label',
        defaultMessage: 'Browser is not supported',
        description: ''
    }
});

const BrowserModal = ({ intl, ...props }) => {
    const [isOpen, setIsOpen] = useState(true); // State to manage modal open/close
    const label = messages.label;
    const incompatibleUserscripts = findIncompatibleUserscripts();

    const handleClose = () => {
        setIsOpen(false); // Function to close the modal
    };

    return (
    <Modal
        className={styles.modalContent}
        onRequestClose={props.onClose}
        contentLabel="Missing WebGL"
        id="browserModal"
        >
                    <CloseButton size={CloseButton.SIZE_LARGE} onClick={handleClose} />
            <Box dir={props.isRtl ? 'rtl' : 'ltr'}>
                {/* Header section with close button */}
                <div className={styles.header}>
                </div>

                <Box className={styles.body}>
                        {/* Main content goes here */}
                        {/* eslint-disable max-len */}
                        {isNewFunctionSupported() ? null : (
                            // This message should only be seen by website operators, so we don't need to translate it
                            <p>
                                {'Unable to compile JavaScript with new Function(). This is most likely caused by an overly-strict Content-Security-Policy. The CSP must include \'unsafe-eval\'.'}
                            </p>
                        )}

                        {incompatibleUserscripts.length > 0 && (
                            <React.Fragment>
                                {incompatibleUserscripts.map((message, index) => (
                                    <p key={index}>
                                        {message}
                                    </p>
                                ))}
                            </React.Fragment>
                        )}

                        {!isRendererSupported() && (
                            <React.Fragment>
                                <p>
                                    <FormattedMessage
                                        defaultMessage="Your browser {webGlLink} which is usually needed for Scratch to run. But WebGLn't is designed to run without it!"
                                        description="WebGL missing message. {webGLLink} is a link with the text 'does not support WebGL' from Scratch's translations"
                                        id="tw.webglModal.description"
                                        values={{
                                            webGlLink: (
                                                <a href="https://get.webgl.org/">
                                                    <FormattedMessage
                                                        defaultMessage="does not support WebGL"
                                                        description="link part of your browser does not support WebGL message"
                                                        id="gui.webglModal.webgllink"
                                                    />
                                                </a>
                                            )
                                        }}
                                    />
                                </p>
                            </React.Fragment>
                        )}
                    </Box>
                </Box>
        </Modal>
    );
};

BrowserModal.propTypes = {
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool
};

const WrappedBrowserModal = injectIntl(BrowserModal);

WrappedBrowserModal.setAppElement = ReactModal.setAppElement;

export default WrappedBrowserModal;
