import React         from 'react';
import { Component } from 'lib';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar           from 'material-ui/AppBar';
import FlatButton       from 'material-ui/FlatButton';

import AppBarTitle      from 'components/Navigation/AppBarTitle';
import AppBarNav        from 'components/Navigation/AppBarNav';
import RouteContainer   from 'containers/RouteContainer';

import './app.styl';

import AppProvider from 'services/AppProvider';
const { RouteService } = AppProvider;

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            RouteService
        };
        this._bindMethods('onChangeRoute');
    }

    onChangeRoute(route) {
        this.reRender(RouteService)('route').set(route);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title={<AppBarTitle>React Singleton State</AppBarTitle>}
                        iconElementLeft={<AppBarNav onItemTap={this.onChangeRoute} />}
                        iconElementRight={<FlatButton label="Docs" color="white" />}
                    />
                    <RouteContainer route={RouteService.route}/>
                </div>
            </MuiThemeProvider>
        );
    }

}