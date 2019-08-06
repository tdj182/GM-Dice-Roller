var DiceSet = function(diceCount, diceType, mod = 0) {
  this.diceType = diceType;
  this.diceCount = diceCount;
  this.mod = mod;
  this.history = [];
  this.rollDice = function() {
    var total = 0;
    //Roll for the total num of dice
    for (var i = 0; i < diceCount; i++) {
      var randomNum = Math.floor(Math.random() * diceType) + 1;
      total += randomNum;
      console.log(`Roll ${i + 1} was a ${randomNum}`);
    }

    // console.log(`The total is ${total}`);
    if (this.history.length > 5) {
      this.history.pop();
    }
    this.history.unshift(total);
    console.log(`Total is ${total}`);
    console.log("------------------");
    document.getElementById(`roll_${diceCount}d${diceType}`).innerHTML = total;
    document.getElementById(
      `history_${diceCount}d${diceType}`
    ).innerHTML = this.history;
  };
};

function myFunction(el) {
  let btnText, diceCount, diceType, numCount;
  numCount = 0;
  diceType = 0;
  diceCount = 0;
  btnText = el.textContent.trim();
  console.log(btnText);
  if (btnText === "Adv.") {
    _1d20.advantage = "d20_advantage";
    diceCount = 1;
    diceType = 20;
  } else if (btnText === "Dis.") {
    _1d20.advantage = "d20_disadvantage";
    diceCount = 1;
    diceType = 20;
  } else {
    for (var i = 0; i < btnText.length; i++) {
      //Checking for a number and saving to the correct var
      if (!isNaN(parseInt(btnText.charAt(i), 10))) {
        if (numCount === 0) {
          diceCount += btnText.charAt(i);
        } else {
          diceType += btnText.charAt(i);
        }
        //if d, move to the next num
      } else if (btnText.charAt(i) === "d") {
        numCount++;
      }
    }
  }

  diceType = parseInt(diceType, 10);
  diceCount = parseInt(diceCount, 10);
  // console.log(diceType, diceCount);
  //roll
  console.log(`_${diceCount}d${diceType}`);
  startRoll(`_${diceCount}d${diceType}`);
}

function startRoll(dice) {
  //get the correct object and use it's method
  this[dice].rollDice();
}

//Mike Does not need for now
// function changeDice(e) {
//   let diceSize, text, spanList, rollList;
//   diceSize = 0;
//   text = e.textContent;
//   spanList = document.getElementsByClassName("dice-type");
//   rollList = document.getElementsByClassName("last-roll");

//   //Find the dice size
//   for (var i = 0; i < text.length; i++) {
//     if (!isNaN(parseInt(text.charAt(i), 10))) {
//       diceSize += text.charAt(i);
//     }
//   }

//   diceSize = parseInt(diceSize, 10);
//   console.log(diceSize);

//   //replace all text on the buttons
//   for (let i = 0; i < spanList.length; i++) {
//     spanList[i].innerHTML = diceSize;
//     // rollList[i].innerHTML = "#";
//   }
// }

function onStart() {
  let diceTypeArr, whichHistory;
  whichHistory = "";
  diceTypeArr = [4, 6, 8, 10, 12, 20];

  for (let i = 0; i < diceTypeArr.length; i++) {
    for (let x = 1; x <= 8; x++) {
      createDefaultRoll(x, diceTypeArr[i]);
    }
  }

  //adjust object 1d20 roll
  _1d20.advantage = "d20_normal";
  _1d20.advantageHistory = [];
  _1d20.disadvantageHistory = [];

  _1d20.rollDice = function() {
    let total, highest, lowest, diceCount, roll1, roll2;
    total = 0;
    highest = 0;
    lowest = 0;

    roll1 = Math.floor(Math.random() * 20) + 1;
    roll2 = Math.floor(Math.random() * 20) + 1;

    console.log(roll1, roll2);
    if (roll1 >= roll2) {
      highest = roll1;
      lowest = roll2;
    } else {
      highest = roll2;
      lowest = roll1;
    }

    switch (_1d20.advantage) {
      case "d20_normal":
        total = roll1;
        if (_1d20.history.length > 5) {
          _1d20.history.pop();
        }
        _1d20.history.unshift(total);
        document.getElementById(`roll_1d20`).innerHTML = total;
        document.getElementById(`history_1d20`).innerHTML = _1d20.history;
        break;
      case "d20_advantage":
        total = highest;

        if (_1d20.advantageHistory.length > 5) {
          _1d20.advantageHistory.pop();
        }
        _1d20.advantageHistory.unshift(total);
        document.getElementById(`roll_advantage`).innerHTML = total;
        document.getElementById(`history_advantage`).innerHTML =
          _1d20.advantageHistory;
        break;
      case "d20_disadvantage":
        total = lowest;

        if (_1d20.disadvantageHistory.length > 5) {
          _1d20.disadvantageHistory.pop();
        }
        _1d20.disadvantageHistory.unshift(total);
        document.getElementById(`roll_disadvantage`).innerHTML = total;
        document.getElementById(`history_disadvantage`).innerHTML =
          _1d20.disadvantageHistory;
        break;
    }
    // console.log(`The total is ${total}`);

    _1d20.advantage = "d20_normal";
  };
}

function createDefaultRoll(diceCount, diceType) {
  let temp;
  temp = `_${diceCount}d${diceType}`;

  this[temp] = new DiceSet(diceCount, diceType);
}

onStart();
