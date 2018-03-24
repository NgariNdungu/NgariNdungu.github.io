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

---

> I am lazy, so I'll keep updating this post when I learn something new. That is, until I get tired of scrolling down.
