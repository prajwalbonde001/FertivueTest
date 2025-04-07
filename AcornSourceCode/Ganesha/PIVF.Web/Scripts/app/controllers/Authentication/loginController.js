'use strict';
PIVF.controller('loginController', ['$scope', '$rootScope', 'authService', 'ngAuthSettings', '$window', '$filter', 'AlertMessage', '$timeout', 'Common', 'localStorageService', '$location', 'API', 'usSpinnerService', function ($scope, $rootScope, authService, ngAuthSettings, $window, $filter, AlertMessage, $timeout, Common, localStorageService, $location, API, usSpinnerService) {

    $scope.loginData = {
        userName: "",
        password: "",
        useRefreshTokens: false
    };

    $scope.count = 0;
    $scope.UnitList = [];
    $scope.UnitList.splice(0, 0, { UnitID: 0, UnitName: 'Select' });
    $scope.loginData.Unit = $scope.UnitList[0];
    $scope.message = "";
    $scope.SessionMessage = '';
    $scope.LogOut = false;

    // usSpinnerService.stop('GridSpinner');
    $scope.redirectfp = function () {
        $window.location = "ForgotPassword";
    };

    $scope.cleanURL = function () {
        $location.url("/DefaultPage");
    };

    //debugger;
    $scope.LogOut = localStorageService.get('LogOut');
    if ($scope.LogOut == 'true') {
        $scope.SessionMessage = 'Your session is expired.. !! Please login again';
        localStorageService.set('LogOut', false);
    }
    else
        $scope.SessionMessage = '';
    

    $scope.fprequest = function () {
        var promise = authService.forgotPassword($scope.userName);
        promise.then(function (resp) {
            if (resp) {
                $scope.message = 'Your request has been submitted to the Admin.'
                $scope.savedSuccessfully = true;
                $window.location.href = API.Baseurl;
            }
            else {
                $scope.message = 'Something went wrong. Please contact your Admin'
                $scope.savedSuccessfully = false;
            }
        });
    };

    $scope.getQueryVariable = function getQueryVariable(variable) {
        //;
        var query = window.location.search.substring(1),
            vars = query.split("&"),
            pair;
        for (var i = 0; i < vars.length; i++) {
            //;
            pair = vars[i].split("=");
            if (pair[0] == variable) {
                return unescape(pair[1]);
            }
        }
    }

    $scope.writeEvent = function writeEvent(line) {
        //;
        var messages = $("#Messages");
        messages.append("<li style='color:blue;'>" + $scope.getTimeString() + ' ' + line + "</li>");
    }

    $scope.writeError = function writeError(line) {
        //;
        var messages = $("#Messages");
        messages.append("<li style='color:red;'>" + $scope.getTimeString() + ' ' + line + "</li>");
    }

    $scope.writeLine = function writeLine(line) {
        //;
        var messages = $("#Messages");
        messages.append("<li style='color:black;'>" + $scope.getTimeString() + ' ' + line + "</li>");
    }

    $scope.printState = function printState(state) {
        //;
        var messages = $("#Messages");
        return ["connecting", "connected", "reconnecting", state, "disconnected"][state];
    }

    $scope.getTimeString = function getTimeString() {
        //;
        var currentTime = new Date();
        return currentTime.toTimeString();
    }

    $scope.postLoginForm = function postLoginForm() {
        //;
        var loginForm = $("#loginForm");
        // loginForm.attr("action", "/Home/index" + window.location.search);
        loginForm.attr("action", ngAuthSettings.apiServiceBaseUri);
        loginForm.submit();
    }

    //Not in use kept for future refference if want to initiate signalr form javascript side
    //$scope.startSignalR = function startSignalR() {
    //    var activeTransport = $scope.getQueryVariable('transport') || 'auto';
    //    //;
    //    // var connection = $.connection("http://localhost:4000/signalr");

    //    var connection = $.connection(ngAuthSettings.apiServiceBaseUri + "/signalr");
    //    //   var connection = $.connection("/echo", "name=" + $("#name").val(), true);
    //    connection.logging = true;

    //    connection.connectionSlow(function () {
    //        //;
    //        $scope.writeEvent("connectionSlow");
    //    });

    //    connection.disconnected(function () {
    //        //;
    //        $scope.writeEvent("disconnected");
    //        var response2 = authService.activetickets($scope.landFirstName, $scope.landFirstName, false, 3).then(function (response2) {
    //            //;
    //        },
    //        function (err) {
    //            //;
    //            $scope.Message = err.error_description;
    //        });
    //        $window.location.href = ngAuthSettings.apiServiceBaseUri;
    //    });

    //    connection.error(function (error) {
    //        //;
    //        var innerError = error;
    //        var message = "";
    //        while (innerError) {
    //            message += " Message=" + innerError.message + " Stack=" + innerError.stack;
    //            innerError = innerError.source
    //        }
    //        $scope.writeError("Error: " + message);
    //    });

    //    connection.reconnected(function () {
    //        //;
    //        $scope.writeEvent("reconnected");
    //    });

    //    connection.reconnecting(function () {
    //        //;
    //        $scope.writeEvent("reconnecting");
    //    });

    //    connection.starting(function () {
    //        //;
    //        $scope.writeEvent("starting");
    //    });

    //    connection.received(function (data) {
    //        //;
    //        $scope.writeLine("received: " + data);
    //    });

    //    connection.stateChanged(function (change) {
    //        //;
    //        $scope.writeEvent("stateChanged: " + $scope.printState(change.oldState) + " => " + $scope.printState(change.newState));
    //    });

    //    connection.start({ transport: activeTransport })
    //        .done(function () {
    //            //;
    //            $scope.writeLine("transport=" + connection.transport.name);
    //            connection.send("Hi you have successfully logged In...");
    //        })
    //        .fail(function (error) {
    //            //;
    //            $scope.writeError("start.fail " + error);
    //        });
    //}

    $scope.FillUnit = function FillUnit(loginName) {
        // //;
        $scope.Message = null;
        authService.Fillunit(loginName).then(function (response) {
            //  //;
            if (response.data[0].UnitID != -1) {
                response.data.splice(0, 0, { UnitID: 0, UnitName: 'Select' })
                $scope.UnitList = response.data;
                $scope.loginData.Unit = $scope.UnitList[0];
            }
            else {
                $scope.Message = 'Enter correct username.';
            }
        },
        function (err) {
            // //;
            $scope.Message = err.error_description;
        });
    }

    $scope.Checkuser = function Checkuser(loginData) {
        //debugger;
        usSpinnerService.spin('GridSpinner');
        loginData.UnitID = loginData.Unit.UnitID;
        loginData.Clinic = loginData.Unit.UnitName;
        $scope.count++;
        if ($scope.count == 1) {
            var promise1 = authService.ValidateUser(loginData);
            promise1.then(function (Response) {
                //  //;
                //debugger;
                $scope.LoginList = Response.data;
                $rootScope.SessionTimeOut = $scope.LoginList.SessionTimeOut;
                if (Response.data.ErrorStatus == 1) {
                    var D = new Date('1/1/1900 12:00:00 AM')
                    if (Response.data.IsLocked == 1 && D != Response.data.LockedDateTime) {
                        var LockDuration = Response.data.LockDuration;
                        var d1 = $filter('date')(new Date(), 'M/d/yy h:mm');
                        var d2 = $filter('date')(Response.data.LockedDateTime, 'M/d/yy h:mm');
                        var miliseconds = new Date(d1) - new Date(d2);
                        var seconds = miliseconds / 1000;
                        var minutes = seconds / 60;
                        //   var hours = minutes / 60;
                        //    var days = hours / 24;
                        if (minutes >= LockDuration) {
                            var User = [];
                            User.push(Response.data.UserID.toString());
                            User.push(false.toString());
                            User.push('');
                            //  User.push(null);
                            var promise = authService.LockUnlockUser(User);
                            promise.then(function (Resp) {
                                //   //;
                                if (Resp.data == 1) {
                                    localStorageService.set('UserInfo', Response.data);
                                    if (Response.data != null) {
                                        localStorageService.remove('LoginCount');
                                        $scope.Message = '';
                                        //   window.location = "/Home/Index/";
                                        $scope.login(loginData);
                                    }
                                }
                            }, function (error) {
                                // alert('Error While Locking/Unlocking User !!!')
                                $scope.count = 0;
                            });
                        }
                    }
                    else {
                        localStorageService.set('UserInfo', Response.data);
                        if (Response.data.LoginName != null) {
                            // window.location = "/Home/Index/";
                            $scope.login(loginData);
                        }
                    } 
                }
                else if (Response.data.ErrorStatus == 0) {
                    //  alert("User Already Login,Please Login From Another");
                    //AlertMessage.info('Palash', 'User Already Login,Please Login From Another');//Commented by swati for localization on 13/7/2020
                    AlertMessage.info(objResource.msgTitle, ObjResource.msgUserAlreadyLoginPleaseLoginFromAnother);//Modified by swatih for localization 13/7/2020
                    $scope.count = 0;
                    $window.location.href = API.Baseurl;
                    usSpinnerService.stop('GridSpinner');
                }
                else {
                    if (loginData.UnitID == 0)
                        $scope.Message = "Select clinic";
                    else
                        $scope.Message = "Please Enter Valid UserName and Password";

                    var count = 0;
                    $scope.count = 0;
                    if (localStorageService['LoginCount'] === undefined) {
                        localStorageService['LoginCount'] = 1;
                    }
                    //    localStorageService['LoginCount'] = count;
                    count = parseInt(localStorageService["LoginCount"]);
                    if (count == Response.data.LockThreshold) {
                        var User = [];
                        User.push(Response.data.UserID.toString());
                        User.push(true.toString());
                        User.push('Attempt invalid logins');
                        //       User.push(new Date().toString());
                        var Promise2 = authService.LockUnlockUser(User);
                        Promise2.then(function (Respo) {
                            debugger;
                            if (Respo.data == 1) {
                                //   alert('Your Account Is Locked !!!')
                                $timeout(function () {
                                    $scope.count = 0;
                                }, (Response.data.LockDuration * 60) * 1000);
                                $scope.Message = 'Your Account Is Locked,Wait For ' + Response.data.LockDuration + ' Minutes Or Contact To Admin !!!';
                                localStorageService.remove('LoginCount');
                                //  usSpinnerService.stop('GridSpinner');
                            }
                            //else if (Respo.data == 0)
                            //    alert('Error While Locking/Unlocking User')
                        }, function (error) {
                            //  alert('Error While Locking/Unlocking User !!!')
                            $scope.count = 0;
                            usSpinnerService.stop('GridSpinner');
                        });
                    }
                    localStorageService['LoginCount'] = count + 1;
                    //    Clear();
                    //window.location = '/Login';
                    usSpinnerService.stop('GridSpinner');
                }
            }, function (error) {
                // alert("error" + error.status);
                $scope.count = 0;
                usSpinnerService.stop('GridSpinner');
            });
        }
    };

    $scope.login = function (loginData)
    {
        //debugger;
        //;
        authService.login(loginData).then(function (response) {
            //;
            if (response.value == 1) {
                $scope.Message = "Someone has already logged in Try Different Browser !!!"; //by these credentials,please use other credentials
                $scope.count = 0;
                usSpinnerService.stop('GridSpinner');
            }
            else {
                debugger;
                $window.location = "gemino";
                usSpinnerService.stop('GridSpinner');
            }
        },
         function (err) {
             //  $scope.Message = err.error_description;
             $scope.count = 0;
             usSpinnerService.stop('GridSpinner');
         });
    };

    $scope.authExternalProvider = function (provider) {
        // //;
        var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

        var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Authentication/ExternalLogin?provider=" + provider
                                                                    + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                    + "&redirect_uri=" + redirectUri;
        window.$windowScope = $scope;

        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };

    $scope.authCompletedCB = function (fragment) {
        //   //;
        $scope.$apply(function () {

            if (fragment.haslocalaccount == 'False') {

                authService.logOut();

                authService.externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name,
                    externalAccessToken: fragment.external_access_token
                };

                //   $location.path('/associate');

            }
            else {
                //Obtain access token and redirect to orders
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                authService.obtainAccessToken(externalData).then(function (response) {

                    //   $location.path('/orders');

                },
             function (err) {
                 //;
                 $scope.message = err.error_description;
             });
            }

        });
    }

    $scope.RedirectToSignUp = function () {
        $window.location.href = "Authentication/SignUp"
    }

    function Clear() {
        $scope.loginData = {};
    }

}]);
