var $ = jQuery.noConflict();

$(document).ready(function(){

    //if they click daily category, automatically check published
    $('#blog-node-form #edit-field-category input').click(function(){
        if($(this).val() == 27){
            if($('#blog-node-form input#edit-status').is(':checked') == false){
                $('#blog-node-form input#edit-promote').click();
            }
        }
    });
});

collateral = {
    isMobile : false,
    doMobile : function(){
        $('#dfp-ad-topleaderboard-wrapper').hide();
        //collateral.snapMenu();
        collateral.isMobile = true;
    },
    startFeaturedSlideshow : function(){
        var mobileSlideshowHtml = '<div id="mobile_slides_container">' + $('#mobile_slides_container').html() + '</div>';
        $('#mobile-slider-container').empty().append(mobileSlideshowHtml);
        $("#mobile_slides_container").easySlider({
            auto: true,
            continuous: true, 
            pause:5000,
            speed:1000,
            prevText : '<img src="/sites/all/themes/collateralbmx/images/red-left-arrow.png"/>',
            nextText : '<img src="/sites/all/themes/collateralbmx/images/red-right-arrow.png"/>'
        });
    },
    startSidebarSlideshow : function(){
        var slideshowHtml = '<div id="slides_container">' + $('#slides_container').html() + '</div>';
        $('#cats-slider-container').empty().append(slideshowHtml);
        $("#slides_container").easySlider({
            auto: true,
            continuous: true, 
            pause:5000,
            speed:1000,
            prevText : '<img src="/sites/all/themes/collateralbmx/images/red-left-arrow.png"/>',
            nextText : '<img src="/sites/all/themes/collateralbmx/images/red-right-arrow.png"/>'
        });
    },
    stuckThreshold : false,
    teasersOrigHeighths : new Array(),
    fullPostOrigImgHeighths : new Array(),
    fullPostOrigImgWidths : new Array(),
    backgroundSpread : false,
    addTeaserOverlays : function(){
        $('.blog_img_teaser img').each(function(){
            var thisTitleTxt = $(this).attr('title');
            if(thisTitleTxt != ''){
                $(this).parent().append('<div class="blog_teaser_overlay">' + thisTitleTxt + '</div>');
            }
        });  
    },
    adjustSize : function(){
        var content_menu_id = '#menu-419-1';
        var contact_menu_id = '#menu-661-1';
        var community_menu_id = '#menu-420-1';
        var wtl_menu1_id = '#menu-892-1';//watch the lights menu item top level
        var foundations_menu1_id = '#menu-893-1'; //foundations the lights menu item top level
        var windowWidth = $(window).width();
        var contentWidth = $('#region-content').width();
            if(collateral.teasersOrigHeighths.length == 0 ){
                $('.view-home-page-teasers-page img').each(function(){
                    collateral.teasersOrigHeighths.push($(this).attr('height'));
                });
            }
            if(collateral.fullPostOrigImgHeighths.length == 0 ){
                $('.node-blog img').each(function(){
                    collateral.fullPostOrigImgHeighths.push($(this).attr('height'));
                });
            }
            if(collateral.fullPostOrigImgWidths.length == 0 ){
                $('.node-blog img').each(function(){
                    collateral.fullPostOrigImgWidths.push($(this).attr('width'));
                });
            }
        if(contentWidth < 620){

            var iframeRatio = 1.78; // this is the ideal video ratio to scale by (width/height)
            var contentRatio = contentWidth/620;
            $('.blog_teaser_overlay').css({
                'width':contentWidth - 8
                });
            var imgCount = 0;
            $('.view-home-page-teasers-page img').each(function(){
                $(this).css({'height':(collateral.teasersOrigHeighths[imgCount]*contentRatio), 'width': contentWidth});
                imgCount ++;
            });
            var imgCount = 0;

            $('.node-blog img').each(function(){
                $(this).css({'height':(collateral.fullPostOrigImgHeighths[imgCount]*contentRatio), 'width': (collateral.fullPostOrigImgWidths[imgCount]*contentRatio)});
                imgCount ++;
            });
            $('#region-content iframe').attr('height', (contentWidth/iframeRatio)).attr('width', (contentWidth));
            $('.region-user-first-inner img').attr('height', (collateral.originalTopBannerHeight*contentRatio)).attr('width', contentWidth);
        }else{
            $('.blog_teaser_overlay').css({
                'width':612
            });
            $('#region-content iframe').attr('height', 347).attr('width', 618);
            $('.region-user-first-inner img').attr('height', collateral.originalTopBannerHeight);
            $('.region-user-first-inner img').attr('width', collateral.originalTopBannerWidth);
        }
        if(windowWidth < 640){

            $(content_menu_id).show();

            $(wtl_menu1_id + ',' + foundations_menu1_id).hide();

            $(community_menu_id).addClass('hidden');//community menu item
            $(contact_menu_id).addClass('hidden');
        }else{
            $(wtl_menu1_id + ',' + foundations_menu1_id).show();
            $(content_menu_id).hide();

            $(community_menu_id).show();//community menu item
            $(contact_menu_id).removeClass('hidden');
        }
        if(windowWidth < 960){
            $('.region-sidebar-second-inner').addClass('hidden');
            $('#featured-box-container table').addClass('expanded');
            var featuredImgWidth = $('.featured-img-container img').width();
            $('#featured-box-container table').css({'width':featuredImgWidth});

        }else{
            $('#featured-box-container table').removeClass('expanded');
            $('#featured-box-container table').css({'width':260});
            $('.region-sidebar-second-inner').removeClass('hidden');
            collateral.startSidebarSlideshow();
            
        }
        if(windowWidth < 340){
            $('.region-user-first-inner, #blog-banner, .region-footer-first-inner').addClass('hidden');
            collateral.snapMenu();
            $('#block-superfish-1').addClass('small');
            $('#block-search-form').addClass('small');    
            $('#menu-236-1').addClass('small')
        }else{
            $('.region-user-first-inner, #blog-banner, .region-footer-first-inner').removeClass('hidden');
            $('.region-user-first-inner').removeClass('hidden');
            $('#block-superfish-1').removeClass('small');
            $('#block-search-form').removeClass('small');
        }
        if(windowWidth < 660){
            var ratio = windowWidth/660;          
            var newHeight = (374 * ratio);
            var newWidth = (windowWidth) - 20 ;
            $('.featured-img-container').css({
                'height':newHeight, 
                'width':newWidth
            });
            $('.featured-img-container').children().attr('height', newHeight).attr('width', contentWidth);
            $('#featured-box-container iframe').attr('height', newHeight).attr('width', newWidth);
                        var featuredImgWidth = $('.featured-img-container img').width();
            $('#featured-box-container table').css({'width':featuredImgWidth});
        }else{
            $('.featured-img-container').css({
                'height':375, 
                'width':660
            });
            $('.featured-img-container').children().attr('width', 660);
            $('.featured-img-container').children().attr('height', 375);
            $('#featured-box-container iframe').attr('height', 375).attr('width', 660);
        }
        if(windowWidth && windowWidth > 960){
            /*
            $('#region-preface-first .content, #region-preface-first').css({
                'width':'940px'
            });
            $('.home-cats-right').css({
                'left':'940px'
            });*/
        }
        else if(640 < windowWidth && windowWidth < 960){
            $('#region-preface-first .content, #region-preface-first').css({
                'width':'640px'
            });
            $('.home-cats-right').css({
                'left':'640px'
            });
        }else if(320 < windowWidth && windowWidth < 640){

            $('#region-preface-first .content, #region-preface-first').css({
                'width':'320px'
            });
            $('.home-cats-right').css({
                'left':'320px'
            });
        }else if(windowWidth < 320){

        }  
    },
    setMaxHeightsidebar : function(id){
        var totalLatestHeight = 0;
        $(id + ' table tr.latest-row').each(function(){
            var thisRowHeight = $(this).height() + 1;
            totalLatestHeight += thisRowHeight;
        });
        $(id).css({
            'max-height':totalLatestHeight
        });
    },
    snapMenu : function(){
        $('body, #menu-236-1').addClass('snapped');        
        $('#menu-236-1 a').css({
            'color':'transparent'
        });
        $('#menu-236-1 a').hover(function(){
            $(this).css({
                'background':'none'
            });
        });
        $('.snap-menu').css({
            'position':'fixed'
        });
        $('.logo-img, .blog-banner-img').hide();
    },
    unSnapMenu : function(){
        $('.logo-img, .blog-banner-img').show();
        $('body, #menu-236-1').removeClass('snapped');
        $('#menu-236-1 a').css({
            'color':'#fff'
        });
        $('#menu-236-1 a:hover').css({
            'background':'#141414'
        });
        $('.snap-menu').css({
            'position':'relative'
        });
        $('body').css({
            'margin-top':'0px'
        });
    },
    homeCatsSlideRight : function(){
        clearInterval(this.homeCats);
        $('.home-cats-right, .home-cats-left').unbind('click');
        $('#home-cats-container').animate({
            left: -320 + 'px'
        }, 2000, 'jswing', function() {
            this.shuffleCatsLeft();
            $('.home-cats-right').bind('click', this.homeCatsSlideRight);
            $('.home-cats-left').bind('click', this.homeCatsSlideLeft);
        }); 
    },
    homeCatsSlideLeft : function(){
        clearInterval(this.homeCats);
        $('.home-cats-right, .home-cats-left').unbind('click');
        this.shuffleCatsRight();
        $('#home-cats-container').animate({
            left: 0 + 'px'
        }, 2000, 'jswing', function() {
            $('.home-cats-right').bind('click', this.homeCatsSlideRight);
            $('.home-cats-left').bind('click', this.homeCatsSlideLeft);
        });
    },
    shuffleCatsLeft : function(){
        $('.home-cat-box:first').appendTo('#home-cats-container');
        $('#home-cats-container').css({
            'left':0
        });
    },
    shuffleCatsRight : function(){
        $('.home-cat-box:last').prependTo('#home-cats-container');
        $('#home-cats-container').css({
            'left':-320 + 'px'
        });
    },
    homecatsInterval : function(){
        this.homeCats = setInterval(function(){
            $('.home-cats-right, .home-cats-left').unbind('click');
            $('#home-cats-container').animate({
                left: -320 + 'px'
            }, 1000, 'jswing', function() {
                this.shuffleCatsLeft();
                $('.home-cats-right').bind('click', this.homeCatsSlideRight);
                $('.home-cats-left').bind('click', this.homeCatsSlideLeft);
            });           
        }, 2000);
    } 
}
