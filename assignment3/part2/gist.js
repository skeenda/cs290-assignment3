
/*
function gist(description, request_url, language){
	this.description = description;
	this.request_url = request_url;
	this.language = language;	
}
*/
//this is the AJAX portion of the assignment that gets the gists

function getGist(){
	var request = new XMLHttpRequest();
	var gist = [];
	if(!request){
		throw 'Request was not created';
	}
	
	var url = 'https://api.github.com/gists/public';
	var pageNum = document.getElementById("page_amount").value;
	if (pageNum > 0){
		url += '?page=';
		url += pageNum;
	}
	//This checks the users input
	var language;
	if(document.getElementById('JavaScript').checked){
		language = document.getElementById('JavaScript').value;
	}
	else if(document.getElementById('Python').checked){
		language = document.getElementById('Python').value;
	}
	else if(document.getElementById('SQL').checked){
		language = document.getElementById('SQL').value;
	}
	else if(document.getElementById('JSON').checked){
		language = document.getElementById('JSON').value;
	}
	else{
		language = null;
	}
	request.onreadystatechange = function(){
		if(this.readyState === 4 && this.status === 200){
			gist= JSON.parse(this.responseText);
			//console.log(url);
			var checkFav = false;
			for(var i = 0; i < 30; i++){
				var gistDescription = gist[i].description;
				var gistURL = gist[i].url;

			for(var j = 0; j < localStorage.length; j++){
				if(gistURL === localStorage.key(j)){
					checkFav = true;
					break;
				}
			}
			if(checkFav === false){
				generate_list(gistDescription, gistURL);
				}
			}
		}
	};
	request.open('GET', url);
	request.send();
	
}


function generate_list(gistDescription, gistURL){
	//Generates the list by getting the gistDescription and gistURL
	var result = document.getElementById("result");
	
	var dl = document.createElement("dl");
	var dt = document.createElement("dt");
	var dd = document.createElement("dd");
	var d = document.createElement("d");
	d.setAttribute('href', gistURL);
	dt.innerText = gistDescription;
	d.appendChild(document.createTextNode(gistURL));
	dl.appendChild(dt);
	dl.appendChild(d);
	result.appendChild(dl);
	var new_button = document.createElement("button");
	new_button.innerHTML = "+";
	dl.appendChild(new_button);
	
	// This sets the button to do what it need to do on click
	new_button.onclick = function () {
		var fav = document.getElementById("favorite");
		var unFav = document.createElement("button");
		var dlFav = document.createElement("dl");
		dlFav.appendChild(dt);
		dlFav.appendChild(d);
		fav.appendChild(dlFav);
		unFav.innerHTML = "-";
		dlFav.appendChild(unFav);
		//Sets item into local storage so that it can be addressed for later userAgent
		localStorage.setItem(gistURL, gistDescription);
		new_button.parentNode.removeChild(new_button);
		//sets what the unfavorite button does
		unFav.onclick = function () {
			//removes the item from local storage and regenerate the list
			localStorage.removeItem(gistURL);
			generate_list(gistDescription, gistURL);
			dlFav.parentNode.removeChild(dlFav);
		};
		
	};
}

window.onload = function () {
	var n = 0;
	while(localStorage.key(n)){
		var favURL = localStorage.key(n);
		var favDescription = localStorage.getItem(localStorage.key(n));
		var fav = document.getElementById("favorite");
		var unFav = document.createElement("button");
		var dlFav = document.createElement("dl");
		var dtFav = document.createElement("dt");
		var d = document.createElement('d');
		d.setAttribute("href", localStorage.key(n));
		d.appendChild(document.createTextNode(favURL));
		dtFav.innnerText = favDescription;
		unFav.innerHTML = "-";
		dlFav.appendChild(dtFav);
		dlFav.appendChild(d);
		dlFav.appendChild(unFav);
		fav.appendChild(dlFav);
		unFav.onclick = function (){
			localStorage.removeItem(favURL);
			generate_list(favDescription, favURL);
			dlFav.parentNode.removeChild(dlFav);
		};
	
		n++;
	}
};

