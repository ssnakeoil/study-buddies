const lastStatus = async () => {
    var isHidden = localStorage.getItem('isHidden');
    console.log(isHidden);
    if (isHidden == undefined) {
        localStorage.setItem('isHidden', "false");
        document.getElementById('chatBox').style.visibility = 'visible';
        return;
    }
    if (isHidden == "true") {
        document.getElementById('chatBox').style.visibility = 'visible';
    }
    else {
        document.getElementById('chatBox').style.visibility = 'hdden';
    }

};
const chatBoxShowHide = async (elem) => {
    var isHidden = localStorage.getItem('isHidden');
    if (isHidden == "true") {
        localStorage.setItem('isHidden', "false");
        document.getElementById("chatBox").classList.remove("chatBox");
        document.getElementById("chatBox").classList.add("chatBoxOpen");
        // document.getElementById('chatBox').style.visibility = 'visible';
        console.log(isHidden, '4');
    }
    else {
        localStorage.setItem('isHidden', "true");
        document.getElementById("chatBox").classList.remove("chatBoxOpen");
        document.getElementById("chatBox").classList.add("chatBox");
        // document.getElementById('chatBox').style.visibility = 'hidden';
        console.log(isHidden, '2');
    }



    console.log(elem);

};
document.addEventListener('DOMContentLoaded', lastStatus);
document.querySelector('#chatBox').addEventListener('click', chatBoxShowHide);