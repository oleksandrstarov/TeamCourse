'use strict';

console.log('started');

var dataArray = [];
var bubbleSorter;

//constructor
function BubbleSorter (dataArray, array) {
  this.i = 0;
  this.j = 0;
  this.dataArray = dataArray;
  this.array = array;
  console.log(array);
  this.sort = function(){
    //remove focus and highlight
    this.clearHighlithing();
    if(this.i == array.length - 1) {
      array[this.j].setAttribute('sorted', '');
      return null;
    }

    array[this.j].setAttribute('focused', '');
    array[this.j+1].setAttribute('focused', '');

    var valueOne = dataArray[this.j];
    var valueTwo = dataArray[this.j+1];

    if(valueOne > valueTwo){
      array[this.j].setAttribute('swaped', '');
      array[this.j+1].setAttribute('swaped', '');
      var temp = dataArray[this.j];
      dataArray[this.j] = dataArray[this.j+1];
      dataArray[this.j+1] = temp;
      for(var ii = 0; ii < dataArray.length; ii++){
        array[ii].innerHTML = dataArray[ii];
      }
      console.log(dataArray);

    }
    this.j++;
    if(this.j == array.length - 1 - this.i) {
      array[this.j].setAttribute('sorted', '');
      this.j=0;
      this.i++;
    }
  };

  this.clearHighlithing = function(){
    for(var ii = 0; ii<this.array.length; ii++){
      if(this.array[ii].hasAttribute('focused')) this.array[ii].removeAttribute('focused');
      if(this.array[ii].hasAttribute('swaped')) this.array[ii].removeAttribute('swaped');
    }
  }

 }

var element = document.getElementById('result');
var firstPage = document.getElementById('inputDiv');
var buttonSort = document.getElementById('sort');
buttonSort.onclick = function(){
  onButtonSortClick();
}

function onButtonSortClick(){
  var inputString = document.getElementsByTagName('input')[0].value;
  try{
    dataArray = validateInput(inputString);
  }catch(e){
    alert(e.message);
    return;
  }
  if(dataArray) createElementsRow(dataArray);
}

var buttonCancel = document.getElementById('back');
buttonCancel.onclick = function(){
  onButtonCancelClick(bubbleSorter);
}

function onButtonCancelClick(bubbleSorter){
  bubbleSorter.dataArray = [];
  bubbleSorter.array = [];
  bubbleSorter.i = 0;
  bubbleSorter.j = 0;
  document.getElementById('inputDiv').style.display = 'initial';
  document.getElementById('sortingDiv').style.display = 'none';
  //remove all elements
  element.innerHTML = '';
}

var buttonNext = document.getElementById('next');
buttonNext.onclick = function(){
  bubbleSorter.sort();
}

function validateInput(inputString){
    if(inputString.trim().length == 0) {
      throw new Error('Please fill in numbers to be sorted');
      return null;
    }
    var dataArray = inputString.split(' ');
    for(var i=0; i<dataArray.length; i++){
      if(dataArray[i].trim().length == 0) {
        dataArray.splice(i,1);
        i--;
        continue;
      }
      console.log(dataArray[i]);
      if(isNaN(dataArray[i])){
        throw new Error(dataArray[i]+' is not a number!');
        return null;
      }
    }
  return dataArray;
}

function createElementsRow(dataArray){
  var array = [];
  for(var i = 0; i<dataArray.length; i++){
    var dataCell = document.createElement('div');
    dataCell.setAttribute('class', 'element');
    dataCell.innerHTML = dataArray[i];
    element.appendChild(dataCell);
    array.push(dataCell);
  }
  //create object with all variables
  createBubbleSorter(dataArray, array);
  //change page content
  showSortingPage();
}

function createBubbleSorter(dataArray, array){
  bubbleSorter = new BubbleSorter(dataArray, array);
}

function showSortingPage(){
  document.getElementById('inputDiv').style.display = 'none';
  document.getElementById('sortingDiv').style.display = 'initial';
}
