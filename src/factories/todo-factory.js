import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])

.factory('todoFactory', ($http, userFactory, $timeout) => {

    var User = userFactory.getUser();

    function getTasks($scope) {
        $timeout(function () {
            $http.get('/todos/' + User.name).success(response => {
                $scope.todos = response.todos;
            });
        });
    }

    function createTask($scope, params) {
        if (!$scope.createTaskInput) { return; }
        $http.post('/todos', {
            task: $scope.createTaskInput,
            isCompleted: false,
            isEditing: false,
            ownerUserID: User.name
        }).success(response => {
            getTasks($scope);
            $scope.createTaskInput = '';
        });

        // params.createHasInput = false;
        // $scope.createTaskInput = '';
    }

    function updateTask($scope, todo) {
        $http.put(`/todos/${todo._id}`, { task: todo.updatedTask }).success(response => {
            getTasks($scope);
            todo.isEditing = false;
        });

        // todo.task = todo.updatedTask;
        // todo.isEditing = false;
    }

    function deleteTask($scope, todoToDelete) {
        $http.delete(`/todos/${todoToDelete._id}`).success(response => {
            getTasks($scope);
        });

        // _.remove($scope.todos, todo => todo.task === todoToDelete.task);
    }

    function watchCreateTaskInput(params, $scope, val) {
        const createHasInput = params.createHasInput;

        if (!val && createHasInput) {
            $scope.todos.pop();
            params.createHasInput = false;
        } else if (val && !createHasInput) {
            $scope.todos.push({ task: val, isCompleted: false });
            params.createHasInput = true;
        } else if (val && createHasInput) {
            $scope.todos[$scope.todos.length - 1].task = val;
        }
    }

    return {
        getTasks,
        createTask,
        updateTask,
        deleteTask,
        watchCreateTaskInput
    };
});

export default todoFactory;
