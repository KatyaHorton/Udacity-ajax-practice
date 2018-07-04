(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText = 'Android';
    const responseContainer = document.querySelector('#response-container');

// add event listener when submit button is clicked (cicks of two async requests)
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

	  
// constructs a new XHR object called -----------------------unsplashRequest
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
	  
		
// constructs a new XHR object called ----------------------- timesRequest
	
	const timesRequest = new XMLHttpRequest();

//initialises newly created request 
	timesRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=1168fb99d193419fa58ca6fe8c9e4893`);
	
	timesRequest.onload = addArticle;
	  
// ????
	timesRequest.onerror = function () {    
        };
	

	timesRequest.send();  
	  
	  
  });
  
	

	
     function addImage() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);
		 console.log(data);
		
// if data and it's resuts are drfined 
if (data && data.results && data.results[0]) {
   
	
	
// returns a random image insted of the first one	
	const randomImg = data.results[Math.floor(Math.random()*data.results.length)];

        htmlContent = `<figure> 
            <img src="${randomImg.urls.regular}" alt="${searchedForText}">
            <figcaptions>${searchedForText} by ${randomImg.user.name}</figcaptions>
        </figure>`; 
	
/* returns a random image insted of the first one	
	const randomImg = data.results[Math.floor(Math.random()*data.results.length)];

        htmlContent = `<figure> 
            <img src="${randomImg.urls.regular}" alt="${searchedForText}">
            <figcaptions>${searchedForText} by ${randomImg.user.name}</figcaptions>
        </figure>`; */
	
	} else 
	
// if data and it's resuts are NOT drfined 
	{
		htmlContent = `<div>No images avaliable.<br>Please change your request.</div>`
	}

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
		 

    };
	
	
	function addArticle() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);
	
		
// if data and it's resuts are drfined 
if (data.response && data.response.docs && data.response.docs.length > 1) {
   


        htmlContent = '<ul>' + data.response.docs.map(article => `
			<li class='article'>
			<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
			<p>${article.snippet}</p>
			</li>`).join('') + '</ul>'

	
	} else 
	
// if data and it's resuts are NOT drfined 
	{
		htmlContent = `<div>No articles avaliable.</div>`
	}

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
		 

    };


 
 

})();