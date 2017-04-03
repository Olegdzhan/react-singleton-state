import React from 'react';

const styles = {
    span: {
        cursor: 'pointer'
    }
};

export default props => (
    <span style={styles.span}>{props.children}</span>
);