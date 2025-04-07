'use strict';

angular.module('PIVF').controller('WardCtr', [
    '$scope', '$rootScope', 'AlertMessage', 'IPDService','BillingService','Common','DoctorService','UserService',
    function ($scope, $rootScope, AlertMessage, IPDService,BillingService,Common,DoctorService,UserService) {

        $scope.BillingList = [];
        $scope.filteredBillingList = [];
        $scope.search = { Code: '', Description: '' };
        $scope.isFormVisible = false;

        $scope.IPDClassList = [];
        $scope.filteredIPDClassList = [];
        $scope.isClassFormVisible = false;

        $scope.IPDBedList = [];
         $scope.DepartmentList = [];
          $scope.DoctorList = [];
        $scope.IPDBedListById = [];
        $scope.filteredBedClassList = [];
        $scope.isBedFormVisible = false;

        // Fetch User List from Service
        $scope.GetUserList = function () {
            IPDService.GetServiceList().then(
                function (resp) {
                    if (resp.data) {
                        $scope.BillingList = resp.data;
                        $scope.filteredBillingList = angular.copy($scope.BillingList);
                    } else {
                        AlertMessage.error("No data received from server.");
                    }
                },
                function (error) {
                    AlertMessage.error("Failed to fetch service list. Please try again later.");
                }
            );
        };

        // For the IPD Class
        $scope.GetIPDClassList = function () {
            IPDService.GetClassList().then(
                function (resp) {
                    if (resp.data) {
                        $scope.IPDClassList = resp.data;
                        $scope.filteredIPDClassList = angular.copy($scope.IPDClassList);
                    } else {
                        AlertMessage.error("No data received from server.");
                    }
                },
                function (error) {
                    AlertMessage.error("Failed to fetch class list. Please try again later.");
                }
            );
        };

        // For the IPD Bed
                $scope.GetBedClassList = function (ClassID, WardID) {
                IPDService.GetBedList(ClassID || 0, WardID || 0).then(
                    function (resp) {
                        if (resp.data && resp.data.length > 0) {
                            $scope.IPDBedList = resp.data;
                            $scope.filteredBedClassList = angular.copy($scope.IPDBedList);
                            console.log("Bed List Loaded:", $scope.IPDBedList);
                        } else {
                            console.warn("No bed data received from server.");
                            AlertMessage.error("No data received from server.");
                        }
                    }
                ).catch(function (error) {
                    console.error("Error fetching Bed List:", error);
                    AlertMessage.error("Failed to fetch bed list. Please try again later.");
                });
                };

                   $scope.GetBedClass = function (ClassID, WardID) {
                if (!ClassID || !WardID) return; // wait until both values are selected

                IPDService.GetBedList(ClassID, WardID).then(
                    function (resp) {
                        if (resp.data && resp.data.length > 0) {
                            $scope.IPDBedListById = resp.data;
                            console.log("Bed List Loaded:", $scope.IPDBedListById);
                        } else {
                            console.warn("No bed data received from server.");
                            AlertMessage.error("No data received from server.");
                        }
                    }
                ).catch(function (error) {
                    console.error("Error fetching Bed List:", error);
                    AlertMessage.error("Failed to fetch bed list. Please try again later.");
                });
            };





        // Search Functionality
        $scope.SearchBillingList = function () {
            $scope.filteredBillingList = $scope.BillingList.filter(function (item) {
                return (!$scope.search.Code || item.Code.toLowerCase().includes($scope.search.Code.toLowerCase())) &&
                       (!$scope.search.Description || item.Description.toLowerCase().includes($scope.search.Description.toLowerCase()));
            });
        };

        // Reset Search
        $scope.ResetSearch = function () {
            $scope.search = { Code: '', Description: '' };
            $scope.filteredBillingList = angular.copy($scope.BillingList);
        };

        // Toggle Form Visibility
                   $scope.toggleForm = function () {
                $scope.isFormVisible = !$scope.isFormVisible;
                if (!$scope.isFormVisible) {
                    $scope.newUser = {};  // Reset form
                    $scope.editingItem = false;  // Reset editing mode
                }
            };


                $scope.SaveWardMaster = function () {
                debugger
                if (!$scope.newUser.Code || !$scope.newUser.Description) {
                    AlertMessage.error("Code and Description are required!");
                    return;
                }
                       let wardData = {
                        ID: $scope.newUser.ID ? $scope.newUser.ID : null,
                        Code: $scope.newUser.Code,
                        Description: $scope.newUser.Description,
                        Status: $scope.newUser.status  
                    };


                if ($scope.editingItem && $scope.newUser.ID) {
                    // Updating an existing ward
                    IPDService.AddUpdateWardMaster(wardData).then(function (response) {
                        AlertMessage.success("Ward updated successfully!");
                        $scope.GetUserList();  
                        $scope.toggleForm(); 
                    }).catch(function (error) {
                        AlertMessage.error("Failed to update ward.");
                    });
                } else {
                    // Adding a new ward (No ID required)
                    IPDService.AddUpdateWardMaster(wardData).then(function (response) {
                        AlertMessage.success("New ward added successfully!");
                        $scope.GetUserList(); 
                        $scope.toggleForm(); 
                    }).catch(function (error) {
                        AlertMessage.error("Failed to add ward.");
                    });
                }
            };




        // Edit Functionality
           $scope.EditUser = function (item) {
            $scope.newUser = angular.copy(item); // Copy data to prevent modifying the original list
            $scope.isFormVisible = true; // Show the form
            $scope.editingItem = true; // Mark as edit mode
        };

        $scope.SaveEdit = function (item) {
            item.isEditing = false;
            delete item.originalData;
        };

        $scope.CancelEdit = function (item) {
            angular.copy(item.originalData, item);
            item.isEditing = false;
            delete item.originalData;
        };

        // For the IPD Class Section
        $scope.SearchIPDList = function () {
            $scope.filteredIPDClassList = $scope.IPDClassList.filter(function (item) {
                return (!$scope.search.Code || item.Code.toLowerCase().includes($scope.search.Code.toLowerCase())) &&
                       (!$scope.search.Description || item.Description.toLowerCase().includes($scope.search.Description.toLowerCase()));
            });
        };

        // Reset Search
        $scope.ResetClassSearch = function () {
            $scope.search = { Code: '', Description: '' };
            $scope.filteredIPDClassList = angular.copy($scope.IPDClassList);
        };

        // Toggle Form Visibility
        $scope.toggleClassForm = function () {
            $scope.isClassFormVisible = !$scope.isClassFormVisible;

            if ($scope.isClassFormVisible) {
                $scope.newUser = {};
                $scope.editingItemClass = false;
            }
        };

            $scope.EditUserClass = function (item) {
            $scope.newUser = angular.copy(item); 
            $scope.isClassFormVisible = true; 
            $scope.editingItemClass = true;  
        };




         $scope.SaveClassMaster = function () {
                debugger
                if (!$scope.newUser.Code || !$scope.newUser.Description) {
                    AlertMessage.error("Code and Description are required!");
                    return;
                }
                       let ClassData = {
                        ID: $scope.newUser.ID ? $scope.newUser.ID : null,
                        Code: $scope.newUser.Code,
                        Description: $scope.newUser.Description,
                        Status: $scope.newUser.status  
                    };


                if ($scope.editingItemClass && $scope.newUser.ID) {
                    // Updating an existing ward
                    IPDService.AddUpdateClassMaster(ClassData).then(function (response) {
                        AlertMessage.success("Class updated successfully!");
                        $scope.GetIPDClassList();  
                        $scope.toggleClassForm(); 
                    }).catch(function (error) {
                        AlertMessage.error("Failed to update ward.");
                    });
                } else {
                    // Adding a new ward (No ID required)
                    IPDService.AddUpdateClassMaster(ClassData).then(function (response) {
                        AlertMessage.success("New Class added successfully!");
                        $scope.GetIPDClassList(); 
                        $scope.toggleClassForm(); 
                    }).catch(function (error) {
                        AlertMessage.error("Failed to add ward.");
                    });
                }
            };

              // For the IPD Class Section
        $scope.SearchBedList = function () {
            $scope.filteredBedClassList = $scope.IPDBedList.filter(function (item) {
                return (!$scope.search.Code || item.Code.toLowerCase().includes($scope.search.Code.toLowerCase())) &&
                       (!$scope.search.Description || item.Description.toLowerCase().includes($scope.search.Description.toLowerCase()));
            });
        };

        // Reset Search
        $scope.ResetBedSearch = function () {
            $scope.search = { Code: '', Description: '' };
            $scope.filteredBedClassList = angular.copy($scope.IPDBedList);
        };

        // Toggle Form Visibility
        $scope.toggleBedForm = function () {
            $scope.isBedFormVisible = !$scope.isBedFormVisible;
            if ($scope.isBedFormVisible) {
                $scope.newUser = {};
                 $scope.editingBedItem = false;
            }
        };

          $scope.EditBedClass = function (item) {
        $scope.newUser = angular.copy(item);
        $scope.isBedFormVisible = true; 
        $scope.editingBedItem = true; 
    };

      $scope.SaveBedMaster = function () {
                debugger
                if (!$scope.newUser.Code || !$scope.newUser.Description || !$scope.newUser.WardID || !$scope.newUser.ClassID ) {
                    AlertMessage.error("Code and Description are required!");
                    return;
                }
                       let BedData = {
                        ID: $scope.newUser.ID ? $scope.newUser.ID : null,
                        Code: $scope.newUser.Code,
                        Description: $scope.newUser.Description,
                        Status: $scope.newUser.status,  
                        ClassID:$scope.newUser.ClassID,
                        WardID:$scope.newUser.WardID 
                    };

                if ($scope.editingItem && $scope.newUser.ID) {
                    // Updating an existing Bed
                    IPDService.AddUpdateBedMaster(BedData).then(function (response) {
                        AlertMessage.success("Bed updated successfully!");
                        $scope.GetBedClassList();  
                        $scope.toggleBedForm(); 
                    }).catch(function (error) {
                        AlertMessage.error("Failed to update Bed.");
                    });
                } else {
                    // Adding a new Bed (No ID required)
                    IPDService.AddUpdateBedMaster(BedData).then(function (response) {
                        AlertMessage.success("New Bed added successfully!");
                        $scope.GetBedClassList(); 
                        $scope.toggleBedForm(); 
                    }).catch(function (error) {
                        AlertMessage.error("Failed to add Bed.");
                    });
                }
            };

          $scope.tableData = [
                {
                    clinic: "PureCare Clinic",
                    department: "Cardiology",
                    admissionDateTime: "2025-04-02 10:30 AM",
                    reason: "Chest Pain",
                    doctor: "Dr. Smith",
                    remarks: "Under Observation",
                    ward: "Ward 5",
                    class: "Private",
                    bed: "Bed 12"
                },
                {
                    clinic: "City Hospital",
                    department: "Neurology",
                    admissionDateTime: "2025-04-01 08:45 AM",
                    reason: "Severe Migraine",
                    doctor: "Dr. Johnson",
                    remarks: "Needs MRI",
                    ward: "Ward 2",
                    class: "General",
                    bed: "Bed 8"
                },
                {
                    clinic: "GreenCare Medical",
                    department: "Orthopedics",
                    admissionDateTime: "2025-04-03 02:00 PM",
                    reason: "Fractured Leg",
                    doctor: "Dr. Patel",
                    remarks: "Surgery Scheduled",
                    ward: "Ward 3",
                    class: "Deluxe",
                    bed: "Bed 21"
                }
        ];

        $scope.toggleMenu = function (index) {
            $scope.tableData.forEach((item, i) => {
                if (i !== index) item.showMenu = false; // Close other menus
            });

            $scope.tableData[index].showMenu = !$scope.tableData[index].showMenu;
        };

        $scope.performAction = function (action, data) {
            alert(action + " action on " + data.clinic);
            data.showMenu = false; // Hide menu after selecting an action
        };

        $scope.initForm = function () {
            $scope.clinics = ["City Hospital", "MedCare", "Wellness Center"];
            $scope.departments = ["Cardiology", "Neurology", "Orthopedics"];
            $scope.admissionReasons = ["Emergency", "Routine Checkup", "Surgery"];
            $scope.doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Lee"];
            $scope.wards = ["General", "ICU", "Private"];
            $scope.classes = ["Economy", "Deluxe", "VIP"];

            // Bed Data Based on Ward & Class
            $scope.bedsList = [
                { ward: "General", class: "Economy", beds: ["G-101", "G-102", "G-103"] },
                { ward: "General", class: "Deluxe", beds: ["G-201", "G-202"] },
                { ward: "ICU", class: "Economy", beds: ["I-101", "I-102"] },
                { ward: "ICU", class: "VIP", beds: ["I-301", "I-302"] },
                { ward: "Private", class: "Deluxe", beds: ["P-201", "P-202"] }
            ];

            // Set default date & time
            const now = new Date();
            $scope.newUser = {
                AdmissionDate: now.toISOString().split("T")[0],
                AdmissionTime: now.toTimeString().split(" ")[0],
                Clinic: "",
                Department: "",
                ReasonForAdmission: "",
                Doctor: "",
                Ward: "",
                Class: "",
                Bed: "",
                AdmissionRemarks: ""
            };

            $scope.filteredBeds = [];
        };

        // Update Beds when Ward & Class Change
        $scope.updateBeds = function () {
            const selectedWard = $scope.newUser.Ward;
            const selectedClass = $scope.newUser.Class;

            if (selectedWard && selectedClass) {
                const found = $scope.bedsList.find(b => b.ward === selectedWard && b.class === selectedClass);
                $scope.filteredBeds = found ? found.beds : [];
            } else {
                $scope.filteredBeds = [];
            }
        };

         $scope.AdmitPatient = function () {
            debugger;

            // Log the form data
            console.log("Patient Admitted:", $scope.newUser);

            // Validate required fields (you can customize based on what’s mandatory)
            if (
                !$scope.newUser.Date || !$scope.newUser.Time || !$scope.newUser.PatientID ||
                !$scope.newUser.PatientUnitID || !$scope.newUser.AdmissionType ||
                !$scope.newUser.Department || !$scope.newUser.DoctorID ||
                !$scope.newUser.ClassID || !$scope.newUser.WardID || !$scope.newUser.Bed
            ) {
                AlertMessage.error("Please fill in all required fields.");
                return;
            }

            // Construct the Admission data object
            let Admissiondata = {
                Date: $scope.newUser.Date,
                Time: $scope.newUser.Time,
                PatientID: $scope.PatientDetail.PatientID,
                PatientUnitID: $scope.PatientDetail.PatientUnitID,
                AdmissionType: $scope.newUser.AdmissionType,
                DepartmentID: $scope.newUser.Department,
                DoctorID: $scope.newUser.DoctorID,
                ClassID: $scope.newUser.ClassID,
                WardID: $scope.newUser.WardID,
                BedID: $scope.newUser.Bed
            };
            return;
            // make an API call here to save the data
             IPDService.AddAdmission(Admissiondata).then(
                 function (resp) {
                     AlertMessage.success("Patient Successfully Admitted!");
                     window.location.href = '#AdmissionList';
                 },
                 function (error) {
                     AlertMessage.error("Failed to admit patient. Please try again.");
                 }
             );
        };


         $scope.newUser = {
        AdmissionDate: new Date().toISOString().split('T')[0],
        AdmissionTime: new Date().toTimeString().split(' ')[0].slice(0, 5) 
       };
        $scope.PatientBill = {};

         $scope.fillClinicListNew = function () {
      debugger;
      var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
      ResponseData.then(function (Response) {
          debugger;
          Response.data.splice(0, 0, { ID: 0, Description: "Clinic" });
          $scope.clinicList = Response.data;
          //$scope.PatientData.UnitID = 0;
          $scope.PatientBill.ClinicID = localStorageService.get("UserInfo").UnitID;
          $scope.Advancepatient = []
            //usSpinnerService.stop('GridSpinner');

      }, function (error) {
      });
  }

   $scope.GetPatientListClinicWise = function (PatientData) {
        debugger;
        if ($scope.PatientData.UnitID == $scope.PatientData.UnitID) {
            $scope.PatientData.UnitID = $scope.PatientData.UnitID;
            $scope.selectedPatientFromPatient = '';
            $scope.IsDisableSearch = true; //Added by AniketK on 28Nov2019
            $scope.GetPatientDetailsFromPatient(false);
        }
    }

      $scope.fetchCheckedInPatients = function (searchText) {
      debugger
        if (!searchText) {
            $scope.patientList = []; // Clear the list if search text is empty
            return;
        }

   

        // Call the service method to fetch the data
        var responseData = BillingService.GetCheckedInPatientsList(searchText);
        responseData.then(function (response) {
        debugger
            $scope.patientList = response.data; // Bind the response to patientList
    $scope.Advancepatient = angular.copy(response.data);
    //console.log($scope.Advancepatient)
        
        }, function (error) {
            AlertMessage.warning(objResource.msgTitle, 'Error fetching patients: ' + (error.message || 'Unknown error')); 
        });
    };


     

    $scope.isLoadDataSuccessful = false; // Initialize as false

        $scope.onSelectPatient = function (patient) {
            if (!patient || !patient.PatientID) {
                console.error("Invalid patient object passed to onSelectPatient");
                alert("Invalid patient selection. Please try again.");
                return;
            }

            $scope.LoadData2(patient);
        };

        $scope.LoadData2 = function (patient) {
            debugger;
            $rootScope.IsFromView = false;

            if (!patient || !patient.PatientID) {
                console.error("Invalid patient data.");
                $scope.isLoadDataSuccessful = false;
                return;
            }

            try {
                // Initialize selected patient data
                let SelectedPatient = {
                    ID: patient.PatientID,
                    UnitID: patient.PatientUnitID,
                    GenderID: patient.GenderId,
                    PatientCategoryID: patient.PatientCategoryID,
                    MRNo: patient.MRNo,
                    PatientName: patient.PatientName,
                    VisitID: patient.VisitID,
                    VisitUnitID: patient.UnitId,
                    DocId: patient.DocId,
                    Date: new Date() // Ensure date is properly formatted
                };

                // Store data in rootScope
                Object.assign($rootScope, {
                    DocId: patient.DocId,
                    PatientID: patient.PatientID,
                    PatientUnitID: patient.PatientUnitID,
                    UnitId: patient.UnitId,
                    VisitID: patient.VisitID,
                    VisitUnitID: patient.UnitId
                });

                // Set selected patient details globally
                Common.setSelectedPatient(SelectedPatient);
                Common.setSelectedCouple($rootScope.CoupleDetails);

                // Find the selected patient in the list
                const selectedIndex = $scope.patientList.findIndex(p => p.PatientID === patient.PatientID);
        
                if (selectedIndex === -1) {
                    throw new Error("Selected patient not found in patient list.");
                }

                const selectedPatient = $scope.patientList[selectedIndex];

                // Fetch patient details
                $scope.GetPatientDetails(selectedPatient.PatientID, selectedPatient.UnitId);

                if ($rootScope.IsFromView) {
                    debugger;
                    $scope.Services = 1;
                    $scope.btnSaveUpdate = "Update";

                    // Load additional data
                    $scope.GetPaymentModeValidation();
                    $scope.GetServiceList();
                    $scope.GetDocList();
                    $scope.GetModeOfPayment();
                    $scope.GetBankList();
                    $scope.FillAdvanceList();

                    // Fetch patient billing data
                    let PatientBillData = $rootScope.ViewPatientBill || {};
                    Object.assign($scope.PatientBillData, {
                        BillID: PatientBillData.BillID,
                        BillUnitID: PatientBillData.BillUnitID,
                        ChargeID: PatientBillData.ChargeID,
                        ChargeUnitID: PatientBillData.ChargeUnitID,
                        PaidAmount: PatientBillData.PaidAmount,
                        VisitID: PatientBillData.VisitID,
                        VisitUnitID: PatientBillData.VisitUnitID
                    });

                    // Handle billing freeze state
                    $scope.disableFeeeze = !!PatientBillData.IsFreezed;

                    // Fetch saved bill list
                    BillingService.GetSavedBillList(
                        $scope.PatientBillData.BillID,
                        $scope.PatientBillData.BillUnitID,
                        $scope.PatientBillData.VisitID,
                        $scope.PatientBillData.VisitUnitID
                    ).then(function (resp) {
                        $scope.FillServiceList = resp.data || [];
                
                        if ($scope.FillServiceList.length > 0) {
                            debugger;
                            $scope.FillServiceList.forEach(service => {
                                $scope.BillDetails.SelectedOtherServiceList.push({
                                    ServiceCode: service.ServiceCode,
                                    Service: service.Service,
                                    Quantity: service.Quantity,
                                    BaseServiceRate: service.Rate,
                                    ConcessionPercentage: service.ConcessionPercent,
                                    ConcessionAmount: service.ConcessionAmount,
                                    NetAmount: service.NetAmount,
                                    DoctorID: service.DoctorID,
                                    disableDelete: false
                                });

                                // Update bill details
                                Object.assign($scope.BillDetails, {
                                    TotalBillAmount: service.TotalBillAmount,
                                    NetBillAmount: service.NetBillAmount,
                                    TotalConcessionAmount: service.TotalConcessionAmount,
                                    BillBalanceAmount: service.BillBalanceAmount,
                                    PaidAmount: service.PaidAmount,
                                    IsFreezed: service.IsFreezed
                                });

                                if ($scope.BillDetails.IsFreezed) {
                                    $scope.disableSave = true;
                                    $scope.BillDetails.SelectedOtherServiceList.forEach(item => item.disableDelete = true);
                                } else {
                                    $scope.disableSave = false;
                                }
                            });

                            $scope.isLoadDataSuccessful = true;
                        }
                    }).catch(function (error) {
                        console.error("Error fetching bill list:", error);
                        $scope.isLoadDataSuccessful = false;
                    }).finally(function () {
                        //usSpinnerService.stop('GridSpinner'); // Stop spinner
                    });

                } else {
                    // New Billing Process
                    $scope.Services = 1;
                    $scope.PatientName = SelectedPatient.PatientName;

                    // Fetch service and payment-related details
                    //$scope.GetServiceList();
                    //$scope.GetDocListNew();
                    //$scope.GetModeOfPaymentNew();
                    //$scope.GetBankList();
                    //$scope.FillAdvanceListNew(SelectedPatient);

                    $scope.isLoadDataSuccessful = true;
                }

                // Update UI elements
                $scope.$evalAsync(function () {
                    $scope.hoverClass = $scope.isLoadDataSuccessful ? 'hover-enabled' : 'hover-disabled';
                });

            } catch (error) {
                console.error(error.message);
                alert("An error occurred: " + error.message);
                $scope.isLoadDataSuccessful = false;
            } finally {
                //usSpinnerService.stop('GridSpinner'); // Stop spinner in all cases
            }
        };

         $scope.GetPatientDetails = function GetPatientDetails(PatID, PatUnitID)
    {
        
        var responseData = BillingService.GetPatientDetails(PatID, PatUnitID);
        responseData.then(function (Response) {
        debugger
            $scope.PatientDetailsData = Response.data;
            $scope.PatientDetail = {};
            $scope.PatientDetail.PatientName = $scope.PatientDetailsData.PatientName;
            $scope.PatientDetail.PartnerName = $scope.PatientDetailsData.PartnerName;
            $scope.PatientDetail.PatientAge = $scope.PatientDetailsData.PatientAge;
            //$scope.PatientDetail.PartAge = $scope.PatientDetailsData.PartAge;
            $scope.PatientDetail.PatientMRNo = $scope.PatientDetailsData.PatientMRNo;
            $scope.PatientDetail.PartnerMRNo = $scope.PatientDetailsData.PartnerMRNo;

            // $scope.PatientDetail.PatientGender = $scope.PatientDetailsData.PatientGender;
            if ($scope.PatientDetailsData.PatientGender == 2) {
                $scope.PatientDetail.PatientGender = "Female";
                $scope.PatientDetail.PartnerGender = "Male";
            }
            else{
                $scope.PatientDetail.PatientGender = "Male";
                $scope.PatientDetail.PartnerGender = "Female";
            }
            // $scope.PatientDetail.PatientGender = $scope.PatientDetailsData[0].PatientGender;
            $scope.PatientDetail.PatientAge = $scope.PatientDetailsData.PatientAge;
            $scope.PatientDetail.PartnerAge = $scope.PatientDetailsData.PartAge; 
            $scope.PatientDetail.PatientAddress = $scope.PatientDetailsData.PatientCommunicationAddress;
            $scope.PatientDetail.PartnerAddress = $scope.PatientDetailsData.PartnerCommunicationAddress;
            $scope.PatientDetail.PatientMobileNo = $scope.PatientDetailsData.PatientMobileNo;
            $scope.PatientDetail.PartnerMobileNo = $scope.PatientDetailsData.PartnerMobileNo;

            $scope.PatientDetail.PreviousOutstanding = $scope.PatientDetailsData.PreviousOutstanding;

        }, function (error) {
            //AlertMessage.info('PalashIVF', 'Error Occured.');
        })


    }

    
     $scope.GetDepartmentList = function () {
     debugger
    DoctorService.GetDepartmentListForDoc().then(
        function (resp) {
            if (resp.data && resp.data.value) {
                $scope.DepartmentList = resp.data.value;
                console.log("Department List:", $scope.DepartmentList);
            } else {
                AlertMessage.error("No data received from server.");
            }
        },
        function (error) {
            AlertMessage.error("Failed to fetch department list. Please try again later.");
        }
    );
};

       $scope.GetDoctorList = function (Id,AppDate) {
       debugger
         UserService.GetDocListByDeptID(Id,AppDate || 0).then(
              function (resp) {
                  if (resp.data) {
                      $scope.DoctorList = resp.data;
                  } else {
                      AlertMessage.error("No data received from server.");
                  }
              },
              function (error) {
                  AlertMessage.error("Failed to fetch class list. Please try again later.");
              }
          );
      };


        
    }
]);
