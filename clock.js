var time = new Date();
var currentHours = time.getHours();
var dayType = "AM";
let zero = "";
let zeroS = "";

var currentMinutes = time.getMinutes();
var currentSeconds = time.getSeconds();
var currentDate = time.getDate();
var currentDay = time.getDay();
var currentMonth = time.getMonth();
var currentYear = time.getYear();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

document.querySelector("div#clock > h2").innerHTML = weekdays[currentDay];
document.querySelector("div#clock > h3").innerHTML = months[currentMonth] + " " + currentDate;

for (var day = 1; day<5; day++){
  let nextDay = currentDay + day;
  if (nextDay>6){
    nextDay-=7;
  }
  document.querySelectorAll("div.forecast > h4")[day-1].innerHTML = weekdays[nextDay].substring(0,3);
}

var intervalClock = setInterval(incrementClock, 1000);
function incrementClock(){
  currentSeconds++;
  if (currentSeconds>=60){
    currentSeconds-=60;
    currentMinutes++;
  }
  if (currentSeconds < 10)
  {
    zeroS = "0";
  }
  else {
    zeroS = ""
  }
  if (currentMinutes>=60){
    currentMinutes-=60;
    currentHours++;
  }
  if (currentMinutes < 10){
    zero = "0";
  }
  else {
    zero = "";
  }
  if (time.getHours() >= 12){
    dayType = "PM";
  }
  if (currentHours > 12){
    currentHours-=12;
  }
  if (currentHours == 0){
    currentHours = 12;
  }
  if (time.getHours()==24){
    currentDay++;
    document.querySelector("div#clock > h2").innerHTML = weekdays[currentDay];
  }
  document.querySelector("div#clock > h1").innerHTML = currentHours + ":" +  zero + currentMinutes + ":" + zeroS + currentSeconds + " " + dayType;
}
