/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _instructions = __webpack_require__(1);

	var div2 = document.getElementById('second-res');

	//array off all locations
	var town = ['Faerun', 'Norrath', 'Tristram', 'AlphaCentauri', 'Arbre', 'Snowdin', 'Tambi', 'Straylight'];

	// function returns array of strings of locations with distance
	function destArr(str) {
		var arr = str.split(';');
		// console.log(arr);
		return arr;
	}

	//returns array of locations with distance
	function getListLocation() {
		var arr = arguments.length <= 0 || arguments[0] === undefined ? destArr(_instructions.destinations) : arguments[0];


		//create an array of obj's with locations and distance
		var arrRes = [];

		arr.forEach(function (i) {
			//create an object with locations and distance
			var finalResult = {};
			var res = i.split(' ');

			finalResult.locations = [];

			//finalResult = {locations: [town1, town2], distance: n}
			finalResult.locations.push(res[0]);
			finalResult.locations.push(res[2]);
			finalResult.distance = res[4];

			arrRes.push(finalResult);
		});

		return arrRes;
	}

	//separate possible route on pair
	function getRoutePair() {
		var arr = arguments.length <= 0 || arguments[0] === undefined ? per() : arguments[0];


		var routePairArray = [];

		arr.forEach(function (el) {
			var locArray = el.split(' ');
			var routePair = [];

			for (var i = 0; i < locArray.length - 1; i++) {
				routePair.push(locArray[i] + ' ' + locArray[i + 1]);
			}
			routePairArray.push(routePair);
		});

		return routePairArray;
	}

	//compare pairs of locations
	function compareLocations() {
		var arg1 = arguments.length <= 0 || arguments[0] === undefined ? getListLocation() : arguments[0];
		var arg2 = arguments.length <= 1 || arguments[1] === undefined ? getRoutePair() : arguments[1];


		var totalLocations = [];

		arg2.forEach(function (locations) {

			var distanceLocation = [];
			var totalDistance = 0;
			var count = 0;

			//el - pair of split route 
			arg1.forEach(function (el) {
				if (locations.indexOf(el.locations.join(' ')) !== -1 || locations.indexOf(el.locations.reverse().join(' ')) !== -1) {
					totalDistance += +el.distance;
					count++;
				}
			});

			if (locations.length !== count) {
				false;
			} else {
				distanceLocation.push(totalDistance);
				distanceLocation.push(locations.join());
			}

			totalLocations.push(distanceLocation);
		});

		totalLocations = totalLocations.filter(function (i) {
			return i.length > 0;
		});
		return totalLocations;
	}

	function findMinLocation() {
		var arrTotalResult = arguments.length <= 0 || arguments[0] === undefined ? compareLocations() : arguments[0];


		var distance = [];
		var locations = [];

		for (var i = 0; i < arrTotalResult.length; i++) {
			distance.push(arrTotalResult[i][0]);
		}

		var minArray = Math.min.apply(null, distance);

		arrTotalResult.forEach(function (i) {
			if (i.indexOf(minArray) !== -1) {
				i[1] = i[1].split(',').join(' ').split(' ');
				var arrayLocations = unique(i[1]);

				//display final result
				div2.innerHTML = '<p>the distance of the shortest route : </p> <p>' + (arrayLocations.join('->') + ' = ' + i[0]) + ' </p> ';
			}
		});
	}

	findMinLocation();

	function permutator(arr) {
		var permutations = [];
		if (arr.length === 1) {
			return [arr];
		}

		for (var i = 0; i < arr.length; i++) {
			var subPerms = permutator(arr.slice(0, i).concat(arr.slice(i + 1)));
			for (var j = 0; j < subPerms.length; j++) {
				subPerms[j].unshift(arr[i]);
				permutations.push(subPerms[j]);
			}
		}

		return permutations;
	}

	function per() {
		var arr = arguments.length <= 0 || arguments[0] === undefined ? permutator(town) : arguments[0];

		var res = [];

		for (var i = 0; i < arr.length; i++) {
			res.push(arr[i].join(' '));
		}

		return res;
	}

	function unique(arr) {
		var result = [];

		nextInput: for (var i = 0; i < arr.length; i++) {
			var str = arr[i]; // для каждого элемента
			for (var j = 0; j < result.length; j++) {
				// ищем, был ли он уже?
				if (result[j] == str) continue nextInput; // если да, то следующий
			}
			result.push(str);
		}

		return result;
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var destinations = "Faerun to Norrath = 129;Faerun to Tristram = 58;Faerun to AlphaCentauri = 13;Faerun to Arbre = 24;Faerun to Snowdin = 60;Faerun to Tambi = 71;Faerun to Straylight = 67;Norrath to Tristram = 142;Norrath to AlphaCentauri = 15;Norrath to Arbre = 135;Norrath to Snowdin = 75;Norrath to Tambi = 82;Norrath to Straylight = 54;Tristram to AlphaCentauri = 118;Tristram to Arbre = 122;Tristram to Snowdin = 103;Tristram to Tambi = 49;Tristram to Straylight = 97;AlphaCentauri to Arbre = 116;AlphaCentauri to Snowdin = 12;AlphaCentauri to Tambi = 18;AlphaCentauri to Straylight = 91;Arbre to Snowdin = 129;Arbre to Tambi = 53;Arbre to Straylight = 40;Snowdin to Tambi = 15;Snowdin to Straylight = 99;Tambi to Straylight = 70";

	exports.destinations = destinations;

/***/ }
/******/ ]);