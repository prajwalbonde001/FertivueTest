// JavaScript Document
// Initialize the plugin with no custom options
$(document).ready(function () {
   
			// None of the options are set
			$(".owl-carousel").smoothDivScroll({
				hotSpotScrolling: true,
				touchScrolling: false
			});
		
		// hamburger Menu
			$("#hamburger").click(function () {
			    
				if ($("#hamburger").hasClass("open")) {
					$( "#LeftNavigation" ).addClass('open');
					$( "#hamburger" ).addClass("overlay-open");
					$( "#hamburger" ).removeClass("open");
					$( "#page-wrapper" ).addClass("menu-open");
				}
				else {
					$( "#LeftNavigation" ).removeClass("open");
					$( "#hamburger" ).addClass("open");
					$( "#hamburger" ).removeClass("overlay-open");
					$( "#page-wrapper" ).removeClass("menu-open");
				}
			});
});


$(document).ready(function () {

		 if ( $("div.scrollWrapper").outerWidth() < $("div.scrollWrapper").get(0).scrollWidth ) {
			// console.log("foo bar scrollbar");
			$('.scrollingHotSpotLeft').removeClass('hide');
			$('.scrollingHotSpotRight').removeClass('hide');
		 } else {
			// console.log(" no scrolling ");
			 $('.scrollingHotSpotLeft').addClass('hide');
			$('.scrollingHotSpotRight').addClass('hide');
		 }
	});		
	
	window.onresize = function() { 
			 if ( $("div.scrollWrapper").outerWidth() < $("div.scrollWrapper").get(0).scrollWidth ) {
				// console.log("foo bar scrollbar");
				$('.scrollingHotSpotLeft').removeClass('hide');
				$('.scrollingHotSpotRight').removeClass('hide');
			 } else {
				// console.log(" no scrolling ");
				 $('.scrollingHotSpotLeft').addClass('hide');
				$('.scrollingHotSpotRight').addClass('hide');
			 }
		};
		
		
		$(document).ready(function () {
			
			 $( 'ul.nav.nav-tabs  a' ).click( function ( e ) {
        		e.preventDefault();
        		$( this ).tab( 'show' );
      		});
		
			
		
		  fakewaffle.responsiveTabs(['xs', 'sm', 'md']);
		  
		  	
	  	});
		
	$(document).ready(function () {	
		if ($('.panel-default div.panel-body').hasClass('active')) {
	 		$('.panel-default div.panel-body.active').parent().parent('.panel-default').addClass('active');
 		}
	});

$(document).ready(function () {	
	$('.TimePickerInput').timepicker();
});
            
       $(document).ready(function () {
			var cw = $('.UserPhotoThumbnailContainer .thumbnail').width();
					$('.UserPhotoThumbnailContainer .thumbnail').css({
						'height': cw + 'px'
					});
			$(window).resize(function() {
				var cw = $('.UserPhotoThumbnailContainer .thumbnail').width();
					$('.UserPhotoThumbnailContainer .thumbnail').css({
						'height': cw + 'px'
					});
			});
			
			$("#PrfileFormEditBtn").click(function(){
				$(this).hide();
    			$("#ProfileDisplayContainer").hide('fast');
				$("#ProfileEditForm").show('fast');
				$("#BillingConsoleContainer").removeClass("opened");
				$("#PatientConsoleContainer").removeClass("opened");
				
			});
			
			$("#RegPrfileFormBtn").click(function(){
				$("#PrfileFormEditBtn").show('fast');
    			$("#ProfileDisplayContainer").show('fast');
				$("#ProfileEditForm").hide('fast');
			});
			
			$("#GridTableForm th a").click(function(){
				if ($("#PatientConsoleContainer").hasClass("opened")) {

					}
				else {
					$("#PatientConsoleContainer").addClass("opened");
					$("#BillingConsoleContainer").removeClass("opened");
					}
			});
			$("#GridTableForm td a").click(function(){
				if ($("#BillingConsoleContainer").hasClass("opened")) {

					}
				else {
					$("#BillingConsoleContainer").addClass("opened");
					$("#PatientConsoleContainer").removeClass("opened");
					}
			});
				
		});
		
		