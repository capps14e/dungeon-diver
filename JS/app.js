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
        // setState: { : true },
        nextText: 2
      },
      {
        text: 'Flee!',
        nextText: -1
      }
    ]
  },
  {
    id: 2,
    text: 'You enter through a dim hallway. Cobwebs pull at your face. Decay fills your nose. Your path forks left and right.',
    options: [
      {
        text: 'Move right',
        // requiredState: (currentState) => currentState.blueGoo,
        // setState: { : false, : true },
        nextText: -2
      },
      {
        text: 'Move forward',
        // requiredState: (currentState) => currentState.blueGoo,
        // setState: { : false, : true },
        nextText: 3
      },
      {
        text: 'Move left',
        nextText: 3
      }
    ]

  },
  {
    id: -2,
    text: 'You take a right down the hall. You see dimly lit bones, cluttering the space. Rats scurry at your presence. A half-moon peaks through a damaged partition in the ceiling.',
    options: [
      {
        text: 'Move forward',
        // requiredState: (currentState) => currentState.blueGoo,
        // setState: { : false, : true },
        nextText: 3
      },
      {
        text: 'Go back',
        // requiredState: (currentState) => currentState.blueGoo,
        // setState: { : false, : true },
        nextText: 2
      },
      {

      }
    ]




  },
  {
    id: 3,
    text: 'You come face to face with a terrible creature with bulging eyes and rotting flesh. Its acrid odor fills your lungs. Before you can think, it lunges at you!',
    options: [
      {
        text: 'Run away the way you came',
        nextText: 4
      },
      {
        text: 'Attempt to cut it down',
        nextText: 5
      },
      {

      }
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
      {
        text: 'Go back',
        nextText: 2
      

      }



    ]
  },
  {
    id: 6,
    text: '',
    options: [
      {
        text: '',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: '',
    options: [
      {
        text: '',
        nextText: 8
      },
      {
        text: '',
        // requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: '',
        // requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: '',
        // requiredState: (currentState) => currentState
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: '',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: '',
    options: [
      {
        text: '',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: '',
    options: [
      {
        text: '',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: '',
    options: [
      {
        text: '',
        nextText: -1
      }
    ]
  }
];

startGame();
