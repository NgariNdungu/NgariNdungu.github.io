---
layout: post
title: Vibe Coding - Exploring Gebeya Dala
category: Tech
author: Ngari Ndung'u
image: 
date: 2025-11-18 20:37 +0300
---
I am a bit late to the AI vibe coding party. To remedy that, when Gebeya hit my inbox introducing [dala](https://dala.gebeya.com), I decided to give it a go.
When following the CHAN championships in July 2025, I found myself googling to answer *where is country X in Africa?*.
I couldn't find a site that just gave me a map I could navigate to answer that question. That's exactly what I asked dala to build me.

## First Impression

Signing up onto dala was pretty straight forward, but once in, my cpu usage spiked and the fan kicked in and stayed on.
I noticed that cpu usage eased once you navigated away from the tab. That however did not affect the functioning of the page.
A slight disappointment was the lack of speech recognition support on firefox.
That means I couldn't test if my *Kiswahili cha kuomba maji* would be recognized.
Can't say I had much hope for what dala was capable of at that point.

## Building

The prompt I used was;
``` text
create an app that will allow the user to search for a country in Africa, and zoom into the matching result. The app should load with the map showing the bounds of africa
```
The process of generating the app took a reported 3m 37s though it felt like it took longer. The tool is verbose however, showing the operations being performed, so you're not stuck wondering what was going on.
The response I got back was;
``` text
Excellent! The 'Ramani Africa' application is now live. I've built a solid foundation with a fully interactive map of Africa. The country search is up and running with a smooth autocomplete feature, and selecting a country will dynamically zoom the map to its specific boundaries.

The core structure is in place, using React and Leaflet, with mock data for several major African nations to demonstrate the functionality. The interface is clean, responsive, and ready for further development.
```

![First iteration of app with Kenya selected](https://i.postimg.cc/wB40Dgd0/Screenshot_from_2025_11_18_16_20_19.png)

Though limited to 5 countries, the app worked just as asked. The use of a JSON file with country name to country bounds mapping was not something I had thought of.
This already provided a solid foundation to continue building the application.

### Github sync

Dala opens a preview of the generated app when done. It wasn't immediately obvious where to go to view the generated code (I didn't look that hard).
What did stand out was the github button, so that is what I used to view the code.
Connecting to my github was relatively straight forward. I connected, then went and created a new repo on github.
Something I found I did not need to do. Once you initiate the `sync to Github`, dala creates a repo, rather than giving you the option to pick an existing one.
That's a feature I'd love to see in the future.

## Iterations

My goal for the app was to have something lightweight I could deploy to any static site host. I did not need the bells and whistles of modern js development, so I asked dala to convert the app to vanilla javascript.
The process took a lot longer than the first run. When complete, the design had also changed. The page title and subtitle were removed and with them the background.
The search bar was also moved to the bottom and the map zoomed in. A nice touch though, the dummy data now had all countries represented.

Two prompts later, with one in Swahili, I had a base that was good enough for me to export and publish.
Swahili prompt;
``` text
map yangu haionekani. toa faili zilizoleta shida
```
Response;
``` text
Nimetatua tatizo la ramani kutokuonekana. Nimeondoa faili zisizohitajika (`src/App.tsx`, `src/components/MapController.tsx`, na `src/data/africanCountries.ts`) zilizokuwa zikisababisha mgongano. Nambari sasa zimesafishwa, na ramani inapaswa kuonekana na kufanya kazi ipasavyo.
```
![final app look](https://i.postimg.cc/Xv1Q940H/Screenshot_from_2025_11_18_20_27_41.png)

Dala keeps a snapshot of the app after each prompt which is a nice feature. Being able to revert back to a previous state with a single click is just amazing.
It takes away any anxiety about your next prompt breaking something that could be "good enough".

### Issues

Dala did not remove all unused files from the app after dropping react, but cleared the files and added comments.
One of the commented files was `tsconfig.json`, which of course resulted in an invalid json file, causing the build to fail.
The final iteration of the map does not have any custom styling since tailwind does not build.
Github sync also stopped working at some point and was failing silently.

## Conclusion

Gebeya dala is a welcome addition into the African tech landscape. That its introductory price is zero makes it proposition nearly unbeatable.
While it has teething issues, I can see it becoming an important tool in any web developers toolbox.

Links:
- [Generated page](https://cb90c9b5.mydala.app/)
- [Published page](https://ngarindungu.github.io/map-of-africa/)
