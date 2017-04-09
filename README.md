# react-singleton-state 1.0.0

## Author: Oleg Mukhov

## Description:
Библиотека помогает быстро внедрять данные в React-компоненты путем записи и чтения __объектов-синглтонов__.
Библиотека для тех, кто хочет быстро "пересесть" с Angular 1.x на React

## Launch v1.0.0:
Так как при установке в node_modules приходит исходный каталог, необходимо добавить в _webpack.config_ Вашего проекта следующую настройку js-модуля:
```javascript
{
    test: /\.js$/,
    loader: 'babel-loader',
    query: {
        presets: ['es2017', 'react'],
        plugins: ['transform-object-rest-spread', 'transform-class-properties']
    }
}
```
дополнительно установите:
__npm install --save-dev babel-preset-es2017 babel-plugin-transform-class-properties babel-plugin-transform-object-rest-spread__
Проблема решена с версии __1.0.1__.

## Launch Sample App (since v1.0.2)
start index.html in browser
_node_modules/react-singleton-state/public/index.html_
You also need __material-ui__ package to run the sample app.
#### There you can _compare react-singleton-state and redux_ and choose which one is easier and more flexible for you.

## Использование:
Библиотека состоит из следующих исполняемых классов и функций:
1. Класс __Provider__ - синглтон, основное хранилище приложения.
```javascript
import { Provider, providerExporter } from 'react-singleton-state';
```
2. Класс __Service__  - от данного класса наследуются все сервисы приложения. После агрегации в _Provider_, они также становятся синглтонами.
```javascript
import { Service } from 'react-singleton-state';
```
3. Класс __Component__ - обертка библиотеки для React-компонентов, связывает state-компонентов с инстансами _Service_.
```javascript
import { Component } from 'react-singleton-state';
```

### Provider
Класс __Provider__ является синглтоном. 
#### Использование __Provider__ в приложении:
* наследуем класс, например, _AppProvider_ от _Provider_;
```javascript
class AppProvider extends Provider { }
```
* описываем метод __defineServices()__ класса _AppProvider_, где просто агрегируем сервисы нашего приложения;
```javascript
defineServices() {
    this.UserService = new UserService('UserService');
    this.TaskService = new TaskService('TaskService');
}
```
* в случае необходимости можно описать необязательный метод __defineUrls()__, который сохранит все url'ы в константы по каскадному принципу;
```javascript
defineUrls() {
    return {
        ROOT: {
            url: 'http://localhost:8090',
            REST: {
                url: '/rest',
                TASKS: {
                    url: '/tasks'
                },
                FOLLOWERS: {
                    url: '/followers'
                }
            },
            CREDENTIALS: {
                url: '/security/v1'
            }
        }
    };
}
/*  
 *  this.URLS = {
 *    ROOT:        'http://localhost:8090',
 *    REST:        'http://localhost:8090/rest',
 *    TASKS:       'http://localhost:8090/rest/tasks',
 *    FOLLOWERS:   'http://localhost:8090/rest/followers',
 *    CREDENTIALS: 'http://localhost:8090/security/v1'
 *  }
 */
```
* Последним шагом экспортируем _AppProvider_ в проект используя библиотечную функцию __providerExporter()__. Во вермя импорта произойдет вызов функции, которая вернет new AppProvider(), в результате чего результат такого импорта можно сразу представить в виде объекта _URLS_ и необходимых сервисов.
```javascript
export default providerExporter(AppProvider);
// ==========================================
import AppProvider from 'src/AppProvider';
const { URLS, UserService, TaskService } = AppProvider;
```

#### Методы, которые должны или могут быть описаны у наследника класса __Provider__:
* __Обязательный__ метод __defineServices()__. Не ожидает никаких аргументов. В теле метода необходимо присвоить полям класса, которые в последствии станут сервисами-синглтонами приложения, __экземпляры__ классов-наследников класса _Service_. Метод вызывается в конструкторе класса _Provider_.
* Необязательный метод __defineUrls()__. Не ожидает никаких аргументов. В теле метода необходимо вернуть объект, представляющий собой каскадируемые урлы. Поля __url__ являются конечными полями в итерациях.

#### Принцип работы класса __Provider__
__Provider__ является самовызывающейся функцией, которая возвращает класс. В конструкторе этого класса, сперва, происходит проверка на существование экземпляра этого класса, если такой имеется, то конструктор всегда вернет этот экземпляр. Такая проверка возможна, так как экземпляр класса и сам класс всегда находятся в одном замыкании.
Если же экземпляра класса не обнаруживается, то последовательно вызываются методы __defineServices()__ и __defineUrls()__. Затем происходит присвоение экземпляра класса в переменную внутри замыкания.

