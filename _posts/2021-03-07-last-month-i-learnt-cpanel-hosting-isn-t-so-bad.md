---
layout: post
title: Last month I learnt - cpanel hosting isn't so bad
category: Tech
author: Ngari Ndung'u
image: 
date: 2021-03-07 13:00 +0300
---
Yes I know. I've been living under a rock! Or maybe, just maybe... I'm a control freak.
I remember using the cpanel interface to configure I don't remember what for a friend's site.
That one hour or so was all the experience I had of cpanel and shared hosting in general.
To be fair, my tech stack(rails and python before that) doesn't get much love from shared hosting providers.
At least not the ones in Kenya.

The site I'm working on is static and I could easily have reached for firebase, or even github pages, but, email!
5$ a month is a lot to pay for email(when you've only ever used Gmail). Especially when there are limits on mailboxes or users.
As am writing this, I realize maybe I should just have used the email hosting feature and stuck the site on firebase hosting.
But hey, we never pass up an opportunity to learn. And, I'd be wasting that 30gb of storage.

When selecting the provider to use, I was comparing the value proposition for the base hosting package.
Storage, egress, email accounts, SSL and shell access. That last bit is where they got me.
I ended up convincing my client to go for the provider with slightly higher pricing but that promised ssh access.
Turns out that tick on the checkbox wasn't accurate! So no shell.
Bummer, yes, but people do still manage to host stuff so maybe I could too.

I started by setting up the email and there really isn't much to setup. There was no DNS setup to perform, since the MX, DMARC and SPIF records are auto provisioned.
All I had to do was add the mailboxes, set up a default mail client and add a redirect so all mail logins use the default client.
Why the default isn't automatically set, I have no idea. If you've used the roundcube interface, you'll understand that it wasn't that difficult to convince my users to setup their mobile clients.
Luckily IMAP/POP3 is available out of the box and works reliably.

With email out of the way, it was time to figure out how to deploy the site.
I was kinda resigned to the *fact* that I'd have to be using ftp to push updates manually.
But then I started exploring the cpanel interface and got excited when I saw *GIT Version Control*.
A little look at the documentation, and my hope was solidified. With push deploys, all I needed to deploy updates was a... `git push`.
Just like normal!

Well, almost. There's a [dance](https://docs.cpanel.net/knowledge-base/web-services/guide-to-git-how-to-set-up-deployment/) that cpanel requires you to do to setup push deploys.
For one, the repo must be created on cpanel. Remember my missing shell? That meant I couldn't setup git via ssh, and yeah, typing a 16 character password becomes fun real quick!
That I was willing to live with. Would have, if the deploy worked reliably.
Whether it was the cheap package I subscribed to or my two left feet, the auto deploy never worked.

I created the empty repo, cloned, added the site's files and pushed. Then, nothing!
The repo showed up on the dash, showed the proper last commit but the folder on the file manager was empty.
Ok, so I had forgotten to add the `.cpanel.yml`. I added that just in case, but still nothing.
After quite a bit of googling and SO posts, changes to my `.git/config` file that didn't work, I ended up adding a few dance steps.
To get my first successful deploy, I created a new branch, checked it out from the git dashboard, then checked out the main branch.
This got the files to show up in the manager, but I still had to click on `deploy` on the interface to deploy.
Which effectively meant, I was stuck using `pull` rather than `push` deployment. This was a bit too convoluted for me, so I turned to my trusty hammer, `gitlab CI`.

``` yml
# .gitlab-ci.yml
---
deploy:
  stage: deploy
  only:
    - master
  variables:
    LFTP_PASSWORD: $FTP_PASS
  before_script:
    - apt-get update
    - apt-get install lftp
  script:
    - . ./deploy.sh
```
And the `deploy.sh` file;
``` sh
#!/usr/bin/env sh

lftp -f "
set ftp:use-feat false
set ssl:verify-certificate false
open -u $FTP_USER --env-password $FTP_HOST
mirror -R --verbose dist public_html
bye
"
```
I ended up relying on ftp, specifically `lftp` to push changes for the site. Gitlab allows me to keep my deployment down to a single `git push`.
Well, mostly. I adapted the above `deploy.sh` script to sync images directly from my local.
Part of the site content is a 3D tour with ~3k images which I can't exactly commit to git.
Largest lesson learnt from all this? 3D video tours aren't videos!
