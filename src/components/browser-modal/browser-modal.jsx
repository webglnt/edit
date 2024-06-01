import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Modal from '../../containers/modal.jsx';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
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
        contentLabel={props.intl.formatMessage(messages.title)}
        id="settingsModal"
    >
        <Box className={styles.body}>
            <Header>
                <FormattedMessage
                    defaultMessage="Featured"
                    description="Settings modal section"
                    id="tw.settingsModal.featured"
                />
            </Header>
            <CustomFPS
                framerate={props.framerate}
                onChange={props.onFramerateChange}
                onCustomizeFramerate={props.onCustomizeFramerate}
            />
            <Interpolation
                value={props.interpolation}
                onChange={props.onInterpolationChange}
            />
            <HighQualityPen
                value={props.highQualityPen}
                onChange={props.onHighQualityPenChange}
            />
            <WarpTimer
                value={props.warpTimer}
                onChange={props.onWarpTimerChange}
            />
            <Header>
                <FormattedMessage
                    defaultMessage="Remove Limits"
                    description="Settings modal section"
                    id="tw.settingsModal.removeLimits"
                />
            </Header>
            <InfiniteClones
                value={props.infiniteClones}
                onChange={props.onInfiniteClonesChange}
            />
            <RemoveFencing
                value={props.removeFencing}
                onChange={props.onRemoveFencingChange}
            />
            <RemoveMiscLimits
                value={props.removeLimits}
                onChange={props.onRemoveLimitsChange}
            />
            <Header>
                <FormattedMessage
                    defaultMessage="Danger Zone"
                    description="Settings modal section"
                    id="tw.settingsModal.dangerZone"
                />
            </Header>
            {!props.isEmbedded && (
                <CustomStageSize
                    {...props}
                />
            )}
            <DisableCompiler
                value={props.disableCompiler}
                onChange={props.onDisableCompilerChange}
            />
            {!props.isEmbedded && (
                <StoreProjectOptions
                    {...props}
                />
            )}
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
