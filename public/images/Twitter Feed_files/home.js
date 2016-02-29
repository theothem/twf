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

    if ((text == '')&&(user == '')&&(hashtag == '')&&(dateFrom ==''))
    {
        document.getElementById("text_warning").innerHTML           = "Give text";
        document.getElementById("text_warning").style.color         = "#B10009";
        //document.getElementById("text_warning").style.background    = "#FDE4E1";
        document.getElementById("text_warning").style.font          = "bold 14px Arial";
        document.getElementById("text_warning").style.padding       = "2px 4px";
        document.getElementById("text_warning").style.visibility    ='visible';

        document.getElementById("user_warning").innerHTML           = "Give user";
        document.getElementById("user_warning").style.color         = "#B10009";
        //document.getElementById("user_warning").style.background    = "#FDE4E1";
        document.getElementById("user_warning").style.font          = "bold 14px Arial";
        document.getElementById("user_warning").style.padding       = "2px 4px";
        document.getElementById("user_warning").style.visibility    ='visible';

        document.getElementById("hashtag_warning").innerHTML        = "Give hashtag";
        document.getElementById("hashtag_warning").style.color      = "#B10009";
       // document.getElementById("hashtag_warning").style.background = "#FDE4E1";
        document.getElementById("hashtag_warning").style.font       = "bold 14px Arial";
        document.getElementById("hashtag_warning").style.padding    = "2px 4px";
        document.getElementById("hashtag_warning").style.visibility ='visible';

        document.getElementById("date_warning").innerHTML           = "Give date";
        document.getElementById("date_warning").style.color         = "#B10009";
       // document.getElementById("date_warning").style.background    = "#FDE4E1";
        document.getElementById("date_warning").style.font          = "bold 14px Arial";
        document.getElementById("date_warning").style.padding       = "2px 4px";
        document.getElementById("date_warning").style.visibility    ='visible';
    }
    else if ((text == '')&&(user == '')&&(hashtag == '')&&(dateFrom!=''))
    {
        document.getElementById("date_warning").innerHTML           = "Give text,user or hashtag";
        document.getElementById("date_warning").style.color         = "#B10009";
       // document.getElementById("date_warning").style.background    = "#FDE4E1";
        document.getElementById("date_warning").style.font          = "bold 14px Arial";
        document.getElementById("date_warning").style.padding       = "2px 4px";
        document.getElementById("date_warning").style.visibility    ='visible';
    }
    else
    {
        $('#bar').loadie(); // Change the wrapper if wanted.
        var percent = 0;
        setInterval(function() {
           percent += 0.10
           $('#bar').loadie(percent); // Insert your percent as params. }, 3000);
        }, 10 * 100); // wait 60 seconds
        
        $.ajax({
            type:       "GET",
            url:        "http://localhost:3000/db_options",
            data:       {'text':text,'user': user,'hashtag': hashtag,'dateFrom': dateFrom},
            dataType:   "json",
            success:   function(msg)
            {
                percent = 1
                $('#bar').loadie(percent); // Insert your percent as params. }, 3000);
                if (msg.error != ''){
                    window.alert(msg.error);
                    window.location.reload();
                }
                else{
                    window.location = 'allTweets';
                }
            }
        });
    }
}

function playDemo (_id, index, interval) {
  $('#demo-msg-' + index).animate({
    'opacity': '0'
  });
  $('#demo-progress-' + index).animate({
    'opacity': '1'
  });
  var p = 0;
  $('#' + _id).loadgo('resetprogress');
  $('#demo-progress-' + index).html('0%');
  window.setTimeout(function () {
    interval = window.setInterval(function (){
      if ($('#' + _id).loadgo('getprogress') == 100) {
        window.clearInterval(interval);
        $('#demo-msg-' + index).animate({
          'opacity': '1'
        });
        $('#demo-progress-' + index).animate({
          'opacity': '0'
        });
      }
      else {
        var prog = p*10;
        $('#' + _id).loadgo('setprogress', prog);
        $('#demo-progress-' + index).html(prog + '%');
        p++;
      }
    }, 150);
  }, 300);
}


function remove_filter(clicked){

    $.ajax({
        type:       "GET",
        url:        "http://localhost:3000/remove_filter",
        data:       {'filter':clicked},
        dataType:   "json",
        complete:   function()
        {   window.location.reload();  }
    });
}
