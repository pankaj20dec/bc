var $ = jQuery.noConflict(),_ww,_wh,_wl,_wpos;

var Blank ={
	
	win_wid_hit : function(){
		_ww  = $(window).width();
		_wh  = $(window).height();	
		_wl =  window.location.href;
		_wpos = $(window).scrollTop()
	},
	
	loadlogo : function(){
		$(".loader").fadeOut("slow");
	},
	loadpage : function(){
			
		$(document).on('click','.ajx',function(event){
			event.preventDefault();	
			Blank.win_wid_hit();
			var cur = $(this).attr('href');
			var host = window.location.hostname+':4000'; //remove 4000 when live
			var page = 'http://'+host+cur;
			
			if(_wl == page) {
				return false;
			}
			
			$.ajax({
				url: page ,
				type: 'get',
				beforeSend: function(){
				
			   },				
				success: function(data){						
					$('.page-container').html($(data).find('.ajx-content').html());
						var newTitle = $(data).filter('title').text();
						document.title = newTitle;
				}
			})
			if(page!=window.location){
				window.history.pushState({path:page},'',page);
			}
			
		});		
	},
	
	slider_func : function(){
		if(jQuery('.flexslider').length){
			jQuery('.flexslider').flexslider({
			animation: "fade",
			controlNav: false,
			directionNav: true,
			slideshowSpeed: 3000,
			animationSpeed: 1000,
			slideshow: false,
			touch: true,
			start: function(slider) {
						jQuery('#sliderNext').on('click', function(e){
							jQuery('.flex-next').trigger('click');
						});
						jQuery('#sliderPrev').on('click', function(e){
							jQuery('.flex-prev').trigger('click');
						});	
						jQuery('.total-slides').text(slider.count);
						$('.slides li img , .slide-image').click(function(event){
							event.preventDefault();
							slider.flexAnimate(slider.getTarget("next"));
						});						
					  },
					  after: function(slider) {
						jQuery('.current-slide').text(slider.currentSlide+1);
					 }
			});
		}		
	},	
	slider_height : function(){
		Blank.win_wid_hit();
		if( _ww > 769){
			var slide_image = _wh - 250;
			$(".slide-image").css({"height":slide_image});
		}
	},
	
	masonry_func : function(){
		$('.page-container').imagesLoaded().done(function(){	
			$('.grid').masonry({
			  itemSelector: '.grid-item',
			  columnWidth: '.grid-sizer',
			  percentPosition: true,
			});	
		});		
	},
	
	image_loaded : function(){
		$('.page-container').imagesLoaded().done(function(){
			$('.home .page-content').fadeTo( 1000 , 1 );
		});
	},
	
	share_info_clk : function(){

		var back_url = jQuery('.back').attr('href');
		   jQuery('li[data-related = "info"]').click(function(){
			   jQuery('div#share').removeClass('active');
			   jQuery('div#info').toggleClass('active');
			   jQuery('li[data-related = "share"] .close').hide();
			   jQuery(this).find('.close').toggle();
				if ( $('div.pop_up').hasClass('active') )
				{
					
					jQuery('.pop_up_wrapper').addClass('open');
					jQuery('.back').attr('href','javascript:void(0)');

				}
				else{
					
					jQuery('.pop_up_wrapper').removeClass('open');
					jQuery('.back').attr('href', back_url);		
				}		
		   });
			
		   jQuery('li[data-related = "share"]').click(function(){
			   jQuery('div#info').removeClass('active');   
			   jQuery('div#share').toggleClass('active');
			   jQuery('li[data-related = "info"] .close').hide();
			   jQuery(this).find('.close').toggle();
				
				if ( jQuery('div.pop_up').hasClass('active') )
				{
					   jQuery('.pop_up_wrapper').addClass('open');
					   jQuery('.back').attr('href','javascript:void(0)');
					   
				}
				else{
					jQuery('.pop_up_wrapper').removeClass('open');
					jQuery('.back').attr('href', back_url);
					
				}
			   
		   });
		   
		jQuery('.back').click(function(){
			jQuery('.pop_up_wrapper').removeClass('open');
			jQuery('.pop_up').removeClass('active');
			jQuery('.close').hide();
			var preUrl = $('.back').attr('href');
			jQuery('.back').attr('href', back_url);
			if(preUrl != back_url)
			{
				return false;
			}
		});	
		
		
	},
	
	post_detail : function(){
		if ( $('.page-wrapper').hasClass(' post-page') ){
				$('body').addClass('post-detail-page');	
				
				setTimeout(function()
				{ 
				$('.post-title-wrapper').fadeTo( 800 , 0 , function(){
					$('.post-title-wrapper').css({"z-index":"1"});
				});
				}, 200);
			
			
				setTimeout(function()
				{ 
					$('.middle-container').fadeTo( 1000 , 1 );
				}, 1000);
				
				setTimeout(function()
				{ 
					$('.left-rotate , .right-rotate').fadeTo( 1450 , 1 );
				}, 1800);
		}
		else{
			$('body').removeClass('post-detail-page');
		}
	},
	
	

	
	ajx_reint : function() {
		Blank.image_loaded();
		Blank.masonry_func();
		Blank.slider_func();
		Blank.slider_height();
		Blank.share_info_clk();
		Blank.info_page();
		setTimeout(function()
		{ 		
			Blank.post_detail();
		}, 1800);
		setTimeout(function()
		{ 		
			Blank.home_scrl_anim();
		}, 100);
	},
	
	info_page : function(){
		
		if ( $('.page-wrapper').hasClass('information') ){
			$('body').addClass('information-page');
		}
		
		else{
			$('body').removeClass('information-page');
		}
		
	},
	
	home_scrl_anim : function(){
		Blank.win_wid_hit();
		var _scrlen = _wpos + _wh;
		$('.post-link').each(function(){
			var _myPos = $(this).offset().top;
			if(_scrlen > _myPos)
			{
				$(this).addClass('overlay');
			}
			else
			{
				$(this).removeClass('overlay');
			}
		});
		
	}
	

	
}



