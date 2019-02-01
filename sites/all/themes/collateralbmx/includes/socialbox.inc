<?php


$cached_block = cache_get('collateral_social_box');
if ($cached_block) {
    print $cached_block->data;
} else {


    $output = '';
    $output .= '<div id="social-sidebar">
    <div class="social-sidebar-icons">
            <div class="social-box-icon ig active"></div>
        <div class="social-box-icon yt"></div>
        <div class="social-box-icon rss"></div>
        <div class="social-box-icon sub"></div>
        <div class="social-box-icon blank"></div>
    </div>
    <div class="social-sidebar-content-container">

        <div class="social-box-content ig active">
            <!-- SnapWidget -->
            <div class="instagram-container">
                <iframe src="http://snapwidget.com/in/?u=Y29sbGF0ZXJhbGJteHxpbnw4NXwzfDN8fG5vfDV8bm9uZQ==" allowTransparency="true" frameborder="0" scrolling="no" style="border:none; overflow:hidden; width:270px; height: 270px" ></iframe>
                <div class="instagram-logo">
                    <span>@COLLATERALBMX | </span>
                    <img alt="instagram" src="/sites/all/themes/collateralbmx/images/instagram_logotype.gif"/>
                </div>

            </div>
        </div>
        <div class="social-box-content yt">
            <div id="player">
            </div>
            <div class="social-bar-yt-sub">
                <a href="//www.youtube.com/subscription_center?add_user_id=eLa12jlUWNnwEs7Q4SyoIQ"><img src="/sites/all/themes/collateralbmx/images/yt_sub_red.png" alt="Subscribe to me on YouTube"/></a>
            </div>
        </div>
        <div class="social-box-content rss active">
            <div class="social-box-latest-headlines">LATEST HEADLINES</div>';

    $nids = collateral_return_feed_nids(10);
    $title_list = '<ul>';
    $preview_list = '<div class="rss_tiny_preview_container">';
    foreach ($nids as $nid) {
        $node = node_load($nid);
        $trimmed_title = views_trim_text(array('max_length' => 40, 'word_boundary' => true, 'ellipsis' => '...'), $node->title);
        $trimmed_body = !empty($node->body[$node->language][0]['value']) ? views_trim_text(array('max_length' => 150, 'word_boundary' => true, 'ellipsis' => '...'), strip_tags($node->body[$node->language][0]['value'])) : '';
        
        $title_list .= '<li class="' . $node->nid . '">' . l($trimmed_title, 'node/' . $node->nid, array('attributes' => array('title' => $node->title),)) . '</li>';
        $preview_list .= '<div class="rss_tiny ' . $node->nid . '"><div class="rss_tiny_title">' . $trimmed_title . '</div>
<div class="rss_tiny_body">' . $trimmed_body . '</div>                    
</div>';
    }
    $title_list .= '</ul>';
    $preview_list .= '</div>';
    $output .= $preview_list;
    $output .= $title_list;
    $output .= '<span class="follow_btn"><a href="/blog-feed"><img alt="rss feed subscribe" style="padding-top:3px;" src="/sites/all/themes/collateralbmx/images/social-rss.png">SUBSCRIBE</a></span>
        </div>
        <div class="social-box-content sub"><div class="social-box-latest-headlines">E-NEWSLETTER SIGNUP</div>
'; 
    $output .= drupal_render(drupal_get_form('webform_client_form_337', node_load(337), array())) . '</div>
    <div class="social-box-content blank"></div>
    </div>


</div>';
    $output .= '<a href="https://twitter.com/collateralbmx" class="twitter-follow-button" data-show-count="true">Follow @collateralbmx</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?\'http\':\'https\';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\'://platform.twitter.com/widgets.js\';fjs.parentNode.insertBefore(js,fjs);}}(document, \'script\', \'twitter-wjs\');</script>';
    
    $output .= '<div class="fb-like" data-href="https://www.facebook.com/CollateralBMX" data-width="100" data-layout="standard" data-action="like" data-show-faces="false" data-share="false"></div>';
    cache_set('collateral_social_box', $output, 'cache', 3600);
    print $output;
}