/* 
 $ Date 
*/

const today = new Date();
today.setDate(today.getDate());

const day = today.getDay();
const date = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
 
const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 
const formattedDate = `${weekdayNames[day]} ${date} ${monthNames[month]}, ${year}`;
 
document.getElementById('date').innerHTML = formattedDate;

/* 
 $ Time 
*/

function showTime() {
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var am_pm = h >= 12 ? 'PM' : 'AM';
  
  h = h ? h : 12;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;

  document.getElementById('hours').innerText = `${h}H`;
  document.getElementById('minutes').innerText = `${m}M`;
  document.getElementById('seconds').innerText = `${s}S`;
  document.getElementById('am-pm').innerText = am_pm;

  setTimeout(showTime, 1000);
}

showTime();


