var AppEHR = angular.module('AppEHR');
// Lab Order Tests Listing
AppEHR.controller('labOrderTests', ['$scope', '$rootScope','$window', '$routeParams','getLabOrderInfo','getLabTestInfo','updateTestStatus','$timeout', function ($scope, $rootScope, $window, $routeParams, getLabOrderInfo,getLabTestInfo,updateTestStatus,$timeout) {
    $rootScope.pageTitle = "EHR - Lab Order Test";
    $scope.action = "";
    getLabOrderInfo.get({ // Getting all tests along with order info
            token: $window.sessionStorage.token,
            order_id: $routeParams.orderID},
        getLabOrderInfoSuccess, getLabOrderInfoFailure);
    function getLabOrderInfoSuccess(res) { // on success
        if (res.status == true) {
            $rootScope.loader = "hide";
            $scope.orderSelected = true;
            $scope.selectedOrder = res.data;
        }
    }
    function getLabOrderInfoFailure(error) { // on failure
        $rootScope.loader = "show";
        console.log(error);
    }

    $scope.testSelected = function (testID){ // For Selection of test
        $scope.testID = testID;
        $scope.selectedTest = {};
        $rootScope.loader = "show";
        getLabTestInfo.get({
            token: $window.sessionStorage.token,
            lab_test_id: testID
        }, getLabTestInfoSuccess, getLabTestInfoFailure);
        function getLabTestInfoSuccess(res) { // on success
            if (res.status == true) {
                $rootScope.loader = "hide";
                $scope.testIsSelected = true;
                $scope.selectedTest = res.data;
            }
        }
        function getLabTestInfoFailure(error) { // on failure
            $rootScope.loader = "show";
            console.log(error);
        }
    };

    $scope.search = function(item){ // search data by test name or test priority
        if($scope.searchTest == undefined){
            return true;
        }else{
            if(item.priority.toLowerCase().indexOf($scope.searchTest.toLowerCase()) != -1 || item.test_name.toLowerCase().indexOf($scope.searchTest.toLowerCase()) != -1){
                return true;
            }
        }
    };

    $scope.updateTestForm = function (){ // updating Test Form Status
        //if (angular.equals({}, test) == false) {
            $scope.hideLoader = 'show';
            $scope.updateTestBtn = true; // disabling submit button until request is complete
            updateTestStatus.save({ // sending data over updateTestStatus factory which will update Test Status
                token: $window.sessionStorage.token,
                lab_test: $scope.selectedTest.id,
                status: $scope.selectedTest.test_status
            }, updateTestStatusSuccess, updateTestStatusFailure);
        //}
    };

    function updateTestStatusSuccess(res){ // on success
        if (res.status == true) {
            $scope.hideLoader = 'hide';
            $scope.message = true;
            $scope.updateTestBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            $timeout(function(){
                $('#cancelOrder2').modal('hide');
                $scope.message = false;
            },500);
        } else {
            $scope.hideLoader = "hide";
            $scope.updateTestBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }
    function updateTestStatusFailure(error){ // on failure
        console.log(error);
    }
}]);