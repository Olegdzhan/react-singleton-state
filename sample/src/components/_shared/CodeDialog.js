import React from 'react';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default ({
    children,
    onClose,
    isOpen
}) => (
    <Dialog
        open={isOpen}
        actions={[
            <RaisedButton
                label="Back"
                onTouchTap={onClose}
                primary={true}
                disableTouchRipple={true}
                disableFocusRipple={true}
            />
        ]}
        onRequestClose={onClose}
        modal={false}
    >
        <code><pre>{children}</pre></code>
    </Dialog>
);