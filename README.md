# react-singleton-state 1.0.0

## Author: Oleg Mukhov

## Description:
Библиотека помогает быстро внедрять данные в React-компоненты путем записи и чтения __объектов-синглтонов__.

## Использование:
Библиотека состоит из следующих исполняемых классов и функций:
1. Класс __Service__ - синглтон, основное хранилище состояний
2. Функция __enclose__ - "запирает" инстансы Service'ов, принимает массив инстансов, в качестве аргумента, и возвращает их в _немутабельном_ виде

### Service
__Service__ - класс-синглтон. Необходим для хранения состояния и внесения изменений в состояние.
Благодаря использованию паттерна _Синглтон_ позволяет получать доступ к новым значениям состояния из любого места в приложении.
```javascript
import { Service } from 'react-singleton-state';

class MyEntity extends Service {
    defineProperties() {
        this._entityProp = null;
    }
    get entityProp() { return this._entityProp; }
    set entityProp(val) { this._entityProp = val; }
}

const entity1 = new MyEntity();
const entity2 = new MyEntity();
entity1.entityProp = '22.10.1988';
console.info(entity1.entityProp === entity2.entityProp); // true
```

#### Методы Service:
1. __defineProperties()__ - определяет поля класса-синглтона, метод вызывается в констуркторе класса

### enclose(singltonesArray)
Функция __enclose__ позволяет зморозить массив Service-инстансов, после чего их изменение невозможно 
```javascript
import { Service, enclose } from 'react-singleton-state';

class Cl1 extends Service {}
class Cl2 extends Service {}

const [cl1Srv, cl2Srv] = enclose([new Cl1(), new Cl2()]);
cl1Srv.newProp = '123' // Error
```