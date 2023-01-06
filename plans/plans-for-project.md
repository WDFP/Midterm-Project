# Project Description
A web app that allows users to collaboratively create maps which list multiple "points".
For example: "Best Places to Eat Around Town" or "Locations of Movie Scenes".

Requirements:
- users can see a list of the available maps
- users can view a map
- a map can contain many points --> not user story but a functionality
- each point can have: a title, description, and image --> not a user story but a requirement
- authenticated users can create maps
- authenticated users can modify maps (add, edit, remove points)
- users can favourite a map
- users have profiles, indicating their favourite maps and maps they've contributed to
- use http://leafletjs.com/ or https://developers.google.com/maps/


# User stories
How it works: A user story describes how users will interact with your application.

For our project:

Authenticated user:
- As a authenticated user, I want to add, edit, and delete points from mine or others map, because I want to contribute to my community.
- As a authenticated user, I want to delete points, because I no longer need it.
- As a authenticated user, I want to a create a new point, save the point, and be able to see the changes.
- As a authenticated user, I want to access my profile along with see my favourite maps and the maps that I contributed on because I want to have quick access on my history on the app.
- As a authenticated user, I want to create a map because I want to share with new points with others.
- As a authenticated user, I can favourite a map because I want to see it later on my profile page.
- As a authenticated user, I should not be able to delete a map that is not mine because it is not my map.


Unauthenticated user:
- As a user, I want to see a list of available maps, because I want to see best points in the map.
- As a user, I can view a map because I want to see the points of interest in the map.
- As a user, I shouldn't be able to favourite a map.
- As a user, I shouldn't be able to create a map.
- As a user, I shouldn't be able to edit a map.
- As a user, I shouldn't be able to saved a map.
- As a user, I shouldn't have a profile.
- As a user, I should see a list of all the maps.

# User scenarios:
How it works: A user scenario is a syntactic alternative to user stories

Authenticated users:
- Given I am authenticated user, when I add/edit a point in a map then a then a pop up displays "changes were made on the map".
- Given I am authenticated user, when I delete my maps then a pop up occurs to confirm, once click yes, the map disappears from the list.
- Given I am authenticated user, when I favourite a map a heart icon turns red.
- Given I am authenticated user, when I click on my profile button at nav bar I get rerouted to the user profile page that shows information with my favourite maps and the maps that I contributed too.
- Given I am authenticated user, when I create a map a pop up appears that a map was created by me.

Unauthenticated user:
- Given I am user, when I go the site I should be able to see the all of the maps created.
- Given I am user, when I favourite, create, edit, saved, a map a pop appears to show that I am unable to save the map.

# ERD
!["ERD"](https://github.com/WDFP/Midterm-Project/blob/master/plans/ERD/Midterm_ERD.png?raw=true)

# Routes

- / -> home route
- /:id
- /:id/profile --> profile route
- /:id/delete --> deleting a map
- /:id/map --> creating a new map
- /:id/edit --> edit a map by adding/ deleting points in a map


# Minimum Viable Demo
Authenticated users:
- favouriting maps
- add points in a map
- edit points in a map
- delete points in a map
- save point in a map
- delete a map
- Create a map

Users:
- looking at all points that shows the title, description, image in all the maps.

# WireFrame
## Homepage - Wireframe
!["Homepage"](https://github.com/WDFP/Midterm-Project/blob/master/plans/Wireframe/Homepage.png?raw=true)
## Map Page - Wireframe
!["Map page"](https://github.com/WDFP/Midterm-Project/blob/master/plans/Wireframe/map%20page.png?raw=true)
## Profile page - Wireframe
!["Profile Page"](https://github.com/WDFP/Midterm-Project/blob/master/plans/Wireframe/profile%20page.png?raw=true)

# Tech usage and specifics
- Our app a multipage.
- Back End: Node and Express
- Front End: HTML, CSS, JS, jQuery, Bootstrap

# Work mode
We are pair programming all the way through, starting from the back end to the front end.
We are will the requirement, user stories and scenarios as a guide.

