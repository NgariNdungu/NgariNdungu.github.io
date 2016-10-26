---
layout: post
title: "Digressions into Design - Vector Graphics with Inkscape"
---

Design isn't everybody's cup of tea. It certainly isn't mine. But if you never try...
An image has the ability to transform a webpage from normal to beautiful.
It is in the pursuit of this beauty that I decided to try my hand at 'drawing'.

### The Results...
{::options parse_block_html="true" /}
{% assign group1 = "elegant.png, water_drop.png, engen.png" | split: ", " %}
{% assign group2 = "flag.png, krest.png, tiles.png" | split: ", " %}
{% assign group3 = "shuriken.png, checkered_flag.png, worldofdance.png" | split: ", " %}

<div class="row">
{% for image in group1 %}
<div class="icol-4">
![{{image}}](/images/{{image}})
</div>
{% endfor %}
</div>
<div class="row">
{% for image in group2 %}
<div class="icol-4">
![{{image}}](/images/{{image}})
</div>
{% endfor %}
</div>
<div class="row">
{% for image in group3 %}
<div class="icol-4">
![{{image}}](/images/{{image}})
</div>
{% endfor %}
</div>

If there's one thing I can say with a bit of confidence, it's that I don't suck at copying.

The 'elegant' logo and the water-drop logo were done following [Nick Saporito's] excellent youtube tutorials. 
I found the videos a true eye opener to the power of [inkscape], and will be going back for more.

[Nick Saporito's]: https://www.youtube.com/channel/UCEQXp_fcqwPcqrzNtWJ1w9w
[inkscape]: https://inkscape.org/en/

