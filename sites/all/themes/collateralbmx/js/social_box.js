var $ = jQuery.noConflict();
socialBox = {
    rss_show_matching_preview : function(e){
        var target = $(e).attr('class');
        $('.rss_tiny.' + target).addClass('active').fadeIn('slow', function() {});
        $('.rss_tiny.' + target).siblings().removeClass('active').hide();
    },
    rss_tiny_interval : function(){        
        socialBox.rssInterval = setInterval(function(){
            if($('.social-box-content.rss ul li.active').is(':last-child')){
                socialBox.rss_show_matching_preview($('.social-box-content.rss ul li:first'));
                $('.social-box-content.rss ul li:first').addClass('active');
                $('.social-box-content.rss ul li:last-child').removeClass('active');
            }else{
                var current = $('.social-box-content.rss ul li.active')
                $(current).removeClass('active');
                socialBox.rss_show_matching_preview($(current.next()));
                $(current).next().addClass('active');
            }
        }, 3000);
    }
}
$(document).ready(function(){
    $('#edit-mailchimp-lists-mailchimp-general-title').remove();
    socialBox.rss_tiny_interval();
    $('.social-box-icon.fb').addClass('active');
    $('.rss_tiny:first').addClass('active');
    $('.social-box-content.rss ul li:first').addClass('active');
    $('.social-box-content.rss ul li a').mouseenter(function(){
        socialBox.rss_show_matching_preview($(this).parent());
        clearInterval(socialBox.rssInterval);
        var target = $(this).parent().attr('class');
        $(this).parent().toggleClass('active');
        $(this).parent().siblings().removeClass('active');
    });
    $('iframe[frameborder=0]').load(function(){ 
        $('.loading_gif').remove();
    });
    $('.social-box-icon').not('.blank').each(function(){
        $(this).mouseenter(function(){
            var oldIndex = $('.social-box-icon.active').index();
            var newIndex = $(this).index();
            if(oldIndex == newIndex){
                return;
            }
            if(oldIndex > newIndex){
                px = '300px';
            }else{
                px = '-300px';
            }
            $('.social-box-content').eq(newIndex).addClass('active').css({
                'left':px
            }).animate({
                left: 0
            }, {
                duration: 300,
                specialEasing: {
                    left: 'swing'
                },
                complete: function() {
				
                }
            }).siblings().removeClass('active');
            $(this).addClass('active');
            $(this).siblings().removeClass('active');

        });
    });
    
});


(function() {
    function createPlayer(jqe, video, options) {
        var ifr = $('iframe', jqe);
        if (ifr.length === 0) {
            ifr = $('<iframe scrolling="no">');
            ifr.addClass('player');
        }
        var src = 'http://www.youtube.com/embed/' + video.id;
        if (options.playopts) {
            src += '?';
            for (var k in options.playopts) {
                src += k + '=' + options.playopts[k] + '&';
            }
            src += '_a=b';
        }
        ifr.attr('src', src);
    //jqe.append(ifr);
    }

    function createCarousel(jqe, videos, options) {
        var car = $('div.carousel', jqe);
        if (car.length === 0) {
            car = $('<div>');
            car.addClass('carousel');
            jqe.append(car);

        }
        $.each(videos, function(i, video) {

            options.thumbnail(car, video, options);
        });
    }

    function createThumbnail(jqe, video, options) {

        var imgurl = video.thumbnails[0].url;
        var img = $('img[src="' + imgurl + '"]');
        var desc;
        var container;
        if (img.length !== 0) return;
        img = $('<img align="left">');
        img.addClass('thumbnail');
        jqe.append(img);
        img.attr('src', imgurl);
        img.attr('title', video.title);
        
        desk = $('<p class="yt-descript"><a rel="nofollow" target="_blank" href="http://www.youtube.com/watch?v=' + video.id + '">' + video.title + '</a></p>');
        jqe.append(desk);
        desk.click(function() {
            options.player(options.maindiv, video, $.extend(true, {}, options, {
                playopts: {
                    autoplay: 1
                }
            }));
        });
    }

    var defoptions = {
        autoplay: false,
        user: null,
        carousel: createCarousel,
        player: createPlayer,
        thumbnail: createThumbnail,
        loaded: function() {},
        playopts: {
            autoplay: 0,
            egm: 1,
            autohide: 1,
            fs: 1,
            showinfo: 1
        }
    };


    $.fn.extend({
        youTubeChannel: function(options) {
            var md = $(this);
            md.addClass('youtube');
            md.addClass('youtube-channel');
            var allopts = $.extend(true, {}, defoptions, options);
            allopts.maindiv = md;
            $.getJSON('http://gdata.youtube.com/feeds/users/' + allopts.user + '/uploads?alt=json-in-script&format=5&callback=?', null, function(data) {
                var feed = data.feed;
                var videos = [];
                $.each(feed.entry, function(i, entry) {

                    var video = {
                        title: entry.title.$t,
                        id: entry.id.$t.match('[^/]*$'),
                        thumbnails: entry.media$group.media$thumbnail
                    };
                    videos.push(video);
                });
                allopts.allvideos = videos;
                allopts.carousel(md, videos, allopts);
                allopts.player(md, videos[0], allopts);
                allopts.loaded(videos, allopts);
            });
        }
    });

})();

$(function() {
    $('#player').youTubeChannel({
        user: 'collateralBMX'
    });
});