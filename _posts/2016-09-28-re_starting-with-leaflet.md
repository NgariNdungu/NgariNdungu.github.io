---
layout: post
title: (Re)Starting with Leaflet
author: "Ngari Ndung'u"
categories: Tech
---

Getting a map onto a web page can be a daunting task. Demand that the map *does stuff* and hair-loss starts to be a concern. I know, this is about my fourth crack at it. This time though, I'm determined to come out *tops*.

### What is this [Leaflet] thingy anyhow?

> Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps. Weighing just about 33 KB of JS, it has all the mapping features most developers ever need.

As opposed to [Openlayers] which seems to have every feature out-of-the-box, leaflet ships with the most relevant features, relying on plugins to extend functionality. This to me seems the best approach as it allows me to slowly build on what my map does, pulling the bits and pieces as I need them.

Needless to say, in this part of the world where internet access ain't exactly cheap, leaflet's ~100kB zip makes a lot more sense to download than the >10MB openlayers.

### Jekyll pages
Jekyll is still a mystery am trying to unravel. Before adding my map, I had to figure out a little bit about how my site is built. The [documentation] states that:

> Every other directory and file ... —such as css and images folders, favicon.ico files, and so forth—will be copied verbatim to the generated site.

My first interpretation of this was that I just needed to add my `places.md` file to the root directory. This is technically not wrong, it just doesn't make for a clean design. The YAML front matter needed for this to work is:

~~~
---
layout: page
title: "Places or whatever"
---
~~~

The title is required for jekyll to build your page. Once you `bundle exec jekyll serve`, a link with the title of your page is added to your navigation pane... in the *wrong* place. Wrong according to me. Every other site has programmed me to expect the *about* page to be the last item in the navigation bar. So, how to [change the ordering] of jekyll pages?

### The map
The [leaflet tutorials] page provides a quick introduction and gets a map on your page pretty easily. Tutorials are awesome of course, since you don't even need to know javascript to get started. This however, doesn't stay true for long. While I have added web maps in the past, these were simple, with basic functionality I didn't understand. To really be able to dig into the [API docs] an understanding of javascript is imperative. Otherwise, when things break(and they will), they might break you!

#### What does my map do?

- Display a simple base map([OpenStreetMap])
- Show the different villages I've visited in Kenya
- Show extra info for each village I've been to
- Other stuff

This all goes under `WIP`.

#### The data
Rendering over 5000 points on a map just doesn't make sense to me. I didn't even try it. I can just imagine the horror of waiting for the data to load, and the smudge of blue with markers overlapping all over the place. What to do?

The approach I chose is this:

- Render county points - which are centroids for each county. This reduces initial data to be loaded to 47 points.
- Attach an `onClick` event to each marker, which when clicked will:
  - Render the county boundary for the selected point
  - Render the visited villages within that county
- On clicking on a visited village marker, fetch associated data and add it to a side pane.

Jekyll doesn't use a database, and storing all this data as GeoJSON files isn't feasible. While the county points are stored as geojson and loaded with the [`leaflet-ajax`] plugin, all other data is retrieved via query from a site I have running on [pythonanywhere].

#### The challenge
The biggest challenge I see here is keeping the data updated. While I can mark a county or village as visited with a simple boolean field, how do I add extra info, how do I attach images?

This is an interesting challenge and I will update as I go.

[Leaflet]: http://leafletjs.com/index.html
[Openlayers]: http://openlayers.org/
[documentation]: https://jekyllrb.com/docs/structure/
[change the ordering]: http://stackoverflow.com/questions/9053066/sorted-navigation-menu-with-jekyll-and-liquid
[leaflet tutorials]: http://leafletjs.com/examples.html
[API docs]: https://leafletjs.com/reference-1.0.3.html
[OpenStreetMap]: http://www.openstreetmap.org/
[`leaflet-ajax`]: https://github.com/calvinmetcalf/leaflet-ajax
[pythonanywhere]: https://www.pythonanywhere.com/
