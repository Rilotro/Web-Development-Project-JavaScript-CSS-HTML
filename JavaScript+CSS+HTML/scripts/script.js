var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

var root = document.getElementById("root");

var aForm = document.createElement("form");
aForm.setAttribute("autocomplete", "off");
root.appendChild(aForm);

var iDIV = document.createElement("DIV");
iDIV.setAttribute("class", "autocomplete");
iDIV.innerHTML = "Introduceti o Tara: <br><br>";
aForm.appendChild(iDIV);

var inputField = document.createElement("INPUT");
inputField.setAttribute("type", "text");
inputField.setAttribute("id", "myInput");
inputField.setAttribute("name", "myCountry");
inputField.setAttribute("placeholder", "Country");
iDIV.appendChild(inputField);

var currentFocus;
inputField.addEventListener("input", function(e) {
  closeAllCards();
  var a, b, i, val = this.value;
  closeAllLists();
  if (val.length < 3) { return false;}
  currentFocus = -1;
  a = document.createElement("DIV");
  a.setAttribute("id", this.id + "autocomplete-list");
  a.setAttribute("class", "autocomplete-items");
  this.parentNode.appendChild(a);
  for (i = 0; i < countries.length; i++) {
    if (countries[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
      b = document.createElement("DIV");
      b.innerHTML = "<strong>" + countries[i].substr(0, val.length) + "</strong>";
      b.innerHTML += countries[i].substr(val.length);
      b.innerHTML += "<input type='hidden' value='" + countries[i] + "'>";
      b.addEventListener("click", function(e) {
        inputField.value = this.getElementsByTagName("input")[0].value;
        closeAllLists();
        });
      a.appendChild(b);
      }
    }
});
inputField.addEventListener("keydown", function(e) {
  var x = document.getElementById(this.id + "autocomplete-list");
  if (x) x = x.getElementsByTagName("div");
  if (e.keyCode == 40) {
    currentFocus++;
    addActive(x);
  } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
});
function addActive(x) {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (x.length - 1);
  x[currentFocus].classList.add("autocomplete-active");
}
function removeActive(x) {
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
  }
}
function closeAllLists(elmnt) {
  var x = document.getElementsByClassName("autocomplete-items");
  var i = 0;
    while(x[0+i] != null){
      if (elmnt != x[0+i] && elmnt != inputField) {
        x[0+i].parentNode.removeChild(x[0+i]);
      }else{i++;}
    }
}
document.addEventListener("click", function (e) {
  closeAllLists(e.target);
});

var inputButton = document.createElement("INPUT");
inputButton.setAttribute("type", "button");
inputButton.setAttribute("id", "reveal");
inputButton.setAttribute("value", "search");
aForm.appendChild(inputButton);

var card;
var conditions = ["cer senin", "in mare parte senin", "partial innorat", "in mare parte innorat", "ploaie usoara", "ploaie torentiala", "furtuna cu fulgere", "ceata"];
var zi = ["luni", "marti", "miercuri", "joi", "vineri"];

function exists(){
  for(i = 0; i < countries.length; i++){
    if(inputField.value === countries[i]){return true;}
  }
  return false;
}

function closeAllCards(){
  var x = document.getElementsByClassName("weathercard");
  while(x[0] != null){
    x[0].parentNode.removeChild(x[0]);
  }
}

inputButton.addEventListener("click", function(e){
  closeAllCards();
  if(exists() === false){
    alert("va rog introduceti un oras!");
    return null;
  }
  for(i = 0; i < zi.length; i++){
    card = document.createElement("DIV");
    conditions_value = Math.floor(Math.random() * conditions.length);
    card.setAttribute("id", "weathercard_" + conditions_value);
    card.setAttribute("class", "weathercard");
    card.innerHTML = "<p id=\"date\">" + zi[i] + ", " + (9+i) + ":01:2023 </p>";
    card.innerHTML += "<p id=\"city\">" + inputField.value + "</p>";
    card.innerHTML += "<p id=\"degree\">" + Math.floor(Math.random() * (13 - 5) + 5) + "/" + Math.floor((Math.random() * 4)) + "</p>";
    card.innerHTML += "<p id=\"humidity\">" + Math.floor(Math.random() * 101) + "% uniditate</p>";
    card.innerHTML += "<p id=\"sky_conditions\">" + conditions[conditions_value] + "</p>";
    document.getElementById("weather").appendChild(card);
  }
})
  