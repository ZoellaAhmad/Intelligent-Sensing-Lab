// visit page 


function availabilityCheckerFunction() {
    let msg = document.getElementById("msgDisplay")
    msg.innerHTML = '';
    msg.setAttribute("style", "display:none;");


    let dataMap = new Map([
        ["visitorNum", document.getElementById("vNum").value],
        ["date", document.getElementById("date").value],
        ["time", document.getElementById("time").value]
    ]);
    

    //check if fields are empty
    if ((dataMap.get("visitorNum")).trim() === '') {
        event.preventDefault();
        msg.innerHTML = "Data not completed, please re-enter.";
        msg.setAttribute("style", "display: block;"); 
        return;
    } else if (((isNaN(dataMap.get("visitorNum")))== true) || parseInt(dataMap.get("visitorNum")) < 1 || parseInt(dataMap.get("visitorNum")) > 10) {
        event.preventDefault();
        msg.innerHTML = "Please enter a valid number of people!"
        msg.setAttribute("style", "display: block;");
        return;
    }

    if ((dataMap.get("date")).trim() === '') {
        event.preventDefault();
        msg.innerHTML = "Data not completed, please re-enter.";
        msg.setAttribute("style", "display: block;");
        return;
    }


    reserved = reserve(dataMap.get("date"), dataMap.get("time"), parseInt(dataMap.get("visitorNum"))); //map was especially useful for this
    if (reserved === true) {
        alert("Your reservation was successful!");
        event.preventDefault();
    } else {
        alert("Sorry, the reservation is full!");
        event.preventDefault();
    }
};



function resetFunction () {
    let errMsg = document.getElementById("msgDisplay");    
    errMsg.setAttribute("style", "display:none;");
};

function reserve(date, time, no) {
    /* 
    date: the date of reservation
    time: the time of reservation 
    no: the number of people, type: int
    */

    if (arguments.length != 3) {
        alert("incorrect arguments detected"); 
        return;
    }
    // a random int as the valid quota 
    let valid_quota = Math.floor(Math.random() * 2.0 * no);
    if (no > valid_quota) return false // the quota is full
    else return true; // the quota is not full

}









