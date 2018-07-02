(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText = 'Android';
    const responseContainer = document.querySelector('#response-container');

// add event listener when submit button is clicked 
  form.addEventListener('submit', function (e) {
	
//prevents defaul action 
        e.preventDefault();
	
// sets response container to an empty string 
        responseContainer.innerHTML = '';
	  
//sets the value of the searchForText equal to what was typed in the searchField 
        searchedForText = searchField.value;
       
//We should create here our XHR object and send it to the server.
//We need to get the API keys so we can make this request as unlash needs authentication
//first get the Access Key from https://unplash.com 

// constructs a new XHR object called unsplashRequest
        const unsplashRequest = new XMLHttpRequest();

//uses .open(method, url) method to initialize a newly-created request 
//uses GET request to retrieve data
	    unsplashRequest.open('GET', 

//url includes searchForText variable, and will change depending on the user's request 							 
		`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
	  
	  
//sets onload property to handle the successful responce of an XHR request
        unsplashRequest.onload = addImage;
	  
        unsplashRequest.onerror = function () {
            requestError(err, 'img');
		
        };
// !!! setRequestheader must be called after .open and before .send
        unsplashRequest.setRequestHeader('Authorization', 
'Client-ID 0d0ecd17dfff39987d850edd198ce9aaa36b8c1ef027978b658796d7d93c79e0');

// actually sends the request 
        unsplashRequest.send();
  });
  

     function addImage() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);
        const firstImage = data.results[0];

        htmlContent = `<figure> 
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaptions>${searchedForText} by ${firstImage.user.name}</figcaptions>
        </figure>`;

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
		 
        // let unplashImg = document.querySelector('.unplash_image');
        // unplashImg.setAttribute('src', firstImage.urls.regular);

    }
 
 

})();