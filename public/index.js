var app = function(){
  const url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);

}

const makeRequest = function(url, callback){
  // back in the day was XML but now returns JSON, still called XML.
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();


};

const requestComplete = function(){
  if(this.status !== 200) return;
  const beers = JSON.parse(this.response);
  populateList(beers);
  populateDropdown(beers);
  const select = document.querySelector('select');
  select.addEventListener('change', function(){
    var beer = beers[select.value];
    handleSelectChange(beer)
  });

}

const populateList = function(beers){
 const ul = document.querySelector('#beer-list');
 beers.forEach(function(beer){
   const li = document.createElement('li');
   var img = document.createElement("li");
   var imageTag = document.createElement("img");
   imageTag.width = "100";
   imageTag.src = beer.image_url;
   img.appendChild(imageTag);
   li.textContent = beer.name;
   ul.appendChild(li);
   ul.appendChild(img);
 });
 }

 const handleSelectChange = function(beer){
  const ul = document.querySelector('#selected-beer');
  const nameLi = document.querySelector('#nameLi');
  nameLi.textContent = beer.name;
  var img = document.querySelector("imageLi");
  var imageTag = document.createElement("img");
  imageTag.width = "100";
  imageTag.src = beer.image_url;
  const descriptionLi = document.querySelector('#descriptionLi');
  descriptionLi.textContent = beer.description;

  ul.appendChild(nameLi)
  ul.appendChild(imageTag)
  ul.appendChild(descriptionLi);

}

const populateDropdown = function(beers){
   const dropdown = document.querySelector('#beers');
   beers.forEach(function(beer){
     const option = document.createElement('option');
     option.value = beers.indexOf(beer);
     option.textContent = beer.name;
     dropdown.appendChild(option);
     });

 }




window.addEventListener('load', app);
