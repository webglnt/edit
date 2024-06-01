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
    
    // Set canvas size
    this.canvas.width = 480;
    this.canvas.height = 360;

    // Obtain 2D context
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Could not get 2D canvas context: this browser or environment may not support the 2D canvas API.');
    }

    // You can continue with additional canvas setup and initialization here
    // For example, setting up event listeners, drawing initial content, etc.
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
