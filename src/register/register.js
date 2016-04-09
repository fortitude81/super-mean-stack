import _ from 'lodash';

export default function($scope, $state, userFactory) {
    if(userFactory.getUser()) {
        $state.go('todos');
    }
    $scope.user = {
        name: '',
        password: ''
    };
    $scope.register = () => {
        userFactory.register($scope);
    };
}
