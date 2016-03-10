//var assert = require('assert');
describe('Validate Import', function() {
    it('should return array when input contains only digits and spaces', function () {
      assert.throws(function(){validateInput('')}, Error);
      assert.throws(function(){validateInput('5 f t')}, Error);
      assert.doesNotThrow(function(){validateInput('5 2 1')}, Error);
      assert.sameMembers(validateInput('3.2 2'), ['3.2', '2']);

    });
});

describe('Create Elemets Row', function() {
    it('Should set div element with class "element" for each number', function () {
      assert.equal(document.getElementsByClassName('element').length, 0);
      var dataArray = [2, 6, 4, 1];
      var array = [];
      createElementsRow(dataArray);

      for(var i = 0; i<document.getElementsByClassName('element').length; i++){
        assert.equal(document.getElementsByClassName('element')[i].getAttribute('class'), 'element');
        assert.equal(document.getElementsByClassName('element')[i].innerHTML, dataArray[i]);
      }

    });
});
describe('Show Sorting Page', function() {
    it('should update screen', function () {
      showSortingPage();
      assert.equal(document.getElementById('inputDiv').style.display, 'none');
      assert.equal(document.getElementById('sortingDiv').style.display, 'initial');
    });
});

describe('Sort', function() {
    it('should update variables and screen', function () {
      var bubbleSorter = new BubbleSorter([4,0],[document.createElement('div'),
      document.createElement('div')]);
      bubbleSorter.array[0].setAttribute('class', 'element');
      bubbleSorter.array[1].setAttribute('class', 'element');
      bubbleSorter.array[0].setAttribute('swaped', '');
      bubbleSorter.array[0].setAttribute('focused', '');

      bubbleSorter.clearHighlithing();

      assert.isNotOk(bubbleSorter.array[0].hasAttribute('swaped'));
      assert.isNotOk(bubbleSorter.array[0].hasAttribute('focused'));

      bubbleSorter.sort();
      assert.equal(bubbleSorter.i, 1);
      assert.equal(bubbleSorter.j, 0);
      assert.isOk(bubbleSorter.array[bubbleSorter.array.length-1].hasAttribute('sorted'));
      assert.equal(bubbleSorter.dataArray.join(), '0,4');
      assert.equal(bubbleSorter.sort(), null);
      assert.isOk(bubbleSorter.array[0].hasAttribute('sorted'));
      assert.isOk(bubbleSorter.array[1].hasAttribute('sorted'));

    });
});

describe('Cancel', function() {
    it('should reset variables and show start screen', function () {
      var bubbleSorter = new BubbleSorter([1],[document.createElement('div').setAttribute('class', 'element')]);
      bubbleSorter.i = 1;
      bubbleSorter.j = 1;
      onButtonCancelClick(bubbleSorter);
      assert.equal(bubbleSorter.i, 0);
      assert.equal(bubbleSorter.j, 0);
      assert.sameMembers(bubbleSorter.dataArray, []);
      assert.sameMembers(bubbleSorter.array, []);
      assert.equal(document.getElementById('inputDiv').style.display, 'initial');
      assert.equal(document.getElementById('sortingDiv').style.display, 'none');
      assert.equal(element.innerHTML, '');
    });
});
