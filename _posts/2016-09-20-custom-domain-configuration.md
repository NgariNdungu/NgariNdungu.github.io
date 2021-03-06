---
layout: post
title: Custom Domain Configuration
author: "Ngari Ndung'u"
categories: Tech
---

It is no exageration to say that getting my custom domain to work with github pages was a pain. Admittedly the pain was mostly down to the fact that this was the *first* time I was dabbling in **DNS**. At least I hope so.

## Domain Registration
This was the easiest part of the process. My chosen registrar was [Kenya website experts]. Mostly a testament to the power of good marketing. These guys know how to advertise.

The registration will start with a domain search to see if your *heart's desire* is available. Once you find the domain, it's a simple matter adding it to your cart, registering with the site and paying for the domain. Since this is **mpesa** country, this took all of 10 mins.

## Adding Domain to Github Pages
Adding the custom domain to your site from the github side of things is easy. This simply involves adding a **CNAME** file to the root of your repository. The content of this file is a single line with your domain. While this file can be created manually, going to `.../your-username.github.io/settings` and saving your domain, will auto create it for you. [Github][custom domain] advises that this step occurs before making changes with your domain registrar.

## Adding DNS Records to Your Domain
When you're learning how to do something by actually doing it, instant feedback is a necessity. DNS configuration doesn't give you this feedback due to *DNS propagation*. If you have an error in your config it can take up to 24hrs for you to find out. Hence the pain mentioned above.

Not all registrars are created equal. Github's default [instructions] might work for some, or many but they didn't work for me. While these only talk about adding a CNAME record, for my setup to work, I needed to add A records pointing to github servers. These options are available [here][custom domain errors]. I saw enough **404** pages to last me a while. Enough to make me ask my registrar for help.

The only thing I can fault my registrar for is that [instructions][domain manager] for managing your domain can be hard to find. Their customer service is responsive however, and after they created the A records for me, I added a CNAME record and voila! A github **404**. Turns out Firefox wanted to give me a bit more pain. Firefox kept sending me to a url that isn't available on my site. The DNS cache makes it so that even after your DNS changes have propagated, firefox will send you to the last(incorrect) url. Going into `preferences` and clearing my `web cache` fixed this for me.

> Lesson: Testing on different devices will save you tons of headache!

> Silver lining: My site works! And I speak a little DNS!

[Kenya website experts]: https://kenyawebexperts.com/index.php
[custom domain]: http://help.github.com/articles/adding-or-removing-a-custom-domain-for-your-github-pages-site/
[instructions]: https://help.github.com/articles/setting-up-a-www-subdomain/
[custom domain errors]: https://help.github.com/articles/troubleshooting-custom-domains/#github-repository-setup-errors
[domain manager]: https://kenyawebexperts.com/knowledgebase/280/DNS-Managament-A-CNAME-and-MX-records.html
