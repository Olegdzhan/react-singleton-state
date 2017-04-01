import { Component } from 'react';
import { Service } from './lib';

export default class ComponentService extends Component {

    _injectServices() {
        let inject = {};
        for (let Srv of arguments) {
            if (Srv instanceof Service) {
                inject[Srv.serviceName] = Srv;
            } else {
                console.warn('Only instances of Service class can be pushed as arguments into _injectServices() method!')
            }
        }
        return inject;
    }

    reRender(Srv) {
        let data, serviceName;
        if (typeof Srv === 'string') {
            data = this.state[Srv];
            serviceName = Srv;
        } else if (Srv instanceof Service) {
            data = this.state[Srv.serviceName];
            serviceName = Srv.serviceName;
        } else {
            throw new TypeError('an argument of service() method can be only an instance of Service class or serviceName string');
        }

        return (props) => {
            if (Array.isArray(props)) {
                return {
                    set: values => {
                        if (!Array.isArray(values)) {
                            throw new TypeError('you have to set an array of values if you put an array of props as a closure argument');
                        }
                        if (props.length !== values.length) {
                            throw  new Error(`the number of props (has been set ${props.length}) has to be equal to the number of values (has been set ${values.length}`);
                        }
                        for (let i in props) {
                            data[props[i]] = values[i];
                        }
                        this.forceUpdate();
                    },
                    setDefault: () => {
                        for (let prop of props) {
                            data.toDefault(prop);
                        }
                        this.forceUpdate();
                    }

                }
            } else if (typeof props === 'string') {
                return {
                    set: val => {
                        data[props] = val;
                        this.forceUpdate();
                    },
                    setDefault: () => {
                        data.toDefault(props);
                        this.forceUpdate();
                    }
                }
            } else {
                return {
                    set: obj => {
                        for (let field in obj) {
                            data[field] = obj[field];
                        }
                        this.forceUpdate();
                    },
                    setDefault: () => {
                        data.defaultAll();
                        this.forceUpdate();
                    }
                };
            }

        };
    }

}