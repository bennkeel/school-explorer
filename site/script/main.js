import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolsOnMap } from './schools-map.js';
import { listSchools } from './schools-list.js';
import { htmlToElement } from './template-tools.js';


//Initial Variables
let schoolMap = initializeSchoolMap(); //Add map to page, reference with School Map
let schoolNameFilter = document.querySelector('#school-name-filter'); //Add reference variable for the text input
const grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]; //For listSchoolCheckboxes function
//let selected = [];

let schoolList = document.querySelector("#school-list");
let schoolGradeFilters;

//Function: Add checkboxes to page
function listSchoolCheckBoxes(schoolsToList, locationID) {
    const list = document.getElementById(locationID);
    for (let names of schoolsToList) {
        const html = `<label class="checkbox-label"><input type="checkbox" class="school-checkbox" value = "${names}">${names}</label>`;
        const li = htmlToElement(html);
        list.append(li);
    }
}

//Function: Determine whether to show a school or not based on filters
function shouldShowSchool(name) {
    let text = schoolNameFilter.value.toLowerCase();
    let show = true;
    for (const checkbox of schoolGradeFilters) {
        if (checkbox.checked) {
            const grades = name[`Grade ${checkbox.value}`];
            if (grades != 1) {
                show = false;
            }
        }
    }
    if (!name['name'].toLowerCase().includes(text)) {
        show = false;
    }
    return show;
}

//Function: Get the list of filtered schools based on shouldShowSchool()
function getFilteredSchools() {
    let filteredSchools = schools;
    filteredSchools = schools.filter(x => shouldShowSchool(x));
    return filteredSchools;
}

//Initial functions
showSchoolsOnMap(schools, schoolMap); //Load school locations on map
listSchools(schools, schoolList); //Load school names into console2 array
listSchoolCheckBoxes(grades, "checkboxList"); //Add checkboxes to page

//Adding reference variable for checkboxes and school list after they are added to the document
schoolGradeFilters = document.querySelectorAll('.school-checkbox');


//Add event listeners to each checkbox grade filter
for (let cb of schoolGradeFilters) {
    cb.addEventListener('change', () => {
        const filteredSchools = getFilteredSchools();
        listSchools(filteredSchools, schoolList);
        showSchoolsOnMap(filteredSchools, schoolMap);
        console.log(schoolMap);
    });
}

//Add event listeners to school name text boxfilter
schoolNameFilter.addEventListener('input', () => {
    const filteredSchools = getFilteredSchools();
    listSchools(filteredSchools, schoolList);
    showSchoolsOnMap(filteredSchools, schoolMap);
});

//Clearing input on load
document.addEventListener("DOMContentLoadeds", function() {
    document.getElementById("school-name-filter").value= "";
  });

//When the map zooms, reapply the style layer to allow for markers to resize.




//Global variables
window.schools = schools;
window.schoolNameFilter = schoolNameFilter;
window.schoolGradeFilters = schoolGradeFilters;
window.schoolList = schoolList;
window.schoolMap = schoolMap;
