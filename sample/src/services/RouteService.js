import { Service } from 'lib';

export default class RouteService extends Service {

    static defaultValues = {
        route: 'comparing'
    };

    constructor(sn) {
        super(sn);
        this._route = RouteService.defaultValues.route;
    }

    get route() { return this._route; }
    set route(val) { this._route = val; }

}