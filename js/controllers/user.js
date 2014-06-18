/**
 * 用户相关的Controler - UserCtrl.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-12
 */

(function () {
    const CTRL_PRE = 'UserCtrl.';

    angular.module('app.controllers.User', ['toaster', 'app.utilities.Preferences', 'app.services.User'])

        // 注册 Controller
        .controller(CTRL_PRE + 'Reg', function ($scope, $window, toaster, Preferences, UserService) {
            // 新用户对象， 用于存储用户提交的注册信息
            $scope.newUser = {};

            UserService.getCsrf();

            /**
             * 注册按钮点击
             */
            $scope.regFormSubmit = function () {
                UserService.reg($scope.newUser).then(function (data) {
                    toaster.pop('success', '注册成功');

                    Preferences.saveUser($scope.newUser.username, $scope.newUser.password);
                    $window.history.back();
                });
//                console.log($scope.newUser);
            };
        })

        // 登录 Controller
        .controller(CTRL_PRE + 'Login', function ($scope, $window, toaster, Preferences, UserService) {
            $scope.loginUser = {};

            // 获取保存的用户信息
            var savedUser = Preferences.getUser();
            if (savedUser) {
                $scope.loginUser = savedUser;
            }

            UserService.getCsrf();

            /**
             * 登录按钮点击
             */
            $scope.loginFormSubmit = function () {
                UserService.login($scope.loginUser).then(function (data) {
                    toaster.pop('success', '登录成功');
                    Preferences.saveUser($scope.loginUser.username, $scope.loginUser.password);
                    $window.history.back();
                });
            }
        })
    ;
})();