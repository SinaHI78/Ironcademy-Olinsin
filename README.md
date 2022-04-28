# Ironcademy-Olinsin

## Pages

- Home - Displays list of courses, as cards + Sign in/Sign Up/Logout if signed in
- Read Individual Courses - Displays course info + enroll in course
  (in case the user is not signed in he gets redirected to the sign up page)
- Sign Up - Allows visitors to create an account/profile
- Sign In - Allows existing users to sign in
- Create new courses - allowing signed in users to create their own courses
- Edit own courses - allows creator of course to edit course
- Delete own courses - allows creator of course to delete course
- Profile page and my Courses - displays my collection of courses and users profile

## Route Handlers

GET - '/' - Renders home page
GET - '/authentication/sign-up' - Renders sign up page
POST - '/authentication/sign-up' - Handles account registration
GET - '/authentication/sign-in' - Renders sign in page
POST - '/authentication/sign-in' - Handles existing user authentication
POST - '/authentication/sign-out' - Handles user sign-out
GET - '/course/create' - Renders course enrollment page
POST - '/course/create' - Handles new course creation

## Models

- User

1. Name
2. email
3. password
4. profile picture

- Enrol

1. user
2. course id

- Course

1. Title
2. Cover picture
3. Description
4. Timing
5. Cost
6. Creator
7. Timestamp

## Wishlist

- "Interested in" button - display the course on your profile page
- Course rating - if enrolled to course you can rate it with stars
- Profile page
- Course content

## Project 2 specs: Presentation 14th May 2022

- It needs to handle authentication features (sign up, sign in, log out) :lock:
- It needs to handle at least 2 modules (including the User module, it's just 1 extra one)
- It needs to perform all CRUD operations on a model that is not the User one
- The app should be pushed to a GitHub repo and deployed on Heroku by end of week 1, even if it's unfinished
- Before the presentation, the database should be cleaned up

## Recommendations:

- Use GitHub Projects in order to better organize
- The columns of your kanban board should be: To do, In progress, Done and Whishlist.

## Next step

- create the ironmaker NPX
- move this read.me to new project
- create project board on gitHub

## TA Input

Users can:

1. Sign up
2. Create course
3. Enroll in course
4. View list of courses
5. Delete or update course

Course creation

1. Title
2. Cover picture
3. Description
4. Timing
5. Cost

Make it fun and interesting... humuoristic titles and styling

UserSchema:

- userSchema: should have a property with the course id
- userSchema: enrolled courses

Dont:

-

Doubts:

- do we need an enrollment model (on top of user model and courses model)


