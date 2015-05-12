'use strict';

/* Home Ctrl */
var $j = jQuery.noConflict();

angular.module('doc-storage')
.controller('IndexCtrl', ['$scope', '$location', 'FIREBASE_URL',
	function ($scope,  $location, FIREBASE_URL) {
		var ref = new Firebase(FIREBASE_URL);

		$scope.title = '';
		$scope.docText = '';
		$scope.editTitle = '';
		$scope.editDocText = '';
		$scope.tags = [];
		$scope.docs = [];
		var currentlyEditing = {};


		ref.child('documents').once('value', function(dataSnapshot) {
		  for (var doc in dataSnapshot.val()) {
		  	var aDoc = {
		  		title: dataSnapshot.val()[doc].title,
		  		docText: dataSnapshot.val()[doc].docText,
		  		metaTags: dataSnapshot.val()[doc].metaTags
		  	}
		  	$scope.docs.push(aDoc);
		  	$scope.$apply();
		  };
		});

		$scope.submit = function() {
			ref.child('documents').push({
				title: $scope.title,
				docText: $scope.docText,
				metaTags: []
			});
			$scope.title = '';
			$scope.docText = '';
		};

		$scope.editDoc = function(document) {
			ref.child('documents').once('value', function(dataSnapshot) {
			  for (var doc in dataSnapshot.val()) {
			  	currentlyEditing = doc;
			  	if (document.title === dataSnapshot.val()[doc].title) {
			  		$scope.editTitle = dataSnapshot.val()[doc].title,
			  		$scope.editDocText = dataSnapshot.val()[doc].docText,
			  		$scope.tags = dataSnapshot.val()[doc].metaTags
			  	}
			  	$scope.$apply();
			  };
			});
		};

		$scope.reSubmit = function(document) {
			var tagsArray = $scope.tags.split(',');
			ref.child('documents').child(currentlyEditing).update({
				title: $scope.editTitle,
				docText: $scope.editDocText,
				metaTags: tagsArray
			});
			$scope.editTitle = '';
			$scope.editDocText = '';
			$scope.tags = [];
			currentlyEditing = {};
		};

}]);