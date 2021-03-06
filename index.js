const link = "https://api.apify.com/v2/key-value-stores/lFItbkoNDXKeSWBBA/records/LATEST?disableRedirect=true";
const regionLink = "https://covid19-api-philippines.herokuapp.com/api/top-regions"
let myArray = [];
let caseByRegion = [];
let regionalLastUpdate;
const nationalUpdate = document.getElementById('nationalDate')
const regionalUpdate = document.getElementById('regionalDate')
const cardInfected = document.getElementById('card_two')
const cardTested = document.getElementById('card_three')
const cardRecovered = document.getElementById('card_four')
const cardDeceased = document.getElementById('card_five')
const cardActive = document.getElementById('card_six')
const cardUnique = document.getElementById('card_seven')
const parentList = document.getElementById('parentList')
const casesList = document.getElementById('casesList');
const recoveredList = document.getElementById('recoveredList');
const deathList = document.getElementById('deathList');
const table = document.getElementById('table');

// REST API FETCH DATA

// covid data
fetch(link)
.then(res => res.json())
.then(data => myArray.push(data))
.then(() =>{
    let newInfection = document.createElement('h3');
    newInfection.innerHTML = `${myArray[0].infected}`
    cardInfected.appendChild(newInfection)
    console.log(myArray)
})
.then(() => {
    let newTested = document.createElement('h3');
    newTested.innerHTML = `${myArray[0].tested}`
    cardTested.appendChild(newTested)
})
.then(()=>{
    let newRecovered = document.createElement('h3');
    newRecovered.innerHTML = `${myArray[0].recovered}`
    cardRecovered.appendChild(newRecovered)
})
.then(()=>{
    let newDeceased = document.createElement('h3');
    newDeceased.innerHTML = `${myArray[0].deceased}`
    cardDeceased.appendChild(newDeceased)
})
.then(()=>{
    let newActive = document.createElement('h3');
    newActive.innerHTML = `${myArray[0].activeCases}`
    cardActive.appendChild(newActive)
})
.then(()=>{
    let newUnique = document.createElement('h3');
    newUnique.innerHTML = `${myArray[0].unique}`
    cardUnique.appendChild(newUnique)
})
.then(() => {
    let d = new Date (myArray[0].lastUpdatedAtApify);
    let nationalUpdate =  document.getElementById('nationalDate')
    let updateDateNational = document.createElement('p')
    updateDateNational.innerHTML = `${d}`
    nationalUpdate.appendChild(updateDateNational)
})
.catch(err => {
    console.log(err);
});

// FETCH DATA BY REGION

fetch(regionLink)
.then(res => res.json())
.then(regionData => {
    regionalLastUpdate = regionData.last_update
    caseByRegion.push(regionData.data)})
.then(() =>{
    caseByRegion[0].map(
        item => {
            let newCaseRow = document.createElement('tr')
            newCaseRow.innerHTML = `<td>${item.region}</td><td>${item.cases}</td><td>${item.recovered}</td><td>${item.deaths}</td>`
            table.appendChild(newCaseRow)
        }
    )
})
.then(() => {
    lastUpdateRegional = '';
    let d = regionalLastUpdate
    let updateRegionalDate = document.createElement('p');
    updateRegionalDate.innerHTML = `${d}`
    regionalUpdate.appendChild(updateRegionalDate)
})
.then(() => console.log(caseByRegion))
.catch(err => {console.log(err);});