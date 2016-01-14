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
    var text        = document.getElementById("txt").value;
    var user        = document.getElementById("usr").value;
    var hashtag     = document.getElementById("hashtg").value;
    var dateFrom    = document.getElementById("rightInput1").value;
   // var dateTo      = document.getElementById("rightInput2").value;

    if (text == 'Text'){
        text = '';
    }

    if (user == 'User' ){
        user = '';
    }

    if (hashtag == 'Hashtag #' ){
        hashtag = '';
    }

    if ((text == '')&&(user == '')&&(hashtag == '')&&(dateFrom!=''))
    {
        document.getElementById("date_warning").innerHTML           = "Give text,user or hashtag";
        document.getElementById("date_warning").style.color         = "#B10009";
        document.getElementById("date_warning").style.background    = "#FDE4E1";
        document.getElementById("date_warning").style.font          = "bold 14px Arial";
        document.getElementById("date_warning").style.padding       = "2px 4px";
        document.getElementById("date_warning").style.visibility    ='visible';
    }

    $.ajax({
        type:       "POST",
        url:        "http://localhost:3000/db_options",
        data:       {'text':text,'user': user,'hashtag': hashtag,'dateFrom': dateFrom},
        dataType:   "json",
        timeout:    2500
    });
    window.location = "allTweets";

}


function remove_filter(clicked){

    $.ajax({
        type:       "POST",
        url:        "http://localhost:3000/remove_filter",
        data:       {'filter':clicked},
        dataType:   "json",
        timeout:    2500,
        complete:   function(arg1, arg2, arg3)
        {   window.location.reload();  }
    });
}
