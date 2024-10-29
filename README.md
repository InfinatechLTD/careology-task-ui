# Careology Task UI

This repository contains the ui code for the technical task. The ui has been written in React and has used Ant design for the component library and emotion for the styling.

## Coding Task Requirements

Below I will detail the elements that were both completed and not completed:

- [x] Login / Register screen(s)
- [x] Ability to logout
- [x] Ability to add task
- [x] Ability to edit task
- [x] Ability to delete task
- [x] Ability to mark/check task as done
- [x] Make your app available online (send us the link to it).
- [x] Add Due date / Tags / Search
- [ ] If a new task contains a city name in it
- [ ] Add snack bars
- [ ] Implement drag n drop

## Requirements not completed

> If a new task contains a city name in it (use first occurrence of city name)then use an external API to show the weather for this city on the task card using weather.com API. Swagger Link. API

I am sorry, but time to not allow me to complete this task. However, I think I would have done it in the following way.

1. Task is created in the UI
2. Request made to backend
3. On success of the request, parse the text for a city name, perhaps using an LLM read the text, or use and NLP library like [compromise](https://www.npmjs.com/package/compromise) to analyse the text and return a city if it find one
4. If a city is found, make a request to the backend to add the weather to the task with an API request like `POST /tasks/id/weather-note`

We could do this on the backend but it could potentially cause the request to be slower than desired.

> Add snack bars

Again no time, but if I were to do this I would have used the [antd notification](https://ant.design/components/notification/) library. A few places this could have been used is:

- After registration, when redirecting to the login page, store the notification in the store, or url and use the hook to show it
- When toggling complete or not complete a notification could show

> Implement drag n drop

No time, but perhaps using the [React DnD](https://react-dnd.github.io/react-dnd/about) library may help

## Things I would have liked to have done

Below are some of the following i would have liked to have implemented:

- Remove the firebase config from the repo and deploy online using github secrets
- Token refresh - currently the token only lasts 60mins, would have wanted to implement a refresh strategy, perhaps by intercepting the requests and checking if it has expired and if so, refresh the token
- Database is running in test mode, so database is open to all, would naturally have closed this off in a 'real' app
- There is a slight bug when running in locally relating to the resize observer, would have liked to have zeroed in to why this was being caused
- Remove, or better code, the anonymous function event handlers in the table component. This is not good for app performance, using useCallback would help here
- Running on https
- Better error handling - when the api is not running or the token has expired
- TEST - should really have some tests!!! :)
- Provided a url and not IP for accessing the online version :)

# Tech used

- React UI
- Nest JS backend
- Firebase for auth and the database
- Redux, for state management
- RTK Query for API calls

# Hosting

The app is hosted in a AWS ec2 machine inside a docker container. This is deployed via github actions when a push is made the main branch. I did have some 'fun' implementing this :)

# Online links

To view the app go to http://18.170.225.239/sign-in. Login details have been left in or you can register and create your own account

# Running Locally

1. Clone the [repo](https://github.com/InfinatechLTD/careology-task-ui)
2. Install the dependencies `npm i`
3. Create a .env file and add REACT_APP_TASK_API_URL=http://localhost:3001
4. You will need to download and run the [api](https://github.com/InfinatechLTD/careology-task-api) for the backend calls
5. Run the app `npm start`
