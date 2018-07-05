(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText = 'Android';
    const responseContainer = document.querySelector('#response-container');

  		form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

  
	  $.ajax({
		  url:`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
	
//headers cgreated separately (not within URL, like in NYTimes)
		  headers: {
			  Authorization: 'Client-ID 0d0ecd17dfff39987d850edd198ce9aaa36b8c1ef027978b658796d7d93c79e0'
		  }
	  }).done(addImage)
	  .fail(function(err){
		  requestError(err, 'image');
	  });
	

	  
	 $.ajax({
	
url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=1168fb99d193419fa58ca6fe8c9e4893`
		
// It is not clear why we use the API key for NYTIMES directly in URL, 
// and for images we create headers (like shownd below). 
		
		 //headers: {
			// Authorization: 'Client-ID 1168fb99d193419fa58ca6fe8c9e4893'}
}).done(addArticles)
  .fail(function(err){
		 requestError(err, 'articles');
	 });		 
  });
  
	

	
     function addImage(data) {
        let htmlContent = '';
     
		if (data && data.results && data.results.length > 1) {
   
		const firstImage = data.results[0];

        htmlContent = `<figure> 
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaptions>${searchedForText} by ${firstImage.user.name}</figcaptions>
        </figure>`; 
	} else {
		htmlContent = `<div>No images avaliable.<br>Please change your request.</div>`
	}
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    };
	
	

	
function addArticles(data) {
        let htmlContent = '';

if (data.response && data.response.docs && data.response.docs.length > 1) {
   
		const articles = data.response.docs;

        htmlContent = '<ul>' + articles.map(article => `
			<li class='article'>
			<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
			<p>${article.snippet}</p>

			</li>`
		).join('') + '</ul>';
	} else {
		htmlContent = `<div>No articles avaliable.</div>`
	}
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);

    };

	
	function requestError(e, part) {
		
	}


})();