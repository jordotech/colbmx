$(document).ready(function(){
    //grab the sidebar slider html to re-start slideshow from scratch after it gets hidden/unhidden.
    if(window.location.pathname == '/home' || window.location.pathname == '/'){
        //collateral.backgroundSpread = true;
        if(collateral.backgroundSpread == true){
            $('body').addClass('backspread');
            $('#page').addClass('backspread');
        }
    }
    else{
        //collateral.snapMenu();
    }  
    collateral.adjustSize();
    $('.gallery1').colorbox({
        rel:'group1',
        scalePhotos:true,
        maxWidth: '70%',
        maxHeight: '70%'
    });
    $('.gallerytrigger').click(function(){
        $('.gallery1').click();
    });
    //collateral.originalFeatImgHeight = $('.featured-img-container img').attr('height');
    collateral.originalFeatImgWidth = $('.featured-img-container img').attr('width');
    collateral.originalTopBannerHeight = $('.region-user-first-inner img').attr('height');
    collateral.originalTopBannerWidth = $('.region-user-first-inner img').attr('width');
    $(window).resize(function(){
        collateral.adjustSize();
    });


    $('.featured-img-container .player').mouseenter(function(){
        $('.featured-tab').addClass('hidden');
    });
    $('#shadow-text.latest').click(function(){
        $('#latest-content-sidebar').addClass('set');
        $(this).addClass('active');
        $('#shadow-text.popular').removeClass('active');
        $('#latest-popular-sidebar').removeClass('set');
        collateral.setMaxHeightsidebar('#latest-content-sidebar');
    });
    $('.featured-row:first').addClass('active');
    $('.featured-img-container').children().first().addClass('active');
    $('.featured-table tr').hover(function(){
        $('.featured-tab').removeClass('hidden');
        var thisTr = $(this);
        $(thisTr).addClass('active').siblings().removeClass('active');
        var index = $(thisTr).index();
        $('.featured-img-container').children().eq(index).siblings().removeClass('active');
        $('.featured-img-container').children().eq(index).addClass('active');
        
    });
    
    $('#shadow-text.popular').click(function(){
        $(this).addClass('active');
        $('#shadow-text.latest').removeClass('active');
        $('#latest-content-sidebar').removeClass('set');
        $('#latest-popular-sidebar').addClass('set');
        collateral.setMaxHeightsidebar('#latest-popular-sidebar');
    });
    collateral.setMaxHeightsidebar('#cat-pulldown-block');
    
    $("#latest-content-sidebar").resizable({
        handles: {
            's':'.arrow-handle-latest'
        },
        maxWidth:300,
        minWidth:300,
        minHeight:200
    });
        $("#latest-popular-sidebar").resizable({
        handles: {
            's':'.arrow-handle-popular'
        },
        maxWidth:300,
        minWidth:300,
        minHeight:200
    });

    $("div#cat-pulldown-block").each(function(){
        var term_class = $($(this)).attr('class');
        $($(this)).resizable({
                    handles: {
            's':'.arrow-handle-' + term_class
        },
        maxWidth:300,
        minWidth:300,
        minHeight:75
        });
    });
    
    $('.collateral-search-box input').focus(function(){
        $(this).addClass('active');
    });
    $('.collateral-search-box input').focusout(function(){
            
        if($(this).val() == ''){
            $(this).removeClass('active');
        }
    });


    var headerHeight = $('#section-header').height();
    var menuHeight = $('.snap-menu').height();
    collateral.menuHeight = menuHeight;
    collateral.headerHeight = headerHeight - menuHeight;
    $(document).scroll(function(){
        if(!$('.region-sidebar-second-inner').hasClass('hidden')){

            if(!$('.region-sidebar-second-inner').children().last().hasClass('stuck')){
                collateral.stuckThreshold = $('.region-sidebar-second-inner').children().last().offset().top - collateral.menuHeight;
                if(collateral.stuckThreshold < collateral.menuHeight){
                    collateral.stuckThreshold = 4000;// this is due to the fact that scroll() gets fired on page load, serves as a default.
                }
            }
            if($(document).scrollTop() > collateral.stuckThreshold){
                $('.region-sidebar-second-inner').children().last().addClass('stuck');
            }else{
                $('.region-sidebar-second-inner').children().last().removeClass('stuck');
            }
        }

        if($(document).scrollTop() > collateral.headerHeight){
            collateral.snapMenu();
        }else if($(window).width() > 340 && collateral.isMobile != true){
            collateral.unSnapMenu();
        }
    });
    collateral.addTeaserOverlays();
});
