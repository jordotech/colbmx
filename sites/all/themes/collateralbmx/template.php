<?php

/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 * 
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */
function collateralbmx_preprocess_page(&$vars) {
    if (!drupal_is_front_page()) {
        unset($vars['page']['header']['branding']['branding'], $vars['page']['header']['branding']['user_first']);
    }
}

function collateralbmx_preprocess_node(&$vars) {
    if ($vars['type'] == 'blog') {
        $nid = $vars['nid'];
        $node = node_load($nid, $vars['vid']);
        if (isset($node->field_gallery1[$node->language][0])) {
            $links = '<div class="gallery">';
            foreach ($node->field_gallery1[$node->language] as $key => $value) {
                $links .= l('', file_create_url($value['uri']), array('attributes' => array('class' => 'gallery1')));
            }
            $links .= '</div>';
            $vars['gallery'] = $links;
        }
    }
}
