<?php

$output = '';
$cached_block = cache_get('collateral_latest_popular');
if ($cached_block) {
    $output .= $cached_block->data;
    print $output;
} else {
    $output .= '<div id="latest-popular-box">
    <div id ="shadow-text" class="latest active">latest</div>
    <div id ="shadow-text" class="popular">popular</div>
    <div id="latest-content-sidebar" class="set">';
    $nids = collateral_return_feed_nids(10, true); //get the latest 10 articles, including those marked rss_item
    $rows = array();
    foreach ($nids as $nid) {
        $node = node_load($nid);
        $user = user_load($node->uid);
        $img = '';
        if (isset($user->picture->uri)) {
            $img = '<span class="latest-author">' . theme('image_style', array('style_name' => 'tiny_author',
                'path' => $user->picture->uri,
                'alt' => $user->name,
                'title' => $user->name,
                    )) . '</span>';
        }
        $trimmed_title = views_trim_text(array('max_length' => 75, 'word_boundary' => true, 'ellipsis' => '...'), $node->title);
        $trimmed_body = '';
        if (isset($node->body[$node->language][0]['value'])) {
            $trimmed_body = views_trim_text(array('max_length' => 70, 'word_boundary' => false, 'ellipsis' => '...'), strip_tags($node->body[$node->language][0]['value']));
        }        $data = '<div class="latest-row">' . $img . '<span class="latest-content">
<span class="latest-title">' . l($trimmed_title, 'node/' . $node->nid, array('attributes' => array('title' => $node->title),))
                . '</span>&nbsp;<p>' . $trimmed_body . '</p>                
</span></div>';
        $rows[] = array('data' => array($data), 'class' => array('latest-row'));
    }
    $output .= theme('table', array('rows' => $rows));
    $output .= '<div class="arrow-handle-latest red-arrow ui-resizable-handle ui-resizable-s"></div></div>';
    $output .= '<div id="latest-popular-sidebar">';
    $nids = collateral_return_popular_nids(10, true); //get the popular 10 articles
    $rows = array();
    foreach ($nids as $nid) {
        $node = node_load($nid);
        $user = user_load($node->uid);
        $img = '';
        if (isset($user->picture->uri)) {
            $img = '<span class="latest-author">' . theme('image_style', array('style_name' => 'tiny_author',
                        'path' => $user->picture->uri,
                        'alt' => $user->name,
                        'title' => $user->name,
                    )) . '</span>';
        }
        $trimmed_title = views_trim_text(array('max_length' => 75, 'word_boundary' => true, 'ellipsis' => '...'), $node->title);
        $trimmed_body = '';
        if (isset($node->body[$node->language][0]['value'])) {
            $trimmed_body = views_trim_text(array('max_length' => 70, 'word_boundary' => false, 'ellipsis' => '...'), strip_tags($node->body[$node->language][0]['value']));
        }
        $data = '<div class="latest-row">' . $img . '<span class="latest-content">
<span class="latest-title">' . l($trimmed_title, 'node/' . $node->nid, array('attributes' => array('title' => $node->title),))
                . '</span>&nbsp;<p>' . $trimmed_body . '</p>                
</span></div>';
        $rows[] = array('data' => array($data), 'class' => array('latest-row'));
    }
    $output .= theme('table', array('rows' => $rows));
    $output .= '<div class="arrow-handle-popular red-arrow ui-resizable-handle ui-resizable-s"></div></div></div>';
    cache_set('collateral_latest_popular', $output, 'cache', 3600);
    print $output;
}
?>
