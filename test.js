let date_ob = new Date();
let year = date_ob.getFullYear();
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let day = ("0" + date_ob.getDate()).slice(-2);
let hours = ("0" + date_ob.getHours()).slice(-2);
let minutes = ("0" + date_ob.getMinutes()).slice(-2);
let seconds = ("0" + date_ob.getSeconds()).slice(-2);

let currentDateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
console.log(currentDateTime);