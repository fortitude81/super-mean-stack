import angular from 'angular';
import uiRouter from 'angular-ui-router';
import todoFactory from 'factories/todo-factory';
import userFactory from 'factories/user-factory';
import todosController from 'todos/todos';
import aboutController from 'about/about';
import loginController from 'login/login';
import registerController from 'register/register';

const app = angular.module('app', [uiRouter, todoFactory.name, userFactory.name]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('login', {
            url: '/login',
            template: require('login/login.html'),
            controller: loginController
        })
        .state('register', {
            url: '/register',
            template: require('register/register.html'),
            controller: registerController
        })
        .state('todos', {
            url: '/',
            template: require('todos/todos.html'),
            controller: todosController,
            resolve: {
                User: function($timeout, userFactory, $location){
                    $timeout(function(){
                    if (userFactory.getUser().name) {
                        return true;
                    } else {
                        $location.path('/login');
                    }
                    })
                }
            }
        })
        .state('about', {
            url: '/about',
            template: require('about/about.html'),
            controller: aboutController
        });

    $locationProvider.html5Mode(true);
});

export default app;
