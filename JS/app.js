const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: 'You stand at the entrance of a crypt with sword in hand.',
    options: [
      {
        text: 'Enter',
        nextText: 2
      },
      {
        text: 'Flee!',
        nextText: 10
      }
    ]
  },
  {
    id: 2,
    text: 'You enter through a dim hallway. Cobwebs pull at your face. Decay fills your nose. Your path forks left and right.',
    options: [
      {
        text: 'Move right',
        nextText: 99
      },
      {
        text: 'Move left',
        nextText: 3
      }
    ]

  },
  {
    id: 99,
    text: 'You take a right down the hall. You see dimly lit bones, cluttering the space. Rats scurry at your presence. A half-moon peaks through a damaged partition in the ceiling.',
    options: [
      {
        text: 'Go back',
        nextText: 2
      }
    ]




  },
  {
    id: 3,
    text: 'You come face to face with a terrible creature with bulging eyes and rotting flesh. Its acrid odor fills your lungs. Before you can think, it lunges at you!',
    options: [
      {
        text: 'Run back the way you came',
        nextText: 4
      },
      {
        text: 'Attempt to cut it down',
        nextText: 5
      },



    ]
  },
  {
    id: 4,
    text: 'As you turn to run, the creature takes hold of you by the neck. You are gone in a blink.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'In one panicked slash, you open up the creature from bow to stern. It lets out an unearthly shriek and flees into the darkness of the crypt...',
    options: [
      {
        text: 'Go forward',
        nextText: 6
      },



    ]
  },
  {
    id: 6,
    text: 'You see the abomination, hunched over, ahead. It does not notice you. What do you do?',
    options: [
      {
        text: 'Attempt to finish it off',
        nextText: 8
      },
      {
        text: 'Sneak around the creature to the door on the left',
        nextText: 7
      },





    ]

  },
  {

    id: 7,
    text: 'You enter a moldy old office. It looked as if someone may have lived here long ago. You see degraded volumes, torn clothing and bones. What will you do?',
    options: [
      {
        text: 'Look around for anything of value.',
        nextText: 9
      },
      {
        text: 'Go back the way you came',
        nextText: 6
      },
      {
        text: 'Drink mysterious vial',

        nextText: 10
      },

    ]
  },
  {
    id: 8,
    text: 'Your blade plunges deep into the rotting flesh of your enemy. It stands up quickly in alarm, causing your blade to easily slice downward into the monsters foul abdomen, causing all manner of vile insect to spill out. As you recoil, the creature collapses into a pile of rot.',
    options: [
      {
        text: 'Inspect the body',
        nextText: 11
      }
    ]
  },
  {
    id: 9,
    text: 'You find nothing of value',
    options: [
      {
        text: 'Ok',
        nextText: 7
      }
    ]
  },
  {
    id: 10,
    text: 'You Died',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You are uncertain if the thing you slew was once human. For now, all that remains is carrion for the rats. You must find the source of this corruption',
    options: [
      {
        text: 'Go forward',
        nextText: 12
      }
    ]
  }
];

startGame();
