$(document).ready(function(){
   
    var container = $("#posts"); // div, в который выгружаются посты
	var load_more = $("#load-more"); // кнопка "загрузить еще"
	var request_in_progress = false; // флаг, чтобы предотвратить клики во время выгрузки 
	var loading = $("#loading"); // гифка загрузки
		// ф-ии для показа\скрытия кнопки и loading гифки
		function showLoading(){		
			loading.css("display", "block");		
		};

		function hideLoading(){		
			loading.css("display", "none");
		};

		function showLoadMore(){
			load_more.css("display", "inline");
		};

		function hideLoadMore(){
			load_more.css("display", "none");
		};
	// ф-ия считывает кол-во загруженных постов(1 - 3 поста; 2 - 6 постов...)
	function setCurrentPage(page) {
        console.log( 'Количество постов равно: ' + page*3 );
        load_more.attr('data-page', page);
    };

          

	function loadMore(){
		if(request_in_progress) {
			return; 
		}; // если новые посты уже грузятся(loading...), то выходим из ф-ии!
        request_in_progress = true;
        showLoading();
        hideLoadMore();

        var page = parseInt(load_more.attr('data-page')); // значение атрибута data-page кнопки        
        var next_page = page + 1;// next_page - это значение будет передаваться в строку 
     	// $page = isset($_GET['page']) ? (int) $_GET['page'] : 1; (in php file)    	  
    	//  а затем в функцию find_blog_posts($page) - в качестве аргумента (in php file)
        $.get('blog_posts.php?page=' + next_page, function(data, status){             
            hideLoading();
            setCurrentPage(next_page);
            container.append(data); // вместо ф-ии appendToDiv в чистом js        
            showLoadMore();
            request_in_progress = false;
        });                 
	};	

	// ******** CLICK HANDLER ****************
	load_more.on( "click", loadMore );

  // выгрузка постов скроллом мыши
  function scrollAddPosts() {
      var content_height = container.outerHeight();        
      var current_y = window.innerHeight + $(window).scrollTop();

      if(current_y >= content_height) {
        loadMore();
      }
  };
	// ******** SCROLL HANDLER *************
	// $(document).scroll(function() {
 //        scrollAddPosts();        
 //    }); 

	// **** по загрузке страницы выгружаем первые три поста:
	loadMore(); 

}); 
	
	// get ajax request(jQuery)
	   // The first parameter of $.get() is the URL we wish to request 
       // The second parameter is a callback function. 
       // The first callback parameter holds the content of the page requested, and the second
       // callback parameter holds the status of the request.

   // scrollAddPosts пояснения - разница между чистым js
       // The .outerHeight() method is the jQuery equivalent of pure js offsetHeight property 
       // .innerHeight is the current computed height for the first element in the set 
       // of matched elements, including padding but not border.
       // $(window).scrollTop() is the jQuery equivalent of pure js window.pageYOffset