### Service
__Service__ - это бин. В сервисе есть только его поля, а также геттеры и сеттеры для обращения к ним.
#### Использование __Service__ в приложении
1. Наследуем новый бин от __Service__, ~~определяем его поля~~, геттеры и сеттеры. (Начиная с версии 1.0.3, приватные поля определяются автоматически из _defaultValues_. Доступ к ним осуществляется через _Symbol.for()_).
```javascript
export default class UserService extends Service {
    static defaultValues = {
        userName: 'DefaultName'
    };
    
    get userName() { return this[Symbol.for('userName')]; }
    set userName(val) { this[Symbol.for('userName')] = val; } 
}
```
~~2. Определяем значение полей по умолчанию через статическую переменную _defaultValues_, и сохраняем ссылку на класс используя метод _getClass()_. Ключи _defaultValues_ должны совпадать с названиями геттеров и сеттеров.~~
__Метод getClass() перестал поддерживаться с версии 1.0.1 и будет полностью отменен с версии 1.1.0__
```javascript
/*
 *  Шаг не имеет смысла после обновлений 1.0.2 и 1.0.3
 */
export default class UserService extends Service {
    static defaultValues = {
        userName: 'admin'
    };
    constructor(sn) {
        super(sn);
        this.getClass(UserService);
        //other variables
    }
    //getters and setters
}
```
3. Агрегируем _UserService_ в _AppProvider'e_.
```javascript
class AppProvider extends Provider {
    defineServices() {
        this.UserService = new UserService('UserService');
    }
}
```
4. Дальнейшее использование _Service_ тесно связано с использованием класса _ComponentService_
#### Методы класса __Service__:
* __getClass(classType: class)__ __[DEPRECATED]__ - метод принимает в качестве аргумента класс и записывает его в поле __this.classType__. В каждом наследнике класса Service необходимо вызывать этот метод в конструкторе, передавая в него ссылку на себя. Данная процедура необходима для доступа к статической переменной, описанного в классе _Service_.
* __toDefault(prop: string)__ - метод переводит указанное поле (по имени сеттера) к значению данного поля в статической переменной _defaultValues_.
* __defaultAll()__ - переводит все сеттеры к их значениям в _defaultValues_. 
#### Принцип работы класса __Service__
Класс _Service_ содержит только одно приватное поле __serviceName__. Поле заполняется при создании экземпляра класса. Поле необходимо для заполнения __this.state__ React-компонента. Далее поле доступно только через геттер.
__Автор настоятельно рекомендует передавать в конструктор Service'ов такое же строковое значение как и название класса этого сервиса!__
Поскольку экземпляры всех сервисов в приложении агрегированы в синглтон-__Provider__, то все они сами выступают синглтонами.

### Component
Класс __Component__ связывает наши React-компоненты с экземплярами __Service'ов__.
#### Использование __Component__ в приложении:
1. Наследуем новый statefull-компонент от __Component'a__ и инжектим Service'ы в его _this.state_ через метод this._injectServices(). Метод не помешает использовать компонентный (локальный) state.
```javascript
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localStateField1: 'default',
            localStateField2: undefined
        };
        this._injectServices([RouteService, UserService], InjectMerging.AFTER);
    }
}
```
2. Для чтения данных из Service'ов нам абсолютно не нужен _this.state_, поэтому данные также легко вставлять и в stateless-компоненты.
```jsx harmony
const Stateless = props => <p>{props.paragraph}</p>;

//render of some class
render() {
    return (
        <div>
            <Stateless paragraph={TextService.paragraph} />
        </div>
    );
}

```
3. Для записи данных в Service есть два способа: 
##### __Первый способ необходим для изменения данных в Service без ререндеринга компонента. Для этого нужно использовать сеттер самого Service'a__
```jsx harmony
export default class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TaskService           
        };
    }
    onTaskChange(e) {
        TaskService.taskText = e.target.value;
    }
    render() {
        return (
            <div>
                <p>{TaskService.taskText}</p>
                <input value={TaskService.taskText} onChange={this.onTaskChange} />
            </div>
        );
    }
} 
```
В данном примере значение внутри Service'a будет изменяться, однако ни в input, ни в p, новое значение появляться не будет. Данный код можно оптимизировать, отображая значение в input, но не изменяя его в p. Для этого добавим поле компонентного state и метод lifecycle - _componentWillUpdate()_ и _componentWillUnmount_. И поменяем данные в _input.props.value_.
```jsx harmony
export default class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TaskService,
            taskText: TaskService.taskText           
        };
    }
    componentWillUpdate(nextProps, nextState) {
        this.state.taskText = TaskService.taskText;
    }
    componentWillUnmount() {
        TaskService.taskText = this.state.taskText;
    }
    onTaskChange(e) {
        this.setState({taskText: e.target.value});
    }
    render() {
        return (
            <div>
                <p>{TaskService.taskText}</p>
                <input value={this.state.taskText} onChange={this.onTaskChange.bind(this)} />
            </div>
        );
    }
} 
```
Из примера видно, каким мощным эффектом оптимизации без использования _shouldComponentUpdate()_ обладают сервисы-синглтоны.

