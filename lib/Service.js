export default class Service {

    constructor(serviceName) {
        this._serviceName = serviceName;
    }
    get serviceName() { return this._serviceName; }

}