<?php
    $sponsors_string = '';
    $query = db_select('node', 'n');
    $query->leftJoin('field_data_field_sponsor_url', 'fdfsu', 'n.nid = fdfsu.entity_id');
    $query->condition('n.type', 'sponsors')
    ->condition('n.status', 1)
            ->fields('n', array('title'))
            ->fields('fdfsu', array('field_sponsor_url_value'))
            ->orderBy('n.title', 'ASC');
    $results = $query->execute();
    foreach($results as $key=>$value){
        $sponsors_string .= '<span class="sponsor-link">' . l($value->title, $value->field_sponsor_url_value, array('attributes' => array('rel' => array('nofollow'), 'target' => array('_blank')))) . '</span>';
    }
    print '<div class="sponsors_block">' . $sponsors_string . '</div>';
?>