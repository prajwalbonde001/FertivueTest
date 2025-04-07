$(document).ready(function () {

    /* Find Patient collapsed symbol Background color Change CSS Start */
    $(".collapse-arrow").click(function () {
        $(this).parent().toggleClass("arrowWrap_bgcolor");
    });
    /* Find Patient collapsed symbol Background color Change CSS End */
    /* Find Patient active tr color change CSS Start */
    $(".parent_row").click(function () {
        var a = $('#PatientListTble').find('.parent_row').hasClass('activeTRColor')
        if (a == true) {
            $('#PatientListTble .parent_row').removeClass('activeTRColor');
        }
        $(this).addClass('activeTRColor');
    });
    /* Find Patient active tr color change CSS End */
    /* Visit Mark Page tab Content Overlap Start */
    $('#tab1').click(function () {
        $('#tab-content-male').show();
        $('#tab-content-female').hide();
    });

    $('#tab2').click(function () {
        $('#tab-content-female').show();
        $('#tab-content-male').hide();
    });
    /* Visit Mark Page tab Content Overlap End */

    /* Add Button Collapse Functionality Start */
    //$(".show_collapse_button").click(function () {
    //    $(".collapse").collapse('show');
    //});
    //$(".hide_collapse_button").click(function () {
    //    $(".collapse").collapse('hide');
    //});
    /* Add Button Collapse Functionality End */

    /* Patien List Page Radio Button color change Start */
    $('.showRowButton').click(function () {
        $(this).parent().next().slideToggle("slow");

    });
    $('input:radio').click(function () {
        $("input:radio").each(function () {
            $(this).closest("tr").toggleClass("green_color", $(this).is(":checked"));
        });
    });
   
    /* Patien List Page Radio Button color change End */

    /*  $('.showRowButton').click(function(){
        $(this).parent().addClass("green_color");
    }); */

    /*$('.radio_row').click(function(){
        $(this).toggleClass("green_color");	
    }); */
    /* 
    
    $('.open').click(function(){
        $('.hide_form').slideToggle("slow");	
    });
    $('.open_btn').click(function(){
        $(this).parent().next().slideToggle("slow");
        $(this).parent().toggleClass("green_color");	
    });
    $('.sms_btn').click(function(){
        $('.sms_form').slideToggle("slow");	
        $('.email_form').hide();
    });
    $('.email_btn').click(function(){
        $('.email_form').slideToggle("slow");
        $('.sms_form').hide();					
    }); */

   
});
$(document).ready(function () {
    //debugger;
            //var window_height = $(window).height();
            //var fixNav = $('.navbar-fixed-top').outerHeight(true);
            //var navFirst = $('.fixContentWrap').outerHeight(true);
            //var search = $('.searchContainer').outerHeight(true);
            //var total = window_height - fixNav - navFirst - search - 68 + 'px';
            //alert(total);
           // $('.form_content').css('min-height', total);


           //document.getElementsByClassName('form_content').style.minHeight = window_height - fixNav - navFirst;
           // var getClassminHeight = document.getElementsByClassName('form_content').style.minHeight;
          //  alert(document.getElementsByClassName('form_content').style.minHeight);
            //document.getElementById("content1").style.minHeight = window_height - navbar_ht - mainHeader_ht - 10 + "px";
            //alert(' + window_height + ');
            
           
			//var navFirst=$('.fixContentWrap').outerHeight(true);
			//document.getElementsByClassName(form_Content).style.minHeight = window_height - mainHeader_ht - navbar_ht - 10 + "px";

		});