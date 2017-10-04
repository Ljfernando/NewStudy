
var DataCombos = {'allTools': ["baseR", "exl", "ggp", "mpl", "tbl"],
                  'datasetNums': [1, 2, 3, 4, 5]}

console.log("hello")
/*
 * Compute a random integer i within a given range,
 * where lower <= i < upper
*/
function getRandomInteger(lower, upper) {
	console.assert(arguments.length === 2, "getRandomInteger() requires lower and upper parameters.");
	return Math.floor(Math.random() * (upper - lower)) + lower;
}

// Randomizes an array
function randomizeArray(array){
	for (var i = 0; i < array.length; i++) {
		randomIndex = getRandomInteger(i, array.length);
		var temp = array[i];
		array[i] = array[randomIndex];
		array[randomIndex] = temp;
	}
	newArray = array;
	return newArray
}

function generateRandomData(){
  DataCombos.allTools = randomizeArray(DataCombos.allTools)
  DataCombos.datasetNums = randomizeArray(DataCombos.datasetNums)
}
