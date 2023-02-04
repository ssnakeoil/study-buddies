let chatBox = document.getElementById("chatBox");
let closeBtn = document.getElementById("closeChat");
let chatsList = document.getElementById("chatsList");
let selectedChat = null;
const lastStatus = async (e) => {
    getChatsList();
    if (selectedChat) {
        getAllMessages(selectedChat);
    } else {
        return;
    }

    var isHidden = localStorage.getItem('isHidden');
    if (isHidden == undefined) {
        return;
    }
    if (isHidden == 0) {
        await localStorage.setItem('isHidden', 1);
        chatBoxShowHide();
    }

};
function showSelectedChat(id) {
    if (selectedChat == id) {
        return;
    }
    selectedChat = id
    lastStatus()
}

let chatBoxShowHide = async (elem) => {
    let isHidden = localStorage.getItem('isHidden');
    if (isHidden == 0 && isHidden != undefined || isHidden == 0) {
        return
    }
    if (isHidden == undefined) {
        localStorage.setItem('isHidden', 0);
        chatBox.classList.add("chatBoxOpen");
        chatBox.classList.remove("chatBox");
        closeBtn.style.display = "block";
        chatBoxEventListner.removeEventListener('click', chatBoxShowHide);
        document.querySelector('#closeChat').addEventListener('click', closeChat);
        return;
    }
    if (isHidden == 1) {
        localStorage.setItem('isHidden', 0);
        chatBox.classList.remove("chatBox");
        chatBox.classList.add("chatBoxOpen");
        closeBtn.style.display = "block";
        chatBoxEventListner.removeEventListener('click', chatBoxShowHide);
        document.querySelector('#closeChat').addEventListener('click', closeChat);
        return;
    }
};
let closeChat = async (elem) => {
    localStorage.setItem('isHidden', 1);
    chatBox.classList.remove("chatBoxOpen");
    chatBox.classList.add("chatBox");
    closeBtn.style.display = "none";
    chatBoxEventListner.addEventListener('click', chatBoxShowHide, true);
    return;
}

let getChatsList = async (event) => {
    const response = await fetch(`/api/chat/admin/list`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        let getPromise = await response.json().then(body => { return body });
        let parseMessages = JSON.parse(getPromise);
        let messages = '';
        parseMessages.forEach(elem => {
            elem.sender
            elem.message
            elem.senderId
            messages += `<li class="listItem" onclick="showSelectedChat(` + elem.senderId + `)">
            `+ elem.sender + `
            </li>`

        });
        chatsList.innerHTML = messages
    }
}
let send = async (event) => {
    event.preventDefault();
    const message = document.querySelector('#text').value.trim();
    if (text == "") {
        alert("Empty message can't be sent");
    } else {
        const response = await fetch(`/api/chat/admin/send?id=` + selectedChat, {
            method: 'POST',
            body: JSON.stringify({ message }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            let getPromise = await response.json().then(body => { return body });
            appendMessage(senderTemplate(getPromise.sender, message));
        } else {
            alert(response.statusText);
        }
    }
}

let getAllMessages = async (selectedChat) => {
    const response = await fetch(`/api/chat/admin/?id=` + selectedChat, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        let getPromise = await response.json().then(body => { return body });
        let parseMessages = JSON.parse(getPromise);
        localStorage.setItem('len', parseMessages.length);
        let messages = '';
        parseMessages.forEach(elem => {
            let temp;
            if (elem.sentOrReceive == "sent") { temp = senderTemplate(elem.sender, elem.message); }
            else { temp = receiverTemplate(elem.sender, elem.message); }
            messages += temp;

        });
        appendMessage(messages);
    } else {
        alert(response.statusText);
    }

}
let getNewMessages = async () => {
    if (selectedChat == null) {
        return;
    }
    const response = await fetch(`/api/chat/admin/?id=` + selectedChat, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        let getPromise = await response.json().then(body => { return body });
        let parseMessages = JSON.parse(getPromise);
        let newLength = parseMessages.length;
        let oldLength = localStorage.getItem('len');
        oldLength = parseInt(oldLength);
        if (oldLength == undefined) {
            localStorage.setItem(newLength);
        }
        else if (newLength == oldLength) {
            return;
        }
        localStorage.setItem('len', newLength);
        let messages = '';
        let i = 0;
        parseMessages.forEach(elem => {
            i++;
            if (i < newLength) {
                return;
            }
            if (i == newLength && elem.sender == 'Admin') {
                return;
            }
            let temp;
            if (elem.sentOrReceive == "sent") { temp = senderTemplate(elem.sender, elem.message); }
            else { temp = receiverTemplate(elem.sender, elem.message); }
            messages += temp;

        });
        appendMessage(messages);
    } else {
        alert(response.statusText);
    }

}

const senderTemplate = (senderName, message) => {
    let template =
        `<div id="sender">
        <div class="flex-100">
            <p>
                `+ message + `
            </p>
        </div>
        <div class="senderDpWrapper">
            <div class="senderDp">

            </div>
            <div>
                <h3 class="m0f11">
                    `+ senderName + `
                </h3>
            </div>
        </div>
    </div>`;
    return template;
}
const receiverTemplate = (receiverName, message) => {
    let template =
        `<div id="receiver">
        <div class="receiverDpWrapper">
           <div class="receiverDp">

           </div>
           <div>
               <h3 class="m0f11">
                   `+ receiverName + `
               </h3>
           </div>
       </div>
       <div class="flex-100">
           <p>
               `+ message + `
           </p>
       </div>
   </div>`;
    return template;
}
const appendMessage = (messages) => {
    chats.innerHTML += messages;
    chats.scrollTop = chats.scrollHeight;
    document.querySelector('#text').value = "";
}



setInterval(getNewMessages, 5000);
document.addEventListener('DOMContentLoaded', lastStatus);
let chatBoxEventListner = document.querySelector('#chatBox');
chatBoxEventListner.addEventListener('click', chatBoxShowHide, true);
let sendMessage = document.querySelector("#sendMessage");
sendMessage.addEventListener('click', send);
let chats = document.getElementById('chats');