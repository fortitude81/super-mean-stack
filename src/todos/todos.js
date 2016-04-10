import _ from 'lodash';

export default function($scope, todoFactory, userFactory) {
    let params = {
        createHasInput: false
    };

    // $scope.todos = [
    // {
    //     task: 'do dishes',
    //     isCompleted: false,
    //     isEditing: false
    // },
    // {
    //     task: 'walk the dog',
    //     isCompleted: true,
    //     isEditing: false
    // }
    // ];

    $scope.User = userFactory.getUser();

    $scope.users = userFactory.getUsers();

    $scope.logout = function() {
        userFactory.logout();
        $scope.User = '';
    }

    todoFactory.getTasks($scope);

    $scope.onCompletedClick = todo => {
        todo.isCompleted = !todo.isCompleted;
    };

    $scope.onEditClick = todo => {
        todo.isEditing = true;
        todo.updatedTask = todo.task;
    };

    $scope.onCancelClick = todo => {
        todo.isEditing = false;
    };

    $scope.selectTodo = todo => {
        $scope.selectedTodo = todo;
    }

    $scope.onAssignClick = todo => {
        $scope.selectedTodo.assignUserID = $scope.selectedUser;
        $scope.updateTask($scope.selectedTodo);
    };

    const { createTask, updateTask, deleteTask, watchCreateTaskInput } = todoFactory;

    $scope.createTask = _.partial(createTask, $scope, params);
    $scope.updateTask = _.partial(updateTask, $scope);
    $scope.deleteTask = _.partial(deleteTask, $scope);
    $scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, params, $scope));
}
