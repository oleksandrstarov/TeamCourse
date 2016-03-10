'use strict';

console.log('started');

var digitsArray = [];
var bubbleSorter;

//constructor
function BubbleSorter (digitsArray, divsArray) {
  this.i = 0;
  this.j = 0;
  this.digitsArray = digitsArray;
  this.divsArray = divsArray;
  console.log(divsArray);
  this.sort = function(){
    //remove focus and highlight
    this.clearHighlithing();
    if(this.i == divsArray.length - 1) {
      divsArray[this.j].setAttribute('sorted', '');
      return null;
    }

    divsArray[this.j].setAttribute('focused', '');
    divsArray[this.j+1].setAttribute('focused', '');

    var valueOne = digitsArray[this.j];
    var valueTwo = digitsArray[this.j+1];

    if(valueOne > valueTwo){
      divsArray[this.j].setAttribute('swaped', '');
      divsArray[this.j+1].setAttribute('swaped', '');
      var temp = digitsArray[this.j];
      digitsArray[this.j] = digitsArray[this.j+1];
      digitsArray[this.j+1] = temp;
      for(var ii = 0; ii < digitsArray.length; ii++){
        divsArray[ii].innerHTML = digitsArray[ii];
      }
      console.log(digitsArray);

    }
    this.j++;
    if(this.j == divsArray.length - 1 - this.i) {
      divsArray[this.j].setAttribute('sorted', '');
      this.j=0;
      this.i++;
    }
  };

  this.clearHighlithing = function(){
    for(var ii = 0; ii<divsArray.length; ii++){
      if(divsArray[ii].hasAttribute('focused')) divsArray[ii].removeAttribute('focused');
      if(divsArray[ii].hasAttribute('swaped')) divsArray[ii].removeAttribute('swaped');
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
    digitsArray = validateInput(inputString);
  }catch(e){
    alert(e.message);
    return;
  }
  if(digitsArray) createElementsRow(digitsArray);
}

var buttonCancel = document.getElementById('back');
buttonCancel.onclick = function(){
  onButtonCancelClick(bubbleSorter);
}

function onButtonCancelClick(bubbleSorter){
  bubbleSorter.digitsArray = [];
  bubbleSorter.divsArray = [];
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
    var digitsArray = inputString.split(' ');
    for(var i=0; i<digitsArray.length; i++){
      if(digitsArray[i].trim().length == 0) {
        digitsArray.splice(i,1);
        i--;
        continue;
      }
      console.log(digitsArray[i]);
      if(isNaN(digitsArray[i])){
        throw new Error(digitsArray[i]+' is not a number!');
        return null;
      }
    }
  return digitsArray;
}

function createElementsRow(digitsArray){
  var divsArray = [];
  for(var i = 0; i<digitsArray.length; i++){
    var dataCell = document.createElement('div');
    dataCell.setAttribute('class', 'element');
    dataCell.innerHTML = digitsArray[i];
    element.appendChild(dataCell);
    divsArray.push(dataCell);
  }
  //create object with all variables
  createBubbleSorter(digitsArray, divsArray);
  //change page content
  showSortingPage();
}

function createBubbleSorter(digitsArray, divsArray){
  bubbleSorter = new BubbleSorter(digitsArray, divsArray);
}

function showSortingPage(){
  document.getElementById('inputDiv').style.display = 'none';
  document.getElementById('sortingDiv').style.display = 'initial';
}
