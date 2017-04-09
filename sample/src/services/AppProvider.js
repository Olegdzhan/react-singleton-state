import { Provider, providerExporter } from 'lib';

import RouteService from './RouteService';
import ComparingService from './ComparingService';

class AppProvider extends Provider {

    defineServices() {
        this.RouteService = new RouteService('RouteService');
        this.ComparingService = new ComparingService('ComparingService');
    }

}

export default providerExporter(AppProvider);