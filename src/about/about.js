import _ from 'lodash';

export default function($scope, userFactory) {
    $scope.User = userFactory.getUser();
    $scope.logout = function() {
        userFactory.logout();
        $scope.User = '';
    }
}
