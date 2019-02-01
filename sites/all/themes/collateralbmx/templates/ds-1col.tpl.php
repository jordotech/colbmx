<?php

/**
 * @file
 * Display Suite 1 column template.
 */
?>
<<?php print $ds_content_wrapper; print $layout_attributes; ?> class="ds-1col <?php print $classes;?> clearfix">

<span class="full-view-by">by</span> <span id="blogname"><?php print $name;?></span><span id="blogdate"> • <?php print date('m/d/Y', $created);?> </span>  <?php if (isset($title_suffix['contextual_links'])): ?>

  <?php print render($title_suffix['contextual_links']); ?>
  <?php endif; ?>

  <?php print $ds_content; 
  ?>
</<?php print $ds_content_wrapper ?>>
<?php if (!empty($gallery)){
    print $gallery;
}
?>
<?php if (!empty($drupal_render_children)): ?>
  <?php print $drupal_render_children ?>
<?php endif; ?>
<?php 
?>
