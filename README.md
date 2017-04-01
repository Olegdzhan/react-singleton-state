# react-singleton-state 1.0.0

## Author: Oleg Mukhov

## Description:
Библиотека помогает быстро внедрять данные в React-компоненты путем записи и чтения __объектов-синглтонов__.
Библиотека для тех, кто хочет быстро "пересесть" с Angular 1.x на React

## Использование:
Библиотека состоит из следующих исполняемых классов и функций:
1. Класс __Provider__ - синглтон, основное хранилище приложения.
```javascript
import { Provider, providerExporter } from 'react-singleton-state';
```
2. Класс __Service__  - от данного класса наследуются все сервисы приложения, путем агрегации в _Provider_, они также становятся синглтонами.
```javascript
import { Service } from 'react-singleton-state';
```
3. Класс __ComponentService__ - обертка библиотеки для React-компонентов, связывает state-компонентов с инстансами _Service_.
```javascript
import { ComponentService } from 'react-singleton-state';
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
1. Наследуем новый бин от __Service__, определяем его поля, геттеры и сеттеры.
```javascript
export default class UserService extends Service {
    constructor(sn) {
        super(sn);
        this._userName = 'defaultName';
    }
    get userName() { return this._userName; }
    set userName(val) { this._userName = val; } 
}
```
2. Определяем значение полей по умолчанию через статическую переменную _defaultValues_, и сохраняем ссылку на класс используя метод _getClass()_. Ключи _defaultValues_ должны совпадать с названиями геттеров и сеттеров.
```javascript
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
* __getClass(classType: class)__ - метод принимает в качестве аргумента класс и записывает его в поле __this.classType__. В каждом наследнике класса Service необходимо вызывать этот метод в конструкторе, передавая в него ссылку на себя. Данная процедура необходима для доступа к статической переменной, описанного в классе _Service_.
* __toDefault(prop: string)__ - метод переводит указанное поле (по имени сеттера) к значению данного поля в статической переменной _defaultValues_.
* __defaultAll()__ - переводит все сеттеры к их значениям в _defaultValues_. 
#### Принцип работы класса __Service__
Класс _Service_ содержит только одно приватное поле __serviceName__. Поле заполняется при создании экземпляра класса. Поле необходимо для заполнения __this.state__ React-компонента. Далее поле доступно только через геттер.
__Автор настоятельно рекомендует передавать в конструктор Service'ов такое же строковое значение как и название класса этого сервиса!__
Поскольку экземпляры всех сервисов в приложении агрегированы в синглтон-__Provider__, то все они сами выступают синглтонами.