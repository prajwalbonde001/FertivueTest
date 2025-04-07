'use strict';

PIVF.controller('UserController', function ($rootScope, $scope, $location, AlertMessage, swalMessages, UserService, srvCommon, authService, $filter, $uibModal, UserRoleService, Common, localStorageService, usSpinnerService) { //, usSpinnerService
    //  $scope.bigTotalItems = 0;
    debugger;
    $rootScope.CycleDetails = null;
    $rootScope.Allergies = null;
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $rootScope.IsFemaleActive = false;
    $rootScope.IsMaleActive = false;
    $rootScope.IsCycleActive = false;
    $rootScope.ForPrint = 0;
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.User = {};
    $scope.UL = {};
    $scope.SelUnitRoleList = [];
    $scope.selectedRoles = [];
 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
 //   $scope.OnNewPage = false;
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
        $scope.btnText = objResource.btnSave;
    }

    $scope.User.UserTypeId = 0;
    $scope.UL.UsrType = 0
    
    $scope.PageChange = function PageChange() {
        //$scope.StaffList = [];
        $scope.GetUserList();
    }

    $scope.NewUserPge = function NewUserPge() {
        debugger;
        $rootScope.FormName = 'New User';
        $scope.User = {};
        $location.path('/AddUser').search({ Edit: false });
        localStorageService.set('newpage', true);
    };  //redirect to new user page

    $scope.GetUnitList = function GetUnitList() {
        debugger;
        $scope.UserTypeList = [         // to fill Appt status ddl for search criteria
              { ID: 0, Type: objResource.lblSelect },
              { ID: 1, Type: 'Doctor' },
              { ID: 2, Type: 'Employee' },
        ];
        var responseData = UserService.GetUnitList();
        responseData.then(function (Response) {
         //   
            Response.data.splice(0, 0, { UnitID: 0, UnitName: objResource.lblSelect });
            $scope.UnitList = Response.data;
            $scope.User.Unit = $scope.UnitList[0];
            var id=localStorageService.get('userid');
            if (id !=null) {                          // for edit user
                var Response = UserService.GetUserByID(localStorageService.get('userid'));
                Response.then(function (resp) {
                  //  
                    //localStorageService.removeItem('userid');
                    $scope.btnText = objResource.btnUpdate;
                    $scope.User = resp.data;
                    $scope.User.Unit = $scope.UnitList[0];
                    $scope.User.Role = $scope.RoleList[0];
                    $scope.IsDisable = true;
                    localStorageService.remove('newpage');
                    if (resp.data != null) {
                        $scope.User.SelID = resp.data.SelID;
                        $scope.GetNameList();
                        $scope.GetRoleListUserwise(parseInt(id));
                    }
                    if ($scope.User.ExpirationInterval > 0)
                        $scope.User.IsExpirationInterval = true;
                    $scope.GetUserrights();
                })
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }

    $scope.GetRoleList = function GetRoleList() {

        debugger;
        var responseData = UserService.GetRoleList();
        responseData.then(function (Response) {
               
               if (angular.isDefined(localStorageService['newpage'])) {
                   Response.data.splice(0, 0, { RoleId: 0, Description: objResource.lblSelect });
                   localStorageService.remove('newpage');
               }
               else {
                   $scope.UserTypeList = [
                               { ID: 0, Type: objResource.lblUserType },
                               { ID: 1, Type: 'Doctor' },
                               { ID: 2, Type: 'Employee' },
                   ];
                   Response.data.splice(0, 0, { RoleId: 0, Description: objResource.lblRole });
               }
            $scope.RoleList = Response.data;
            $scope.User.Role = $scope.RoleList[0];
            $scope.UL.UsrRole = $scope.RoleList[0].RoleId;
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }

    $scope.GetRoleListUserwise = function GetRoleList(UserID) {
        debugger;
        var exists = angular.element('#tblUserList').length;
        if (exists) {
            var tbl = angular.element(tblUserList);
            angular.forEach(tbl[0].rows, function (item) {
                var classn = item.className.split(' ');
                if (classn.indexOf('in') > -1) {
                    var idx = classn.findIndex(function (c) { return c == 'in'; });
                    classn.splice(idx, 1);
                    item.className = classn.join(' ');
                }
             //   else classn.push('collapsed');
            })
        }
        var responseData = UserService.GetRoleListUserwise(UserID);
        responseData.then(function (Response) {
            //
            $scope.SelUnitRoleList = [];
            angular.forEach(Response.data, function (item) {
                //
                var unit = {};
                var role = {};
                unit = $filter('filter')($scope.UnitList, { UnitID: item.UnitID }, true);
                role = $filter('filter')($scope.RoleList, { RoleId: item.RoleID }, true);
                $scope.selectedRoles.push([item.UnitID, item.RoleID]);
                $scope.SelUnitRoleList.push({ UnitName: unit[0].UnitName, Role: role[0].Description });
            })
            
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }  // role list for edit user role

    $scope.GetUserList = function GetUserList(Name,LogName,UsrType,UsrRole) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        $rootScope.FormName = 'User';
        var responseData = UserService.GetUserList($scope.CurrentPage-1,Name,LogName,UsrType,UsrRole,true);
        responseData.then(function (Response) {
         //   
            $scope.UserList = Response.data;
            usSpinnerService.stop('GridSpinner');
            if (Response.data.length>0) {
                $scope.TotalItems = $scope.UserList[0].TotalCount;
            }
            else {
                $scope.TotalItems = 0;
            }
            $scope.GetUserrights();
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }  //for landing page

    $scope.SelectedUser = function (selected) {
        debugger;
        if (angular.isDefined(selected.ID)) {
            $scope.User.SelID = selected.ID;
        }
        //else if (angular.isDefined(selected.ID)) {
        //    $scope.User.SelID = selected.ID;
        //}
        var name = [];
        var Description;
        var idx = selected.Description.indexOf('.');
        if (idx > -1) {
            Description = selected.Description.substring(3);
        }
        else Description = selected.Description;
            name = Description.split(' '); //selected.Description;
            $scope.User.LoginName = name[0] + '.' + name[name.length - 1].substring(0, 1);
            if (angular.isUndefined($scope.User.UserID)) { $scope.User.UserID = 0; }
            var responseData = UserService.LoginNameExists($scope.User.LoginName, $scope.User.UserID);
            responseData.then(function (Response) {
             //   
                if (Response.data == 1)
                    $scope.User.LoginName = name[0] + '.' + name[name.length - 1];
             //   AlertMessage.info(objResource.msgTitle, 'LoginName is exists.');
            });
    }  //generate login name

    $scope.GetNameList = function GetNameList() {
        debugger;
        var id = localStorageService.get('userid');
        if (angular.isDefined(id)) {
            localStorageService.remove('userid');
        }
        else {
            $scope.selected = null;
            $scope.User.SelID = 0;
            $scope.User.LoginName = angular.element(txtfullName).html();
        }
        if ($scope.User.UserTypeId == 2) {
            var responseData = UserService.GetEmployeeList();
            responseData.then(function (Response) {
                   
                $scope.NameList = Response.data;
                if ($scope.User.SelID > 0) {
                    var data = {};
                    data.ID = $scope.User.SelID;
                    data.Description = $scope.User.UserName;
                   // data = $filter('filter')($scope.NameList, { ID: $scope.User.SelID }, true);
                    $scope.selected = data;
                }
            }, function (error) {
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
        }
        else if ($scope.User.UserTypeId == 1) {
            var responseData = UserService.GetDoctorList();
            responseData.then(function (Response) {
                debugger;
                $scope.NameList = Response.data;
                angular.forEach($scope.NameList, function (item) {
                    item.Description = 'Dr.' + item.Description;
                });
                if ($scope.User.SelID > 0) {
                    //    
                    var data = {};
                    data.ID = $scope.User.SelID;
                    data.Description = 'Dr.'+$scope.User.UserName;
                  //  data = $filter('filter')($scope.NameList, { ID: $scope.User.SelID }, true);
                    $scope.selected = data;
                }
            }, function (error) {
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
        }
    }

    $scope.AddUnitRole = function AddUnitRole() {
        debugger;
           if ($scope.User.Unit.UnitName !== "Select" && $scope.User.Role.Description !== "Select") {
               if ($scope.SelUnitRoleList.some(function (td) { return td.UnitName === $scope.User.Unit.UnitName })) {
                   AlertMessage.info(objResource.msgTitle, objResource.msgDuplicate);
               }
               else {
                   if ($scope.SelUnitRoleList.some(function (td) { return td.Role === $scope.User.Unit.Description })) {
                       AlertMessage.info(objResource.msgTitle, objResource.msgDuplicate);
                   }
                   else {
                       $scope.SelUnitRoleList.push({ UnitName: $scope.User.Unit.UnitName, Role: $scope.User.Role.Description });
                       $scope.selectedRoles.push([$scope.User.Unit.UnitID, $scope.User.Role.RoleId]);
                       $scope.User.Unit = $scope.UnitList[0];
                       $scope.User.Role = $scope.RoleList[0];
                       $scope.frmUser.ddlClinic.$dirty = false;
                       $scope.frmUser.ddlRole.$dirty = false;
                   }
               }
           }
           else {
               AlertMessage.info(objResource.msgTitle, "Select Clinic/Role.");
           }
    }  //add unit role to grid

    $scope.RemoveUnitRole = function RemoveUnitRole(idx,item) {
        debugger;
       /// if (idx > -1) {    commented by Nayan Kamble on 02/12/2019
            //$scope.SelUnitRoleList.splice(idx, 1);
            //$scope.selectedRoles.splice(idx, 1);

            //Added by Nayan Kamble on 29/11/2019  START
            item.UserID = $scope.User.UserID;
            item.UnitID = $scope.selectedRoles[idx][0];
            var responseData = UserService.DeleteUnit(item.UserID,item.UnitID);
            responseData.then(function (Response) {
                $scope.SelUnitRoleList.splice(idx, 1);
                $scope.selectedRoles.splice(idx, 1);
                AlertMessage.success(objResource.msgTitle, 'Record deleted successfully!');
            }, function (error) {
                // 
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });

            //Added by Nayan Kamble on 29/11/2019  END
        // }      commented by Nayan Kamble on 02/12/2019
    }  

    $scope.SaveUpdateUser = function SaveUpdateUser(User) {
        debugger;
        //
        //var msg = '';
        //if (User.UserID > 0)
        //    msg = objResource.msgCnfUpdate;
        //else msg = objResource.msgCnfSave;
        //swalMessages.MessageBox(objResource.msgTitle, msg, "warning", function (isConfirmed) {
        //    if (isConfirmed) {
        if ($scope.frmUser.$valid && $scope.User.UserTypeId != 0 && $scope.selectedRoles.length != 0) {
            if ($scope.selectedRoles.length > 0) {
                if ($scope.ValidateForm(User)) {
                    if (angular.isUndefined(User.UserID) || User.UserID == 0) {
                        authService.saveRegistration(User).then(function (response) {
                            debugger;
                            if (response.status == 200) {
                                User.UnitID = User.Unit.UnitID;
                                User.selectedRoles = $scope.selectedRoles;
                                delete User.Unit;
                                delete User.Role;
                                var responseData = UserService.SaveUpdateUser(User);
                                responseData.then(function (Response) {
                                     //
                                    $scope.IsDisable = false;
                                    //if (angular.isUndefined(User.UserID) || User.UserID == 0)
                                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                                    //   $scope.Clear();
                                    $location.path('/UserList/')
                                    //else
                                    //    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                                }, function (error) {
                                    // 
                                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                                });
                            }
                        },
                             function (response) {
                                 //  
                                 if (response.data.Message == "3")
                                     AlertMessage.error(objResource.msgTitle, objResource.msgloginExist);
                             });
                    }
                    else {
                        User.UnitID = User.Unit.UnitID;
                        User.selectedRoles = $scope.selectedRoles;
                        delete User.Unit;
                        delete User.Role;
                        var responseData = UserService.SaveUpdateUser(User);
                        responseData.then(function (Response) {
                            //
                            AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                            $scope.btnText = objResource.btnSave;
                            //  $scope.Clear();
                            $location.path('/UserList/')
                        }, function (error) {
                            //
                            AlertMessage.error(objResource.msgTitle, objResource.msgError);
                        });
                    }
                }
            }
            else {
                AlertMessage.warning(objResource.msgTitle, objResource.msgSelectrole);
            }
        }
        else {
            $scope.frmUser.txtUsrName.$dirty = true;
            $scope.frmUser.txtLoginName.$dirty = true;
            $scope.frmUser.ddlUsrType.$dirty = true;
            $scope.frmUser.txtPwd.$dirty = true;
            $scope.frmUser.txtCnfPwd.$dirty = true;
            $scope.frmUser.txtminpwdlength.$dirty = true;
            $scope.frmUser.txtmaxpwdlength.$dirty = true;
            $scope.frmUser.txtminpwdage.$dirty = true;
            $scope.frmUser.txtmaxpwdage.$dirty = true;
            $scope.frmUser.txtLockThrsh.$dirty = true;
            $scope.frmUser.txtlockdurn.$dirty = true;
            if ($scope.selectedRoles.length == 0) {
                $scope.frmUser.ddlClinic.$dirty = true;
                $scope.frmUser.ddlRole.$dirty = true;
            }
            AlertMessage.warning(objResource.msgTitle, objResource.lblFillMandatoryFields);
        }

        //    } else {
                
        //    }
        //});
    }

    $scope.toggleSelection = function toggleSelection(MenuID) {
        var idx = $scope.selectedMenus.indexOf(MenuID);
        if (idx > -1) {
            $scope.selectedMenus.splice(idx, 1);
        }
        else {
            $scope.selectedMenus.push(MenuID);
        }
    }

    $scope.EditUser = function EditUser(item) {
       // 
        localStorageService.set('userid', item.UserID);
        localStorageService.set('newpage', true);
        $location.path('/AddUser').search({ Edit: true });
    }  //modify user data

    $scope.ResetPassword = function ResetPassword(User) {
        var Promise = UserService.GetUserByID(User.UserID);
        Promise.then(function (resp) {
         //   
            var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                templateUrl: 'resetPwd',
                controller: 'ctrlPopUp',
                backdrop: false,
                keyboard: false,
                size: 'md',
                resolve: {
                    objUser: function () {
                        return resp.data;
                    }
                }
            });
            modalInstance.result.then(function (user) {     // return here after cancel reason entered
                var responseData = authService.resetPassword(user);
                responseData.then(function (Response) {
                       
                       if (Response.status == 200) {
                           AlertMessage.success(objResource.msgTitle, objResource.msgPasswordreset);
                       }
                }, function (error) {
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                });
            });

        }, function (error) {

        })
       
    }  //reset user password

    $scope.ActivateDeactivateUser = function ActivateDeactivateUser(user) {
      //  
        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: 'modReason',
            controller: 'ctrlPopUp',
            backdrop: false,
            keyboard:false,
            size: 'sm',
            resolve: {
                objUser: function () {
                    return user;
                }
            }
        });
        modalInstance.result.then(function (reason, userback) {     // return here after cancel reason entered
          //  
            var User = [];
            User.push(user.UserID.toString());
            User.push((!user.Status).toString());
            User.push(reason);
            var responseData = UserService.ActivateDeactivateUser(User);
            responseData.then(function (Response) {
              //  
                if (Response.status == 200)
                    user.Status = !user.Status;
                AlertMessage.success(objResource.msgTitle, objResource.lblUsrActDeact);
            }, function (error) {
              //  
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
        });  
    }  //activate deactivate user with reason

    $scope.LockUnlockUser = function ActivateDeactivateUser(user) {
        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: 'modReason',
            controller: 'ctrlPopUp',
            backdrop: false,
            keyboard: false,
            size: 'sm',
            resolve: {
                objUser: function () {
                    return user;
                }
            }
        });
        modalInstance.result.then(function (reason) {     // return here after cancel reason entered
            var User = [];
            User.push(user.UserID.toString());
            User.push((!user.IsLocked).toString());
            User.push(reason);
            User.push(user.LoginName);
            var responseData = UserService.LockUnlockUser(User);
            responseData.then(function (Response) {
               // 
                if (Response.status == 200)
                    user.IsLocked = !user.IsLocked;
                AlertMessage.success(objResource.msgTitle, objResource.msgusrLockUnlock);
            }, function (error) {
               // 
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
        });
    }  //lock unlock user with reason

    $scope.Cancel = function Cancel() {
        $location.path('/UserList/');
    }

    $scope.GetMenuList = function (idx) {
      //  
        var selRole = $scope.selectedRoles[idx][1];
      //  $scope.btnText = 'Save';
        var Promise = UserRoleService.GetMenuList();
        Promise.then(function (Response) {
         //   


            $scope.MenuArray = [];
            //$scope.MenuArray1 = [];
            //var totRowCnt = Response.data.lstRoles.length;
            //var halfRowCnt = Math.ceil(totRowCnt / 2);
            angular.forEach(Response.data.lstRoles, function (Test) {
              //  if ($scope.MenuArray.length != halfRowCnt) {
                    $scope.MenuArray.push(Test.objMenu);
                //}
                //else {
                //    $scope.MenuArray1.push(Test.objMenu);
                //}
            })
            if (angular.isDefined(selRole) && selRole != null) {
                // $scope.Role = {};
                //$scope.Role.Code = selRole.Code;
                //$scope.Role.Description = selRole.Description;
                //$scope.Role.RoleId = selRole.RoleId;
                //$scope.btnText = 'Update';
                var Promise = UserRoleService.GetRoleDetails(selRole);
                var z = 0;
                var x = 0;
                var y = 0;
                var w = 0;
                Promise.then(function (resp) {
                    for (var j = 0; j < resp.data.lstMenu.length; j++) {
                        angular.forEach($scope.MenuArray, function (Test) {
                            angular.forEach(Test.lstMenu, function (item) {
                                if (item.MenuId == resp.data.lstMenu[z].MenuId) {//&& item.Status == resp.data.lstMenu[z].Status
                                    item.IsAll = resp.data.lstMenu[z].IsAll;
                                    item.IsCreate = resp.data.lstMenu[z].IsCreate;
                                    item.IsUpdate = resp.data.lstMenu[z].IsUpdate;
                                    item.IsRead = resp.data.lstMenu[z].IsRead;
                                    item.IsPrint = resp.data.lstMenu[z].IsPrint;
                               //     $scope.selectedMenus.push({ MenuId: item.MenuId, IsAll: item.IsAll, IsCreate: item.IsCreate, IsUpdate: item.IsUpdate, IsRead: item.IsRead, IsPrint: item.IsPrint });
                                    // z++;
                                }
                            })
                        })
                        z++;
                    }
                    for (var j = 0; j < resp.data.lstMenu.length; j++) {
                      //  
                        angular.forEach($scope.MenuArray, function (Test) {
                            angular.forEach(Test.lstInnerMenu, function (item) {
                                if (item.MenuId == resp.data.lstMenu[x].MenuId) {//&& item.Status == resp.data.lstMenu[z].Status
                                    item.IsAll = resp.data.lstMenu[x].IsAll;
                                    item.IsCreate = resp.data.lstMenu[x].IsCreate;
                                    item.IsUpdate = resp.data.lstMenu[x].IsUpdate;
                                    item.IsRead = resp.data.lstMenu[x].IsRead;
                                    item.IsPrint = resp.data.lstMenu[x].IsPrint;
                             //       $scope.selectedMenus.push({ MenuId: item.MenuId, IsAll: item.IsAll, IsCreate: item.IsCreate, IsUpdate: item.IsUpdate, IsRead: item.IsRead, IsPrint: item.IsPrint });
                                    // x++;
                                }
                            })
                        })
                        x++;
                    }

                    //for (var j = 0; j < resp.data.lstMenu.length; j++) {
                    //    angular.forEach($scope.MenuArray1, function (Test) {
                    //        angular.forEach(Test.lstMenu, function (item) {
                    //            if (item.MenuId == resp.data.lstMenu[y].MenuId) {//&& item.Status == resp.data.lstMenu[y].Status
                    //                item.IsAll = resp.data.lstMenu[y].IsAll;
                    //                item.IsCreate = resp.data.lstMenu[y].IsCreate;
                    //                item.IsUpdate = resp.data.lstMenu[y].IsUpdate;
                    //                item.IsRead = resp.data.lstMenu[y].IsRead;
                    //                item.IsPrint = resp.data.lstMenu[y].IsPrint;
                    //           //     $scope.selectedMenus.push({ MenuId: item.MenuId, IsAll: item.IsAll, IsCreate: item.IsCreate, IsUpdate: item.IsUpdate, IsRead: item.IsRead, IsPrint: item.IsPrint });
                    //            }
                    //        })
                    //    })
                    //    y++;
                    //}
                    //for (var j = 0; j < resp.data.lstMenu.length; j++) {
                    //    
                    //    angular.forEach($scope.MenuArray1, function (Test) {
                    //        angular.forEach(Test.lstInnerMenu, function (item) {
                    //            if (item.MenuId == resp.data.lstMenu[w].MenuId) {//&& item.Status == resp.data.lstMenu[z].Status
                    //                item.IsAll = resp.data.lstMenu[w].IsAll;
                    //                item.IsCreate = resp.data.lstMenu[w].IsCreate;
                    //                item.IsUpdate = resp.data.lstMenu[w].IsUpdate;
                    //                item.IsRead = resp.data.lstMenu[w].IsRead;
                    //                item.IsPrint = resp.data.lstMenu[w].IsPrint;
                    //         //       $scope.selectedMenus.push({ MenuId: item.MenuId, IsAll: item.IsAll, IsCreate: item.IsCreate, IsUpdate: item.IsUpdate, IsRead: item.IsRead, IsPrint: item.IsPrint });
                    //            }
                    //        })
                    //    })
                    //    w++;
                    //}

                });
              //  localStorageService.removeItem('SelRole')
            }
            $scope.MenuList = $scope.MenuArray;
          //  $scope.MenuList1 = $scope.MenuArray1;

        });
    }  // menu list for specific role

    $scope.Clear = function () {
        //
        $scope.User = {};
        $scope.User.UserTypeId = 0;
        $scope.User.Unit = $scope.UnitList[0];
        $scope.User.Role = $scope.RoleList[0];
        $scope.selectedRoles.length=0;
        $scope.selected = null;
        $scope.frmUser.$setPristine();
    }   //clear all data

    $scope.ValidateForm = function ValidateForm(objUser) {
      //  
        //  $scope.IsFormValid = true;
        debugger;
        if (objUser.Password != objUser.ConfPassword) {
            AlertMessage.info(objResource.msgTitle, objResource.msgpwdandcnfpwdmatch);
            return false;
        }
        else if (parseInt(objUser.MinPwdLength) ==0) {
            AlertMessage.info(objResource.msgTitle, objResource.msgMinPwdLen);
            return false;
        }
        //else if (objUser.MinPwdLength > objUser.MaxPwdLength) {
        //    AlertMessage.info(objResource.msgTitle, objResource.msgMaxPwdLen);
        //    return false;
        //}
        else if (parseInt(objUser.MaxPwdLength) >20) {
            AlertMessage.info(objResource.msgTitle, objResource.msgMaxPwdLeneql20);
            return false;
        }
        else if (parseInt(objUser.MaxPwdLength) < parseInt(objUser.MinPwdLength)) {
            AlertMessage.info(objResource.msgTitle, objResource.msgMaxPwdGrtrThanMinPwd);
            return false;
        }
        else if (parseInt(objUser.MinPwdAge) == 0) {
            AlertMessage.info(objResource.msgTitle, objResource.msgMinPwdAgenotZero);
            return false;
        }
        //else if (objUser.MinPwdAge > objUser.MaxPwdAge) {
        //    AlertMessage.info(objResource.msgTitle, objResource.msgMinPwdAgelessThanMaxAge);
        //    return false;
        //}
        else if (parseInt(objUser.MaxPwdAge) < parseInt(objUser.MinPwdAge)) {
            AlertMessage.info(objResource.msgTitle, objResource.msgMaxPwdAgegrtrThanMinAge);
            return false;
        }
        else if (objUser.SelID == 0 || objUser.SelID == undefined || objUser.SelID == null) {
            AlertMessage.info(objResource.msgTitle, 'Doctor or Emplyee not exists.');
            return false;
        }
        else {
            return true;
        }
        
    };   //check all validation before save

    $scope.EnableDisableExpIntrvl = function (chk) {
        if (chk == true)
            $scope.EnDsblExp = false;
        else
            $scope.EnDsblExp = true;
    }    //enable disable textbox

    $scope.LoginNameExists = function (logName) {
        debugger;
        if (angular.isDefined(logName) && logName.length>0) {
            if (angular.isUndefined($scope.User.UserID)) { $scope.User.UserID = 0; }
            var responseData = UserService.LoginNameExists(logName, $scope.User.UserID);
            responseData.then(function (Response) {
              //  
                if (Response.data == 1) {
                    $scope.User.LoginName = null;
                    AlertMessage.info(objResource.msgTitle, objResource.msgloginExist);
                }
            }, function (error) {
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
        };
    }   //check login name availability

    $scope.ShowPwd = function ShowPwd() {  
        var obj = angular.element(document.getElementById('txtPwd'));
        if (obj[0].type == "password")
            obj[0].type = "text";
        else obj[0].type = "password";
    }    // view password

    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        //
        var Promise = UserService.GetUserList($scope.CurrentPage - 1, $scope.UL.Name, $scope.UL.LogName, $scope.UL.UsrType, $scope.UL.UsrRole, false);
        Promise.then(function (Response) {
            //
            var filteredData = _.map(Response.data, function (data) {

                var users = {
                    'Name': data.UserName, 'Login Name': data.LoginName, 'User Type': data.UserType, 'Locked': data.IsLocked, 'Active': data.Status
                }
                return users;
            });

            alasql('SELECT * INTO XLSX("User.xlsx",{headers:true}) FROM ?', [filteredData]);

        }, function (error) {
            $scope.Message = "Error" + error.status;
        });


        //var exportHref = Excel.tableToExcel(tableId, 'PatientRegistrationData');
        //$timeout(function () { location.href = exportHref; }, 100); // trigger download
    }

    $scope.GetUserrights = function () {
        debugger;
        var lstUserRights = Common.getUserRights();
       // if (selectPatient.GenderID == 1) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 102 && lstUserRights[z].Active)//user
                {
                    $scope.objRgt = lstUserRights[z];
                    break;
                }
            }
    //    }
        if (!$scope.objRgt.IsCreate && $scope.btnText == 'Save') {
         //   angular.element(btnAddNewUser).prop('disabled', true);
            angular.element(btnText).prop('disabled', true);
        }
        else if (!$scope.objRgt.IsUpdate && $scope.btnText == 'Update') {
          //  angular.element(btnAddNewUser).prop('disabled', true);
            angular.element(btnText).prop('disabled', true);
        }
        else {
          //  angular.element(btnAddNewUser).prop('disabled', false);
            angular.element(btnText).prop('disabled', false);
        }
    }  // For User rights configuration
});

PIVF.controller('ctrlPopUp', function ($scope, $uibModalInstance, objUser, srvCommon, authService, AlertMessage) {
   // 
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    $scope.reset = {};
    $scope.reset = objUser;
    $scope.Ok = function (reset) {
        debugger;
        if ($scope.IsValid) {
            if (!angular.isUndefined(reset.Password) && reset.Password != "") {
                $uibModalInstance.close(reset);
            }
        }
    };

    $scope.Cancel = function () {
        //  
        $uibModalInstance.dismiss('cancel');
    };

    $scope.ReasonOk = function (Reason) {
      //  
        if (!angular.isUndefined(Reason) && Reason != "") {
            $uibModalInstance.close(Reason);
        }
    };  // for lock/unlock reason

    $scope.ReasonCancel = function () {
        //  
        $uibModalInstance.dismiss('cancel');
    };

    $scope.validatePwd = function validate(obj) {
        debugger;
        $scope.msg = '';
        $scope.IsValid = true;
        var pwd = $scope.reset.Password;
        if (angular.isDefined(pwd) && pwd != null) {
            var responseData = authService.checkCurrentPassword($scope.reset);
            responseData.then(function (Response) {
                if (Response.data == 1) {
                    $scope.msg = objResource.lblPwdShouldContain + ' ';
                    if (objUser.MinPwdLength > 0) {
                        if ($scope.IsValid == true)
                            $scope.IsValid = pwd.length >= objUser.MinPwdLength;
                        $scope.msg = $scope.msg + objResource.lblMinimum + ' ' + objUser.MinPwdLength + ' ' + objResource.lblChar;
                    }
                    if (objUser.MaxPwdLength > 0) {
                        if ($scope.IsValid == true)
                            $scope.IsValid = pwd.length <= objUser.MaxPwdLength;
                        $scope.msg = $scope.msg + ' , ' + objResource.lblMaximum + ' ' + objUser.MaxPwdLength + ' ' + objResource.lblChar;
                    }
                    if (objUser.AtleastOneDigit) {
                        if ($scope.IsValid == true)
                            $scope.IsValid = /[0-9]/.test(pwd);
                        $scope.msg = $scope.msg + ' , ' + objResource.msgAtleastoneDigit;
                    }
                    if (objUser.AtleastOneUpperCase) {
                        if ($scope.IsValid == true)
                            $scope.IsValid = /[A-Z]/.test(pwd);
                        $scope.msg = $scope.msg + ' , ' + objResource.msgOneUpperCase;
                    }
                    if (objUser.AtleastOneLowerCase) {
                        if ($scope.IsValid == true)
                            $scope.IsValid = /[a-z]/.test(pwd);
                        $scope.msg = $scope.msg + ' , ' + objResource.msgOneLowerCase;
                    }
                    if (objUser.AtleastOneSpecialChar) {
                        if ($scope.IsValid == true)
                            $scope.IsValid = /[<>@!#$%^&*]/.test(pwd);
                        $scope.msg = $scope.msg + '  ' + objResource.msgoneSpclChar;
                    }
                    if ($scope.IsValid) {
                        $scope.msg = '';
                    }
                }
                else {
                    $scope.reset.Password = null;
                    AlertMessage.info(objResource.msgTitle, 'Current password and new password should not be same');
                }
            }, function (error) {
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
                //$scope.msg = objResource.lblPwdShouldContain + ' ';
                //if (objUser.MinPwdLength > 0) {
                //    if ($scope.IsValid == true)
                //        $scope.IsValid = pwd.length >= objUser.MinPwdLength;
                //    $scope.msg = $scope.msg + objResource.lblMinimum + ' ' + objUser.MinPwdLength + ' ' + objResource.lblChar;
                //}
                //if (objUser.MaxPwdLength > 0) {
                //    if ($scope.IsValid == true)
                //        $scope.IsValid = pwd.length <= objUser.MaxPwdLength;
                //    $scope.msg = $scope.msg + ' , ' + objResource.lblMaximum + ' ' + objUser.MaxPwdLength + ' ' + objResource.lblChar;
                //}
                //if (objUser.AtleastOneDigit) {
                //    if ($scope.IsValid == true)
                //        $scope.IsValid = /[0-9]/.test(pwd);
                //    $scope.msg = $scope.msg + ' , ' + objResource.msgAtleastoneDigit;
                //}
                //if (objUser.AtleastOneUpperCase) {
                //    if ($scope.IsValid == true)
                //        $scope.IsValid = /[A-Z]/.test(pwd);
                //    $scope.msg = $scope.msg + ' , ' + objResource.msgOneUpperCase;
                //}
                //if (objUser.AtleastOneLowerCase) {
                //    if ($scope.IsValid == true)
                //        $scope.IsValid = /[a-z]/.test(pwd);
                //    $scope.msg = $scope.msg + ' , ' + objResource.msgOneLowerCase;
                //}
                //if (objUser.AtleastOneSpecialChar) {
                //    if ($scope.IsValid == true)
                //        $scope.IsValid = /[<>@!#$%^&*]/.test(pwd);
                //    $scope.msg = $scope.msg + '  ' + objResource.msgoneSpclChar;
                //}
                //if ($scope.IsValid) {
                //    $scope.msg = '';
                //}
        }
        else {
            $scope.msg = objResource.msgEnterPwd;
            $scope.IsValid = false;
        }
    };  //reset password validation

    $scope.Confirmpwd = function Confirmpwd(pwd) {
        //
        if (angular.isDefined(pwd)) {
            if (pwd == $scope.reset.Password) {
                // $scope.IsValid = true;
                if ($scope.msg != '' && $scope.msg == 'Password and confirm password should be match.')
                $scope.msg = '';
            }
            else {
                // $scope.IsValid = false;
                $scope.msg = objResource.msgpwdandcnfpwdmatch;
            }
        }
    }

    $scope.ViewPwd = function ShowPwd() {
          //
          var obj = angular.element(document.getElementById('txtPwd'));

        if (obj[0].type == "password")
            obj[0].type = "text";
        else obj[0].type = "password";
    }   //view pwd

})