import { Service } from 'lib';

export default class ComparingService extends Service {

    static defaultValues = {
        reduxInjectStep: 0,
        reduxPerformStep: 0,
        rssInjectStep: 0,
        rssPerformStep: 0,
        dialogIsOpened: false
    };

    get reduxInjectStep() { return this[Symbol.for('reduxInjectStep')]; }
    set reduxInjectStep(step) { this[Symbol.for('reduxInjectStep')] = step; }

    get reduxPerformStep() { return this[Symbol.for('reduxPerformStep')]; }
    set reduxPerformStep(step) { this[Symbol.for('reduxPerformStep')] = step; }

    get rssInjectStep() { return this[Symbol.for('rssInjectStep')]; }
    set rssInjectStep(step) { this[Symbol.for('rssInjectStep')] = step; }

    get rssPerformStep() { return this[Symbol.for('rssPerformStep')]; }
    set rssPerformStep(step) { this[Symbol.for('rssPerformStep')] = step; }

    get dialogIsOpened() { return this[Symbol.for('dialogIsOpened')]; }
    set dialogIsOpened(bool) { this[Symbol.for('dialogIsOpened')] = bool; }

}