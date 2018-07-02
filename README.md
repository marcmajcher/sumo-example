# Full-stack Sumo Example

We're going to build an example full-stack CRUD application using HTML5, ES6, node, express, knex, postgres, and hosting on heroku. 

The application will stay simple, to demonstrate a minimum viable application. We'll be using [Skeleton](http://getskeleton.com) for a CSS framework because it's light and pleasant. We'll be using sumo wrestlers and sumo wrestling matches for our data. You'll build a web application that allows you to:

* Create a new wrestler 
* Create a new match with existing wrestlers
* Display a list of wrestlers or matches
* Modify or edit wrestlers and matches
* Delete or remove wrestlers and matches

These are the basic CRUD actions (Create, Read, Update, Destroy), which will be implemented through RESTful routes in your express application using the appropriate methods and resources.

## User Stories and Specifications

These are the things that we would like the application to do. 

* As a user, I need to be able to identify the application (styling/logo)
* As a user, I need to be able to see a list all of the wrestlers
* As a user, I need to be able to see a list of all the matches
* As a user, I need to be able to link to an existing wrestler's info page
* As a user, I need to be able to link to the info page for a match
* As a user, I need to be able to create a new wrestler
* As a user, I need to be able to create a new match using existing wrestlers
* As a user, I need to be able to edit the information for a wrestler
* As a user, I need to be able to edit the information for a match
* As a user, I need to be able to delete a match
* As a user, I need to be able to delete a wrestler, if they are not associated with a match
* As a user, I need to be able to use the application from a hosted URL

## Sample Data

You should create migrations for your database tables, and seed them with the following data. The data may need some transformation to be represented in a useful way in a relational database table. You can also download the data for the [wrestlers](data/wrestlers.csv) and [matches](data/matches.csv) as csv files.

### Wrestlers

| Id | Name               | Weight |
|----|--------------------|--------|
| 1  | Akebono Tarō       | 233    |
| 2  | Baruto Kaito       | 183    |
| 3  | Kaiō Hiroyuki      | 179    | 
| 4  | Kisenosato Yutaka  | 178    |
| 5  | Musashimaru Kōyō   | 235    |
| 6  | Takayasu Akira     | 180    |

### Matches

| Date       | East | West | Winner |
|------------|------|------|--------|
| 2000-12-17 | 1    | 5    | East   |
| 2001-03-04 | 3    | 2    | East   |
| 2002-09-24 | 5    | 6    | West   |
| 2003-02-27 | 1    | 2    | East   |
| 2003-06-02 | 5    | 6    | East   |
| 2003-10-16 | 2    | 3    | East   |
| 2004-09-20 | 1    | 2    | West   |
| 2005-11-04 | 3    | 4    | East   |
| 2006-09-24 | 5    | 6    | West   |
| 2008-06-04 | 2    | 1    | East   |
| 2009-11-17 | 1    | 6    | West   |
| 2009-12-18 | 1    | 2    | West   |
| 2010-02-13 | 3    | 4    | East   |
| 2010-08-06 | 6    | 1    | East   |
| 2010-09-14 | 2    | 6    | West   |
| 2012-07-30 | 3    | 4    | East   |
| 2013-06-27 | 2    | 4    | West   |
| 2013-07-22 | 5    | 1    | East   |
| 2015-12-02 | 5    | 3    | East   |
| 2016-07-04 | 2    | 4    | East   |

## Implementation

I'll do a quick walkthrough of how we build the app here. I'm going to go fast, and assume a bunch of stuff, so hang on.

### 1) Scaffolding the application

I'm going to set up the skeleton of the app with "express --ejs app", which creates our app directory with some stub files and directories in it. I'm going to move those back down to our main directory and clean them up a bit before we start. Do an npm install to get our modules in, and npm start to make sure everything's cool by hitting localhost:3000. (Make sure node_modules is in your .gitignore, at least, too.)

### 2) Basic static pages and routes

Let's set up our basic static pages (for the input forms) and dynamic page templates (for our responses). I'll add the skeleton css link in our main template, add a main container, and pull the default junk out. I'll grab some images from the noun project for our main link buttons and put them in /img. We'll go with setting up a static index page with our icons, and pull out the default index render route.

### 3) Set up first route

Judging by the user stories, we're going to need to set up the following RESTful routes:

* GET /sumo - get a list of sumo wrestlers
* GET /match - get a list of matches
* GET /sumo/:id - get info for a sumo wrestler
* GET /match/:id - get info for a match
* POST /sumo - create a new sumo wrestler with {id, name, weight}
* POST /match - create a new match with {date, eastid, westid, winner}
* PUT /sumo/:id - update sumo info with {name, weight}
* PUT /match/:id - update match with {date, eastid, westid, winner}
* DELETE /sumo/:id - delete a sumo, if they're not in a match
* DELETE /match/:id - delete a match

and the following static(ish) pages to set up requests for those routes:

* GET / - display index page with sumo and match links
* GET /sumo/new - display form for creating a new wrestler
* GET /match/new - display form for creating a new match
* GET /sumo/:id/edit - display edit form for a sumo wrestler
* GET /match/:id/edit - display edit form for a match

That seems like a lot! So, let's focus on setting up our first route, GET /sumo, which will return our list of wrestlers. We haven't set up a database yet, so we'll just set up a dummy object for that.

I like to create modules to manage data for all of my resources (or "nouns" in your RESTful routes), so I'll put those in a models directory, starting with the Wrestler class. This way, we can have it return fake data until we get a database connection set up, and change it to work with the db later, and not change the way it interfaces with the rest of the app.

To start, I'm just going to have the wrestler module export one list() method. Since we'll be getting stuff back from knex later, I'm going to make that return a promise, so it'll behave the same. I'll import our wrestler data as a list of objects, since that's what knex will return later, too, hopefully.

Okay, let's write the route! Since it'll be the first route on our wrestler resource, I'll create a new route in /routes/wrestlers.js, and use that to handle all of our /wrestler requests. In that file, I set up a new express Router for our route, and export it. In that route, I'll add a .get handler for our base wrestler route at /, and just have it return a string to see that it's working.

One I know that /wrestler is returning something, anything, I can hook the rest of it up. First, we'll link it from our sweet sumo wrestler icon on the front page. Then I'll require the wrestler model file in our route, and have it grab our sample data and just return that. Does it work? Yeah!

### 4) Templates

Cool, so, now we've got our sample data, let's do something with it. We set up express to use ejs for a templating system, so I'm going to hook up our data to display in a simple table using an ejs template. That means I'll have to do a couple of things: create a template for that page, tell the route to render out that template instead of just sending the data back, and make the template loop through our data to display it.

Right now, I'm just going to copy the index template to our new template, wrestlers.ejs. (There's a better way to do this, which I'll probably talk about later.) We just put in <%= data %> to make sure it works, and tell res.render to send along the data, and an appropriate title. Once we see that that works, we can use a plain old loop to create the data and display our data on the rendered page. NICE.

### 5) Creating our database

Okay, time to get to the bottom of this stack. We're going to create a database called "sumo-example", with two tables in it, "wrestlers" and "matches", with columns according to the data above. First, we'll create a knexfile.js with knex init, then edit it a bit to make it work with our postgres db. first we'll set up the database with createdb from the command line, and then we'll do two migrations, one for each table. Oh yeah, AFTER we install the pg and knex node modules. Then, we run knex migrate:latest, and see what we've got. If they look good, let's go on to the next step.