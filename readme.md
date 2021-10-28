# P_HUB (Programmers Hub)
This is a MERN stack WEB Application , In which one can create posts using markdown editor. This is only for learning purpose . 

<p align="center">
  check the running application [here](http://dev-blog-rai.herokuapp.com/)
  <br/>
  if this was helpful a ⭐ would be commitable ;) 
</p>

# TECH STACK USED 
<p align="center">
<img height="60" src="https://user-images.githubusercontent.com/46826283/139316231-a85a2b27-9369-485d-ac4e-235d20a3fd0d.png" />
<img height="60" src="https://user-images.githubusercontent.com/46826283/139315769-8de8189f-ea7a-4b5c-b919-3c9d073adb74.png" />
<img height="60" src="https://user-images.githubusercontent.com/46826283/139315790-9af897c2-291b-4358-8ca5-be4da6e16285.png" />
<img height="60" src="https://user-images.githubusercontent.com/46826283/139315804-76462e34-694b-42bf-a1ff-4c1d4ae13781.png" />
<img height="https://user-images.githubusercontent.com/46826283/139316215-b37ea3e9-73f6-48ad-8d3c-a9225fc8fb94.png" />
<img height="60" src="https://user-images.githubusercontent.com/46826283/139316226-d9c18e94-809d-422b-a21c-ff36756bb0a1.png" />
<img height="60" src="https://user-images.githubusercontent.com/46826283/139316607-c3a643d4-3596-496e-912d-43abfba0e565.png" />
</p>

## FEATURE OF THE APPLICATION
1. SIGNUP/SIGNIN .
2. UPDATE user profile.
3. CREATE , READ , UPDATE , DELETE Post.
4. Comment on Posts.
5. Loading Skeleton using Material UI.
6. Form validation.
7. alert cards.
8. Search posts using tags/categories, author name, post title.

## TECHNOLOGY USED

### Frontend


1. REACT 
the whole frontend is done using react , you can read about react [here](https://reactjs.org/).

2. REACT-ROUTER-DOM
the routing in the client side is managed by using the react-router-dom library, you can read about this library [here](https://reactrouter.com/web/guides/quick-start)

3. STATE MANAGEMENT
the whole state management is done using redux, and react-redux hooks, the  data is fetched using axios and redux thunk.

4. API Usage
get,post,update,delete all the api requests are made using axios. 

5. MATERIAL-UI
the UI part is done using Material-UI and materail-ui icons, and Loading Skeleton is also implemented using material ui lab linrary.

6. Form Validaton
form validation is done by using Formik + Yup + Material Ui.

7. Draft JS
this library is used for MarkdownEditor for creating Posts, you can check it [here](https://draftjs.org/) .

8. User Session 
the user session is stored as cookie, this application uses jwt and store it as cookies for further use. 

### Backend

1. Express 
the whole backend is made using Express Library.

2. Authentication
jwt json web token is used , with bcryptjs to incrupt and decrupt the use password that is stored in database.

3. Database
Mongoose is used to connect to remote MONGODB ATLAS  service , and also to manipulate and manage data.

## HOW TO RUN IT
1. first clone this repo to your local machine.
2. from the root directory , go to server directory.
3. now inside /sever/ run this command
> npm install
4. now to /client/ directory run the same cmd
> npm install
5. now back to the root directory / , create a .env file and type

> SECRET_KEY="anything"
DB_REMOTE_URI='remote database uri'
DB_LOCAL_URI='mongodb://localhost/databaseName'

6. Now finally run this cmd in the root dir
>npm start

it will start the server

7. open a new terminal and run 
>npm run client

this will start the client i.e frontend , UI part

8. And there u have ur application running in ur local machine.
