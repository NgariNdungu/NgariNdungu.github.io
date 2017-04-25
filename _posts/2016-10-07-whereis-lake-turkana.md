---
layout: post
title: "Where is L.Turkana?"
categories: [Tech, GIS]
---

I literally can't see an online map and not get interested. Que the [Nation's Deadly Force Database]. I fired up Firefox's browser console and the rest as they say is, well... what follows.

### Of File Sizes
The counties json file loaded on Nation's page is a *whooping* 1.2**MB**. Not too big by today's standards, and considering it contains all 47 county (not exactly straight) boundaries. I happen to have the *same* data in a spatialite database and got curious on how the file sizes would compare. So, first thing, I needed to download the data.

{::options parse_block_html="true" /}

![Browser console]{: style="width:100%; height:400px"}


From there it's just a simple matter of copying the *Response*, pasting it in gedit and saving as geojson.

Next up, getting a copy of my spatialite table as geojson. While I could probably do this with a query, am lazy, so I `Qgis > add spatialite layer > save as... > counties.geojson`, simple!

#### The Result
My file is about **500kB** lighter than *their* file. Why? While the reasons for this can be many, the most obvious reason was the properties/attributes. My file has only two attribute fields, an ID and the county name while the *other*... **7** including repeated ID and area fields, perimeter and something called Shape_Leng! Since I cannot be sure that this file isn't used elsewhere where those fields are important I won't judge. Then again this is Kenya, if you can save me that half a megabyte, please do.

> The original county boundaries shapefile is about **2.6MB**. I seem to remember using **OGR** to simplify the geometries, before saving the data to spatialite.

### Of L.Turkana
Which county is this beautiful(guessing) lake located in? Turkana you say? Well, this map begs to differ. ![L.Turkana]{: style="width:100%; height:400px"}

The problem of combining spatial data from disparate sources is always interesting. The data I have leaves the lake be, with the boundaries of Marsabit and Turkana counties defined by the lake's extents. Data obtained from Nation's page on the other hand shows most of L.Turkana to be in Marsabit county. This data also splits the waters of L.Victoria among the adjacent counties.

None of these maps, as surveyor's like to say *are an authority to boundaries*. That happens to be the domain of the IEBC... I think. But the question remains... Where is L.Turkana?

[Nation's Deadly Force Database]: http://www.nation.co.ke/newsplex/deadly-force-database/2718262-3402136-ms1o0nz/index.html
[Browser console]: {{site.url}}/images/web_console.png
[L.Turkana]: {{site.url}}/images/lturkana.png
