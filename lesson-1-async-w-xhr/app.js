(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText = 'Android';
    const responseContainer = document.querySelector('#response-container');

  form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
       
      //We should create here our XHR object and send it to the server.
      //We need to get the API keys so we can make this request as unlash needs authentication
      //So we need first get the Access Key from https://unplash.com .
        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.onload = addImage;
        unsplashRequest.onerror = function (err) {
            requestError(err, 'img');
		
        };
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 0d0ecd17dfff39987d850edd198ce9aaa36b8c1ef027978b658796d7d93c79e0');
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