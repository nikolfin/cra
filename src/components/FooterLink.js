import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class FooterLink extends PureComponent {

    static propTypes = {
        children: PropTypes.node.isRequired,
        onFiltered: PropTypes.func.isRequired
    };

    render() {
        const { children } = this.props;

        return(
            <Fragment>{children}</Fragment>
        )
    }
}
