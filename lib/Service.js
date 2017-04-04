export default class Service {

    constructor(serviceName) {
        this._serviceName = serviceName;
    }
    get serviceName() { return this._serviceName  }

    toDefault(prop) {
        this[prop] = (this._classType && this._classType.defaultValues[prop]) || this.constructor.defaultValues[prop]; //ToDo: remove _classType v1.1.0
    }

    defaultAll() {
        const defaults = (this._classType && this._classType.defaultValues) || this.constructor.defaultValues; //ToDo: remove _classType v1.1.0
        for (val in defaults) {
            this[val] = defaults[val];
        }
    }

    //ToDo: remove getClass() v.1.1.0
    getClass(classType) {
        console.warn('Service.getClass() is deprecated and will be removed since v1.1.0');
        this._classType = classType;
    }

}