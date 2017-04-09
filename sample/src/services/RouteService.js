import { Service } from 'lib';

export default class RouteService extends Service {

    static defaultValues = {
        route: 'comparing'
    };

    get route() { return this[Symbol.for('route')]; }
    set route(val) { this[Symbol.for('route')] = val; }

}