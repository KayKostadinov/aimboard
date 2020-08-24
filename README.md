# AimBoard (social network)
Link to deployed project: http://aimboard.herokuapp.com

## Starting the project locally:

**install dependencies:** npm i && cd client npm i

**start the project:** in the root project directory run command 'npm run dev'.
The local environment runs the back and front end simultaneously using concurrently with a proxy between them.
The website can be accessed @ http://localhost:3000
Both server and client refresh on save.

------------------------------------
# Client Documentation

Global state is managed by Redux. Component-level state is implemented with hooks.
## ./utils
Sets headers depending on whether there's a token. 

## Components

### App
Root component.
Handles: 
    
    local storage auth token
    Component routing
    Private/ public routing
    Passes down global state

### Alert component
Uses global alerts state. Displays only when the state.alert !== null && alerts.length > 0.

maps over the alerts and displays each message. Styling is dynamically generated based on the alertType.

### Navbar component
Takes in auth from state and logout from actions.

Conditionally renders publicBtns or profileBtns depending on isAuthenticated.

    handleLogout(e) 
        calls logout()
        redirects to '/'

### Landing & /auth
**Landing renders Login and  Register as a single page.**
#### Landing component
Takes in isAuthenticated from state.auth.
Redirects to /aim if user is authenticated.

Extracted methods:

    slideIn()
        controls the Login and Register card classes to trigger animation and the page css grid settings
    handleClick(e)
        controls conditional rendering of the card

    
#### Login component
Takes in login from actions and setClickable from Landing.

On error the Alert component is displayed.

The form is being controlled by:
    
    formData state,
    onChange(e) maps any changes to state
    onSubmit(e) calls login(email, password)
    setClickable() switches between login and register

#### Register component
Takes in login, setAlert from actions and setClickable from Landing.

On error the Alert component is displayed.

The form is being controlled by:
    
    formData state,
    onChange(e) maps any changes to state
    onSubmit(e) 
        checks if passwords match:
        calls register(name, email, password)
        else calls setAlert(msg, type)
    setClickable() switches between login and register


### ./pages
#### aim
##### Aim component
Top level component for this page.

On render useEffect runs with:

    getMyProfile();
    getAims();
    getPosts();

Additional useEffect dependencies: loadAim, loading, postLoading.

---
This component renders **ProfileSetup, AimTree, AimForm, CreatePost, Posts**

---
State: 
    
    edit
        conditional rendering of AimForm and passes down props information for the selected item
    createPost
        conditional rendering of CreatePost and passes down props information for the selected item
    postData
    

#### boards
#### profile
#### search
**Not fully implemented**

#### routing
##### PrivateRoute component
    Components wrapped in <PrivateRoute> tag are rerouted to '/' if user is not authenticated

## Redux
**global state init:** store.js and passed down the top-level component in App.js

#### /reducers

**combine reducers in index.js**

**auth**
```
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}
```
handles actions:

    REG_SUCCESS,
    REG_FAIL,
    AUTH_SUCCESS,
    AUTH_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,

**aim**
```
const initialState = {
    aim: null,
    aims: [],
    loading: true,
    error: {}
}
```
handles actions:

    GET_AIM, 
    AIM_ERR, 
    CLEAR_AIM, 
    GET_AIMS, 
    UPDATE_AIM, 
    CREATE_AIM 

**alert**
```
const initialState = []
```
handles actions:

    SET_ALERT, REMOVE_ALERT

**post**
```
const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}
```
handles actions:

    GET_POSTS, 
    POST_ERR, 
    UPDATE_LIKES, 
    DELETE_POST, 
    ADD_POST, 
    ADD_COMMENT

**profile**
```
const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}
```
handles actions:

    GET_PROFILE, 
    PROFILE_ERR, 
    CLEAR_PROFILE, 
    DELETE_ACC, 
    UPDATE_PROFILE, 
    GET_PROFILES

#### /actions


**exported actions types in types.js**

_Each action calls to the corresponding api route and feeds the server response to the reducer_

##### exported action functions:

**aim**

    getAims
    getAim(id)
    createAim(formData)
    updateAim(formData, id)
    deleteAim(id)

**alert**

    setAlert(msg, alertType)

**auth**

    register({ name, email, password })
    loadUser
    login(email, password)
    logout

**post**

    getPosts
    addPost(formData)
    deletePost(id)
    addLike(id)
    removeLike(id)
    addComment(commentForm, id)

**profile**

    getMyProfile
    getAllProfiles
    getProfileById(id)
    createProfile(formData, history, edit = false)
    deleteProfile




------------------------------------
# API Documentation
All responses return their data in JSON

### aim

// @route   POST api/aim
// @desc    create an aim
// @access  private

**required data:** title: string
**optional data:** deadline: date, complete: bool
**returns** the new aim 
**on error:** status 500, Server error

// @route   GET api/aim
// @desc    get all aims
// @access  private

**returns** all aims
**on error:** status 500, Server error


// @route   GET api/aim/:id
// @desc    get a specific aim
// @access  private

**returns** the specified aim (id)
**on error:** status 500, Server error


// @route   DELETE api/aim/:id
// @desc    delete an aim
// @access  private

deletes the specified aim (id) and **returns** a msg: Aim removed
**on error:** 
status 401, Not authorized || status 404, Aim not found || status 500, Server error

// @route   POST api/aim/:id
// @desc    update an aim
// @access  private

**returns** the new aim data
**on error:** 
status 401, Not authorized || status 404, Aim not found || status 500, Server error

