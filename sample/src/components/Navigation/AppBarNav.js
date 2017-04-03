import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

export default class AppBarNav extends Component {

    render() {
        const { onItemTap } = this.props;
        return (
            <IconMenu iconButtonElement={
                <IconButton>
                    <MenuIcon color="white" hoverColor="black"/>
                </IconButton>
            }>
                <MenuItem primaryText="Compare with Redux" onTouchTap={onItemTap.bind(null, 'comparing')} />
                <MenuItem primaryText="Create tasks" onTouchTap={onItemTap.bind(null, 'planning')} />
                <MenuItem primaryText="ToDo List" onTouchTap={onItemTap.bind(null, 'todo')} />
            </IconMenu>
        );
    }

}