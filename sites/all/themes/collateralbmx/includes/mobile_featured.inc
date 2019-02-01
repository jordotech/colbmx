<?php

$cached_block = cache_get('mobile_featured');
if ($cached_block) {
    print $cached_block->data;
} else {
    global $base_url;
    
    $output = '';
    $output .= '<div id="mobile-slider-container">';
    $output .= '<div id="mobile_slides_container">';
    $nids = collateral_return_featured_nids(5);
    $output .= '<ul>';
    foreach ($nids as $nid) {
        
        $node = node_load($nid);
        $img_path = collateral_blog_img_available($node);
        if ($img_path) {
            $trimmed_title = views_trim_text(array('max_length' => 37, 'word_boundary' => true, 'ellipsis' => '...'), $node->title);
            $alias = drupal_get_path_alias('node/' . $node->nid);
            $output .= '<li><a href="/' . $alias . '">' . theme('image_style', array('style_name' => 'mobile_sidebar_slide', 'path' => $img_path, 'alt' => $node->title,'title' => $node->title,)) . '</a><div class="cats-slider-text">' . l($trimmed_title, 'node/' . $node->nid) . '</div></li>';
        }
        
    }
    $output .= '</ul>';
    
    $output .= '</div></div>'; 
    cache_set('mobile_featured', $output, 'cache', 3600);
    print $output;
}


?>
