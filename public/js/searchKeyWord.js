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
            type:       "GET",
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

function remove_filter2(clicked){

    if (rm_flag == 1)
    {
        $.ajax({
            type:       "GET",
            url:        "http://localhost:3000/remove_filter",
            data:       {'filter':"all"},
            dataType:   "json",
            complete:   function()
            {   window.location.reload();  }
        });
    }

    if (document.getElementById('_'+clicked).className == "filter-item selected")
    {
        document.getElementById('_'+clicked).className = "filter-item";
        var i = filters_to_remove.indexOf(clicked);
        if(i != -1) {
            filters_to_remove.splice(i, 1);
        }
    }
    else
    {
        filters_to_remove.push(clicked);
        document.getElementById('_'+clicked).className = "filter-item selected";
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
                type:       "GET",
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
        var search = document.getElementById('search_bar_item').value;
        if (search != '')
        {
            var date = document.getElementById('datepicker').value;
            if (date == 'dd/mm/yyyy')
                date = '';
            window.location = 'searchKeyWord?search='+search+'&users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;
        }
        else
        {
            var date = document.getElementById('datepicker').value;
            if (date == 'dd/mm/yyyy')
                date = '';
            window.location = 'filters?users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;
        }
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
        var i = users_to_send.indexOf(clicked);
        if(i == -1) 
            users_to_send.push(clicked);
        document.getElementById(clicked).className = "filter-item selected";
    } 
}

function filterByUser2(clicked){
    if (document.getElementById('_'+clicked).className == "filter-item selected")
    {
        document.getElementById('_'+clicked).className = "filter-item";
        var i = users_to_send.indexOf(clicked);
        if(i != -1) {
            users_to_send.splice(i, 1);
        }
    }
    else
    {
        var i = users_to_send.indexOf(clicked);
        if(i == -1) 
            users_to_send.push(clicked);
        document.getElementById('_'+clicked).className = "filter-item selected";
    } 
}

function filterByHashtag(clicked){
    if (document.getElementById(clicked).className == "filter-item selected")
    {
        document.getElementById(clicked).className = "filter-item";
        var i = hashtags_to_send.indexOf(clicked);
        if(i != -1) {
            hashtags_to_send.splice(i, 1);
        }
    }
    else
    {
        var i = hashtags_to_send.indexOf(clicked);
        if(i == -1) 
            hashtags_to_send.push(clicked);
        document.getElementById(clicked).className = "filter-item selected";
    } 
}

function filterByHashtag2(clicked){
    if (document.getElementById('_'+clicked).className == "filter-item selected")
    {
        document.getElementById('_'+clicked).className = "filter-item";
        var i = hashtags_to_send.indexOf(clicked);
        if(i != -1) {
            hashtags_to_send.splice(i, 1);
        }
    }
    else
    {
        var i = hashtags_to_send.indexOf(clicked);
        if(i == -1) 
            hashtags_to_send.push(clicked);
        document.getElementById('_'+clicked).className = "filter-item selected";
    } 
}

function submitHashtag(){
    if (hashtags_to_send.length == 0)
    {
        return;
    }
    else
    {
        var search = document.getElementById('search_bar_item').value;
        if (search != '')
        {
            var date = document.getElementById('datepicker').value;
            if (date == 'dd/mm/yyyy')
                date = '';
            window.location = 'searchKeyWord?search='+search+'&users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;
        }
        else
        {
            var date = document.getElementById('datepicker').value;
            if (date == 'dd/mm/yyyy')
                date = '';
            window.location = 'filters?users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;
        }
    }
}

function search(){
    var value = document.getElementById('search_bar_item').value;
    var date = document.getElementById('datepicker').value;
    var search_date = value.split('/');

    if (date == 'dd/mm/yyyy')
        date = '';

    if (value[0] == '#')
    {
        var hash = value.split('#');
        var i = hashtags_to_send.indexOf(hash[1]);
        if(i == -1) 
            hashtags_to_send.push(hash[1]);
        window.location = 'searchKeyWord?users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;
    }
    else if (value[0] == '@')
    {
        var hash = value.split('@');
        var i = users_to_send.indexOf(hash[1]);
        if(i == -1) 
            users_to_send.push(hash[1]);
        window.location = 'searchKeyWord?search='+'&users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;    
    }
    else if (search_date.length == 3)
    {
        window.location = 'searchKeyWord?search='+'&users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+value;    
    }
    else
    {
        window.location = 'searchKeyWord?search='+value+'&users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;    
    }
}

function search2(){
    var value = document.getElementById('search_bar_item_slidemenu').value;
    var date = document.getElementById('datepicker').value;
    var search_date = value.split('/');

    if (date == 'dd/mm/yyyy')
        date = '';

    if (value[0] == '#')
    {
        var hash = value.split('#');
        var i = hashtags_to_send.indexOf(hash[1]);
        if(i == -1) 
            hashtags_to_send.push(hash[1]);
        window.location = 'searchKeyWord?users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;
    }
    else if (value[0] == '@')
    {
        var hash = value.split('@');
        var i = users_to_send.indexOf(hash[1]);
        if(i == -1) 
            users_to_send.push(hash[1]);
        window.location = 'searchKeyWord?search='+'&users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;    
    }
    else if (search_date.length == 3)
    {
        window.location = 'searchKeyWord?search='+'&users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+value;    
    }
    else
    {
        window.location = 'searchKeyWord?search='+value+'&users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;    
    }
}

function submitDate(){
    var date = document.getElementById('datepicker').value;
    if (date == 'dd/mm/yyyy')
        return;
    var search = document.getElementById('search_bar_item').value;
    if (search != '')
    {
        window.location = 'searchKeyWord?search='+search+'&users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;
    }
    else
        window.location = 'filters?users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;   
}

function submitDate2(){
    var date = document.getElementById('_datepicker').value;
    if (date == 'dd/mm/yyyy')
        return;
    var search = document.getElementById('search_bar_item').value;
    if (search != '')
    {
        window.location = 'searchKeyWord?search='+search+'&users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;
    }
    else
        window.location = 'filters?users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;   
}

function orderBy_dateUp(){
    var value = document.getElementById('search_bar_item').value;
    var date = document.getElementById('datepicker').value;
    if (date == 'dd/mm/yyyy')
        date = '';
    window.location = 'searchKeyWord?search='+value+'&users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date;    
}

function orderBy_favorites(){
    var value = document.getElementById('search_bar_item').value;
    var date = document.getElementById('datepicker').value;
    if (date == 'dd/mm/yyyy')
        date = '';
    window.location = 'searchKeyWord?search='+value+'&users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date+'&order='+'favorites';    
}

function orderBy_dateDown(){
    var value = document.getElementById('search_bar_item').value;
    var date = document.getElementById('datepicker').value;
    if (date == 'dd/mm/yyyy')
        date = '';
    window.location = 'searchKeyWord?search='+value+'&users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date+'&order='+'dateDown';    
}

function orderBy_retweets(){
    var value = document.getElementById('search_bar_item').value;
    var date = document.getElementById('datepicker').value;
    if (date == 'dd/mm/yyyy')
        date = '';
    window.location = 'searchKeyWord?search='+value+'&users='+users_to_send+'&hashtags='+hashtags_to_send+'&date='+date+'&order='+'retweets';    
}

function hoverFAV(element) {
    element.setAttribute('src', '../images/heart.png');
}
function unhoverFAV(element) {
    element.setAttribute('src', '../images/heart_0.png');
}
function hoverRT(element) {
    element.setAttribute('src', '../images/rt_2.png');
}
function unhoverRT(element) {
    element.setAttribute('src', '../images/rt.png');
}