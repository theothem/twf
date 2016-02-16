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
    var username    = document.getElementById("usrname").value;
    var password    = document.getElementById("pass").value;
    var email       = document.getElementById("mail").value;
    var cnt        = 0;

    if (username == 'Username'){
        username = '';
    }

    if (password == 'Password' ){
        password = '';
    }

    if (email == 'Email' ){
        email = '';
    }

    if (((username.length < 4))||((username == '')))
    {
        document.getElementById("usrname_warning").innerHTML           = "More than 4 characters";
        document.getElementById("usrname_warning").style.color         = "#B10009";
        document.getElementById("usrname_warning").style.background    = "#FDE4E1";
        document.getElementById("usrname_warning").style.font          = "bold 14px Arial";
        document.getElementById("usrname_warning").style.padding       = "2px 4px";
        document.getElementById("usrname_warning").style.visibility    ='visible';
        cnt = 1;
    }
    else
    {
        document.getElementById("usrname_warning").style.visibility    ='hidden';
    }
    
    if (((!(isAlphanumeric(password)))||((password.length < 6)))||(password == ''))
    {
        document.getElementById("password_warning").innerHTML           = "More than 6 digits";
        document.getElementById("password_warning").style.color         = "#B10009";
        document.getElementById("password_warning").style.background    = "#FDE4E1";
        document.getElementById("password_warning").style.font          = "bold 14px Arial";
        document.getElementById("password_warning").style.padding       = "2px 4px";
        document.getElementById("password_warning").style.visibility    ='visible';
        cnt = 1;
    }
    else
    {
        document.getElementById("password_warning").style.visibility    ='hidden';
    }
    
    if (((email.indexOf('.') < 0 ))||((email == ''))||((email.indexOf('@') < 0 )))
    {
        document.getElementById("email_warning").innerHTML              = "Must contain @ and . ";
        document.getElementById("email_warning").style.color            = "#B10009";
        document.getElementById("email_warning").style.background       = "#FDE4E1";
        document.getElementById("email_warning").style.font             = "bold 14px Arial";
        document.getElementById("email_warning").style.padding          = "2px 4px";
        document.getElementById("email_warning").style.visibility       ='visible';
        cnt = 1;
    }
    else
    {
        document.getElementById("email_warning").style.visibility       ='hidden';
    }

    if (cnt != 1)
    {
        $('#bar').loadie(); // Change the wrapper if wanted.
        var percent = 0;
        setInterval(function() {
           percent += 0.10
           $('#bar').loadie(percent); // Insert your percent as params. }, 3000);
        }, 10 * 100); // wait 60 seconds
        
        $.ajax({
            type:       "POST",
            url:        "http://localhost:3000/signup_user",
            data:       {'username':username,'password': password,'email': email},
            dataType:   "json",
            success: function(msg){
                percent = 1
                $('#bar').loadie(percent); // Insert your percent as params. }, 3000);
                if (msg.error == 'error')
                    window.alert('Error adding \''+username+'\' to DataBase');
                else
                    window.alert('User \''+username+'\' added to DataBase');
                window.location = '/';
            }, 
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

function isAlphanumeric( str ) {
 return /^[0-9a-zA-Z]+$/.test(str);
}