import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export class FooterLink extends Component {
    static propTypes = {
        children: PropTypes.node,
        onFiltered: PropTypes.func,
        currentFilter: PropTypes.string
    };

    render() {
        const { onFiltered, children } = this.props;

        return (
            <span onClick={onFiltered}>{children}</span>
        );
    }
}