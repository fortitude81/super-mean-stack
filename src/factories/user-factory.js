import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.userFactory', [])

.factory('userFactory', ($http, $state, $location) => {

    var User = {};
    var Users = [];
    $http.post('/users/loggedin', { name: localStorage.getItem('user') }).success(response => {
        if(response == 'User is not loggedin!') {
            User.name = '';
            User.role = '';
            localStorage.removeItem('user')
        } else {
            User.name = response.name;
            User.role = response.role;
            localStorage.setItem('user', User.name)
        }
    });
    $http.get('/users').success(response => {
        response.forEach(function(val){
            Users.push(val);
        })
    });

    function getUser() {
        return User;
    }

    function getUsers() {
        return Users;
    }

    function logout() {
        if (!User) { return; }

        $http.post('/users/logout').success(response => {
            if(response == 'User Logout Successfully!') {
                User.name = '';
                User.role = '';
                localStorage.removeItem('user', User.name)
                $location.path('/login');
            }
        });
    }

    function login($scope) {
        if (!$scope.user) { return; }

        $http.post('/users/login', {
            userName: $scope.user.name,
            passWord: $scope.user.password
        }).success(response => {
            if(response.message == 'User Login Successfully!') {
                User.name = response.data.name;
                User.role = response.data.role;
                localStorage.setItem('user', User.name)
                $scope.user = '';
                $state.go('todos');
            } else {
                console.log('Some thing went wrong, Error: ', response);
                User.name = '';
                User.role = '';
                localStorage.removeItem('user')
            }
        });
    }

    function register($scope) {
        if (!$scope.user) { return; }

        $http.post('/users/register', {
            userName: $scope.user.name,
            passWord: $scope.user.password
        }).success(response => {
            if(response == 'User Created Successfully!') {
                $scope.user = '';
                $state.go('login');
            } else {
                console.log('Some thing went wrong, Error: ', response);
            }
        });
    }

    return {
        getUser,
        getUsers,
        logout,
        login,
        register
    };
});

export default todoFactory;
