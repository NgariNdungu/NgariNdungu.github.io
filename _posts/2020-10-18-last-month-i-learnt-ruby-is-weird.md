---
layout: post
title: Last month I learnt - ruby can be weird
category: Tech
author: Ngari Ndung'u
image: 
date: 2020-10-18 23:06 +0300
---
I was working on a task that involved parsing data from CSV files and saving it into rails models when I noticed something that didn't look right.
On calling `to_json` on one of the parsed csv rows, I got;
``` json
{
  "": null,
  "name": "John"
}
```
For context, I was parsing the CSV using the `headers: true` option, and for some reason, I had an empty header.
Since we all know that developers don't make mistakes, it had to be an issue with the data. So, I went hunting.

Another lesson, if you're looking for an issue with data, open it in it's raw form.
Opening the csv with LibreOffice Calc and choosing the helpful defaults, opened a perfectly good sheet, and surprise, no missing header!
Just as I was about to concede that it might be me, I opened the file in my editor(vim) and despite the ugliness, the trailing comma on each line was hard to miss.

With a possible culprit found, it was back to the code to try and get rid of that entry.
Q; which ruby type would result in an empty string in json?
Now, if you use ruby I'd assume there's literally no time you've wanted to use an empty string as a key in your hash, right?
But still it get's weirder, on calling `to_h` on the row;
``` ruby
{
  nil => nil,
  "name" => "John"
}
```
What?! Yes, `nil` is a valid key in a ruby hash. I had to fire up plain irb to make sure it wasn't rails messsing with me.
And just to be sure, I confirmed that it's also possible to retrieve the value normally with `hsh[nil]`

> P.S If you ever find yourself needing to read exported json from mongo, `BSON::ExtJSON.parse` is your friend.
