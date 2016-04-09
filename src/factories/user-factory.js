import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.userFactory', [])

.factory('userFactory', ($http, $state) => {

    var User = localStorage.getItem('user');

    function getUser() {
        return User;
    }

    function logout() {
        if (!User) { return; }

        $http.post('/users/logout').success(response => {
            if(response == 'User Logout Successfully!') {
                User = '';
                localStorage.removeItem('user', User)
            }
        });
    }

    function login($scope) {
        if (!$scope.user) { return; }

        $http.post('/users/login', {
            userName: $scope.user.name,
            passWord: $scope.user.password
        }).success(response => {
            if(response == 'User Login Successfully!') {
                User = $scope.user.name;
                localStorage.setItem('user', User)
                $scope.user = '';
                $state.go('todos');
            } else {
                console.log('Some thing went wrong, Error: ', response);
                User = '';
                localStorage.removeItem('user', User)
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
        logout,
        login,
        register
    };
});

export default todoFactory;
