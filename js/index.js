const btn = document.querySelector('.btnFile');
const inputBtn = document.querySelector('input');

btn.addEventListener('click', () => {
    let str = inputBtn.value;
    let newStr = str.replace("C:\\fakepath\\","") 

    btn.style.display = "none";
});

function inputBtnFunction() {
    if(inputBtn.value.length > 0) {
        btn.style.display = "block";
    }
}