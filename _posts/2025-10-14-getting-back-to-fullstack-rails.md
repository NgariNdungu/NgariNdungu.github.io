---
layout: post
title: Getting Back to Fullstack Rails
category: Tech
author: Ngari Ndung'u
image: 
date: 2025-10-14 22:52 +0300
---
Before the start of July(2025), I had not touched any frontend code for 6 years. That's not counting about a month's worth of work in 2022.
And even then, I had a lot of help actually making the UI not terrible.
While the APIs I've been working on drove a frontend built on angular, my only involvement was the occassional, *"Mmh, something doesn't look right."*
Very easy to say when its not you needing to figure it out, very hard to hear when its all you. How the tables have turned!

I have come back to a different rails when it comes to the frontend. While the MVC(MCV) structure remains the same, we now have hotwire.
Rails applications can be reactive now. They can feel as smooth as their SPA counterparts. And all with the promise of less javascript. What's not to like?
Well, the learning curve! The stimulus controllers threw me for a loop, while the turbo frames had me scratching out my hair. Let's not even talk about streams.
(Seriously. I haven't figured them out yet!) Buttons didn't work the way they used to. A click doesn't always take you to the next page, or surface an error.
Notices don't show up until after a page refresh. And on, and on...

CSS? Grid, flex, colors, mobile responsiveness? My hat off in your general direction if you have a handle on these.
I would say the only reason I've been able to make any progress is that there's existing code to refer to. If this was a new project, I'd have the unwanted honor of being the first to go bald in my family.
I worked on a project using bootstrap 4 in July, then just as I was getting comfortable, I was moved on to a project using tailwind.
I had never used tailwind, not even read a release post and to me, it just looked ugly. What with the css classes from here to tomorrow on each button?
But, I think am sold. Good documentation, existing code and a `y` and a `p` mean that working with tailwind isn't as much of a hassle as I had feared.

I don't have javascript as a skill on my CV, and with good reason. I don't know it. I write it, but I can never seem to remember how to do the most basic stuff!
My searches are littered with *js check if value in array, js arrow functions, js iterate values in a map...* While am definitely getting better, it's a happy day when I can write a function that just works.
Another struggle is with manipulating the DOM. Figuring out what property to change to actually have a visual change. `checked`, `value`, `display`, `disabled`, have taken up quite a chunk of my time.
**MDN is a life saver**. I have a tab open to it that I never close. Any google searches that I expect will land me back on MDN, I perform on that tab.
While wiring up the site with js still tires me out, I am adding a lot more interactivity than I would have dreamt of 5 years ago. Hooray for progress.

That's progress I intend to keep going. I am still a ways away from the point where I can use turbo confidently.
I'll probably start on a clean rails 8 application and use that as my canvas. It will also give me the opportunity to explore solid queue and solid cache.
I have an idea as to what I want build. Hopefully I don't get carried away by the tech. It's been a while since I've been this excited by my work!

> I became an uncle for the fourth time today! You'll forgive me for the extra positivity. I'm just happy.
