"use strict"


//destinations - an array from other document
var arr = destArr(destinations);


// function returns array of strings of locations with distance
function destArr(str){
	var arr = str.split(';');
	// console.log(arr);
	return arr;
}



var town = ['Faerun', 'Norrath', 'Tristram', 'AlphaCentauri', 'Arbre', 'Snowdin', 'Tambi', 'Straylight'];

// getLocationDistance(arr);
// showPossDest(town);
// getLocPair( showPossDest(town) );
 
 var totalResult = compareLocations(getLocationDistance(arr), getLocPair( per( permutator(town) ) ) );


//returns object of locations with distance
function getLocationDistance(arr){

	var arrRes = [];

	for(var i = 0; i < arr.length; i++){

		var finalResult = {};
		var res = arr[i].split(' ');

		finalResult.locations = [];

		finalResult.locations.push(res[0]);
		finalResult.locations.push(res[2]);
		finalResult.distance = res[4];

		arrRes.push(finalResult);

	}
	// console.log(arrRes);
	return arrRes;
}


//separate possible distance on pair
function getLocPair(arr){

	var result = [];

	for(var i = 0; i < arr.length; i++){
		var locArray = arr[i].split(' ');

		var res = []; 


		for(var j = 0; j < locArray.length-1; j++){
			res.push( locArray[j] + ' '+ locArray[j+1] );
		}

		// console.log(res);
		result.push(res);

	}
	return result;
}


// return all possible variants of distance 
function showPossDest(arr){

	var res = [];

	for(var i = 0; i < arr.length; i++){
		for(var j = 0; j < arr.length; j++){
			for(var k = 0; k < arr.length; k++){

				if(arr[i] === arr[j] || arr[i] === arr[k] || arr[j] === arr[k]){
					continue;
				}else{
					res.push(arr[i] + ' '+ arr[j] + ' '+ arr[k]);
				}
			}
		}
	}

	console.log(res);
	return res;
}


//compare pairs of locations
function compareLocations(arg1, arg2){

	var totalLocations = [];


	for(var i = 0; i < arg2.length; i++){

			var r = [];


			// console.log(arg2[i]);
			var totalDistance = 0;
			var count = 0;

			for(var j = 0; j < arg1.length; j++){
				// console.log(arrObj[j].loc.join(' '));
				if( arg2[i].indexOf(arg1[j].locations.join(' ')) !== -1 ||
					arg2[i].indexOf(arg1[j].locations.reverse().join(' ')) !== -1){
					totalDistance += +arg1[j].distance;
					count++;
				}
			}

			if(arg2[i].length !== count){
				false;
			}else{
				r.push(totalDistance);
				r.push(arg2[i].join());
			}

			

			totalLocations.push(r);

	}	
	
	totalLocations = totalLocations.filter(function(i){
		return i.length > 0;
	});

	console.log(totalLocations);
	return totalLocations;
}


function findMinLocation(arr){

	var distance = [];
	var locations = [];

	for(var i = 0; i < arr.length; i++){
		distance.push(arr[i][0]);
	}

	var minArray = Math.min.apply(null, distance) 
	// console.log(minArray);

	arr.forEach(function(i){
		if(i.indexOf(minArray) !== -1){
			console.log(i);
		}
	});
}

findMinLocation(totalResult);



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


function per(arr){
	var res = [];

	for(var i = 0; i < arr.length; i++){
		res.push(arr[i].join(' '));
	}

	return res;
}


