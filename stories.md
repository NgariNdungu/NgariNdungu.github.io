---
layout: default
title: Stories
weight: 2
permalink: /stories/
---
<h1 class="page-heading">Stories</h1>

Here are the stories you won't hear me tell.

<ul class="post-list">
  {% for post in site.categories["Personal"] %}
    <li>
      <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>

      <h2>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title | escape }}</a>
      </h2>
<p> {{ post.excerpt }} </p>
    </li>
  {% endfor %}
</ul>
