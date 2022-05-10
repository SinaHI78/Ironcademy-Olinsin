# Ironcademy-Olinsin

## Pages

- Home - Displays list of courses, as cards + Sign in/Sign Up/Logout if signed in / Create course button✅
  (in case the user is not signed in he gets redirected to the sign up page)
- Single course page - Displays course info + enroll, unenroll in course, if user is creator: edit and delete
- Sign Up - Allows visitors to create an account/profile / Also link to sign in page for existing users✅
- Sign In - Allows existing users to sign in / Also link to sign up page for new users✅
- Course create page - allowing signed in users to create their own courses✅
- Edit page - allows creator of course to edit course✅
- Private page and my Courses - displays my enrolled courses, my created courses, and my profile✅

## Route Handlers

- Visitors
  GET - '/' - Renders home page (🦆Oliver) ✅
  GET - '/course/:id' - Display Single course page - Enrollment button (if not auth. redirect to sign in / if creator show edit/delete button) (🦆Oliver)✅
  GET - '/authentication/sign-up' - Renders sign up page (👻Sina)✅
  POST - '/authentication/sign-up' - Handles account registration / Redirect to Sign in page (👻Sina)✅
  GET - '/authentication/sign-in' - Renders sign in page (🐝Inger)✅
  POST - '/authentication/sign-in' - Handles existing user authentication / Redirect to home page (🐝Inger)✅

- Authenticated Users
  POST - '/course/:id/enroll' - Handles course enrollment requests for authenticated users. Display successful enrollment message. Display single course page. (👻Sina)✅
  POST - '/course/:id/unenroll' - Handles deletion of user in specific course (👻Sina)✅
  GET - 'authentication/private' - Shows profile page end enrolled courses as well as created courses✅
  POST - 'authentication/private' - Upload of profile picture (👻Sina)✅
  GET - '/creator/course-create' - Displays the course creation page (👻Sina)/(🦆Oliver)✅
  POST - '/creator/course/create' - Handles new course creation / Redirect to Private page✅
  POST - '/authentication/sign-out' - Handles user sign-out / Redirect to home page✅

- Creator
  POST - '/course/:id/delete' - Handles course delete requests only for creator/ Refresh Private page(🐝Inger)✅
  GET - '/course/:id/edit' - Displays course edit page (we will reuse the course create view)(🐝Inger)✅
  POST - '/course/:id/edit' - Handles updates to existing courses(🐝Inger)✅

## Models

- User

1. Name
2. email
3. password
4. profile picture

- Enrol

1. user id
2. course id

- Course

1. Title
2. Cover picture
3. Description
4. Timing
5. Cost
6. Creator
7. Timestamp

## Styling

- work in the SCSS
- use bootstrap

## Wishlist

- "Interested in" button - display the course on your profile page
- Course rating - if enrolled to course you can rate it with stars, the higher the course is rated, the further up it will be displayed ✅
- Nodemailer - Send email with course info to enrolled users
- Search field

## Project 2 specs: Presentation 14th May 2022

- It needs to handle authentication features (sign up, sign in, log out) :lock:
- It needs to handle at least 2 modules (including the User module, it's just 1 extra one)
- It needs to perform all CRUD operations on a model that is not the User one
- The app should be pushed to a GitHub repo and deployed on Heroku by end of week 1, even if it's unfinished
- Before the presentation, the database should be cleaned up

## Recommendations:

- Use GitHub Projects in order to better organize
- The columns of your kanban board should be: To do, In progress, Done and Whishlist.

## TA Input

Users can:

1. Sign up
2. Sign in
3. Create course
4. Enroll in course
5. Edit created course
6. Delete course
7. View list of courses
8. Add profile picture
9. Add course picture

Course creation:

1. Title
2. Picture
3. Description
4. Timing
5. Cost

Make it fun and interesting... humuoristic titles and styling

# Pushing to Heroku

- heroku login
- git add .
- git commit -m "..."
- git push
- git push heroku main

If stuff goes wrong: heroku git:remote -a ironcademy
