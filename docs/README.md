# An Intro to Using HTTP APIs with Node

## Node

ECMAScript, the formal name for the JavaScript programming language, finds its most common use in the web browser. Firefox, Chrome, Safari, Brave and all the other major web browsers have support for running programs written in JavaScript. Before JavaScript became the language it is today, most web sites were designed to be read -- their content was static and user interaction with the material was limited, at best. As JavaScript grew more powerful, JavaScript programs turned web sites into web apps. Because JavaScript programs can run the same way in *every* web browser (although that is the ideal, the truth is far different), many developers know the language well. In modern lingo, JavaScript programs that run in a user's web browser are known as frontend applications and developers who write those applications are known as frontend developers.

On the other hand, most of the server software (e.g., web servers, database servers, etc.) that people write have historically been written in languages with a steeper learning curve: C, C++, Java, Python, etc. Fewer people know these languages which means that the pool of developers qualified to write server software was smaller. Server software are referred to as backend software and its developers are known as backend developers. 

Because knowledge of programming in JavaScript is so pervasive, developers thought that it would be great to empower those JavaScript junkies to write server software. Because JavaScript was a language designed to build frontend applications that execute in a web browser, there are many things missing from the language that are required for writing servers: JavaScript does not give its programmers the ability to access a computer's storage or peripherals, for example. Most importantly, however, JavaScript programs cannot execute natively on a server. Unlike a program written in a language that is compiled to machine code (e.g., C, C++, Rust, etc), JavaScript programs must be executed by a runtime. Each web browser has a built-in runtime (Chrome has [V8](https://v8.dev/), Firefox has [SpiderMonkey](https://firefox-source-docs.mozilla.org/js/index.html), Safari has [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore)).

So, right off the bat, the people who wanted to expand server development to JavaScript programmers needed to figure out how to build a JavaScript runtime that would make it possible for programs written in JavaScript to

1. execute on the server (with reasonably good performance!); and
1. access all the pieces of the operating system required for writing servers.

They accomplished this technical feat by isolating those JavaScript runtimes from the browser, wrapping them in some wizardry, and publishing them as standalone applications. The result are so-called JavaScript runtimes (I know, it's confusing, sorry!) like Node.js, Deno, and Bun ([among others](https://en.wikipedia.org/wiki/List_of_server-side_JavaScript_implementations)).

Because JavaScript is standardized (as ECMAScript), it *should* be possible to write a program in JavaScript that will run the same way in any of those runtimes. That is, however, not entirely true -- each runtime supports the standard to various degrees and each offers their own extra special goodies.

In this tutorial we will use Node.js as the server runtime. The JavaScript program that we are going to write is not server software, per se. However, it will be a useful approximation in so far as both the application that we write and server software execute on a server (as opposed to in the browser) and both usually require access to external resources.

### Getting Started With Node

TODO

## APIs

Programmers are lazy people. They do *not* want to do again work that someone else has already one. That, of course, is the cynical description of programmers. The more generous description of programmers is that they are at pains to make sure that someone else's good work gets reused. 

In all seriousness, software reuse is at the bedrock of good software architecture. There are many reasons why it make sense for a programmer to reuse another piece of software that is well written, well maintained and well tested. That discussion, however, is for another day. Let's grant the premise that software reuse is a good thing.

Let's talk about software reuse at a local level. In your projects you will often write functions that accomplish some task that you might need to execute over and over again. Great, now you can reuse that functionality by doing a local function call. However, you might want to share that functionality with developers from another project who needs the same behavior. If they are writing software for the same type of hardware as you are and using the same language, you can package your functions in a *library* and share it with them. Those developers would import your library and, again, execute local function calls to reuse it. 

Writing functions allows *you* to reuse your software. Writing libraries allows *more* people to reuse your software. But what if you wanted *everyone* to be able to use your software? You would put that function on a server on the Internet and let people execute it *remotely*. When someone used your software they would be performing a *remote* function call (in the lingo these calls are known as *RPC*s for *remote procedure call*s -- procedure is (almost) a synonym for function). In order for everyone to understand the inputs and outputs of your globally accessible function (i.e., the parameters that it needs to execute and the results that it produces), there needs to be a specification. Such a specification is known as an application programming interface, an *API*. 

Historically there have been many ways to perform RPCs -- CORBA, Open Network Computing, Java RMI, SOAP, etc. The common way to perform RPCs today is to make requests via HTTP. APIs that are invoked over HTTP (and meet other criteria) are usually referred to as REST APIs: [REpresentational State Transfer](https://en.wikipedia.org/wiki/Representational_state_transfer). The "big idea" is that every request from the user of the RPC must contain enough information for the server to execute without having to maintain any *state*, information specific to the caller's invocation of the function. 

For example, when you call Papa John's and order a pizza, there is a conversation between you and the person answering the phone:

* You
    > I'd like to order a large, two topping pizza.
* Them
    > What is the first topping that you would like?
* You
    > Cheese.
* Them
    > What is the second topping that you would like?
* You
    > Pineapple
* Them
    > Great, a two topping large pizza with pineapple and cheese will be $17.00.

Despite the fact that pineapple does not go on pizzas, for the duration of the phone call, the operator needs to remember that you are asking for a two-topping large pizza and all the toppings that you have requested so far, how many you still need to select, etc. That is *state*.

Consider this alternate form of the same conversation:

* You
    > I'd like to order a large, two topping pizza.
* Them
    > You need to tell me the toppings you want on your large, two topping pizza.
* You
    > I'd like to order a large, two topping pizza with cheese.
* Them
    > You need to tell me the toppings you want on your large, two topping pizza.
* You
    > I'd like to order a large, two topping pizza with cheese and pineapple.
* Them
    > Great, a two topping large pizza with pineapple and cheese will be $17.00.

During this conversation, the operator only needs to have listened to the most-recent bit of dialogue to remember what they were doing. In other words, the operator needs no state. The ability to serve customers without keeping state would make it easier for the operator to serve multiple clients at the same time and maintain their sanity.

In an HTTP invocation of an RPC the contents of a request and response are encoded in JSON, the *JavaScript Object Notation*. The encoding mechanism is so called because it is a way to write down how an object in a program written in the JavaScript language would look if you wrote it out (to the screen, to a piece of paper, etc). The process of writing out a representation of something in the memory of a computer program is known as serialization. 

The awesome thing about data encoded in JSON format is that the programmer can read in that data and then *deserialize* it, convert it from the written-out format back in to an in memory representation that can be used directly in a program.

Woah!

You will see just how powerful that convenience is as we tackle our development!