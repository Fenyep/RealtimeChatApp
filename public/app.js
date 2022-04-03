const socket = io()
const msgText = document.querySelector('#msg')
const btnSend = document.querySelector('#btn-send')
const chatBox = document.querySelector('.chat-content')
const displayMsg = document.querySelector('.message')

let name;
// Getting the name of the user by using a prompt
do {
    name = prompt('What is your name')
}while(!name)

// changing the selected element textContent
document.querySelector('#your-name').textContent = name
msgText.focus()

btnSend.addEventListener('click', (e)=>{
    e.preventDefault()
    sendMsg(msgText.value)
    msgText.value= '';
    msgText.focus();
    chatBox.scrollTop = chatBox.scrollHeight;
})

// creation of the message data, display to the user, emit to the other users
const sendMsg = message => {
    let msg = {
        user: name,
        message: message.trim()
    }

    display(msg, 'you-message')

    socket.emit('sendMessage', msg)
}

//  A sendToAll event is fired whenever a msg data is ready,
//  display the message to the other users, scroll automaticaly
socket.on('sendToAll', msg => {
    display(msg, 'other-message')
    chatBox.scrollTop = chatBox.scrollHeight;
})

// Creates the formated message html object and adding it to the list of messages
const display = (msg, type) => {
    const msgDiv = document.createElement('div');
    let className = type
    msgDiv.classList.add(className, 'message-row')
    let times = new Date().toLocaleTimeString()

    let innerText = `
        <div class="message-title">
            <span>${msg.user}</span>
        </div>
        <div class="message-text">
            ${msg.message}
        </div>
        <div class="message-time">
            ${times}
        </div>
    `;

    msgDiv.innerHTML = innerText;
    displayMsg.appendChild(msgDiv)

}