jQuery(window).on("load resize",function(){
	
	Blank.slider_height();
	slider_mobile();

	
});

jQuery(window).load(function(){
Blank.loadlogo();
Blank.image_loaded();
Blank.post_detail();	
Blank.masonry_func();
	setTimeout(function()
	{ 		
		Blank.home_scrl_anim();
	}, 100);
});

$(document).ajaxStart(function(){
	$('body').removeClass('animation'); 
});

$( document ).ajaxComplete(function() {
   Blank.ajx_reint()
	$('body').addClass('animation'); 
	slider_mobile();
 
});

function slider_mobile(){
	if(jQuery(window).width() < 769){
		var winht = jQuery(window).height();
		var winwt = jQuery(window).width();
	  
	  var pgcont_w = jQuery('.post-page .page-content,.information-page .page-content').width();
	  var pgcont_h = jQuery('.post-page .page-content,.information-page .page-content').height();
	  
	  
	  jQuery('.slides img').width(pgcont_w);
	  
	  jQuery('.post-page .middle-container').css({'max-width': pgcont_w })
	  if(winht > winwt){
		//jQuery('.post-page .page-content,.information-page .page-content').height(winht);  
		jQuery('.post-page .page-content,.information-page .page-content').css({'min-height': winht});  
	  }
	  else{
		//jQuery('.post-page .page-content,.information-page .page-content').height(winwt);  
		jQuery('.post-page .page-content,.information-page .page-content').css({'min-height': winwt});  
	  }
  }
}

$(window).scroll(function(){
	Blank.home_scrl_anim();
});

jQuery(document).ready(function(){
Blank.slider_height();
Blank.slider_func();
Blank.share_info_clk();
Blank.loadpage();
Blank.info_page();



$(window).on('popstate', function() {
	Blank.win_wid_hit();
	$.ajax({url:_wl,success: function(data){
			$('.page-container').html($(data).find('.ajx-content').html());
		}
	});
});

});