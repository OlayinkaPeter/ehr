var AppEHR = angular.module('AppEHR');
AppEHR.controller('patientRegistrationController', ['$rootScope', '$scope', '$window', 'Countries', 'States', 'GetLocalGovermentArea', 'City', 'DropDownData', 'PatientInformation', 'fileUpload', '$location', '$filter', 'Upload', '$timeout', 'PatientRegistrationAddress', 'PatientRegistrationKin', 'PatientRegistrationEmployer', '$routeParams', 'GetPatientAllData', function ($rootScope, $scope, $window, Countries, States, GetLocalGovermentArea, City, DropDownData, PatientInformation, fileUpload, $location, $filter, Upload, $timeout, PatientRegistrationAddress, PatientRegistrationKin, PatientRegistrationEmployer, $routeParams, GetPatientAllData) {
        $rootScope.pageTitle = "EHR - Patient Registration";
        $scope.PI = $rootScope.PI;
        $scope.PI.adress = {};
        $scope.PI.kin = {};
        $scope.PI.employer = {};
        $scope.PI.patientPlan = {};
        $scope.myForm = {};
        $scope.MI = {};
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
        $scope.disabledTabAdress = '';
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

    function countrySuccess(res){
    	if(res.status ==  true){
    		angular.copy(res.data, $scope.contactAddressCountries);
    		angular.copy(res.data, $scope.nextOfKinCountries);
    		angular.copy(res.data, $scope.employerCountries);
    		//$scope.countryCode = $scope.contactAddressCountries;
    		angular.copy(res.data, $scope.permanentAddressCountries);
    	}else{
    		console.log(res);
    	}
    }

    function countryFailed(error){
    	console.log(error);
    }

	DropDownData.get({token: $window.sessionStorage.token}, dropDownSuccess, dropDownFailed);

	function dropDownSuccess(res) {
		if(res.status == true){
			angular.copy(res.data, $scope.dropDownData);
		}
	}

	function dropDownFailed(error) {
		console.log(error);
	}

    // Address
    $scope.addressStateByCountry = function(country, flag){
    	console.log(country);
    	$scope.disabledDropdown = true;
    	if(country != "null"){
			States.get({token: $window.sessionStorage.token, country_id: country.id}, stateSuccess, stateFailed);
    	}else{
			if(flag){
				$scope.PI.permanent_country = "";
				$scope.PI.permanent_state = "";
    			$scope.permanentAddressStates = [];
    			$scope.addressPerminentCities = [];
    			$scope.PI.permanent_city = '';
    		}else{
    			$scope.addressContactCities = [];
    			$scope.PI.city = "";
    			$scope.PI.state = "";
    			$scope.contactAddressStates = [];
    			$scope.PI.local_goverment_area = "";
    			$scope.addresslocalGovtArea = [];
    		}
		}
    	function stateSuccess(res){
	    	if(res.status ==  true && res.data.length > 0){
	    		angular.copy(res.data, $scope.contactAddressStates);
    			angular.copy(res.data, $scope.permanentAddressStates);
    			$scope.disabledDropdown = false;
	    	}/*else{
	    		
	    	}*/
	    }
	    function stateFailed(error){
	    	console.log(error);
	    	console.log("here");
	    	$scope.disabledDropdown = false;
	    }
    };

    $scope.addressLocalGovtAreaByStates = function(state, flag){
    	console.log(state);
    	console.log(flag);
    	$scope.disabledDropdown = true;
    	if(state != null){
    		GetLocalGovermentArea.get({token: $window.sessionStorage.token, state_id: state.id}, LGASuccess, LGAFailed);
    		City.get({token: $window.sessionStorage.token, state_id: state.id}, citySuccess, cityFailed);
    		function LGASuccess(res){
    			console.log(res);
    			if(res.status == true && res.data.length > 0){
    				console.log(res);
    				angular.copy(res.data, $scope.patientInfolocalGovtArea);
    				angular.copy(res.data, $scope.addresslocalGovtArea);
    				$scope.disabledDropdown = false;
    			}else{
    				$scope.disabledDropdown = false;
    				console.log(111);
    			}
    		}
    		function LGAFailed(error){
    			console.log(error);
    			$scope.disabledDropdown = false;
    		}

    		function citySuccess(res){
    			if(res.status == true && res.data.length > 0){
    				angular.copy(res.data, $scope.addressContactCities);
    				angular.copy(res.data, $scope.addressPerminentCities);
    				$scope.disabledDropdown = false;
    			}else{
    				$scope.patientInfolocalGovtArea = [];
    				$scope.PI.patient_local_goverment_area = "";
    				console.log(111);
    			}
    		}
    		function cityFailed(error){
    			console.log(error);
    		}
    	}else{
			if(flag){
				$scope.disabledDropdown = false;
				$scope.PI.patient_local_goverment_area = "";
    			$scope.patientInfolocalGovtArea = [];
    		}else{
    			$scope.disabledDropdown = false;
    			$scope.PI.local_goverment_area = "";
    			$scope.addresslocalGovtArea = [];
    		}
    	}
    }

    // Next of Kin
    $scope.nextOfKinStateByCountry = function(kin){
    	if(kin != "null"){
			States.get({token: $window.sessionStorage.token, country_id: kin.id}, nextOfKinStateSuccess, nextOfKinStateFailed);
    	}else{
			$scope.PI.kin_state = "null";
			$scope.nextOfKinStates = [];
			$scope.PI.kin_city = "null";
			$scope.nextOfKinCities = [];
		}
    	function nextOfKinStateSuccess(res){
	    	if(res.status ==  true && res.data.length > 0){
	    		angular.copy(res.data, $scope.nextOfKinStates);
	    	}/*else{
	    		
	    	}*/
	    }
	    function nextOfKinStateFailed(error){
	    	console.log(error);
	    }
    };

    $scope.nextOfKinCityByStates = function(states){
    	if(states != "null"){
    		City.get({token: $window.sessionStorage.token, state_id: states.id}, citySuccess, cityFailed);
    		function citySuccess(res){
    			if(res.status == true && res.data.length > 0){
    				console.log(res);
    				angular.copy(res.data, $scope.nextOfKinCities);
    			}else{
    				console.log(111);
    			}
    		}
    		function cityFailed(error){
    			console.log(error);
    		}
    	}else{
			$scope.PI.kin_city = "null";
			$scope.nextOfKinCities = [];
    	}
    };

    // Employer
    $scope.employerStateByCountry = function(employer){
    	if(employer != "null"){
			States.get({token: $window.sessionStorage.token, country_id: employer.id}, employerStateSuccess, employerStateFailed);
    	}else{
			$scope.PI.employer_state = "null";
			$scope.employerStates = [];
			$scope.PI.employer_city = "null";
			$scope.employerCities = [];
		}
    	function employerStateSuccess(res){
	    	if(res.status ==  true && res.data.length > 0){
	    		angular.copy(res.data, $scope.employerStates);
	    	}/*else{
	    		
	    	}*/
	    }
	    function employerStateFailed(error){
	    	console.log(error);
	    }
    };

    $scope.employerCityByStates = function(states){
    	if(states != "null"){
    		City.get({token: $window.sessionStorage.token, state_id: states.id}, citySuccess, cityFailed);
    		function citySuccess(res){
    			if(res.status == true && res.data.length > 0){
    				console.log(res);
    				angular.copy(res.data, $scope.employerCities);
    			}else{
    				console.log(111);
    			}
    		}
    		function cityFailed(error){
    			console.log(error);
    		}
    	}else{
			$scope.PI.employer_city = "null";
			$scope.employerCities = [];
    	}
    };

    function permanentAddress(){
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
    $scope.isChecked = function(checked){
    	if(checked && $routeParams.patientID == undefined){
    		$('.hidePermanentAddress').slideUp(500);
    		permanentAddress();
    	}else if(checked){
            $('.hidePermanentAddress').slideUp(500);
            permanentAddress();
    	}else{
            $('.hidePermanentAddress').slideDown(500);
        }
    };

    // patient information API
    $scope.validatePatientInfo = function(PI){
    	if(PI.first_name != undefined && PI.last_name != undefined && PI.date_of_birth != undefined && PI.age != undefined && PI.sex != undefined){
    		var dataToBeAdded = {
    			token: $window.sessionStorage.token,
	    		patient_unit_number: $scope.PI.patient_unit_number == undefined ? '' : $scope.PI.patient_unit_number,
	    		first_name: $scope.PI.first_name == undefined ? '' : $scope.PI.first_name,
	    		middle_name: $scope.PI.middle_name == undefined ? '' : $scope.PI.middle_name,
	    		last_name: $scope.PI.last_name == undefined ? '' : $scope.PI.last_name,
	    		date_of_birth: $scope.PI.date_of_birth == undefined ? '' : $scope.PI.date_of_birth,
	    		age: $scope.PI.age == undefined ? '' : $scope.PI.age,
	    		sex: $scope.PI.sex == undefined ? '' : $scope.PI.sex,
	    		patient_image: $scope.PI.file == undefined ? '' : $scope.PI.file, //.name
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
    		$rootScope.loader = 'show';
    		if($window.sessionStorage.patient_id == undefined){
    			console.log(dataToBeAdded);	
				PatientInformation.save(dataToBeAdded, patientInformationSuccess, patientInformationFailed);
			}else{
				console.log('else');
				dataToBeAdded.patient_id = $window.sessionStorage.patient_id;
				PatientInformation.save(dataToBeAdded, patientInfoUpdateSucess, patientInfoUpdateFailed);
			}
			function patientInformationSuccess(res){
				if(res.status == true){
					$rootScope.loader = 'hide';
					$window.sessionStorage.patient_id = res.patient_id;
					$scope.patient_ID = "ID" + res.patient_id;
					$scope.successMessage = true;
					$scope.showSubmitButton = false;
					$scope.disabledTabAdress = 'active';
					$scope.disabledTabInfo = '';
					$scope.disabledTabs = "";
				}else{
					$rootScope.loader = 'hide';
					$scope.showSubmitButton = true;
				}
			}

			function patientInformationFailed(error){
				console.log(error);
			}

			function patientInfoUpdateSucess(res){
				console.log(res);
				if(res.status == true){
					$rootScope.loader = 'hide';	
				}else{
					$scope.showSubmitButton = true;
				}
			}

			function patientInfoUpdateFailed(error){
				console.log(error);
			}
		}
    }

    // patient address API
    $scope.validatePatientAddress = function(PIAdress){
    	//console.log(PIAdress);
    	//console.log(angular.equals({}, PIAdress));
    	if(angular.equals({}, PIAdress) == false) {
    		$rootScope.loader = 'show';
    		var dataToBeAdded = {
    			token: $window.sessionStorage.token,
				patient_id: $window.sessionStorage.patient_id,
	    		phone_number: $scope.PI.adress.phone_number == undefined ? '' : ($scope.countryCode == undefined ? '234' : $scope.countryCode.country_code) + '' + $scope.PI.adress.phone_number,
				mobile_number: $scope.PI.adress.mobile_number == undefined ? '' : ($scope.countryCode == undefined ? '234' : $scope.countryCode.country_code) + '' +  $scope.PI.adress.mobile_number,
	    		house_number: $scope.PI.adress.house_number == undefined ? '' : $scope.PI.adress.house_number,
	    		street: $scope.PI.adress.street == undefined ? '' : $scope.PI.adress.street,
	    		country: $scope.PI.adress.country == undefined ? '' : $scope.PI.adress.country.id,
	    		state: $scope.PI.adress.state == undefined ? '' : $scope.PI.adress.state.id,
	    		city: $scope.PI.adress.city == undefined ? '' : $scope.PI.adress.city.id,
	    		email: $scope.PI.adress.email == undefined ? '' : $scope.PI.adress.email,
	    		postal_code: $scope.PI.adress.postal_code == undefined ? '' : $scope.PI.adress.postal_code,
	    		local_goverment_area: $scope.PI.adress.local_goverment_area == undefined ? '' : $scope.PI.adress.local_goverment_area.id,
	    		same_as_above: $scope.PI.sameAsAbove == undefined ? '' : $scope.PI.sameAsAbove,
	    		permanent_phonenumber: $scope.PI.adress.permanent_phonenumber == undefined ? '' : ($scope.permanentCountryCode == undefined ? '234' : $scope.permanentCountryCode.country_code) + '' +  $scope.PI.adress.permanent_phonenumber,
	    		permanent_mobilenumber: $scope.PI.adress.permanent_mobilenumber == undefined ? '' : ($scope.permanentCountryCode == undefined ? '234' : $scope.permanentCountryCode.country_code) + '' + $scope.PI.adress.permanent_mobilenumber,
	    		permanent_email: $scope.PI.adress.permanent_email == undefined ? '' : $scope.PI.adress.permanent_email,
	    		permanent_housenumber: $scope.PI.adress.permanent_housenumber == undefined ? '' : $scope.PI.adress.permanent_housenumber,
	    		permanent_street: $scope.PI.adress.permanent_street == undefined ? '' : $scope.PI.adress.permanent_street,
	    		permanent_country: $scope.PI.adress.permanent_country == undefined ? '' : $scope.PI.adress.permanent_country.id,
	    		//city: $scope.PI.adress.city == undefined ? '' : $scope.PI.adress.city.id,
	    		permanent_state: $scope.PI.adress.permanent_state == undefined ? '' : $scope.PI.adress.permanent_state.id,
	    		permanent_city: $scope.PI.adress.permanent_city == undefined ? '' : $scope.PI.adress.permanent_city.id,
	    		permanent_postalCode: $scope.PI.adress.permanent_postalCode == undefined ? '' : $scope.PI.adress.permanent_postalCode
    		};
	    	if($scope.address_id == undefined){
	    		console.log('if');
				PatientRegistrationAddress.save(dataToBeAdded, patientAddressSuccess, patientAddressFailed);
				function patientAddressSuccess(res){
					console.log(res);
					if(res.status == true){
						$rootScope.loader = 'hide';
						$scope.address_id = res.address_id;
						//$scope.successMessage = true;
						$scope.showSubmitButtonAddress = false;
						$scope.disabledTabKin = 'active';
						$scope.disabledTabAdress = '';
						//$scope.disabledTabs = "";
					}else{
						$rootScope.loader = 'hide';
						$scope.errorMessage = true;
						$scope.showSubmitButtonAddress = true;
					}
				}

				function patientAddressFailed(error){
					console.log(error);
				}
			}else{
				dataToBeAdded.address_id = $scope.address_id;
				console.log('else ' + $scope.address_id);
				PatientRegistrationAddress.save(dataToBeAdded, patientAddressUpdateSucess, patientAddressUpdateFailed);
				function patientAddressUpdateSucess(res){
					console.log(res);
					$rootScope.loader = 'hide';
					if(res.status == true){
						$scope.address_id = res.address_id;
						$scope.showSubmitButtonAddress = false;
						/*$scope.disabledTabKin = 'active';
						$scope.disabledTabAdress = '';
						$scope.disabledTabs = "";*/
					}else{
						$scope.showSubmitButtonAddress = true;
					}
				}

				function patientAddressUpdateFailed(error){
					console.log(error);
				}
			}
		}else{
			/*$scope.disabledTabKin = 'active';
			$scope.disabledTabAdress = '';*/
		}
    }

    // patient kin API
    $scope.validatePatientKin = function(PIKin){
    	//console.log(PIKin);
    	if(angular.equals({}, PIKin) == false) {
    		//console.log(angular.equals({}, PIKin));
    		$rootScope.loader = 'show';
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
    		if($scope.kin_id == undefined){
				PatientRegistrationKin.save(dataToBeAdded, patientKinSuccess, patientKinFailed);
				function patientKinSuccess(res){
					console.log(res);
					if(res.status == true){
						$rootScope.loader = 'hide';
						$scope.kin_id = res.kin_id;
						$scope.showSubmitButtonKin = false;
						$scope.disabledTabEmployer = 'active';
						$scope.disabledTabKin = '';
						$scope.disabledTabs = "";
					}else{
						$rootScope.loader = 'hide';
						$scope.showSubmitButtonKin = true;
					}
				}
				function patientKinFailed(error){
					console.log(error);
				}
			}else{
				console.log('else');
				dataToBeAdded.kin_id = $scope.kin_id;
				PatientRegistrationKin.save(dataToBeAdded, patientKinUpdateSucess, patientKinUpdateFailed);
				function patientKinUpdateSucess(res){
					console.log(res);
					if(res.status == true){
						$rootScope.loader = 'hide';
						$scope.showSubmitButtonAddress = false;
						$scope.disabledTabs = "";
					}else{
						$scope.showSubmitButtonKin = true;
						$rootScope.loader = 'hide';
					}
				}

				function patientKinUpdateFailed(error){
					console.log(error);
				}
			}
    	}else{
    		/*$scope.disabledTabEmployer = 'active';
			$scope.disabledTabKin = '';*/
    	}
    }

    // patient employer API
    $scope.validatePatientEmployer = function(PIEmployer){
    	if(angular.equals({}, PIEmployer) == false) {
    		$rootScope.loader = 'show';
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
	    	if($scope.employer_id == undefined){
	    		console.log('if');
				PatientRegistrationEmployer.save(dataToBeAdded, patientEmployerSuccess, patientEmployerFailed);
				function patientEmployerSuccess(res){
					console.log(res);
					if(res.status == true){
						$rootScope.loader = 'hide';
						$scope.employer_id = res.employee_id;
						$scope.showSubmitButtonEmployer = false;
						$scope.disabledTabPatientPlant = 'active';
						$scope.disabledTabEmployer = '';
					}else{
						$rootScope.loader = 'hide';
						$scope.showSubmitButtonEmployer = true;
					}
				}
				function patientEmployerFailed(error){
					console.log(error);
				}
			}else{
				console.log('else');
				dataToBeAdded.employee_id = $scope.employer_id;
				console.log(dataToBeAdded);
				PatientRegistrationEmployer.save(dataToBeAdded, patientKinUpdateSucess, patientKinUpdateFailed);
				function patientKinUpdateSucess(res){
					if(res.status == true){
						$rootScope.loader = 'hide';
						$scope.showSubmitButtonAddress = false;
						$scope.disabledTabs = "";
					}else{
						$scope.errorKinMessage = true;
						$scope.showSubmitButtonKin = true;
						$rootScope.loader = 'hide';
					}
				}
				function patientKinUpdateFailed(error){
					console.log(error);
				}
			}
		}else{
			/*$scope.disabledTabPatientPlant = 'active';
			$scope.disabledTabEmployer = '';*/
		}
    }

    // patient plan
    $scope.validatePatientPlan = function(PIPlan){
    	console.log(PIPlan);
		$scope.disabledTabPatientPlant = 'active';
		$scope.disabledTabArchive = '';
    }

    // age calculation with respect to DOB
    $scope.calculateAge = function(birthday) { // birthday is a date
    	var splitDate = birthday.split('-');
    	$scope.birthdate = new Date(splitDate[0],splitDate[1],splitDate[2]);
	    var ageDifMs = Date.now() - $scope.birthdate.getTime();
	    var ageDate = new Date(ageDifMs); // miliseconds from epoch
	    $scope.PI.age = Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    $scope.uploadPic = function(file) {
	    file.upload = Upload.upload({
	      url: 'http://demoz.online/ehr/public/api/register_patient',
	      method:'post',
	      data: {
	        username: $scope.username,
	        file: file
	      },
	    });

	    file.upload.then(function(response) {
	      $timeout(function() {
	        file.result = response.data;
	      });
	    }, function(response) {
	      if (response.status > 0)
	        $scope.errorMsg = response.status + ': ' + response.data;
	    }, function(evt) {
	      // Math.min is to fix IE which reports 200% sometimes
	      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	    });
	 }


    $scope.submit = function(PI){
    	/*var file = $scope.PI.myFile;
        console.log('file is ' + file);
        console.dir(file);
        var uploadUrl = patientFileUploadPath;
        fileUpload.uploadFileToUrl(file, uploadUrl);*/
    };

    if($routeParams.patientID != undefined){
        $rootScope.loader = 'show';
        $scope.PI.sameAsAbove = true;
    	$scope.byParams = $routeParams.patientID;
    	$window.sessionStorage.patient_id = $routeParams.patientID;
    	$scope.showSubmitButtonAddress = false;

    	$scope.showSubmitButton = false;
    	$scope.showSubmitButtonKin = false;
    	$scope.showSubmitButtonKin = false;
    	$scope.showSubmitButtonEmployer = false;
    	$scope.disabledTabAdress = $scope.disabledTabArchive = $scope.disabledTabKin = $scope.disabledTabEmployer = $scope.disabledTabPatientPlant = "11";
    	//console.log($scope.disabledTabAdress);
    	GetPatientAllData.get({
    		token: $window.sessionStorage.token,
    		patient_id: $window.sessionStorage.patient_id
    	}, patientEditSuccess, patientEditFailed);
    }else{
    	console.log($routeParams.patientID);
    }

    function patientEditSuccess(res){
    	if(res.status == true){
            //$scope.PI.sameAsAbove = res.data.patient_address[1].length > 0 ? true : false;
    		$scope.address_id = res.data.patient_address[0].id;
    		$scope.kin_id = res.data.patient_kin.id;
    		$scope.employer_id = res.data.patient_employeer.id;
    		$scope.PI.patient_ID = res.data.patient_info.id;
    		$scope.PI.patient_unit_number = res.data.patient_info.patient_unit_number;
    		$scope.PI.first_name = res.data.patient_info.first_name;
    		$scope.PI.middle_name = res.data.patient_info.middle_name;
    		$scope.PI.last_name = res.data.patient_info.last_name;
    		$scope.PI.date_of_birth = res.data.patient_info.date_of_birth;
    		$scope.PI.age = res.data.patient_info.age;
    		$scope.PI.file = res.data.patient_info.patient_image;
    		$scope.PI.religion = res.data.patient_info.religion;
    		$scope.PI.maritial_status = res.data.patient_info.maritial_status;
    		$scope.PI.sex = res.data.patient_info.sex;
    		$scope.PI.identity_type = res.data.patient_info.identity_type;
    		$scope.PI.identity_number = res.data.patient_info.identity_number;
    		$scope.PI.patient_origin = res.data.patient_info.patient_origin;
    		$scope.PI.patient_local_goverment_area = res.data.patient_info.patient_local_goverment_area;
    		$scope.PI.tribe = res.data.patient_info.tribe;
    		$scope.PI.language = res.data.patient_info.language;
    		$scope.PI.nationality = res.data.patient_info.nationality;
    		$scope.PI.blood_group = res.data.patient_info.blood_group;
    		$scope.PI.father_firstname = res.data.patient_info.father_firstname;
    		$scope.PI.father_middlename = res.data.patient_info.father_middlename;
    		$scope.PI.father_lastname = res.data.patient_info.father_lastname;
    		$scope.PI.mother_firstname = res.data.patient_info.mother_firstname;
    		$scope.PI.mother_lastname = res.data.patient_info.mother_lastname;
    		$scope.PI.mother_middlename = res.data.patient_info.mother_middlename;
    		$scope.PI.refered_name = res.data.patient_info.refered_name;

    		$scope.PI.adress.phone_number = res.data.patient_address[0].phone_number;
    		$scope.PI.adress.mobile_number = res.data.patient_address[0].mobile_number;
            $scope.PI.adress.house_number = res.data.patient_address[0].house_number;
    		$scope.PI.adress.email = res.data.patient_address[0].email;
    		$scope.PI.adress.street = res.data.patient_address[0].street;
    		$scope.PI.adress.country = res.data.patient_address[0].country;
    		$scope.PI.adress.state = res.data.patient_address[0].state;
    		$scope.PI.adress.local_goverment_area = res.data.patient_address[0].local_goverment_area;
    		$scope.PI.adress.city = res.data.patient_address[0].city;
    		$scope.PI.adress.postal_code = res.data.patient_address[0].postal_code;
            if(res.data.patient_address[1] != undefined){
        		$scope.PI.adress.permanent_phonenumber = res.data.patient_address[1].phone_number == undefined ? '' : '';
        		$scope.PI.adress.permanent_mobilenumber = res.data.patient_address[1].mobile_number;
        		$scope.PI.adress.permanent_email = res.data.patient_address[1].email;
        		$scope.PI.adress.permanent_housenumber = res.data.patient_address[1].house_number;
        		$scope.PI.adress.permanent_street = res.data.patient_address[1].street;
        		$scope.PI.adress.permanent_country = res.data.patient_address[1].country;
        		$scope.PI.adress.permanent_state = res.data.patient_address[1].state;
        		$scope.PI.adress.permanent_city = res.data.patient_address[1].city;
        		$scope.PI.adress.permanent_postalCode = res.data.patient_address[1].patient_addresspostalCode;
            }
    		$scope.PI.kin.kin_fullname = res.data.patient_kin.fullname;
    		$scope.PI.kin.kin_middlename = res.data.patient_kin.middlename;
    		$scope.PI.kin.kin_lastname = res.data.patient_kin.lastname;
    		$scope.PI.kin.kin_relationship = res.data.patient_kin.relationship;
    		$scope.PI.kin.others = res.data.patient_kin.others;
    		$scope.PI.kin.kin_phone_number = res.data.patient_kin.phone_number;
    		$scope.PI.kin.kin_mobile_number = res.data.patient_kin.mobile_number;
    		$scope.PI.kin.kin_email = res.data.patient_kin.email;
    		$scope.PI.kin.kin_street = res.data.patient_kin.street;
    		$scope.PI.kin.kin_house_number = res.data.patient_kin.house_number;
    		$scope.PI.kin.kin_country = res.data.patient_kin.country;
    		$scope.PI.kin.kin_city = res.data.patient_kin.city;
    		$scope.PI.kin.kin_state = res.data.patient_kin.state;
    		$scope.PI.kin.kin_postal_code = res.data.patient_kin.postal_code;

    		$scope.PI.employer.employer_name = res.data.patient_employeer.name;
    		$scope.PI.employer.employer_occupation = res.data.patient_employeer.occupation;
    		$scope.PI.employer.employer_phone_number = res.data.patient_employeer.phone_number;
    		$scope.PI.employer.employer_mobile_number = res.data.patient_employeer.mobile_number;
    		$scope.PI.employer.employer_email = res.data.patient_employeer.email;
    		$scope.PI.employer.employer_house_number = res.data.patient_employeer.house_number;
    		$scope.PI.employer.employer_street = res.data.patient_employeer.street;
    		$scope.PI.employer.employer_country = res.data.patient_employeer.country;
    		$scope.PI.employer.employer_state = res.data.patient_employeer.state;
    		$scope.PI.employer.employer_city = res.data.patient_employeer.city;
            console.log($scope.PI);
            $rootScope.loader = 'hide';
    	}
    }
    function patientEditFailed(error){
    	console.log(error);
    }

	$scope.modal_nhis_Data = function (MI) {

		console.log($scope.MI.select_speciality);
		if ($('input[name=select_speciality]:checked').val() == "dependant") {
			$rootScope.do_valid = true;
			$rootScope.do_valid_1 = true;
			if ($('.principal_list .chip').length > 0) {
				$rootScope.do_valid = false;
			}
		}

		$scope.dataToBeAdded = {
//                plan_id: $scope.MI.patientPlan.hmo == undefined ? '' : $scope.PI.employer.employer_name,
			hmo: $scope.MI.hmo == undefined ? '' : $scope.MI.hmo,
			policies: $scope.MI.policies == undefined ? '' : $scope.MI.policies,
			is_principal: $scope.MI.select_speciality == "principal" ? $scope.MI.select_speciality : '0',
			is_dependant: $scope.MI.select_speciality == "dependant" ? $scope.MI.select_speciality : '0',
			insurance_id: $scope.MI.insurance_id == undefined ? '' : $scope.MI.insurance_id,
			principal_patient_id: $('.principal_list .chip').data('id') == '' || $('.principal_list .chip').data('id') == undefined ? '0' : $('.principal_list .chip').data('id'),
			principal_patient_name: $('.principal_list .chip').text() == '' || $('.principal_list .chip').text() == undefined ? '0' : $('.principal_list .chip').text(),
			relationship: $scope.MI.principal_relationship == undefined ? '' : $scope.MI.principal_relationship,
			description: $scope.MI.description == undefined ? '' : $scope.MI.description
		};
		console.log($scope.dataToBeAdded);
//            if (!angular.equals({}, MI)) {
//            if (angular.equals({}, $scope.MI) == false) {
//                $('#nhis').modal('hide')
//            }
//            if ($('form [name=form_modal_1]').find('.error').length) {
//
//            }
		if ($('form[name=form_modal_1]').find('.error').length == 0) {
			$('#nhis').modal('hide');
			$scope.flag_to_show = "nhis";
		}

//            $scope.hmo_info = $scope.MI.patientPlan.hmo
//            $scope.hmo_info = $scope.MI.patientPlan.hmo
//            $scope.hmo_info = $scope.MI.patientPlan.hmo
	}

}]);