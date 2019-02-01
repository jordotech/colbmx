<?php
$output = '';
$cached_block = cache_get('collateral_featured');
if ($cached_block) {
    $output .= $cached_block->data;
} else {
    $output .= '<div id="featured-container"><div class="featured-tab"><span class="featured-tab-title">featured</span><a href="/featured" class="featured-view-all">VIEW ALL</a></div>';
    $nids = collateral_return_featured_nids(5);
    $output .= '<div id="featured-box-container">';
    $rows = array();
    $imgDivs = '<div class="featured-img-container">';
    $count = 0;
    foreach ($nids as $nid) {
        $img = '';
        $node = node_load($nid);
	$active = $count == 0 ? 'active' : '';
        $tiny_thumb = isset($node->field_blog_thumbnail[$node->language][0]['uri']) ? theme('image_style', array('style_name' => 'tiny_featured_thumb', 'path' => $node->field_blog_thumbnail[$node->language][0]['uri'],)) : '';
        if($tiny_thumb == '' && isset($node->field_video_embed['und'][0]['thumbnail_path'])){
            $tiny_thumb = theme('image_style', array('style_name' => 'tiny_featured_thumb', 'path' =>  $node->field_video_embed['und'][0]['thumbnail_path'],));
        }
        $trimmed_title = html_entity_decode(views_trim_text(array('max_length' => 50, 'word_boundary' => true, 'ellipsis' => '...'), check_plain($node->title)));
        $data = '<span class = "featured-content"><div class="featured-title">' . l($trimmed_title, 'node/' . $node->nid, array('attributes' => array('title' => $node->title),)) . '</div><div class="tiny-featured-thumb">' . $tiny_thumb . '</div></span>';
        $rows[] = array('data' => array($data), 'class' => array('featured-row ' . $active));
        if (isset($node->field_featured_img_crop[$node->language][0]['uri'])) {
            $img = theme('image_style', array('style_name' => 'homepage_slider', 'path' => $node->field_featured_img_crop[$node->language][0]['uri'],));
        }elseif(isset($node->field_video_embed[$node->language][0]['video_url'])){
            $img = theme('video_embed_field_embed_code', array('url' => $node->field_video_embed[$node->language][0]['video_url'], 'style' => 'featured'));
        }elseif (isset($node->field_blog_image[$node->language][0]['uri'])) {
            $img = theme('image_style', array('style_name' => 'homepage_slider', 'path' => $node->field_blog_image[$node->language][0]['uri'], ));
        } else {
            //todo: grab generic img if there is none for this blog post
        }
        $imgDivs .= $img;
	$count++;
    }
    $imgDivs .= '</div>'; // .featured-img-container
    $output .= $imgDivs . '<div class="featured-table">' . theme('table', array('rows' => $rows)) . '</div>';
    $output .= '</div>'; // #featured-box-container
    $output .= '</div>'; // #featured-container
    cache_set('collateral_featured', $output, 'cache', 3600);
}
print $output;
?>
