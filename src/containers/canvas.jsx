import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import { connect } from 'react-redux';

class Stage extends React.Component {
    constructor(props) {
        super(props);
        // Create a new canvas element
        this.canvas = document.createElement('canvas');
    }
    
    componentDidMount() {
        // Append the canvas element to the component's container
        this.stageCanvasWrapper.appendChild(this.canvas);
        
        // You can continue with your canvas setup and initialization here
        // For example, setting canvas size, obtaining context, etc.
    }

    render() {
        return (
            <div ref={(ref) => { this.stageCanvasWrapper = ref; }}>
                {/* This div serves as a wrapper for the canvas element */}
            </div>
        );
    }
}

export default Stage;
