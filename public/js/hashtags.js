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

var filters_to_remove = [];
var users_to_send = [];
var hashtags_to_send = [];
var rm_flag=0;

function remove_all(){
    if (rm_flag == 0){
        //$(".chkbox").css('background-position', 0+'px '+-15+'px');
        $('.filter-item').removeClass('filter-item').addClass('filter-item selected');
        rm_flag = 1;
    }
    else{
        $('.selected.filter-item').removeClass('selected filter-item').addClass('filter-item');
        rm_flag = 0;
    }
}

function remove_filter(clicked){

    if (rm_flag == 1)
    {
        $.ajax({
            type:       "POST",
            url:        "http://localhost:3000/remove_filter",
            data:       {'filter':"all"},
            dataType:   "json",
            complete:   function()
            {   window.location.reload();  }
        });
    }

    if (document.getElementById(clicked).className == "filter-item selected")
    {
        document.getElementById(clicked).className = "filter-item";
        var i = filters_to_remove.indexOf(clicked);
        if(i != -1) {
            filters_to_remove.splice(i, 1);
        }
    }
    else
    {
        filters_to_remove.push(clicked);
        document.getElementById(clicked).className = "filter-item selected";
    }
}


function remove_filters(){
    if (rm_flag == 1)
    {
        remove_filter('all');
    }

    if (filters_to_remove.length == 0)
    {
        return;
    }
    else
    {   
        for (i=0;i<filters_to_remove.length;i++)
        {
            $.ajax({
                type:       "POST",
                url:        "http://localhost:3000/remove_filter",
                data:       {'filter':filters_to_remove[i]},
                dataType:   "json"
            });
        }
        window.location.reload();
    }
}

function submitUsers(){
    if (users_to_send.length == 0)
    {
        return;
    }
    else
    {
        window.location = 'users/'+users_to_send;
    }
}


function filterByUser(clicked){
    if (document.getElementById(clicked).className == "filter-item selected")
    {
        document.getElementById(clicked).className = "filter-item";
        var i = users_to_send.indexOf(clicked);
        if(i != -1) {
            users_to_send.splice(i, 1);
        }
    }
    else
    {
        users_to_send.push(clicked);
        document.getElementById(clicked).className = "filter-item selected";
    } 
}

function filterByHashtag(clicked){
    if (document.getElementById('#'+clicked).className == "filter-item selected")
    {
        document.getElementById('#'+clicked).className = "filter-item";
        var i = hashtags_to_send.indexOf(clicked);
        if(i != -1) {
            hashtags_to_send.splice(i, 1);
        }
    }
    else
    {
        hashtags_to_send.push(clicked);
        document.getElementById('#'+clicked).className = "filter-item selected";
    } 
}

function submitHashtag(){
    if (hashtags_to_send.length == 0)
    {
        window.location = 'allTweets';
    }
    else
    {
        window.location = 'hashtags/'+hashtags_to_send;
    }
}