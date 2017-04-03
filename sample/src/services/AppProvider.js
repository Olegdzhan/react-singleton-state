import { Provider, providerExporter } from 'lib';

import RouteService from './RouteService';

class AppProvider extends Provider {

    defineServices() {
        this.RouteService = new RouteService('RouteService');
    }

}

export default providerExporter(AppProvider);