"use strict";

(function() {
	window.addEventListener("load", init);

	function init() {
		document.querySelector("button").addEventListener("click", displayImg);
		loadOptions();
	}

	/**
	  * Request options list from dogs api
	  */
	function loadOptions() {
		var url = "https://dog.ceo/api/breeds/list/all";

		fetch(url)
		  .then(checkStatus)
		  .then(resp => resp.json())
		  .then(options);
	}

	/**
	  * Display all dogs as options
	  */
	function options(resp) {
		for (const breed in resp.message) {
			if (resp.message[breed].length == 0) {
				var content = capitalize(breed);
				var value = breed;
				addOption(content, value);
			} else {
				for (const i in resp.message[breed]) {
					var subBreed = resp.message[breed][i];
					var content = capitalize(subBreed) + " " + capitalize(breed);
					var value = breed + "-" + subBreed;
					addOption(content, value);
				}
			}
		}
	}

	/**
	  * Add a single option to the select tag
	  */
	function addOption(content, value) {
		var option = document.createElement("option");
		option.value = value;
		option.textContent = content;
		var select = document.querySelector(".dog-selector");

		select.appendChild(option);
	}

	/**
	  * Given string name, capitalize it
	  */
	function capitalize(name) {
		return name.charAt(0).toUpperCase() + name.slice(1);
	}

	/**
	  * Requests image of selected dog
	  */
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

	/**
	  * Displays the image
	  */
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