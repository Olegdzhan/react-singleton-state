const Service = (() => {

    let instance = null;

    class Service {
        constructor() {
            if (!instance) {
                instance = this;
            }
            if (typeof instance.defineProperties === 'function') instance.defineProperties();

            return instance;
        }
    }

    return Service;

})();

export default Service;