##### __Второй способ изменения данных в сервисе влечет за собой ререндеринг компонента. Для его осуществления необходимо вызвать метод reRender(), который унаследован от Component__
```jsx harmony
export default class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TaskService           
        };
    }
    onTaskChange(e) {
        this.reRender(TaskService)('taskText').set(e.target.value);
    }
    render() {
        return (
            <div>
                <p>{TaskService.taskText}</p>
                <input value={TaskService.taskText} onChange={this.onTaskChange.bind(this)} />
            </div>
        );
    }
} 
```
Теперь при изменении данных внутри input будет происходить ререндеринг компонента, в результате чего в _p_ и _input_ будут отображаться актуальные значения.

#### Методы класса __Component__
* ___injectService()__ внедряет Service'ы в state компонента. Принимает два аргумента:
    1. Массив сервисов, которые будут внедрены в state компонента;
    2. enum _InjectMerging_ с одним из значений: _InjectMerging.BEFORE_ - внедрит сервисы перед значениями локального state, _InjectMerging.AFTER - после. Данный аргумент необязательный, по умолчанию используется InjectMerging.BEFORE
```javascript
//InjectMerging.BEFORE
this.state = {
    //your services here
    first: 'first',
    second: 'second'
};

///InjectMerging.AFTER
this.state = {
    first: 'first',
    second: 'second',
    //your services here
};
```
Кроме того, можно обойтись и без метода _injectServices() при внедрении сервисов в state
```javascript
constructor(props) {
    super(props);
    this.state = {
        UserService,
        first: 'first',
        second: 'second',
        RouteService
    };
}
```  
* ___bindMethods()__ - метод принимает строковые наименования методов компонента, к которым применится _.bind(this)_. Кроме того, каждый аргумент может быть массивом: _['имя_метода','аргумент1','аргумент2']_.
```javascript
constructor(props) {
    super(props);
    this._bindMethods('onTextChange', 'onSelectChange', 'onButtonClick');
    //======or=======
    this._bindMethods(
        ['onTextChange', 'newValue', SomeFilter.filter('Val')], 
        ['onSelectChange', 1]
    );
}
```   
* __reRender()__ - метод необходим для изменения значения Service'a с последующим ререндеринго компонента. Метод устроен довольно непросто, так что разберем его подробно.
1. _reRender_ принимает один аргумент - _экземпляр сервиса_ либо его поле _this.serviceName_ и возвращает функцию...
```javascript
this.reRender(UserService)   // return serviceProps => { ... }
this.reRender('UserService') // or this.reRender(UserService.serviceName) - return serviceProps => { ... }
 ```
2. возвращаемая функция принимает один необязаетльный аргумент - массив строковых названий полей сервиса или строковое название одного поля сервиса, и возвращает объект методов.
```javascript
this.reRender(UserService)('login') //return { set: val => {...}, setDefault: () => {...}  }
this.reRender(UserService)(['login', 'followers', 'dateOfBirth']) //return { set: values => {...}, setDefault: () => {...} }
this.reRender(UserService)() // return { set: obj => {...}, setDefault: () => {...} }
```
3. Метод __set()__ вызывает сеттер Service'a и делает forceUpdate: 
        * Если возвращен по одному переданному имени поля, то принимает одно значение - новое значение этого поля в Servic'e;
        * Если возвращен по массиву имен полей, то принимает массив новых значений этих полей по соответствию индексов;
        * Если возвращен по пустому значению, то принимает объект c ключами - именами полей Service'a, и значениями - новыми значениями этих полей.
```javascript
this.reRender(UserService)('login').set('MyName');
this.reRender(UserService)(['login', 'dateOfBirth']).set(['MyName', '22.06.1941']);
this.reRender(UserService)().set({login: 'MyName', dateOfBirth: '22.06.1941'});
```  
4. Метод __setDefault()__ вызывает _Service.toDefault()_ в первых двух случаях и _Service.defaultAll()_ в третьем, после чего вызывает метод forceUpdate.      