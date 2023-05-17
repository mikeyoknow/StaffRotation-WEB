//initiate variables///////////////
const staffDisplay = document.getElementById('staff-display');
const nameEntry = document.getElementById('name-entry');
const addButton = document.getElementById('add-button');
const lunchButton = document.getElementById('lunch-button');
const backButton = document.getElementById('back-button');
const delButton = document.getElementById('del-button');
const upButton = document.getElementById('up-button');
const downButton = document.getElementById('down-button');
const rotationDisplay = document.getElementById('rotation-display');
const nextButton = document.getElementById('next-button');

let staffList = [];
let currentIndex = 0;

//addEventListener////////////////
addButton.addEventListener('click', addStaff);
lunchButton.addEventListener('click', goToLunch);
backButton.addEventListener('click', backFromLunch);
delButton.addEventListener('click', delStaff);
upButton.addEventListener('click', moveUp);
downButton.addEventListener('click', moveDown);
nextButton.addEventListener('click', nextStaff);

//functions///////////////////////
function addStaff() {
    const new_name = nameEntry.value;
    if (new_name) {
        staffList.push(new_name);
        const option = document.createElement('option')
        option.text = new_name;
        staffDisplay.add(option);
        nameEntry.value = '';
        updateRotationDisplay();
    }
}

function delStaff() {
    const selectedName = staffDisplay.selectedIndex;
    if (selectedName !== -1) {
        staffList.splice(selectedName, 1);
        staffDisplay.remove(selectedName);
        updateRotationDisplay();
    }
}

function nextStaff() {
    if (staffList.length > 0) {
        currentIndex = (currentIndex + 1) % staffList.length;
        updateRotationDisplay();
    }
}

function moveUp() {
    const selectedName = staffDisplay.selectedIndex;
    if (selectedName > 0) {
        const temp = staffList[selectedName];
        staffList[selectedName] = staffList[selectedName - 1];
        staffList[selectedName - 1] = temp;

        staffDisplay.options[selectedName].text = staffList[selectedName];
        staffDisplay.options[selectedName - 1].text = staffList[selectedName - 1];
        staffDisplay.selectedIndex = selectedName - 1;

        updateRotationDisplay();
    }
}

function moveDown() {
	const selectedName = staffDisplay.selectedIndex;
  if(selectedName >= 0 && selectedName < staffList.length - 1) {
  	const temp = staffList[selectedName];
    staffList[selectedName] = staffList[selectedName + 1];
    staffList[selectedName + 1] = temp;
    
    staffDisplay.options[selectedName].text = staffList[selectedName];
    staffDisplay.options[selectedName + 1].text = staffList[selectedName + 1];
    staffDisplay.selectedIndex = selectedName + 1;
    
    updateRotationDisplay();
  }
	

}

function goToLunch() {
    const selectedName = staffDisplay.selectedIndex;
    if (selectedName !== -1 && !staffList[selectedName].endsWith('(On Lunch)')){
        staffList[selectedName] += ' (On Lunch)';
        staffDisplay.options[selectedName].text = staffList[selectedName];
        updateRotationDisplay();
    }
}

function backFromLunch() {
    const selectedName = staffDisplay.selectedIndex;
    if(selectedName !== -1 && staffList[selectedName].endsWith('(On Lunch)')) {
        staffList[selectedName] = staffList[selectedName].replace(' (On Lunch)', '');
        staffDisplay.options[selectedName].text = staffList[selectedName];
        updateRotationDisplay();
    }
}

function updateRotationDisplay(){
    if (staffList.length > 0) {
        rotationDisplay.innerHTML = staffList[currentIndex];
    } else {
        rotationDisplay.innerHTML = '';
    }
}
