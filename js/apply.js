// apply page


//making it show different subdivisions based on which heading is clicked.
const heading1 = document.getElementsByClassName("division1");
const heading2 = document.getElementsByClassName("division2");
const heading3 = document.getElementsByClassName("division3");
const maincontainer1 = document.getElementsByClassName("maincontainer1");
const maincontainer2 = document.getElementsByClassName("maincontainer2");
const maincontainer3 = document.getElementsByClassName("maincontainer3");
window.onload = function() {
    heading1[0].setAttribute("style", "background-color: white;");
    let maincontainer1 = document.getElementsByClassName("maincontainer1");
    maincontainer1[0].setAttribute("style", "display:block;");    
}

heading1[0].onclick = function() {
    heading1[0].setAttribute("style", "background-color: white;");
    heading3[0].setAttribute("style", "background-color: #7c9ed5;");
    heading2[0].setAttribute("style", "background-color: #7c9ed5;");
    maincontainer2[0].setAttribute("style", "display: none;");
    maincontainer1[0].setAttribute("style", "display: block");
    maincontainer3[0].setAttribute("style", "display: none;");
}

heading2[0].onclick = function() {
    heading2[0].setAttribute("style", "background-color: white;");
    heading3[0].setAttribute("style", "background-color: #7c9ed5;");
    heading1[0].setAttribute("style", "background-color: #7c9ed5;");
    maincontainer1[0].setAttribute("style", "display: none;");
    maincontainer2[0].setAttribute("style", "display: block");
    maincontainer3[0].setAttribute("style", "display: none;");
}

heading3[0].onclick = function() {
    heading3[0].setAttribute("style", "background-color: white;");
    heading2[0].setAttribute("style", "background-color: #7c9ed5;");
    heading1[0].setAttribute("style", "background-color: #7c9ed5;");
    maincontainer1[0].setAttribute("style", "display: none;");
    maincontainer3[0].setAttribute("style", "display: block");
    maincontainer2[0].setAttribute("style", "display: none;");
}


let max_rank = 0;
let numOfGroupsApplied = 0;
let time = new Date();
let lastChangeTime = null;
const buttonArray = document.querySelectorAll('button');
let rowArray = document.querySelectorAll("tr");
let lastRow = rowArray[rowArray.length - 1];
let dataArray = lastRow.querySelectorAll("td");
let max_length = parseInt(dataArray[dataArray.length - 1].innerHTML);
let groupArray = new Array(max_length);
let divisionArray = new Array(max_length);
let textArray = document.getElementsByTagName("input");


for (let i = 0; i < buttonArray.length; i++) {
    buttonArray[i].onclick = function() {
    
        let rank = buttonArray[i].previousElementSibling.value;
        if ((rank === '') || (isNaN(Number(rank)) === true) || (Number.isInteger(Number(rank)) === false))  {
            event.preventDefault();
            alert("Please enter the rank of the chosen group.");
            return;
        }

        rank = parseInt(rank);

        if ((rank < 1) || (rank > 10)) {
            event.preventDefault();
            alert("Please enter the rank of the chosen group between 1 and 10");
            return;
        }


        let groupName = buttonArray[i].previousElementSibling.id
        switch (groupName) {
            case "HSIGroup":
                groupName = "Hyper Spectral Imaging Group";
                break;
            case "LiDARGroup":
                groupName = "LIDAR Development Team";
                break;
            case "NanophotonicsGroup":
                groupName = "Nanophotonics Research";
                break;
            case "MedicalDiagnosticsGroup":
                groupName = "Medical Diagnostics Group";
                break;
            case "EnvironmentalSensorsTeam":
                groupName = "Environmental Sensors Team";
                break;
            case "WearableTechnologyLab":
                groupName = "Wearable Technology Lab";
                break;
            case "IoTSensorsNetworks":
                groupName = "IoT Sensors Networks";
                break;
            default:
                groupName = "AI-Enabled Sensing";
        }

        //check if group has already been selected
        for (let x = 0; x < groupArray.length; x++){
            if (groupArray[x] === groupName) {
                event.preventDefault();
                alert("You have already chosen this group.");
                return;
            }
        }

        
        //check if rank has already been selected
        if (groupArray[rank - 1] != undefined) {
            event.preventDefault();
            alert("You have already chosen this rank.");
            return;
        } else {
            groupArray[rank - 1] = groupName;
        }



        divisionName = buttonArray[i].parentElement.className;
        switch (divisionName) {
            case "SSD":
                divisionName = "Smart-Sensing Division";
                break;
            case "OSD":
                divisionName = "Optical-Sensing Division";
                break;
            default:
                divisionName = "Bio-Sensing Division";
        }

        
        divisionArray[rank - 1] = divisionName;

        //to handle gaps later on
        if (rank > max_rank) {
            max_rank = rank;
        }

        //no errors; we can now display the success message
        let ordinal_word = ""
        ordinal_word = ordinal(rank);

        
        event.preventDefault();
        alert("You have chosen " + groupName + " as your " + ordinal_word + " chosen group in " + divisionName + " successfully.");

        updateTable(rank);
        }
}


