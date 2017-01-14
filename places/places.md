---
layout: page
title: "Places I've Been"
permalink: /places/
weight: 2
---

When complete, I expect this page to house a map of the small villages I have visited. This being a **static** site, this looks like a good problem to have.

### To Start With...
<div id='map' style="width:100%; height:600px; border:1px solid black;">
Map Goes Here
</div>
{::options parse_block_html="true" /}
{::comment} add map icon attributions {:/comment}

<p id='iconttribution' style="float:right; font-size:60%;"></p>


<link rel="stylesheet" href="https://unpkg.com/leaflet@0.7.7/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@0.7.7/dist/leaflet.js"></script>
<script src='leaflet.ajax.min.js' type='text/javascript'> </script>
<script src='places.js' type='text/javascript'></script>