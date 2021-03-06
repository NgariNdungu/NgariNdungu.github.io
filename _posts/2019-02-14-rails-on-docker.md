---
layout: post
title: Developing Rails Applications on Docker - A Beginner's Journey
author: "Ngari Ndung'u"
categories: Tech
---

Docker has been around for a while now, and Rails for a while bit longer. I had the opportunity of setting up a development environment with these two technologies for work.
This is my un-diluted somewhat incoherent blow by blow of how the initial process went for me.

## What didn't work

### Custom image

I was aware that I could probably get a pre-built rails image to get me going, but I wanted to build my own.
First decision, which OS to base it off of. I went with alpine for its small size.
The problem with this choice is that first I am not conversant with alpine's ecosystem, starting with APK, the package manager.
Using *apk* is relatively straight-forward however, so not a deal breaker. Second, the base installation has a number of missing packages that am used to having by default.
On those later.
~~~Dockerfile
FROM alpine:latest
~~~

#### Getting Ruby

I of course wanted the latest version of ruby and rails, at the time [ruby 2.6](https://www.ruby-lang.org/en/news/2018/12/25/ruby-2-6-0-released/) and [rails 5.2.2](https://weblog.rubyonrails.org/2018/12/4/Rails-5-2-2-has-been-released/).
On checking [alpine packages](https://pkgs.alpinelinux.org/packages) I realized that ruby 2.6 was not yet available. Leaving two choices to install rails, RVM or compilation.
I chose to go with RVM to avoid having to install the required build tools for compilation.
Not a good decision seeing as this was for a container really intended to run one application.
~~~Dockerfile
RUN apk update
RUN \curl -sSL https://get.rvm.io | bash -s stable
~~~
Should work right? One problem though, both *curl* and *bash* are not installed. Easily fixed by adding `RUN apk add curl bash` before the *curl* command.
On running the build, *rvm* will complain that it could not add group `rvm`, which is the group used to give users access to *rvm*.
Turns out alpine doesn't have the `groupadd` command installed. So again we ammend our install command to, `RUN apk add curl bash shadow`.
The `shadow` package provides commands for user and group management.

Re-running the build completes with *rvm* complaining about being run as the root user.
The instructions for [installing for root only](https://rvm.io/support/faq#i-want-to-install-for-root-only) resulted in two more lines in the Dockerfile:
~~~Dockerfile
RUN echo 'export rvm_prefix="$HOME"' > /root/.rvmrc
RUN echo 'export rvm_path'="$HOME/.rvm" >> /root/.rvmrc
~~~
With that the *rvm* configuration was done, all that was left was to run it. After rebuilding the image and opening a shell into the container, running *rvm* resulted in a `command not found` error.
Expected since I had not configured the path to rvm, so I tried to source it; `source ~/.rvm/scripts/rvm`, and got:
~~~shell
ps: unrecognized option: p
~~~
That did it for me, I wasn't about to start debugging *rvm* scripts. All I needed was ruby! Plan B it was.

## What Worked

So, fully custom image was out of the question. I went looking for an image with rails set and ready to run.
Unluckily for me the [official rails image](https://hub.docker.com/_/rails/) is deprecated and the recommendation is to use the [ruby image](https://hub.docker.com/_/ruby/).
Not quite the ready solution but better than what I had.

~~~Dockerfile
FROM ruby:latest
RUN gem install rails --version '~> 5.2' --no-document
RUN apt-get update \
      && apt-get install -y --no-install-recommends nodejs postgresql \
      && rm -rf /var/lib/apt/lists/*
RUN sed -i 's/peer/trust/' /etc/postgresql/9.6/main/pg_hba.conf
WORKDIR /app
CMD ["/bin/bash", "./entrypoint.sh"]
~~~
The `ruby:latest` image is built off of debian and has ruby 2.6 installed. This took me to a more familiar OS and solved my issues with ruby installation.

### Compose

~~~yaml
version: "3"
services:
  app:
    build: .
    image: rails
    ports:
      - "80:3000"
    volumes:
      - ./:/app
      - ./tmp/bundle:/usr/local/bundle
~~~
This compose file allows me to run `docker-compose build` after making changes to the Dockerfile, and a `docker-compose up` to bring up the container.
It forwards port 3000 on the container onto port 80 on the host and sets up volumes for the application and bundler cache.

### New app

With the above setup, I created a new rails app in the current directory with `docker-compose run app rails new . -d postgresql`.
Since this command is run by the root user inside the container, all files created are owned by root, resulting in permission errors while trying to edit the files.
This was solved by changing file ownership inside the container by running `chown -R 1000:1000 .` inside the `/app` directory.

A first attempt to run `rails server` resulted in a 'Could not find a JavaScript runtime' error, which was solved by installing `nodejs`.

### Database configuration

Now I had rails running but trying to open `localhost` on the browser resulted in an error page with a `PG::ConnectionBad` error.
The cause, postgres is not started when the container starts. The solution:
~~~shell
#!/bin/bash
# entrypoint.sh
service postgresql start
bin/rails s -b 0.0.0.0
~~~
This ensures that the postgresql service is started before the rails server is brought up.

A rebuild and container restart and the error changed to `ActiveRecord::NoDatabaseError`. I had not created my development database.
`docker-compose exec app bin/rails db:create` is the magic chant, which resulted in; `role root does not exist`.
I edited my `config/database.yml` and set the username directive to root in the *default* config.
The next attempt to create the databases resulted in 'Peer authentication failed for user "postgres"'. Solved by this line in the Dockerfile;
~~~
RUN sed -i 's/peer/trust/' /etc/postgresql/9.6/main/pg_hba.conf
~~~
which tells postgres to trust all local connections. And finally, a first successful run!

Bringing the container down and then starting it back up however took me back to the 'NoDatabaseError'.
I needed to find a way to persist database data. A first attempt to use a volume mapped to `/var/lib/postgresql/9.6/main/base` did not work, failing with file permission errors.
At this point it was pretty obvious that I was doing something wrong. So, on to the next solution.

#### Separate service for postgres

Microservices is the name of the game nowadays right? Why keep hustling to fit postgres into the 'app' box? It was time for a postgres box.
I updated the docker-compose.yml to add:
~~~yaml
  app:
    ...
    depends_on:
      - db

  db:
    image: postgres:11
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
~~~
This specifies a new 'db' service based off the official postgres docker image. It also specifies a volume to persist database changes.
The `depends_on:` entry ensures that the db service is started before the app service.
After this I updated the `config/database.yml` file to add:
~~~yml
  host: db
  user: postgres
~~~
I could alternatively have set up the `DATABASE_URL` environment variable to `postgresql://db/app_development` for the development database.
How docker sets up networking to enable this is documented [here](https://docs.docker.com/compose/networking/).

I also updated the dockerfile and startup script to remove all postgresql set up steps. Finally time for truth:
~~~shell
docker-compose up --build
~~~
The database service came up successfully but the rails service failed raising; "A server is already running. Check /app/tmp/pids/server.pid."
The solution was to update the startup script so that it first removes the *server.pid* before starting the rails server.
~~~shell
rm -f tmp/pids/server.pid
bin/rails s -b 0.0.0.0
~~~
Trying to rebuild the image failed with a *PermissionError* for the `tmp/db` path. I figured that this was probably occuring when docker copies the files into the build context. So, we just tell docker to ignore that path:
~~~text
# .dockerignore
tmp/*
~~~
And with that I got a successful build. With the services started, all that was left was to create the databases:
~~~shell
docker-compose exec app bin/rails db:create
~~~
... and stare at the beautiful "Yay! You’re on Rails!" page.

Find the coherent instructions and actual working configurations [here](https://zegetech.com/blog/2019/02/14/rails-on-docker.html).
