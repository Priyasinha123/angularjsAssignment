var app = angular.module('user-app', []);

app.controller('user-ctrl', function ($scope, $http) {
    
	$scope.form_hidden = 'hidden';
    $scope.assets = {};
    $scope.assetsData = [];
    $scope.numeric = /^[0-9]+$/;
    $scope.submitted = false;
    $scope.update_button = false;
    $scope.save_button = true;
    $scope.add_button = true;

    $scope.openForm = () => {
        $scope.form_hidden = false;
        $scope.add_button = false;
    }

    $scope.cancel_form = () => {
        $scope.form_hidden = 'hidden';
        $scope.add_button = true;
    }

    $scope.getAssetDetails = ()=> {
        $scope.update_button = false;
        $scope.save_button = true;
        $http({
            url: "https://dev.kreatetechnologies.com/training/ci/getassetsdetails",
            method: "GET",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function mySuccess(response) {
           // console.log(response);
           $scope.assetsData = response.data.value;
           console.log($scope.assetsData);

        }, function myError(response) {

        });
    }

    $scope.getAssetDetails();

    $scope.saveAssets = ()=> {
        if($scope.assets.id!='')
        {
            $scope.updateAsset();
            return false;
        }
    	console.log($scope.assets);
    	$http({
            url: "https://dev.kreatetechnologies.com/training/ci/saveassetdetails",
            method: "POST",
            data: JSON.stringify($scope.assets),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function mySuccess(response) {

	        console.log(response);
            $scope.getAssetDetails();
            $scope.assets = {};
            $scope.submitted = true;
            alert("Data saved successfully");
            $scope.form_hidden = 'hidden';

        }, function myError(response) {

        });
    }

    $scope.deleteAsset = (id)=> {
        var text = "Are you sure you want to delete this record";
        if(confirm(text)==true)
        {
            $http({
                url: "https://dev.kreatetechnologies.com/training/ci/deleteassetdetails",
                method: "POST",
                data: {
                    'id':id
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function mySuccess(response) {
               console.log(response);
                $scope.getAssetDetails();
            }, function myError(response) {

            });
        }
    }

    $scope.editAsset = (asset) => {
        $scope.form_hidden = false;
        $scope.assets = asset;
        $scope.update_button = true;
        $scope.save_button = false;
    }

    $scope.updateAsset = ()=> {

        $http({
            url: "https://dev.kreatetechnologies.com/training/ci/saveassetdetails",
            method: "POST",
            data: JSON.stringify($scope.assets),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(function mySuccess(response) {
            console.log(response);
            $scope.assets = {};
            $scope.getAssetDetails();
            alert("Data updated successfully");
            $scope.form_hidden = 'hidden';

        }, function myError(response) {

        });
    }


});