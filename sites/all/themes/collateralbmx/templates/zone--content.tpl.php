<?php if ($wrapper): ?><div<?php print $attributes; ?>><?php endif; ?>  
    <div<?php print $content_attributes; ?>>    
        <?php if ($breadcrumb): ?>
            <div id="breadcrumb" class="grid-<?php print $columns; ?>"><?php print $breadcrumb; ?></div>
        <?php endif; ?>    
        <?php if ($messages): ?>
            <div id="messages" class="grid-<?php print $columns; ?>"><?php print $messages; ?></div>
        <?php endif; ?>
        <?php
        $leaderboard_block = '';
        $item = menu_get_item();
        $print_banner = false;

        if (isset($item['page_arguments'][0]->type)) {
            if ($item['page_arguments'][0]->type == 'blog') {
                $print_banner = true;
            }
        } elseif ($item['path'] == 'taxonomy/term/%') {
            $vid = db_query('SELECT vid FROM {taxonomy_term_data} WHERE tid = :tid', array(':tid' => arg(2)))->fetchField();
            $print_banner = $vid == 2 ? true : false;
            $print_banner = true;
        }
        if ($print_banner) {
            global $base_url;
            $term_img = '';
            if (arg(0) == 'node' && is_numeric(arg(1))) {
                $nid = arg(1);
                $node = node_load($nid);
                $wrapper = entity_metadata_wrapper('node', $node);
                if ($wrapper->type->value() == 'blog' && isset($wrapper->field_category->value()->tid)) {
                    $tid = $wrapper->field_category->value()->tid;
                    $term_alias = $base_url . '/' . drupal_get_path_alias('taxonomy/term/' . $tid);
                    $term_img = '<a href="' . $term_alias . ' ">' . collateral_term_image($tid) . '</a>';
                    $leaderboard_block = module_invoke('dfp', 'block_view', 'topleaderboard');
                    $leaderboard_block = render($leaderboard_block['content']);
                }
            } else {
                $tid = arg(2);
                $vid = db_query('SELECT vid FROM {taxonomy_term_data} WHERE tid = :tid', array(':tid' => $tid))->fetchField();
                $term_img = $vid == 2 ? collateral_term_image($tid) : collateral_term_image(27);

                $leaderboard_block = module_invoke('dfp', 'block_view', 'topleaderboard');
                $leaderboard_block = render($leaderboard_block['content']);
            }
            if (!empty($tid)) {
                
            }
            print '<div id="blog-banner">';
            print '<span class="blog-banner-img">' . $term_img . '</span>';
            print '<span class="blog-banner-ad">' . $leaderboard_block . '</span>';
            print '</div>';
        }
        print $content;
        ?>
    </div>
    <?php if ($wrapper): ?></div><?php endif; ?>
