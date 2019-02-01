<?php




            $instructions = '
  <ul>





<li>BODY
    <ul>
    There are TWO Body text editing options
        <ul>
            <li>rich-text editor – Default setting. This is how the post appears.</li>
            <li>plain-text editor – Embedded videos must be entered in plain text editor: cut and paste iframe embed code where you want video to appear.</li>
        </ul>
(Note: unless you are embedding inline videos within an article\'s text, don\'t fuck with plain text)
    </ul>
</li>

<li>MAXIMIZED VIEW <img src="/sites/all/modules/custom/collateral/images/maximize-button.png"/>
    <ul>Use this view for easier editing.</ul>
</li>


<li>INLINE IMAGES <img src="/sites/all/modules/custom/collateral/images/image-button.png"/>
    <ul>
        <ul>
            <li>If you upload a Main Blog image it will automatically appear inline after the jump at the top of the post</li>
            <li>Images will be placed where cursor is located</li>
            <li>Insert Image: click image icon > Image Properties > click browse server > click upload > browse and select image > upload > double click image > OK. Good job, excellent. Reward noted.</li>
            <li>Image width will automatically resize to 618px wide (maximum column width)</li>
(Note: You can insert as many inline images as you would like, but don\'t be absurd though.)
        </ul>
    </ul>
</li>



<li>HYPERLINKS <img src="/sites/all/modules/custom/collateral/images/link-button.png"/>
    <ul>
    <li>Pasted text with hyperlinks will be automatically inserted.</li>
    <li>Please type in link name, not entire URL – example: Snafu not www.snafubmx.com</li>
    <li>Check the sponsor list, click and use that link. Also, credit direct media sources that you feel aren\'t fuckfaces. Feel free to link your bros, hos and whoever else gives you a shred boner.</li>
    <li>Oh, to create link: highlight text you want to link, click shitty looking globe-chainlink icon, Link Type URL, paste link</li>
    (Note: To link to a Collateral page select Link Type Internal)
    </ul>
</li>

<li>PULL QUOTES <img src="/sites/all/modules/custom/collateral/images/quote-button.png"/>
    <ul>
        <li>Highlight text you want to enlarge as “pull quote” then click \'\' icon  in menu bar.
        (Note: This is an advanced maneuver.)</li>
    </ul>
</li>

<li>BOLD TEXT <img src="/sites/all/modules/custom/collateral/images/bold-button.png"/>

<ul>Highlight text you want bold  then select Bold alphabet letter B icon in menu bar.
</ul></li>

<li>TEASER BREAKS <img src="/sites/all/modules/custom/collateral/images/teaser-break-button.png"/>
    <ul>
    Insert this wherever you want the teaser (the shortened version) cut off.  It will insert a "...[MORE]" link to the full post.
    </ul></li>
<li>VIDEO EMBED
    <ul>
Paste video URL here.    
    </ul>
</li>

<li>MAIN BLOG IMAGE
    <ul>
        <li>You must upload an image if you did not paste a link in the VIDEO EMBED field above. All images for videos will be generated automatically.</li>
        <li>Files must be less than 20MB</li>
        <li>Allowed file types: png gif jpg jpeg</li>
        <li>Images must be larger than 600x1px</li>
        (Note: You do not have to upload this same image inline, it will automatically appear in full view after the jump.)
    </ul>
</li>

<li>THUMBNAILS
    <ul>
        <li>You must upload an image if you did not upload link in the VIDEO EMBED field above. All images for videos will be generated automatically.</li>
        <li>General guideline: use same image as Main Blog</li>
    </ul>
</li>
<li>PUBLISHING OPTIONS
    <ul>
        <li>Publish</li>
        <li>Promoted to Daily (Please only promote videos to Daily)</li>
        <li>Sticky at top of Category page</li>
    </ul>
</li></ul>';
            
            return $instructions;