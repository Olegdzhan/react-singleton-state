import React from 'react';
import ComparingContainer from 'containers/ComparingContainer';

import './routeContainer.styl';

export default ({
    route,
    children
}) => (
    <div className="routeContainer">
        {(() => {
            switch(route) {
                case 'comparing':
                    return <ComparingContainer/>;
                default:
                    return <h1 className="title">{route}</h1>;
            }
        })()}
    </div>
);