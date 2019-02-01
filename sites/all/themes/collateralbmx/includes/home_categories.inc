<?php

$cached_block = cache_get('collateral_home_cats');
if ($cached_block) {
    print $cached_block->data;
} else {
    global $base_url;
    $output = '';
    //grab the categories that are configured to be in the slideshow
    $output .= '<div id="cats-slider-container">';
    $output .= '<div id="slides_container">';
    $query = db_select('field_data_field_include_in_scroller', 'fdfiis');
    $query->fields('fdfiis', array('entity_id'));
    $query->condition('fdfiis.field_include_in_scroller_value', 1);
    $results = $query->execute();
    $output .= '<ul>';
    foreach ($results as $key => $value) {

        $tid = $value->entity_id;
        $term = taxonomy_term_load($tid);
        $term->name;
        $nids = collateral_return_feed_nids(1, true, array($tid));
        $nid = $nids[0];
        $node = node_load($nid);
        $img_path = collateral_blog_img_available($node);
        $cat_link = l('view all', 'taxonomy/term/' . $tid);
        if ($img_path) {
            $trimmed_title = views_trim_text(array('max_length' => 35, 'word_boundary' => true, 'ellipsis' => '...'), $node->title);
            $alias = drupal_get_path_alias('node/' . $node->nid);
            $output .= '<li><div id="shadow-text">' . $term->name . 
		'<div class="cats-block-view-all">' . $cat_link . '</div></div><a href="/' . $alias . '">' . theme('image_style', array('style_name' => 'category_sidebar_slide', 'path' => $img_path, 'alt' => $node->title,'title' => $node->title,)) . '</a><div class="cats-slider-text">' . l($trimmed_title, 'node/' . $node->nid) . '</div></li>';
        }
    }
    $output .= '</ul>';
    $output .= '</div></div>'; //home-cats-container
    cache_set('collateral_home_cats', $output, 'cache', 3600);
    print $output;
}
?>
