import Service from './Service';

export default (Singletons) => {
    const notValid = Singletons.find(Singleton => !(Singleton instanceof Service));
    if (notValid) {
        console.error('Cannot put not Service instances as enclose arguments');
        return [undefined];
    }
    return Singletons.map(Singleton => Object.freeze(Singleton));
};