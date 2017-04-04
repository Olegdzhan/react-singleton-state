import React from 'react';
import './routeContainer.styl';

const styles = {

};

export default ({
    title,
    children
}) => (
    <div className="routeContainer">
        <h1 className="title">{title}</h1>
    </div>
);