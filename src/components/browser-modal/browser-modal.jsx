import { defineMessages, FormattedMessage, intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import { isRendererSupported, isNewFunctionSupported, findIncompatibleUserscripts } from '../../lib/tw-environment-support-prober.js';
import styles from './browser-modal.css';
import unhappyBrowser from './unsupported-browser.svg';
import CloseButton from '../close-button/close-button.jsx'; // Import CloseButton component

const messages = defineMessages({
    label: {
        id: 'gui.unsupportedBrowser.label',
        defaultMessage: 'Browser is not supported',
        description: ''
    }
});

const LearnMore = props => (
    <React.Fragment>
        {' '}
        <DocumentationLink {...props}>
            <FormattedMessage
                defaultMessage="Learn more."
                id="gui.alerts.cloudInfoLearnMore"
            />
        </DocumentationLink>
    </React.Fragment>
);

const BrowserModal = ({ intl, ...props }) => {
    const [isOpen, setIsOpen] = useState(true);
    const label = messages.label;
    const incompatibleUserscripts = findIncompatibleUserscripts();

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <ReactModal
            isOpen={isOpen}
            className={styles.modalContent}
            contentLabel={intl.formatMessage({ ...messages.label })}
            overlayClassName={styles.modalOverlay}
            onRequestClose={handleClose}
        >
            <div dir={props.isRtl ? 'rtl' : 'ltr'}>
                <Box className={styles.header}>
                    <CloseButton size={CloseButton.SIZE_LARGE} onClick={handleClose} />
                    <h2>
                        <FormattedMessage {...label} />
                    </h2>
                </Box>

                <Box className={styles.illustration}>
                    <img
                        src={unhappyBrowser}
                        draggable={false}
                    />
                </Box>

                <Box className={styles.body}>
                    {/* Rest of the modal content */}
                </Box>
            </div>
        </ReactModal>
    );
};

BrowserModal.propTypes = {
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool
};

export default injectIntl(BrowserModal);
