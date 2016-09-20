"use strict"


 import {destinations} from './instructions'; 

var div2 = document.getElementById('second-res');

//array off all locations
var town = ['Faerun', 'Norrath', 'Tristram', 'AlphaCentauri', 'Arbre', 'Snowdin', 'Tambi', 'Straylight'];

// function returns array of strings of locations with distance
function destArr(str){
	var arr = str.split(';');
	// console.log(arr);
	return arr;
}


//returns array of locations with distance
function getListLocation(arr = destArr(destinations) ){

	//create an array of obj's with locations and distance
	let arrRes = [];

	arr.forEach(i => {
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
function getRoutePair(arr = per() ){

	var routePairArray = [];

	arr.forEach(el =>{
		var locArray = el.split(' ');
		var routePair = []; 

		for(let i = 0; i < locArray.length-1; i++){
			routePair.push( locArray[i] + ' '+ locArray[i+1] );
		}
		routePairArray.push(routePair);
	});

	return routePairArray;
}


//compare pairs of locations
function compareLocations(arg1 = getListLocation(), arg2 = getRoutePair() ){

	var totalLocations = [];

	arg2.forEach(locations => {

			var distanceLocation = [];
			var totalDistance = 0;
			var count = 0;

			//el - pair of split route 
			arg1.forEach(el => {
				if( locations.indexOf(el.locations.join(' ')) !== -1 ||
					locations.indexOf(el.locations.reverse().join(' ')) !== -1)
				{
					totalDistance += +el.distance;
					count++;
				}
			});

			if(locations.length !== count){
				false;
			}else{
				distanceLocation.push(totalDistance);
				distanceLocation.push(locations.join());
			}

			totalLocations.push(distanceLocation);
	});	
	
	totalLocations = totalLocations.filter(i => i.length > 0);
	return totalLocations;
}


function findMinLocation(arrTotalResult = compareLocations() ){

	var distance = [];
	var locations = [];

	for(let i = 0; i < arrTotalResult.length; i++){
		distance.push(arrTotalResult[i][0]);
	}

	var minArray = Math.min.apply(null, distance) 

	arrTotalResult.forEach(i => {
		if(i.indexOf(minArray) !== -1){
			i[1] = i[1].split(',').join(' ').split(' ');
			var arrayLocations = unique(i[1]);

			//display final result
			div2.innerHTML = `<p>the distance of the shortest route : </p> <p>${arrayLocations.join('->') + ' = ' + i[0]} </p> `;
		}
	});
}

findMinLocation();










function permutator(arr) {
  var permutations = [];
  if (arr.length === 1) {
    return [ arr ];
  }

  for (var i = 0; i <  arr.length; i++) { 
    var subPerms = permutator(arr.slice(0, i).concat(arr.slice(i + 1)));
    for (var j = 0; j < subPerms.length; j++) {
      subPerms[j].unshift(arr[i]);
      permutations.push(subPerms[j]);
    }

  }

  return permutations;
}


function per(arr = permutator(town)){
	var res = [];

	for(var i = 0; i < arr.length; i++){
		res.push(arr[i].join(' '));
	}

	return res;
}

function unique(arr) {
  var result = [];

  nextInput:
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i]; // для каждого элемента
      for (var j = 0; j < result.length; j++) { // ищем, был ли он уже?
        if (result[j] == str) continue nextInput; // если да, то следующий
      }
      result.push(str);
    }

  return result;
}


