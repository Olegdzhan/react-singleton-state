import React from 'react';
import { Component } from 'lib';

import Paper from 'material-ui/Paper';

import Comparison from 'components/_shared/Comparison';
import * as INFO from 'constants/ComparisonInfo';

import './comparingContainer.styl';

export default class ComparingContainer extends Component {

    render() {
        return (
            <div className="comparing-container">
                <h1 className="comparing-container__title">Compare redux and react-singleton-state</h1>
                <Paper className="comparing-container__paper" zDepth={2}>
                    <h2>Redux</h2>
                    <Comparison info={INFO.ReduxInject} serviceProp="reduxInjectStep">
                        What you need to inject it:
                    </Comparison>
                    <Comparison info={INFO.ReduxPerform} serviceProp="reduxPerformStep">
                        What you need to get and set data:
                    </Comparison>
                </Paper>
                <Paper className="comparing-container__paper" zDepth={2}>
                    <h2>React Singleton State</h2>
                    <Comparison info={INFO.RssInject} serviceProp="rssInjectStep">
                        What you need to inject it:
                    </Comparison>
                    <Comparison info={INFO.RssPerform} serviceProp="rssPerformStep">
                        What you need to get and set data:
                    </Comparison>
                </Paper>
            </div>
        );
    }

}