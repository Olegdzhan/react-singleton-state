import { Component } from 'react';
import { Service } from './lib';

export default (() => {

    const _private = {
        ArraySetter(serviceInState, props, reactUpdate) {
            return {
                set: values => {
                    if (!Array.isArray(values)) {
                        throw new TypeError('you have to set an array of values if you put an array of props as a closure argument');
                    }
                    if (props.length !== values.length) {
                        throw  new Error(`reRender(): the number of props (have been set ${props.length}) has to be equal to the number of values (have been set ${values.length}`);
                    }
                    for (let i in props) {
                        serviceInState[props[i]] = values[i];
                    }
                    reactUpdate();
                },
                setDefault: () => {
                    for (let prop of props) {
                        serviceInState.toDefault(prop);
                    }
                    reactUpdate();
                }
            };
        },
        StringSetter(serviceInState, prop, reactUpdate) {
            return {
                set: val => {
                    serviceInState[prop] = val;
                    reactUpdate();
                },
                setDefault: () => {
                    serviceInState.toDefault(prop);
                    reactUpdate();
                }
            };
        },
        UndefinedSetter(serviceInState, reactUpdate) {
            return {
                set: obj => {
                    for (let field in obj) {
                        serviceInState[field] = obj[field];
                    }
                    reactUpdate();
                },
                setDefault: () => {
                    serviceInState.defaultAll();
                    reactUpdate();
                }
            };
        }
    };

    class ComponentService extends Component {

        _injectServices(services, merging = InjectMerging.BEFORE) {
            let inject = {};
            for (let Srv of services) {
                if (Srv instanceof Service) {
                    inject[Srv.serviceName] = Srv;
                } else {
                    console.warn('Only instances of Service class can be pushed as arguments into _injectServices() method!')
                }
            }
            switch(merging) {
                case InjectMerging.BEFORE:
                    this.state = {
                        ...inject,
                        ...this.state
                    };
                    break;
                case InjectMerging.AFTER:
                    this.state = {
                        ...this.state,
                        ...inject
                    };
                    break;
            }

        }

        _bindMethods() {
            for (let method of arguments) {
                if (Array.isArray(method)) {
                    this[method[0]] = this[method[0]].bind(this, ...method.slice(1));
                } else {
                    this[method] = this[method].bind(this);
                }
            }
        }

        reRender(Srv) {
            let data;
            if (typeof Srv === 'string') {
                data = this.state[Srv];
            } else if (Srv instanceof Service) {
                data = this.state[Srv.serviceName];
            } else {
                throw new TypeError('an argument of service() method can be only an instance of Service class or serviceName string');
            }

            return (props) => {
                if (Array.isArray(props)) {
                    return _private.ArraySetter(data, props, this.forceUpdate.bind(this));
                } else if (typeof props === 'string') {
                    return _private.StringSetter(data, props, this.forceUpdate.bind(this));
                } else {
                    return _private.UndefinedSetter(data, this.forceUpdate.bind(this));
                }

            };
        }

    }

    return ComponentService;

})();

export const InjectMerging = {
    AFTER: 'AFTER',
    BEFORE: 'BEFORE'
};