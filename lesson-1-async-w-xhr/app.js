(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText = 'Android';
    const responseContainer = document.querySelector('#response-container');

  		form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

 
	
fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    headers: {
        Authorization: 'Client-ID 0d0ecd17dfff39987d850edd198ce9aaa36b8c1ef027978b658796d7d93c79e0'
    }
}).then(function(response) {
    return response.json();
}).then(addImage);

function addImage(data) {
    let htmlContent = '';
    const firstImage = data.results[0];

    if (firstImage) {
        htmlContent = `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
    } else {
        htmlContent = 'Unfortunately, no image was returned for your search.'
    }

    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
};
	 

fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=1168fb99d193419fa58ca6fe8c9e4893`)
			.then(function(response){
	return response.json();
}).then(addArticles);
				
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
			
  });
  
	

	

	


	

})();