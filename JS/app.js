const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [

    {
        id: 1,
        text: 'You stand at the entrance of a crypt with sword in hand.'
    options: [

            {
                text: 'Enter',
                setState: { enterNow: true }
            nextText: 2
            },
            {
                text: 'Flee!'
            nextText: 2

            }
        ]
    },
    {
        id: 2
        text: 'You enter through a dim hallway. Cobwebs pull at your face. Decay fills your nose. Your path forks left and right.'
        options: [
            {
                text: 'Move Forward'
            text: 'Move left'
            text: 'Move right'

            }
        ]
    }
]

startGame()
