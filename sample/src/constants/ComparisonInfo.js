export const ReduxInject = [
    {
        label: 'Configure Store',
        content: 'You need to configure store firstly',
        code: `
            import { 
                createStore, 
                applyMiddleware 
            } from "redux"
            import thunk from "redux-thunk"
            import myMiddleware from "./middlewares/myMiddleware" 
            import rootReducer from "./reducers"
            
            const initialState = { 
                user: {}, 
                tasks: [], 
                router: {} 
            };
            
            export default createStore(
                rootReducer, 
                initialState, 
                applyMiddleware(thunk, myMiddleware)
            );          
        `
    },
    {
        label: 'Create root reducer',
        content: 'Secondly you need to create a root reducer',
        code: `
            import { combineReducers } from "redux"
            import user from "./user";
            import tasks from "./tasks";
            import router from "./router";
            
            export default combineReducers({
                user,
                tasks,
                router
            });    
        `
    },
    {
        label: 'Configure Middlewares',
        content: 'Thirdly you need to configure middlewares to get your action creators correctly',
        code: `
            import { names } from "./index";
            
            export default ({ dispatch, getState }) => next => action => {
                const { 
                    middleware,
                    types,
                    successCb,
                    errorCb
                } = action;
                            
                if (middleware !== names.MY_MIDDLEWARE) return next(action);
                            
                // ...Middleware logic            
            };
        `
    },
    {
        label: 'Initiate Provider',
        content: 'Cover your App into Provider-component and inject your store',
        code: `
            import React from "react"
            import { Provider } from "react-redux"
            import store from "./store"
            import App from "./src/App"
            
            export default () => <Provider store={store}>
                <App/>
            </Provider>
        `
    }
];

export const RssInject = [
    {
        label: 'Create AppProvider',
        content: 'Firstly create new class extends Provider and define its services',
        code: `
            import { 
                Provider, 
                providerExporter
            } from "react-singleton-state"
            import UserService from "./UserService"
            import TasksService from "./TasksService"
            import RouteService from "./RouteService" 
            
            class AppProvider extends Provider {
                defineServices() {
                    this.UserService = new UserService('UserService');
                    this.TasksService = new TasksService('TasksService');
                    this.RouteService = new RouteService('RouteService');
                }
            }
            
            export default providerExporter(AppProvider);
        `
    },
    {
        label: 'Create Services',
        content: 'Secondly create services, define theirs getters, setters and default values',
        code: `
            import { Service } from "react-singleton-state"
            
            export default class UserService extends Service {
                static defaultValues = {
                    login: 'default_login',
                    email: 'default@default.com'
                };
                get login() { return this[Symbol.for('login')]; }
                set login(login) { this[Symbol.for('login') = login; }
            }
        `
    },
    {
        label: 'Use services wherever you need',
        content: 'Just export your services from AppProvider and read their properties',
        code: `
            import react from "React"
            import AppProvider from "./AppProvider"
            const { UserService, TasksService } = AppProvider;
            
            export default props => (
                <div>
                    <h1>Hello, {UserService.login}!</h1>
                    <h3>Your issues for today are:</h3>
                    <ul>
                        {TasksServices.tasks.map((task, i) => <li key={i}>task</li>)}
                    </ul>
                </div>
            );
        `
    }
];

export const ReduxPerform = [
    {
        label: 'Create an Action',
        content: 'You need to create an action-creator and an action-type to deal with',
        code: `
            import * as actionTypes from "./actionTypes"
            
            export const getTasks = arrOfTasks => ({
                type: actionTypes.GET_TASKS,
                tasks: arrOfTasks
            });
            
            // And more and more action creators for each changing of data you provide
            // And also a thousand-lines list of action types for each ACTION_TYPE to export
        `
    },
    {
        label: 'Create a reducer',
        content: 'Next create a reducer to handle this action and do not forget to combine it with others',
        code: `
            import * as actionTypes from "./actionTypes"
            
            const defaultState = [
                {id: 1, taskText: 'Forget about redux'}
            ];
            
            export default (state = defaultState, action) => {
                switch(action.type) {
                    case actionTypes.GET_TASKS:
                        return [
                            ...state,
                            ...action.tasks
                        ];
                    // other cases
                    default: return state;       
                }
            };
        `
    },
    {
        label: 'Decorate a Component',
        content: 'Now you need to set your component as an argument of connect-function and also define mappers arguments',
        code: `
            import { connect } from "react-redux" 
            import Tasks from "./components/Tasks"
            import { getTasks } from "./actions/tasks"
            
            const mapStateToProps = state => ({
                tasks: state.main.tasks
            });
            
            const mapDispatchToProps = dispatch => ({
                getTasks: arrOfTasks => dispatch(getTasks(arrOfTasks))               
            });
            
            export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
        `
    },
    {
        label: 'Receive Data in Component',
        content: 'At least you can receive your data as component\'s props',
        code: `
            import React from "react"
            import Button from "./components/Button"
            
            const Tasks = ({
                tasks,
                getTasks
            }) => (
                <div>
                    <h2>My Tasks:</h2>
                    <ul>
                        {tasks.map((task, i) => <li key={i}>task.taskText</li>)}
                    </ul>
                    <Button onClick={getTasks}>Get Tasks</Button>
                </div>
            );
        `
    }
];

export const RssPerform = [
    {
        label: 'Just use a Service',
        content: 'Import the service and get and set data from it to your components',
        code: `
            import React from "react"
            import Button from "./components/Button"
            import AppProvider from "./AppProvider"
            
            const { TaskService } = AppProvider;
            
            const oneMoreTask = {id: 2, taskText: 'Learn React Singleton State'};
            
            export default props => (
                <div>
                    <h2>My Tasks:</h2>
                    <ul>
                        {TaskService.tasks.map((task, i) => <li key={i}>task.taskText</li>)}
                    </ul>
                    <Button onClick={e => {
                        e.preventDefault();
                        TaskService.tasks = oneMoreTask; // set tasks(task) { this[Symbol.for('tasks')].push(task); } 
                    }}>Get One More Task</Button>
                </div>
            );
        `
    },
    {
        label: 'To re-render a Component',
        content: 'If you need to render new data right now after set a value into a Service use a reRender-method to set',
        code: `
            import React from "react"
            import { Component } from "react-singleton-state"
            import Button from "./components/Button"
            import AppProvider from "./AppProvider"
            
            const { TaskService } = AppProvider;
            
            const oneMoreTask = {id: 2, taskText: 'Learn React Singleton State'};
            
            export default class Tasks extends Component {
                state = {
                    TaskService
                };
                
                onGetTask(e) {
                    e.preventDefault();
                    this.reRender(TaskService)('tasks').set(oneMoreTask);
                }
                
                render() {
                    return (
                        <div>
                            <h2>My Tasks:</h2>
                            <ul>
                                {TaskService.tasks.map((task, i) => <li key={i}>task.taskText</li>)}
                            </ul>
                            <Button onClick={this.onGetTask.bind(this)}>Get One More Task</Button>
                        </div>
                    );
                }
            } 
        `
    }
];