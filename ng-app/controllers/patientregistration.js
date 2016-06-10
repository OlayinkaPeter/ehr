var AppEHR = angular.module('AppEHR');
AppEHR.controller('patientRegistrationController', ['$rootScope', '$scope', '$window', 'Countries', 'States', 'GetLocalGovermentArea', 'City', 'DropDownData', 'PatientInformation', 'fileUpload', '$location', '$filter', 'Upload', '$timeout', 'PatientRegistrationAddress', 'PatientRegistrationKin', 'PatientRegistrationEmployer', 'PatienPlanSaveData', function ($rootScope, $scope, $window, Countries, States, GetLocalGovermentArea, City, DropDownData, PatientInformation, fileUpload, $location, $filter, Upload, $timeout, PatientRegistrationAddress, PatientRegistrationKin, PatientRegistrationEmployer, PatienPlanSaveData) {
        $rootScope.pageTitle = "EHR - Patient Registration";
        $scope.PI = $rootScope.PI;
        $scope.PI.adress = {};
        $scope.PI.kin = {};
        $scope.PI.employer = {};
        $scope.PI.patientPlan = {};
        $scope.myForm = {};
        $scope.MI = {};
        $scope.RI = {};
        $scope.counties = [];
        $scope.contactAddressCountries = [];
        $scope.permanentAddressCountries = [];
        $scope.addressContactCities = [];
        $scope.addressPerminentCities = [];
        $scope.nextOfKinCountries = [];
        $scope.contactAddressStates = [];
        $scope.permanentAddressStates = [];
        $scope.patientInfolocalGovtArea = [];
        $scope.addresslocalGovtArea = [];
        $scope.employerCountries = [];
        $scope.nextOfKinCities = [];
        $scope.nextOfKinStates = [];
        $scope.employerStates = [];
        $scope.employerCities = [];
        $scope.dropDownData = [];
        $scope.dataToBeAdded_send = {};
        $scope.isDisabled = false;
        $scope.PI.adress.sameAsAbove = true;
        $('.hidePermanentAddress').slideUp(500);
        $scope.dropDownInfo = dropDownInfo;
        $scope.disabledTabs = "disabled-tabs";
        $scope.successMessage = false;
        $scope.errorMessage = false;
        $scope.successAddressMessage = false;
        $scope.errorAddressMessage = false;
        $scope.showSubmitButton = true;
        $scope.showSubmitButtonAddress = true;
        $scope.showSubmitButtonKin = true;
        $scope.successKinMessage = false;
        $scope.errorKinMessage = false;
        $scope.showSubmitButtonEmployer = true;
        $scope.successEmployerMessage = false;
        $scope.errorEmployerMessage = false;
        delete $window.sessionStorage.patient_id;
        $scope.patientSummary = true;
        $scope.dataToBeAdded = {}
        $scope.PP = {}
        //$scope.PI.identity_type = dropDownInfo.IdType[0].id;
        //$scope.PI.kin_relationship = dropDownInfo.relationship[0].id;
        //$scope.PI.dependant_relationship = dropDownInfo.relationship[0].id;
        //$scope.PI.principal_relationship = dropDownInfo.relationship[0].id;
        //$scope.PI.nhis_principal_relationship = dropDownInfo.relationship[0].id;

        $rootScope.loadView = function (object) {
            $scope.PI = {};
            $scope.successMessage = false;
            $scope.errorMessage = false;
            $scope.showSubmitButton = true;
            $scope.submitted = false;
            $scope.disabledTabInfo = 'active';
            $scope.disabledTabAdress = $scope.disabledTabArchive = $scope.disabledTabKin = $scope.disabledTabEmployer = $scope.disabledTabPatientPlant = "disabled-tabs";
            delete $window.sessionStorage.patient_id;
        }

        Countries.get({token: $window.sessionStorage.token}, countrySuccess, countryFailed);
        function countrySuccess(res) {
            if (res.status == true) {
                angular.copy(res.data, $scope.contactAddressCountries);
                angular.copy(res.data, $scope.nextOfKinCountries);
                angular.copy(res.data, $scope.employerCountries);
                $scope.countryCode = $scope.contactAddressCountries;
                var tempcountry = $scope.contactAddressCountries;
                tempcountry = $filter('filter')(tempcountry, {country_code: 234});
                $scope.myColor = tempcountry[0].country_code;
                console.log($scope.myColor);
                angular.copy(res.data, $scope.permanentAddressCountries);
                $scope.permanentCountryCode = $scope.permanentAddressCountries
                //$scope.PI.patient_country = $scope.contactAddressCountries[0].id;
                //$scope.PI.permanent_country = $scope.permanentAddressCountries[0].id;
                //$scope.PI.nextOfKinCountries = $scope.nextOfKinCountries[0].id;
                //$scope.PI.employerCountries = $scope.employerCountries[0].id;
            } else {
                console.log(res);
            }
        }

        function countryFailed(error) {
            console.log(error);
        }

        DropDownData.get({token: $window.sessionStorage.token}, dropDownSuccess, dropDownFailed);
        function dropDownSuccess(res) {
            if (res.status == true) {
                angular.copy(res.data, $scope.dropDownData);
                //$scope.PI.maritial_status = $scope.dropDownData.maritial_status[0].id;
                //$scope.PI.religion = $scope.dropDownData.religion[0].id;
                //$scope.PI.nationality = $scope.dropDownData.nationality[0].id;
                //$scope.PI.blood_group = $scope.dropDownData.blood_group[0].id;
                //$scope.PI.language = $scope.dropDownData.language[0].id;
                /*	$scope.PI = {martial_status : $scope.dropDownData.maritial_status[0].name};
                 console.log($scope.dropDownData.maritial_status[0].name);
                 console.log($scope.PI.martial_status);*/
            }
        }

        function dropDownFailed(error) {
            console.log(error);
        }

        // Address
        $scope.addressStateByCountry = function (country, flag) {
            if (country != "null") {
                States.get({token: $window.sessionStorage.token, country_id: country.id}, stateSuccess, stateFailed);
            } else {
                if (flag) {
                    $scope.PI.permanent_country = "null";
                    $scope.PI.permanent_state = "null";
                    $scope.permanentAddressStates = [];
                    $scope.addressPerminentCities = [];
                    $scope.PI.permanent_city = 'null';
                } else {
                    $scope.addressContactCities = [];
                    $scope.PI.city = "null";
                    $scope.PI.state = "null";
                    $scope.contactAddressStates = [];
                    $scope.PI.local_goverment_area = "null";
                    $scope.addresslocalGovtArea = [];
                }
            }
            function stateSuccess(res) {
                if (res.status == true && res.data.length > 0) {
                    angular.copy(res.data, $scope.contactAddressStates);
                    angular.copy(res.data, $scope.permanentAddressStates);
                    //$scope.PI.patient_state = $scope.contactAddressStates[0].id;
                    //$scope.PI.permanent_street = $scope.permanentAddressStates[0].id;
                }/*else{
                 
                 }*/
            }
            function stateFailed(error) {
                console.log(error);
            }
        };
        $scope.addressLocalGovtAreaByStates = function (state, flag) {
            if (state != "null") {
                GetLocalGovermentArea.get({token: $window.sessionStorage.token, state_id: state.id}, LGASuccess, LGAFailed);
                City.get({token: $window.sessionStorage.token, state_id: state.id}, citySuccess, cityFailed);
                function LGASuccess(res) {
                    if (res.status == true && res.data.length > 0) {
                        console.log(res);
                        angular.copy(res.data, $scope.patientInfolocalGovtArea);
                        angular.copy(res.data, $scope.addresslocalGovtArea);
                    } else {
                        console.log(111);
                    }
                }
                function LGAFailed(error) {
                    console.log(error);
                }

                function citySuccess(res) {
                    if (res.status == true && res.data.length > 0) {
                        console.log(res);
                        angular.copy(res.data, $scope.addressContactCities);
                        angular.copy(res.data, $scope.addressPerminentCities);
                    } else {
                        console.log(111);
                    }
                }
                function cityFailed(error) {
                    console.log(error);
                }
            } else {
                if (flag) {
                    $scope.PI.patient_local_goverment_area = "null";
                    $scope.patientInfolocalGovtArea = [];
                } else {
                    $scope.PI.local_goverment_area = "null";
                    $scope.addresslocalGovtArea = [];
                }
            }
        }

        // Next of Kin
        $scope.nextOfKinStateByCountry = function (kin) {
            if (kin != "null") {
                States.get({token: $window.sessionStorage.token, country_id: kin.id}, nextOfKinStateSuccess, nextOfKinStateFailed);
            } else {
                $scope.PI.kin_state = "null";
                $scope.nextOfKinStates = [];
                $scope.PI.kin_city = "null";
                $scope.nextOfKinCities = [];
            }
            function nextOfKinStateSuccess(res) {
                if (res.status == true && res.data.length > 0) {
                    angular.copy(res.data, $scope.nextOfKinStates);
                }/*else{
                 
                 }*/
            }
            function nextOfKinStateFailed(error) {
                console.log(error);
            }
        };
        $scope.nextOfKinCityByStates = function (states) {
            if (states != "null") {
                City.get({token: $window.sessionStorage.token, state_id: states.id}, citySuccess, cityFailed);
                function citySuccess(res) {
                    if (res.status == true && res.data.length > 0) {
                        console.log(res);
                        angular.copy(res.data, $scope.nextOfKinCities);
                    } else {
                        console.log(111);
                    }
                }
                function cityFailed(error) {
                    console.log(error);
                }
            } else {
                $scope.PI.kin_city = "null";
                $scope.nextOfKinCities = [];
            }
        };
        // Employer
        $scope.employerStateByCountry = function (employer) {
            if (employer != "null") {
                States.get({token: $window.sessionStorage.token, country_id: employer.id}, employerStateSuccess, employerStateFailed);
            } else {
                $scope.PI.employer_state = "null";
                $scope.employerStates = [];
                $scope.PI.employer_city = "null";
                $scope.employerCities = [];
            }
            function employerStateSuccess(res) {
                if (res.status == true && res.data.length > 0) {
                    angular.copy(res.data, $scope.employerStates);
                }/*else{
                 
                 }*/
            }
            function employerStateFailed(error) {
                console.log(error);
            }
        };
        $scope.employerCityByStates = function (states) {
            if (states != "null") {
                City.get({token: $window.sessionStorage.token, state_id: states.id}, citySuccess, cityFailed);
                function citySuccess(res) {
                    if (res.status == true && res.data.length > 0) {
                        console.log(res);
                        angular.copy(res.data, $scope.employerCities);
                    } else {
                        console.log(111);
                    }
                }
                function cityFailed(error) {
                    console.log(error);
                }
            } else {
                $scope.PI.employer_city = "null";
                $scope.employerCities = [];
            }
        };
        function permanentAddress() {
            $scope.PI.adress.permanent_phonenumber = '';
            $scope.PI.adress.permanent_mobilenumber = '';
            $scope.PI.adress.permanent_email = '';
            $scope.PI.adress.permanent_housenumber = '';
            $scope.PI.adress.permanent_street = '';
            $scope.PI.adress.permanent_country = '';
            $scope.PI.adress.permanent_state = '';
            $scope.PI.adress.permanent_postalCode = '';
            $scope.PI.adress.permanent_city = '';
        }

        // Permanent Address checkbox
        $scope.isChecked = function (checked) {
            if (checked) {
                $('.hidePermanentAddress').slideUp(500);
                permanentAddress();
            } else {
                $('.hidePermanentAddress').slideDown(500);
                /*$scope.PI.adress.permanent_phonenumber = $scope.PI.adress.phone_number;
                 $scope.PI.adress.permanent_mobilenumber = $scope.PI.adress.mobile_number;
                 $scope.PI.adress.permanent_email = $scope.PI.adress.email;
                 $scope.PI.adress.permanent_housenumber = $scope.PI.adress.house_number;
                 $scope.PI.adress.permanent_street = $scope.PI.adress.street;
                 $scope.PI.adress.permanent_country = $scope.PI.adress.country;
                 $scope.PI.adress.permanent_state = $scope.PI.adress.state;
                 $scope.PI.adress.permanent_postalCode = $scope.PI.adress.postal_code;
                 $scope.PI.adress.permanent_city = $scope.PI.adress.city;*/
            }
        };
        // patient information API
        $scope.validatePatientInfo = function (PI) {
            console.log(PI.religion);
            if (PI.first_name != undefined && PI.last_name != undefined && PI.date_of_birth != undefined && PI.age != undefined && PI.sex != undefined) {
                var dataToBeAdded = {
                    token: $window.sessionStorage.token,
                    patient_unit_number: $scope.PI.patient_unit_number == undefined ? '' : $scope.PI.patient_unit_number,
                    first_name: $scope.PI.first_name == undefined ? '' : $scope.PI.first_name,
                    middle_name: $scope.PI.middle_name == undefined ? '' : $scope.PI.middle_name,
                    last_name: $scope.PI.last_name == undefined ? '' : $scope.PI.last_name,
                    date_of_birth: $scope.PI.date_of_birth == undefined ? '' : $scope.PI.date_of_birth,
                    age: $scope.PI.age == undefined ? '' : $scope.PI.age,
                    sex: $scope.PI.sex == undefined ? '' : $scope.PI.sex,
                    patient_picture: $scope.PI.file == undefined ? '' : $scope.PI.file,
                    marital_status: $scope.PI.maritial_status == undefined ? '' : $scope.PI.maritial_status,
                    patient_local_goverment_area: $scope.PI.patient_local_goverment_area == undefined ? '' : $scope.PI.patient_local_goverment_area,
                    religion: $scope.PI.religion == undefined ? '' : $scope.PI.religion,
                    identity_type: $scope.PI.identity_type == undefined ? '' : $scope.PI.identity_type,
                    identity_number: $scope.PI.identity_number == undefined ? '' : $scope.PI.identity_number,
                    patient_state: $scope.PI.patient_state == undefined ? '' : $scope.PI.patient_state,
                    tribe: $scope.PI.tribe == undefined ? '' : $scope.PI.tribe,
                    language: $scope.PI.language == undefined ? '' : $scope.PI.language,
                    nationality: $scope.PI.nationality == undefined ? '' : $scope.PI.nationality,
                    blood_group: $scope.PI.blood_group == undefined ? '' : $scope.PI.blood_group,
                    father_firstname: $scope.PI.father_firstname == undefined ? '' : $scope.PI.father_firstname,
                    father_middlename: $scope.PI.father_middlename == undefined ? '' : $scope.PI.father_middlename,
                    father_lastname: $scope.PI.father_lastname == undefined ? '' : $scope.PI.father_lastname,
                    mother_firstname: $scope.PI.mother_firstname == undefined ? '' : $scope.PI.mother_firstname,
                    mother_middlename: $scope.PI.mother_middlename == undefined ? '' : $scope.PI.mother_middlename,
                    mother_lastname: $scope.PI.mother_lastname == undefined ? '' : $scope.PI.mother_lastname,
                    refered_name: $scope.PI.refered_name == undefined ? '' : $scope.PI.refered_name
                };
                if ($window.sessionStorage.patient_id == undefined) {
                    console.log(dataToBeAdded);
                    PatientInformation.save(dataToBeAdded, patientInformationSuccess, patientInformationFailed);
                } else {
                    console.log('else');
                    dataToBeAdded.patient_id = $window.sessionStorage.patient_id;
                    PatientInformation.save(dataToBeAdded, patientInfoUpdateSucess, patientInfoUpdateFailed);
                }
                function patientInformationSuccess(res) {
                    console.log(res);
                    if (res.status == true) {
                        $window.sessionStorage.patient_id = res.patient_id;
                        $scope.PI.patient_ID = "ID" + res.patient_id;
                        $scope.successMessage = true;
                        $scope.showSubmitButton = false;
                        $scope.disabledTabAdress = 'active';
                        $scope.disabledTabInfo = '';
                        timer = $timeout(function () {
                            $scope.successMessage = false;
                        }, 5000);
                        $scope.disabledTabs = "";
                    } else {
                        $scope.errorMessage = true;
                        $scope.showSubmitButton = true;
                        timer = $timeout(function () {
                            $scope.errorMessage = false;
                        }, 5000);
                    }
                }

                function patientInformationFailed(error) {
                    console.log(error);
                }

                function patientInfoUpdateSucess(res) {
                    console.log(res);
                    if (res.status == true) {
                        timer = $timeout(function () {
                            $scope.successMessage = false;
                        }, 5000);
                    } else {
                        $scope.showSubmitButton = true;
                        timer = $timeout(function () {
                            $scope.errorMessage = false;
                        }, 5000);
                    }
                }

                function patientInfoUpdateFailed(error) {
                    console.log(error);
                }
            }
        }

        // patient address API
        $scope.validatePatientAddress = function (PIAdress) {
            if (angular.equals({}, PIAdress) == false) {
                console.log($scope.PI.adress.permanent_state.id);
                var dataToBeAdded = {
                    token: $window.sessionStorage.token,
                    patient_id: $window.sessionStorage.patient_id,
                    phone_number: $scope.PI.adress.phone_number == undefined ? '' : $scope.countryCode.country_code + '' + $scope.PI.adress.phone_number,
                    mobile_number: $scope.PI.adress.mobile_number == undefined ? '' : $scope.countryCode.country_code + '' + $scope.PI.adress.mobile_number,
                    house_number: $scope.PI.adress.house_number == undefined ? '' : $scope.PI.adress.house_number,
                    street: $scope.PI.adress.street == undefined ? '' : $scope.PI.adress.street,
                    state: $scope.PI.adress.state == undefined ? '' : $scope.PI.adress.state.id,
                    city: $scope.PI.adress.city == undefined ? '' : $scope.PI.adress.city.id,
                    email: $scope.PI.adress.email == undefined ? '' : $scope.PI.adress.email,
                    postal_code: $scope.PI.adress.postal_code == undefined ? '' : $scope.PI.adress.postal_code,
                    local_goverment_area: $scope.PI.adress.local_goverment_area == undefined ? '' : $scope.PI.adress.local_goverment_area.id,
                    same_as_above: $scope.PI.adress.sameAsAbove == undefined ? '' : $scope.PI.adress.sameAsAbove,
                    permanent_phonenumber: $scope.PI.adress.permanent_phonenumber == undefined ? '' : $scope.permanentCountryCode.country_code + '' + $scope.PI.adress.permanent_phonenumber,
                    permanent_mobilenumber: $scope.PI.adress.permanent_mobilenumber == undefined ? '' : $scope.permanentCountryCode.country_code + '' + $scope.PI.adress.permanent_mobilenumber,
                    permanent_email: $scope.PI.adress.permanent_email == undefined ? '' : $scope.PI.adress.permanent_email,
                    permanent_housenumber: $scope.PI.adress.permanent_housenumber == undefined ? '' : $scope.PI.adress.permanent_housenumber,
                    permanent_street: $scope.PI.adress.permanent_street == undefined ? '' : $scope.PI.adress.permanent_street,
                    permanent_country: $scope.PI.adress.permanent_country == undefined ? '' : $scope.PI.adress.permanent_country.id,
                    city: $scope.PI.adress.city == undefined ? '' : $scope.PI.adress.city.id,
                            permanent_state: $scope.PI.adress.permanent_state == undefined ? '' : $scope.PI.adress.permanent_state.id,
                    permanent_city: $scope.PI.adress.permanent_city == undefined ? '' : $scope.PI.adress.permanent_city.id,
                    permanent_postalCode: $scope.PI.adress.permanent_postalCode == undefined ? '' : $scope.PI.adress.permanent_postalCode
                };
                console.log(dataToBeAdded);
                if ($scope.address_id == undefined) {
                    console.log('if');
                    PatientRegistrationAddress.save(dataToBeAdded, patientAddressSuccess, patientAddressFailed);
                    function patientAddressSuccess(res) {
                        console.log(res);
                        if (res.status == true) {
                            $window.sessionStorage.patient_id = res.patient_id;
                            $scope.address_id = res.address_id;
                            //$scope.successMessage = true;
                            $scope.showSubmitButtonAddress = false;
                            $scope.disabledTabKin = 'active';
                            $scope.disabledTabAdress = '';
                            timer = $timeout(function () {
                                $scope.successMessage = false;
                            }, 5000);
                            $scope.disabledTabs = "";
                        } else {
                            $scope.errorMessage = true;
                            $scope.showSubmitButtonAddress = true;
                            timer = $timeout(function () {
                                $scope.errorMessage = false;
                            }, 5000);
                        }
                    }

                    function patientAddressFailed(error) {
                        console.log(error);
                    }
                } else {
                    dataToBeAdded.address_id = $window.sessionStorage.address_id,
                            console.log('else ' + dataToBeAdded);
                    PatientRegistrationAddress.update(dataToBeAdded, patientAddressUpdateSucess, patientAddressUpdateFailed);
                    function patientAddressUpdateSucess(res) {
                        console.log(res);
                        if (res.status == true) {
                            $scope.successAddressMessage = true;
                            $scope.showSubmitButtonAddress = false;
                            timer = $timeout(function () {
                                $scope.successAddressMessage = false;
                            }, 5000);
                            $scope.disabledTabs = "";
                        } else {
                            $scope.errorMessage = true;
                            $scope.showSubmitButtonAddress = true;
                            timer = $timeout(function () {
                                $scope.errorAddressMessage = false;
                            }, 5000);
                        }
                    }

                    function patientAddressUpdateFailed(error) {
                        console.log(error);
                    }
                }
            } else {
                $scope.disabledTabKin = 'active';
                $scope.disabledTabAdress = '';
            }
        }

        // patient kin API
        $scope.validatePatientKin = function (PIKin) {
            //console.log(PIKin);
            if (angular.equals({}, PIKin) == false) {
                //console.log(angular.equals({}, PIKin));
                var dataToBeAdded = {
                    token: $window.sessionStorage.token,
                    patient_id: $window.sessionStorage.patient_id,
                    kin_fullname: $scope.PI.kin.kin_fullname == undefined ? '' : $scope.PI.kin.kin_fullname,
                    kin_middlename: $scope.PI.kin.kin_middlename == undefined ? '' : $scope.PI.kin.kin_middlename,
                    kin_lastname: $scope.PI.kin.kin_lastname == undefined ? '' : $scope.PI.kin.kin_lastname,
                    kin_relationship: $scope.PI.kin.kin_relationship == undefined ? '' : $scope.PI.kin.kin_relationship,
                    others: $scope.PI.kin.others == undefined ? '' : $scope.PI.kin.others,
                    kin_phone_number: $scope.PI.kin.kin_phone_number == undefined ? '' : $scope.PI.kin.kin_phone_number,
                    kin_mobile_number: $scope.PI.kin.kin_mobile_number == undefined ? '' : $scope.PI.kin.kin_mobile_number,
                    kin_email: $scope.PI.kin.kin_email == undefined ? '' : $scope.PI.kin.kin_email,
                    kin_house_number: $scope.PI.kin.kin_house_number == undefined ? '' : $scope.PI.kin.kin_house_number,
                    kin_street: $scope.PI.kin.kin_street == undefined ? '' : $scope.PI.kin.kin_street,
                    kin_country: $scope.PI.kin.kin_country == undefined ? '' : $scope.PI.kin.kin_country.id,
                    kin_state: $scope.PI.kin.kin_state == undefined ? '' : $scope.PI.kin.kin_state.id,
                    kin_city: $scope.PI.kin.kin_city == undefined ? '' : $scope.PI.kin.kin_city.id,
                    kin_postal_code: $scope.PI.kin.kin_postal_code == undefined ? '' : $scope.PI.kin.kin_postal_code
                };
                if ($scope.kin_id == undefined) {
                    //console.log('if');
                    PatientRegistrationKin.save(dataToBeAdded, patientKinSuccess, patientKinFailed);
                    function patientKinSuccess(res) {
                        console.log(res);
                        if (res.status == true) {
                            $scope.kin_id = res.kin_id;
                            $scope.showSubmitButtonKin = false;
                            $scope.disabledTabEmployer = 'active';
                            $scope.disabledTabKin = '';
                            //$scope.disabledTabs = "";
                        } else {
                            $scope.errorKinMessage = true;
                            $scope.showSubmitButtonKin = true;
                            timer = $timeout(function () {
                                $scope.errorKinMessage = false;
                            }, 5000);
                        }
                    }

                    function patientKinFailed(error) {
                        console.log(error);
                    }
                } else {
                    console.log('else');
                    dataToBeAdded.kin_id = $scope.kin_id;
                    PatientRegistrationKin.save(dataToBeAdded, patientKinUpdateSucess, patientKinUpdateFailed);
                    function patientKinUpdateSucess(res) {
                        console.log(res);
                        if (res.status == true) {
                            $scope.showSubmitButtonAddress = false;
                            $scope.disabledTabs = "";
                        } else {
                            $scope.errorKinMessage = true;
                            $scope.showSubmitButtonKin = true;
                            timer = $timeout(function () {
                                $scope.errorKinMessage = false;
                            }, 5000);
                        }
                    }

                    function patientKinUpdateFailed(error) {
                        console.log(error);
                    }
                }
            } else {
                console.log(1);
                $scope.disabledTabEmployer = 'active';
                $scope.disabledTabKin = '';
            }
        }

        // patient employer API
        $scope.validatePatientEmployer = function (PIEmployer) {
            if (angular.equals({}, PIEmployer) == false) {
                console.log($scope.PI.employer.employer_email);
                var dataToBeAdded = {
                    token: $window.sessionStorage.token,
                    patient_id: $window.sessionStorage.patient_id,
                    employer_name: $scope.PI.employer.employer_name == undefined ? '' : $scope.PI.employer.employer_name,
                    employer_occupation: $scope.PI.employer.employer_occupation == undefined ? '' : $scope.PI.employer.employer_occupation,
                    employer_phone_number: $scope.PI.employer.employer_phone_number == undefined ? '' : $scope.PI.employer.employer_phone_number,
                    employer_mobile_number: $scope.PI.employer.employer_mobile_number == undefined ? '' : $scope.PI.employer.employer_mobile_number,
                    employer_email: $scope.PI.employer.employer_email == undefined ? '' : $scope.PI.employer.employer_email,
                    employer_house_number: $scope.PI.employer.employer_house_number == undefined ? '' : $scope.PI.employer.employer_house_number,
                    employer_street: $scope.PI.employer.employer_street == undefined ? '' : $scope.PI.employer.employer_street,
                    employer_country: $scope.PI.employer.employer_country == undefined ? '' : $scope.PI.employer.employer_country.id,
                    employer_state: $scope.PI.employer.employer_state == undefined ? '' : $scope.PI.employer.employer_state.id,
                    employer_city: $scope.PI.employer.employer_city == undefined ? '' : $scope.PI.employer.employer_city.id
                };
                console.log(dataToBeAdded);
                if ($scope.employer_id == undefined) {
                    console.log('if');
                    PatientRegistrationEmployer.save(dataToBeAdded, patientEmployerSuccess, patientEmployerFailed);
                    function patientEmployerSuccess(res) {
                        console.log(res);
                        if (res.status == true) {
                            $scope.employer_id = res.employee_id;
                            $scope.showSubmitButtonEmployer = false;
                            $scope.disabledTabPatientPlant = 'active';
                            $scope.disabledTabEmployer = '';
                            //$scope.disabledTabs = "";
                        } else {
                            $scope.errorEmployerMessage = true;
                            $scope.showSubmitButtonEmployer = true;
                            timer = $timeout(function () {
                                $scope.errorEmployerMessage = false;
                            }, 5000);
                        }
                    }

                    function patientEmployerFailed(error) {
                        console.log(error);
                    }
                } else {
                    console.log('else');
                    dataToBeAdded.employee_id = $scope.employer_id;
                    console.log(dataToBeAdded);
                    PatientRegistrationEmployer.save(dataToBeAdded, patientKinUpdateSucess, patientKinUpdateFailed);
                    function patientKinUpdateSucess(res) {
                        console.log(res);
                        if (res.status == true) {
                            $scope.showSubmitButtonAddress = false;
                            $scope.disabledTabs = "";
                        } else {
                            $scope.errorKinMessage = true;
                            $scope.showSubmitButtonKin = true;
                            timer = $timeout(function () {
                                $scope.errorKinMessage = false;
                            }, 5000);
                        }
                    }

                    function patientKinUpdateFailed(error) {
                        console.log(error);
                    }
                }
            } else {
                $scope.disabledTabPatientPlant = 'active';
                $scope.disabledTabEmployer = '';
            }
        }

        // patient plan
        $scope.validatePatientPlan = function (PIPlan) {
            console.log(PIPlan);
            $scope.disabledTabPatientPlant = 'active';
            $scope.disabledTabArchive = '';
        }

        // age calculation with respect to DOB
        $scope.calculateAge = function (birthday) { // birthday is a date
            var splitDate = birthday.split('-');
            $scope.birthdate = new Date(splitDate[0], splitDate[1], splitDate[2]);
            var ageDifMs = Date.now() - $scope.birthdate.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            $scope.PI.age = Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        $scope.uploadPic = function (file) {
            file.upload = Upload.upload({
                url: 'http://demoz.online/ehr/public/api/register_patient',
                method: 'post',
                data: {
                    username: $scope.username,
                    file: file
                },
            });
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

        $scope.submit = function (PI) {
            console.log($scope.PI);
            /*var file = $scope.PI.myFile;
             console.log('file is ' + file);
             console.dir(file);
             var uploadUrl = patientFileUploadPath;
             fileUpload.uploadFileToUrl(file, uploadUrl);*/
            if ($scope.PI.sameAsAbove == true) {
                permanentAddress();
            } else {
                delete $scope.PI.permanent_phonenumber;
                delete $scope.PI.permanent_mobilenumber;
                delete $scope.PI.permanent_email;
                delete $scope.PI.permanent_housenumber;
                delete $scope.PI.permanent_street;
                delete $scope.PI.permanent_country;
                delete $scope.PI.permanent_state;
                delete $scope.PI.permanent_postalCode;
                delete $scope.PI.permanent_city;
            }

            /*PatientRegistration.save({
             token: $window.sessionStorage.token,
             patient_unit_number: $scope.PI.patient_unit_number, // info tab
             first_name: $scope.PI.first_name,
             middle_name: $scope.PI.middle_name,
             last_name: $scope.PI.last_name,
             date_of_birth: $scope.PI.date_of_birth,
             age: $scope.PI.age,
             sex: $scope.PI.sex,
             patient_picture: $scope.PI.myFile,
             maritial_status: $scope.PI.maritial_status,
             patient_local_goverment_area: $scope.PI.patient_local_goverment_area,
             religion: $scope.PI.religion,
             identity_type: $scope.PI.identity_type,
             identity_number: $scope.PI.identity_number,
             patient_state: $scope.PI.patient_state,
             tribe: $scope.PI.tribe,
             language: $scope.PI.language,
             nationality: $scope.PI.nationality,
             blood_group: $scope.PI.blood_group,
             father_firstname: $scope.PI.father_firstname,
             father_middlename: $scope.PI.father_middlename,
             father_lastname: $scope.PI.father_lastname,
             mother_firstname: $scope.PI.mother_firstname,
             mother_middlename: $scope.PI.mother_middlename,
             mother_lastname: $scope.PI.mother_lastname,
             refered_name: $scope.PI.refered_name,
             phone_number: $scope.PI.phone_number, // Address tab
             mobile_number: $scope.PI.mobile_number,
             patient_email: $scope.PI.patient_email,
             house_number: $scope.PI.house_number,
             street: $scope.PI.street,
             country: $scope.PI.country,
             state: $scope.PI.state,
             city: $scope.PI.city,
             email: $scope.PI.email,
             postal_code: $scope.PI.postal_code,
             local_goverment_area: $scope.PI.local_goverment_area,
             same_as_above: $scope.PI.sameAsAbove,
             permanent_phonenumber: $scope.PI.permanent_phonenumber, // paremenant address
             permanent_mobilenumber: $scope.PI.permanent_mobilenumber,
             permanent_email: $scope.PI.permanent_email,
             permanent_housenumber: $scope.PI.permanent_housenumber,
             permanent_street: $scope.PI.permanent_street,
             permanent_country: $scope.PI.permanent_country,
             patient_city: $scope.PI.patient_city,
             permanent_state: $scope.PI.permanent_state,
             permanent_postalCode: $scope.PI.permanent_postalCode,
             kin_fullname: $scope.PI.kin_fullname, // Kin tab
             kin_middlename: $scope.PI.kin_middlename,
             kin_lastname: $scope.PI.kin_lastname,
             kin_relationship: $scope.PI.kin_relationship,
             others: $scope.PI.others,
             kin_phone_number: $scope.PI.kin_phone_number,
             kin_mobile_number: $scope.PI.kin_mobile_number,
             kin_email: $scope.PI.kin_email,
             kin_house_number: $scope.PI.kin_house_number,
             kin_street: $scope.PI.kin_street,
             kin_country: $scope.PI.kin_country,
             kin_state: $scope.PI.kin_state,
             kin_city: $scope.PI.kin_city,
             kin_postal_code: $scope.PI.kin_postal_code,
             employer_name: $scope.PI.employer_name, // employer tab
             employer_occupation: $scope.PI.employer_occupation,
             employer_phone_number: $scope.PI.employer_phone_number,
             employer_mobile_number: $scope.PI.employer_mobile_number,
             employer_email: $scope.PI.employer_email,
             employer_house_number: $scope.PI.employer_house_number,
             employer_street: $scope.PI.employer_street,
             employer_country: $scope.PI.employer_country,
             employer_state: $scope.PI.employer_state,
             employer_city: $scope.PI.employer_city,
             }, registrationSuccess, registrationFailed);*/
            function registrationSuccess(res) {
                if (res.status == true) {
                    console.log(res);
                } else {
                    console.log(res);
                }
            }
            function registrationFailed(error) {
                console.log(error);
            }
        };
        $rootScope.do_valid = true;
        $rootScope.do_valid_nhis = true; 
        $scope.modal_nhis_Data = function (MI) {

            console.log($scope.MI.select_speciality);
//            console.log($('input[name=select_speciality]:checked').val());
            var check_val = $('#nhis input[name=select_speciality]:checked').val();
            if (check_val == "dependant") {
//                $rootScope.do_valid_nhis = true; 
                if ($('#nhis .principal_list .chip').length > 0) {
                    $rootScope.do_valid_nhis = false;
                    console.log("retainership popup")
                }

                $scope.dataToBeAdded.principal_patient_id = $('#nhis .principal_list .chip').data('id')
                $scope.dataToBeAdded.principal_patient_name = $('#nhis .principal_list .chip').text()
                $scope.dataToBeAdded.relationship = $scope.MI.principal_relationship == undefined ? '' : $scope.MI.principal_relationship
            }



//            console.log($scope.dataToBeAdded);
//            if (!angular.equals({}, MI)) {
//            if (angular.equals({}, $scope.MI) == false) {
//                $('#nhis').modal('hide')
//            }
//            if ($('form [name=form_modal_1]').find('.error').length) {
//
//            }
//            console.log($('form[name=form_modal_1]').find('.error').length)
            if ($('form[name=form_modal_1]').find('.error').length == 0) {
//                $scope.dataToBeAdded = {
//                plan_id: $scope.MI.patientPlan.hmo == undefined ? '' : $scope.PI.employer.employer_name,
                $scope.dataToBeAdded.hmo = $scope.MI.hmo == undefined ? '' : $scope.MI.hmo;
                $scope.dataToBeAdded.policies = $scope.MI.policies == undefined ? '' : $scope.MI.policies;
                $scope.dataToBeAdded.is_principal = $scope.MI.select_speciality == "principal" ? $scope.MI.select_speciality : '0'
                $scope.dataToBeAdded.is_dependant = $scope.MI.select_speciality == "dependant" ? $scope.MI.select_speciality : '0'
                $scope.dataToBeAdded.insurance_id = $scope.MI.insurance_id == undefined ? '' : $scope.MI.insurance_id
//                principal_patient_id: check_val == "dependant" && $('.principal_list .chip').data('id') == undefined ? '0' : $('.principal_list .chip').data('id') ||  check_val == "dependant" && $('.principal_list .chip').data('id') == '0' ? $('.principal_list .chip').data('id') : '0' ,
//                $('.principal_list .chip').data('id') == '' || $('.principal_list .chip').data('id') == undefined ? '0' : $('.principal_list .chip').data('id'),
//                principal_patient_name: check_val == "dependant" || $('.principal_list .chip').data('id') == '0' || $('.principal_list .chip').data('id') == undefined ? '0' : $('.principal_list .chip').data('id') ,
//                principal_patient_name: $('.principal_list .chip').text() == '' || $('.principal_list .chip').text() == undefined ? '0' : $('.principal_list .chip').text(),
//                relationship: check_val == "dependant"  || $scope.MI.principal_relationship == undefined ? '' : $scope.MI.principal_relationship,
                $scope.dataToBeAdded.description = $scope.MI.description == undefined ? '' : $scope.MI.description
//                };
                $('#nhis').modal('hide');
                $scope.flag_to_show = "nhis";
            }
            //console.log($scope.dataToBeAdded)

//            $scope.hmo_info = $scope.MI.patientPlan.hmo
//            $scope.hmo_info = $scope.MI.patientPlan.hmo
//            $scope.hmo_info = $scope.MI.patientPlan.hmo


        }


        $scope.modal_retainer_Data = function (RI) {

//            console.log($scope.RI.select_speciality);
//            console.log($('input[name=select_speciality]:checked').val());
            var check_val = $('#relationship input[name=select_speciality]:checked').val();
            if (check_val == "dependant") {
//                console.log("there");
//                $rootScope.do_valid = true;
//                $rootScope.do_valid_1 = true;
//                console.log("in" + $('form[name=form_modal_2]').find('.error').length)
//                console.log($('#relationship .principal_list .chip').length)
//                $rootScope.do_valid = true;
                if ($('#relationship .principal_list .chip').length > 0) {

                    $rootScope.do_valid = false;
                    console.log("retainership popup")
                }

                $scope.dataToBeAdded.principal_patient_id = $('#relationship .principal_list .chip').data('id')
                $scope.dataToBeAdded.principal_patient_name = $('#relationship .principal_list .chip').text()
                $scope.dataToBeAdded.relationship = $scope.RI.principal_relationship == undefined ? '' : $scope.RI.principal_relationship
            }



//            console.log($scope.dataToBeAdded);
//            if (!angular.equals({}, MI)) {
//            if (angular.equals({}, $scope.MI) == false) {
//                $('#nhis').modal('hide')
//            }
//            if ($('form [name=form_modal_1]').find('.error').length) {
//
//            }
//            console.log($('form[name=form_modal_1]').find('.error').length)
            if ($('form[name=form_modal_2]').find('.error').length == 0) {
//                $scope.dataToBeAdded = {
//                plan_id: $scope.MI.patientPlan.hmo == undefined ? '' : $scope.PI.employer.employer_name,
                $scope.dataToBeAdded.retainership = $scope.RI.retainer_data == undefined ? '' : $scope.RI.retainer_data;
                $scope.dataToBeAdded.category = $scope.RI.category == undefined ? '' : $scope.RI.category;
                $scope.dataToBeAdded.is_principal = $scope.RI.select_speciality == "principal" ? $scope.RI.select_speciality : '0'
                $scope.dataToBeAdded.is_dependant = $scope.RI.select_speciality == "dependant" ? $scope.RI.select_speciality : '0'
//                principal_patient_id: check_val == "dependant" && $('.principal_list .chip').data('id') == undefined ? '0' : $('.principal_list .chip').data('id') ||  check_val == "dependant" && $('.principal_list .chip').data('id') == '0' ? $('.principal_list .chip').data('id') : '0' ,
//                $('.principal_list .chip').data('id') == '' || $('.principal_list .chip').data('id') == undefined ? '0' : $('.principal_list .chip').data('id'),
//                principal_patient_name: check_val == "dependant" || $('.principal_list .chip').data('id') == '0' || $('.principal_list .chip').data('id') == undefined ? '0' : $('.principal_list .chip').data('id') ,
//                principal_patient_name: $('.principal_list .chip').text() == '' || $('.principal_list .chip').text() == undefined ? '0' : $('.principal_list .chip').text(),
//                relationship: check_val == "dependant"  || $scope.MI.principal_relationship == undefined ? '' : $scope.MI.principal_relationship,
                $scope.dataToBeAdded.notes = $scope.RI.notes == undefined ? '' : $scope.RI.notes
//                };
                $('#relationship').modal('hide');
                $scope.flag_to_show = "retainer";
            }
            console.log($scope.dataToBeAdded)

        }

        $scope.savePlanData = function () {
            $scope.dataToBeAdded.token = $window.sessionStorage.token
            $scope.dataToBeAdded.patient_id = 1 //$window.sessionStorage.patient_id
            $scope.dataToBeAdded.plan_id = $scope.PP.checkoutpatient
            if ($scope.PP.checkoutpatient == 1)
            {

                $scope.dataToBeAdded.retainership = '';
                $scope.dataToBeAdded.category = '';
                $scope.dataToBeAdded.notes = '';
                $scope.dataToBeAdded.hmo = '';
                $scope.dataToBeAdded.policies = '';
                $scope.dataToBeAdded.is_principal = '';
                $scope.dataToBeAdded.is_dependant = '';
                $scope.dataToBeAdded.principal_patient_id = '';
                $scope.dataToBeAdded.relationship = '';
                PatienPlanSaveData.save($scope.dataToBeAdded, PlanDataSuccess, PlanDataFailure)
            }
            else if ($scope.PP.checkoutpatient == 2)
            {
                angular.copy($scope.dataToBeAdded, $scope.dataToBeAdded_send)
                $scope.dataToBeAdded_send.retainership = '';
                $scope.dataToBeAdded_send.category = '';
                $scope.dataToBeAdded_send.notes = '';
                $scope.dataToBeAdded_send.hmo = $scope.dataToBeAdded.hmo.id;
                $scope.dataToBeAdded_send.policies = $scope.dataToBeAdded.policies.id;
                $scope.dataToBeAdded_send.is_principal = $scope.dataToBeAdded.is_principal == "principal" ? "1" : "0";
                $scope.dataToBeAdded_send.is_dependant = $scope.dataToBeAdded.is_dependant == "dependant" ? "1" : "0";
                $scope.dataToBeAdded_send.principal_patient_id = $scope.dataToBeAdded.principal_patient_id == undefined || $scope.dataToBeAdded.principal_patient_id == '' ? '0' : $('.principal_list .chip').data('id');
                $scope.dataToBeAdded_send.relationship = $scope.dataToBeAdded.relationship == undefined || $scope.dataToBeAdded.relationship == '' ? '0' : $scope.MI.principal_relationship;
//                console.log($scope.dataToBeAdded)
//                console.log("second")
                PatienPlanSaveData.save($scope.dataToBeAdded_send, PlanDataSuccess, PlanDataFailure)
            }
            else if ($scope.PP.checkoutpatient == 3)
            {
                angular.copy($scope.dataToBeAdded, $scope.dataToBeAdded_send)
                $scope.dataToBeAdded_send.retainership = $scope.dataToBeAdded.retainership.id;
                $scope.dataToBeAdded_send.category = $scope.dataToBeAdded.category.id;
                $scope.dataToBeAdded_send.notes = $scope.dataToBeAdded.notes;
                $scope.dataToBeAdded_send.hmo = '';
                $scope.dataToBeAdded_send.policies = '';
                $scope.dataToBeAdded_send.is_principal = $scope.dataToBeAdded.is_principal == "principal" ? "1" : "0";
                $scope.dataToBeAdded_send.is_dependant = $scope.dataToBeAdded.is_dependant == "dependant" ? "1" : "0";
                $scope.dataToBeAdded_send.principal_patient_id = $scope.dataToBeAdded.principal_patient_id == undefined || $scope.dataToBeAdded.principal_patient_id == '' ? '0' : $('.principal_list .chip').data('id');
                $scope.dataToBeAdded_send.relationship = $scope.dataToBeAdded.relationship == undefined || $scope.dataToBeAdded.relationship == '' ? '0' : $scope.dataToBeAdded.relationship.id;
                console.log($scope.dataToBeAdded_send)
                console.log("third")
                PatienPlanSaveData.save($scope.dataToBeAdded_send, PlanDataSuccess, PlanDataFailure)
            }
            function PlanDataSuccess(res) {
                if (res.status == true) {
                    console.log(res)
                }
                else {
                    console.log("failure")
                }
            }
            function PlanDataFailure(res) {
                if (res.status == true) {
                    console.log("failure success")
                }
                else {
                    console.log("failure failure")
                }
            }
        }



    }]);