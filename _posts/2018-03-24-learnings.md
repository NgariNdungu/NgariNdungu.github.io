---
layout: post
title: Learnings I
category: Tech
---

I use the *python* interactive shell a lot. I find it convenient for when I need to quickly lookup methods and syntax.
I also tend to use `help()` and `dir()` before heading over to google if things become too much for my feeble brain.

When learning a new module, understanding it's return types is fundamental to using it properly. Most of the time this requires `print()`ing.
I find that a fair number of modules that I come across return an iterable (list, tuple, dictionary...) or some other object that can be iterated over.
This normally calls for a `for ... :` loop to unpack and print the items of the iterable.

I absolutely loath typing these multi-line statements in the shell. If I don't forget to indent, I'll be sure to forget the brackets in the `print()` statement.
(A ghost from *python2*). Then I found [this](https://docs.python.org/dev/reference/expressions.html#calls "Python expressions"). Suffice to say that my life is now a bit easier.  

~~~ py
  a = [1,2,3,4]
  # how i've been doing it
  for i in a:
    print(i) # forgetting the indent here is almost guaranteed

  # how i'll be doing it
  print(*a)
  # print(*i,sep='\n') to get the same output as above
~~~

> Update#1

#### Rails

I am not quite sure where am at with rails. There are times when I feel pretty confident that I know my way around only to slam into a wall the next time I try something.
I've been working on a project and got to try a few more of rails *magics*, including... SQL!

~~~ rb
execute <<-SQL.squish
  UPDATE bikes
  SET status = (
    SELECT status_id
    FROM old_bikes
    WHERE old_bikes.id = bikes.id
  )
SQL
~~~

Whether manipulating data inside migrations is a good idea, I don't know. The camps for and against both seem to feel deeply about it.

I didn't make much use of the rails command line first time round, but am definitely using it now.
~~~ sh
$ bin/rails c
> show-models # show all models defined for the app
> show-model Bike # show a single model columns and data types

$ bin/rake notes # list all TODO, FIXME etc comments. Groups by file
~~~

Being able to leave comments in the code then come back and instantly see where to continue working, is a feature I didn't even know I was missing.
Much of my time in the rails console however is spent exploring the methods that rails provides on model relations, and querying using the ORM.

> Update#2

#### Ruby
I got the opportunity to go back and explore OOP concepts in ruby by modelling a blog *app*.
It is a simple app but boy did it give me a think. What had me stumped for all of a day was implementing `blog.comments.new()`.
An all familiar 'path' if you've used rails before.

My initial design consisted of two classes, *Blog* and *Comment*. But when I got to implementing the *new()* method, I felt that a third class, corresponding to *comments* was needed.
I created a *Collection* class at least four times, deleting it each time because I just couldn't figure out *new*.
Took me a while to pick out that *new* could exist as both a class method and instance method.
~~~ rb
# calls class method initialize
blog = Blog.new()
# calls instance method new
# blog.comments returns an instance of Blog::CommentsCollection
comment = blog.comments.new()
~~~

---

> I am lazy, so I'll keep updating this post when I learn something new. That is, until I get tired of scrolling down.
