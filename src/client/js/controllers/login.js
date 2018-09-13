angular.module('MockServer')
    .controller('LoginController', ($scope, $location, $window, userService) => {
        $scope.disableLogin = (username, password) => {
            return !username || !password;
        };

        $scope.login = (username, password) => {
            return userService.login(username, password).then(() => {
                $scope.$emit('login');
                $location.path('/');

            }).catch(err => {
                console.error(err); // tslint:disable-line

                return err;
            });
        };

        $scope.saml = () => {
            $window.location.href = '/api/v1/sessions/saml';
        };
    });
