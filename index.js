"use strict";

(function() {
	window.addEventListener("load", init);

	function init() {
		document.querySelector("button").addEventListener("click", displayImg);
	}

	function displayImg() {
		var e = document.querySelector(".dog-selector");
		var option = e.options[e.selectedIndex].value;

		var url;
		if (option == "random") {
			url = "https://dog.ceo/api/breeds/image/random";
		} else {
			var arr = option.split("-");
			option = arr[0];
			var subBreed = "";
			if (arr.length == 2) {
				subBreed = arr[0] + "/";
				option = arr[1];
			}
			url = "https://dog.ceo/api/breed/" + subBreed +  option + "/images/random";
			
		}
		fetch(url)
		  .then(checkStatus)
		  .then(resp => resp.json())
		  .then(display);
	}

	function display(resp) {
		var img = document.querySelector(".dog-img");
		img.src = resp.message;
		img.classList.remove("hidden");
	}

	function checkStatus(response) {
	    if (response.ok) {
	      return response;
	    }

	    throw Error("Error in request: " + response.statusText);
	}
})();