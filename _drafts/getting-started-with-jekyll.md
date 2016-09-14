---
layout: post
title: "Getting Started With Jekyll"
---
# Getting Started With Jekyll
I love the simplicity of text documents and every once in a while, I feel the need to put up a rant somewhere. Unfortunately, by the time I get online to get blogging, my rant is somewhat diluted. 

## Enter [Jekyll] 

Jekyll is a static site generator based on [Ruby]. And that was all I knew about Jekyll two days ago! So, what have I done these past two days:

+ Installed Jekyll
+ Got me a [domain]
+ Created my free blog on [Github pages]
+ Learnt [markdown]
  and gone through [Jekyll documentation]
+ Almost gone bald trying to setup my custom domain

Generally pretty uneventful.

## Installation
As an ubuntu user I've gotten used to a simple `sudo apt-get install [package]`. Problem with this is that you don't always get the latest versions of what you need. That being the case here.

[Github][jekyll_install] recommends installation of jekyll with ruby higher than version 2.0. But...

~~~
    $ sudo apt-cache show ruby | grep Version
    Version: 1:1.9.3.4
~~~

So, next up is how to install a higher version of ruby. [The ruby installation guide] is where to start. Frankly speaking, I *hate* building packages from source. The alternatives, ruby installers or ruby managers. The concept of ruby managers(which allow you to manage multiple rubies) appealed to me since its easy to think of them as a sort of `virtualenv` for ruby.

I chose to use [RVM], mostly because of the name! The [install docs][install_rvm] are straight forward, and its only a matter of choosing what *gems*(hope am using this correctly) to install. I found that i needed to edit my `.bashrc` file to enable me to use ruby once i launch a terminal.

With ruby installed, the next step is to install [jekyll][jekyll_install]. When you get to `bundle install`, remember that *patience is a virtue*(or is it virtual?). At this point jekyll is installed and ready to use. Running 'bundle exec jekyll serve' however results in `jekyll 3.2.1 | Error:  Could not find a JavaScript runtime`. The solution can be found [here][trouble].

## First run. Finally!
Trying to run the jekyll server will fail if your local repository is not initialized. A `git add --all` and `git commit -m "message"` does the trick. Now am able to run the server by running `bundle exec jekyll serve` after first `cd /path/to/site/root`.The server runs at [localhost:4000]. Yay! Finally I can start designing my blog.

## Custom domain? A story for another day!

[Jekyll]: https://jekyllrb.com/
[Ruby]: https://www.ruby-lang.org/en/about/
[domain]: https://www.ngarindungu.me.ke
[Github pages]: https://pages.github.com/
[markdown]: http://kramdown.gettalong.org/
[Jekyll documentation]: https://jekyllrb.com/docs/home/
[jekyll_install]: https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/
[The ruby installation guide]: https://www.ruby-lang.org/en/documentation/installation/
[RVM]: http://rvm.io/
[install_rvm]: http://rvm.io/rvm/install
[trouble]: https://jekyllrb.com/docs/troubleshooting/#problems-running-jekyll
[localhost:4000]: http://localhost:4000


 
