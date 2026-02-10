let myName = prompt("Adınız nedir?");
let greeting = document.querySelector("#myName");
greeting.innerText = `${myName}!`;

var myVar = setInterval(function () {
  showTime();
}, 1000);

function showTime() {
  var date = new Date();
  var days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  var day = days[date.getDay()];
  document.querySelector("#myClock").innerHTML =
    date.toLocaleTimeString("tr-TR") + " " + day; // return 23:59:59
}
