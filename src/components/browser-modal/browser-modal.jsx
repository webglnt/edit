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
};

BrowserModal.propTypes = {
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool
};

const WrappedBrowserModal = injectIntl(BrowserModal);

WrappedBrowserModal.setAppElement = ReactModal.setAppElement;

export default WrappedBrowserModal;
