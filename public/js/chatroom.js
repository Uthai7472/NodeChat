
// Self Invoking function
(function connect() {
    let socket = io.connect("https://nodechat-sbzk.onrender.com/");
    // let socket = io.connect("http://localhost:3000");

    // 
    let username = document.querySelector('#username');
    let usernameBtn = document.querySelector('#usernameBtn');
    let curUsername = document.querySelector(".card-header");

    usernameBtn.addEventListener('click', e => {
        console.log(username.value);

        // let server know that have changing name
        socket.emit('change_username', { username: username.value });
        curUsername.textContent = username.value;

        username.value = '';
    });

    let message = document.querySelector('#message');
    let messageBtn = document.querySelector('#messageBtn');
    let messageList = document.querySelector('#message-list');
    

    messageBtn.addEventListener('click', e => {
        // Update DateTime when click Send message
        let date_ob = new Date();
        let year = date_ob.getFullYear();
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let day = ("0" + date_ob.getDate()).slice(-2);
        let hours = ("0" + date_ob.getHours()).slice(-2);
        let minutes = ("0" + date_ob.getMinutes()).slice(-2);
        let seconds = ("0" + date_ob.getSeconds()).slice(-2);

        let currentDateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        console.log(currentDateTime);

        // Get message value
        console.log(message.value);
        // socket.emit(EVENT)
        socket.emit('new_message', { message: message.value, dateTime: currentDateTime });
        message.value = '';
    });

    // Create variable for store message from server
    socket.on('receive_message', data => {
        console.log(data);

        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        let dateTimeDiv = document.createElement('div');
        dateTimeDiv.textContent = data.dateTime;
        // dateTiemDiv.classList.add('bold-datetime');

        let messageDiv = document.createElement('div');
        messageDiv.textContent = data.username + ": " + data.message;

        if (data.username === 'Ou') {
            dateTimeDiv.style.color = 'blue';
        } else if (data.username === 'Milin') {
            dateTimeDiv.style.color = 'pink';
        }

        listItem.appendChild(dateTimeDiv);
        listItem.appendChild(messageDiv);

        messageList.appendChild(listItem);
    });

    let info = document.querySelector('.info');

    message.addEventListener('keypress', e => {
        socket.emit('typing');
    });

    // Let server know, someone is typing
    socket.on('typing', data => {
        info.textContent = data.username + " is typing...";
        setTimeout(() => { info.textContent = '' }, 5000)
    })
})();