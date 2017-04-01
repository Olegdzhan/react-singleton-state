const Provider = (() => {

    let instance = null;

    class Provider {

        constructor() {
            if (!instance) {
                this._urls = {};

                instance = this;

                if (typeof instance.defineServices === 'function') {
                    instance.defineServices();
                } else {
                    throw new Error('You have to define services by describing defineServices() method');
                }

                if (typeof instance.defineUrls === 'function') {
                    let urls = instance.defineUrls();
                    this._destructUrls(urls);
                }
            }
            return instance;
        }
        get urls() { return this._urls; }

        _destructUrls(tree, prevBranch, prevUrl) {
            for (let field in tree) {
                if (typeof tree[field] === 'string' && prevBranch) {
                    this._urls[prevBranch] = prevUrl ? prevUrl+tree[field] : tree[field];
                } else {
                    this._destructUrls(tree[field], field, this._urls[prevBranch]);
                }
            }
        }
    }


    return Provider;

})();

export default Provider;

export const providerExporter = Extender => (() => {
    return new Extender();
})();