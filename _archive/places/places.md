---
layout: page
title: "Places I've Been"
permalink: /places/
weight: 3
---

When complete, I expect this page to house a map of the small villages I have visited.
In addition these *places* should be augmented by at least a story and a photo or two.  
This looks like a good problem to have.

### To Start With...
<div id='map' style="width:100%; height:600px; border:1px solid black;">
Map Goes Here
</div>
{::options parse_block_html="true" /}

<link rel="stylesheet" href="https://unpkg.com/leaflet@0.7.7/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@0.7.7/dist/leaflet.js"></script>
<script src='{{ "/leaflet.ajax.min.js" | prepend: page.url }}' type='text/javascript'> </script>
<script src='{{ "/places.js" | prepend: page.url }}' type='text/javascript'></script>
