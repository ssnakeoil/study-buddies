let btns = document.querySelectorAll('.flip');
let btns2 = document.querySelectorAll('.flip');

btns.forEach(item => {
    item.addEventListener('click', event => {
        const cc = event.target.parentElement.parentElement;
        cc.classlist.toggle('flipped');
    })


});

btns2.forEach(item => {
    item.addEventListener('click', event => {
        const cc = event.target.parentElement.parentElement;
        cc.classlist.toggle('flipped');
    })
});