import {loadCategoryList} from './addbookmarklist.js';

//Open or close filter popup
$('.jsFilter').click(function(){
    $(".filter-menu").toggleClass("active");
    var isEnabled = $(".filter-button-wrapper").find('.active').length ? true : false;
    loadCategoryList(isEnabled);
 });
 
 
 //change grid mode.
 $('.grid').click(function(){
     $('.list').removeClass("active");
     $('.grid').addClass('active');
     $('.products-area-wrapper').addClass('gridView');
     $('.products-area-wrapper').removeClass('tableView');
 });
 
 //change list mode
 $('.list').click(function(){
     $('.grid').removeClass("active");
     $('.list').addClass('active');
     $('.products-area-wrapper').addClass('tableView');
     $('.products-area-wrapper').removeClass('gridView');
 });
 
 //switch theme
 $('.mode-switch').click(function(){
     document.documentElement.classList.toggle('light');
     $('.mode-switch').toggleClass('active');
 });
   