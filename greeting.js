const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
event.preventDefault();
const currentValue = input.value;
paintGreeting(currentValue);
saveName(currentValue);
}

function askForName(){
form.classList.add(SHOWING_CN);
form.addEventListener("submit", handleSubmit);
}


function paintGreeting(text){
form.classList.remove(SHOWING_CN);
greeting.classList.add(SHOWING_CN);
const date = new Date();
    const hours = date.getHours();
    if(0 <= hours <= 5) {greeting.innerText = `Good Evening, ${text}!`}
    else if(5 < hours < 11) {greeting.innerText = `Good Morning, ${text}!`}
    else if(11 <= hours < 20) {greeting.innerText = `Good Afternoon, ${text}!`}
    else if(20 <= hours < 24) {greeting.innerText = `Good Evening, ${text}!`};
}

function loadName(){
const currentUser = localStorage.getItem(USER_LS);
if(currentUser === null){
askForName();
} else{
paintGreeting(currentUser);
}
}


function init(){
loadName();
}

init();