export default class Service {

    constructor(serviceName) {
        this._serviceName = serviceName;
    }
    get serviceName() { return this._serviceName; }

    toDefault(prop) {
        this[prop] = this._classType.defaultValues[prop];
    }

    defaultAll() {
        for (val in this._classType.defaultValues) {
            this[val] = this._classType.defaultValues[val];
        }
    }

    getClass(classType) {
        this._classType = classType;
    }

}