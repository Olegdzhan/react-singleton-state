import React from 'react';
import { Component } from 'lib';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import CodeDialog from 'components/_shared/CodeDialog';

import AppProvider from 'services/AppProvider';
const { ComparingService } = AppProvider;

const HANDLING = {
    AGAIN: 'again',
    NEXT: 'next',
    PREV: 'prev'
};

export default class Comparison extends Component {

    state = {
        ComparingService
    };

    onHandle(handling) {
        const { serviceProp } = this.props;
        switch(handling) {
            case HANDLING.AGAIN:
                this.reRender(ComparingService)(serviceProp).set(0);
                break;
            case HANDLING.NEXT:
                this.reRender(ComparingService)(serviceProp).set(ComparingService[serviceProp]+1);
                break;
            case HANDLING.PREV:
                this.reRender(ComparingService)(serviceProp).set(ComparingService[serviceProp]-1);
        }
    }

    onToggleCodeDialog(bool) {
        this.reRender(ComparingService)('dialogIsOpened').set(bool);
    }

    renderNavigation() {
        const { serviceProp, info } = this.props;
        const maxLength = info.length - 1;
        return (
            <div className="b-stepper__nav">
                <RaisedButton
                    label={ComparingService[serviceProp] < maxLength ? "Next" : "<< Again"}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={
                        ComparingService[serviceProp] < maxLength
                            ? this.onHandle.bind(this, HANDLING.NEXT)
                            : this.onHandle.bind(this, HANDLING.AGAIN)
                    }
                />
                {ComparingService[serviceProp] > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={ComparingService[serviceProp] === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={this.onHandle.bind(this, HANDLING.PREV)}
                    />
                )}
            </div>
        );
    }

    renderSteps() {
        const { info } = this.props;
        return info.map(( {label, content, code}, i ) => (
            <Step key={`comparingStep-${i}`}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                    <p>{content}</p>
                    <CodeDialog
                        isOpen={ComparingService.dialogIsOpened}
                        onClose={this.onToggleCodeDialog.bind(this, false)}
                    >{code}</CodeDialog>
                    <FlatButton
                        label="Show code"
                        secondary={true}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={this.onToggleCodeDialog.bind(this, true)}
                    />
                    {this.renderNavigation()}
                </StepContent>
            </Step>
        ));
    }

    render() {
        const { children, serviceProp } = this.props;
        return (
            <div>
                <h3>{children}</h3>
                <Stepper className="b-stepper" activeStep={ComparingService[serviceProp]} orientation="vertical">
                    {this.renderSteps()}
                </Stepper>
            </div>
        );

    }

}