function updateTable(rank) {
    numOfGroupsApplied++;
    
    document.getElementById("groupsApplied").innerHTML = "Total number of groups applied: " + numOfGroupsApplied;
    
    rowArray[rank].innerHTML = "<td>" + divisionArray[rank - 1] + "</td> <td>" + groupArray[rank - 1] + "</td> <td>" + rank + "</td>";

    lastChangeTime = time.toString();   
}

function ordinal(replace) {
    let word = '';
    switch (replace) {
        case 1:
            word = "1st";
            break;
        case 2:
            word = "2nd";
            break;
        case 3:
            word = "3rd";
            break;
        case 4:
            word = "4th";
            break;
        case 5:
            word = "5th";
            break;
        case 6:
            word = "6th";
            break;
        case 7: 
            word = "7th";
            break;
        case 8:
            word = "8th";
            break;
        case 9:
            word = "9th";
            break;
        default:
            word = "10th";
}
    return word;
}

//setting up the onclick event handler for the submit button
const submitBtn = document.getElementById("submit");
submitBtn.onclick = function() {
    let message = document.getElementById("msg");
    if (numOfGroupsApplied === 0) {
        event.preventDefault();
        message.innerHTML = "You have not chosen any groups.";
        message.setAttribute("style", "display: block");
        return;
    } 

    //check for gaps
    let outString = "You have not chosen your ";
    let flag = false;
    let emptyRanks = [];
    for (let i = 0; i < max_rank; i++) {
        if (groupArray[i] === undefined){
            flag = true;
            emptyRanks.push(i+1);
        }
    }

    //code to output the message with proper grammar
    if (flag === true) {
        if (emptyRanks.length == 1) {
            outString = outString + ordinal(emptyRanks[0]) + " chosen group; you can not leave any gap between chosen groups.";
        } else if (emptyRanks.length == 2) {
            outString = outString + ordinal(emptyRanks[0]) + " chosen group and " + ordinal(emptyRanks[1]) + " chosen group; you cannot leave any gap between chosen groups.";
        } else {
            for (let i = 0; i < emptyRanks.length-1; i++) {
                outString = outString + ordinal(emptyRanks[i]) + " chosen group, ";
            }
            outString = outString + " and " + ordinal(emptyRanks[emptyRanks.length-1]) + " chosen group; you can not leave any gap between chosen groups.";
        }
        message.innerHTML = outString;
        message.setAttribute("style", "display: block");
        event.preventDefault();
        return;
    }
    //no errors; can output 'success' message  
    lastChangeTime = time.toString();
    message.innerHTML = "You have successfully submitted your application at time " + lastChangeTime;
    message.setAttribute("style", "display: block");
    event.preventDefault();
    
}

//setting up the onclick event handler for the clear button
let clearBtn = document.getElementById("clear");
clearBtn.onclick = function() {
    event.preventDefault();
    numOfGroupsApplied = 0;
    lastChangeTime = time.toString();
    for (let i = 0; i < groupArray.length; i++) {
        if (groupArray[i] != undefined) {
            rowArray[i + 1].innerHTML = "<td></td><td></td>" + "<td>" + (i + 1) + "</td>";
        }
    }

    document.getElementById("groupsApplied").innerHTML = "Total number of groups applied: 0";

    for (let i = 0; i < groupArray.length; i++) {
        groupArray[i] = undefined;
        divisionArray[i] = undefined;
    }
    for (let i = 0; i < textArray.length; i++) {
        textArray[i].value = '';
    }
    max_rank = 0

}
