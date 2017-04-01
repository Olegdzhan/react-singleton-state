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

    service(Srv) {
        let data;
        if (typeof Srv === 'string') {
            data = this.state[Srv];
        } else if (Srv instanceof Service) {
            data = this.state[Srv.serviceName];
        } else {
            throw new TypeError('an argument of service() method can be only an instance of Service class or serviceName string');
        }

        return propperty => ({
            get: () => data[propperty],
            set: value => {
                Srv[propperty] = value;
                this.forceUpdate();
            }
        });
    }

}