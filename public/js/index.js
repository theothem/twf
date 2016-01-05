$(document).ready(function () {


    //stick in the fixed 100% height behind the navbar but don't wrap it
    $('#slide-nav.navbar-inverse').after($('<div class="inverse" id="navbar-height-col"></div>'));
  
    $('#slide-nav.navbar-default').after($('<div id="navbar-height-col"></div>'));  

    // Enter your ids or classes
    var toggler = '.navbar-toggle';
    var menuwidth = '100%'; // the menu inside the slide menu itself
    var slidewidth = '80%';
    var menuneg = '-100%';
    var slideneg = '-80%';


    $("#slide-nav").on("click", toggler, function (e) {

        var selected = $(this).hasClass('slide-active');

        $('#slidemenu').stop().animate({
            left: selected ? menuneg : '0px'
        });
        
        $(this).toggleClass('slide-active', !selected);
        $('#slidemenu').toggleClass('slide-active').fadeIn('fast');
        
    });
});


function send() {
    var search      = document.getElementById("src").value;
    var text        = document.getElementById("txt").value;
    var user        = document.getElementById("usr").value;
    var hashtag     = document.getElementById("hashtg").value;
    var dateFrom    = document.getElementById("rightInput1").value;
   // var dateTo      = document.getElementById("rightInput2").value;

    if (search == 'Search' ){
        search = '';
    }

    if (text == 'Text'){
        text = '';
    }

    if (user == 'User' ){
        user = '';
    }

    if (hashtag == 'Hashtag #' ){
        hashtag = '';
    }

    $.post('http://localhost:3000/db_options', {'search' : search,'text':text,'user': user,'hashtag': hashtag,'dateFrom': dateFrom/*,'dateTo': dateTo*/});
}