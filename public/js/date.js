// Display the created_at date for clucks in a human friendly readable way.

// Display the created_at date besides the `username` as show in any wireframe with clucks.
// Use plain language to show the date relative to the current date. 
//(e.g. yesterday would appear as 1 day ago, 22 minutes ago, 2 hours ago, etc)
// Anything less than a minute ago should show as Just now
// Example date: 2022-07-05 19:10:31.80691+00
// let current = new Date()
const relativeDate = (currentTime, createdDate) => {

    let timediff = currentTime.getTime() - Date.parse(createdDate)
    let days = Math.floor(timediff / (1000 * 60 * 60 * 24));
    timediff -= days * (1000 * 60 * 60 * 24);
    // console.log(timediff)

    let hours = Math.floor(timediff / (1000 * 60 * 60));
    timediff -= hours * (1000 * 60 * 60);

    let mins = Math.floor(timediff / (1000 * 60));
    timediff -= mins * (1000 * 60);
   
    let secs = Math.floor(timediff / (1000));
    timediff -= secs * 1000;
  
    // console.log(timediff)

    if(days === 0 && hours === 0 && mins === 0 && secs >= 0){
        return "Just Now"
    }else if(days === 00 && hours === 0 && mins > 0){
        return `${mins} minutes ago`
    }else if(days === 00 && hours > 0){
        return `${hours} hours ago`
    }else{
        return `${days} days ago`
    }
}
// console.log(relativeDate(current, "2022-07-05T22:44:43.216Z"))
module.exports = {relativeDate}