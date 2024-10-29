# Careology Task UI

This repository contains the UI code for the technical task. The UI has been written in React and uses Ant Design for the component library and Emotion for the styling.

## Coding Task Requirements

Below I will detail the elements that were both completed and not completed:

- [x] Login / Register screen(s)
- [x] Ability to log out
- [x] Ability to add a task
- [x] Ability to edit a task
- [x] Ability to delete a task
- [x] Ability to mark/check a task as done
- [x] Make your app available online (send us the link to it).
- [x] Add due date / tags / search
- [ ] If a new task contains a city name in it
- [ ] Add snack bars
- [ ] Implement drag and drop
- [ ] Responsive Layout

## Requirements Not Completed

> If a new task contains a city name in it (use the first occurrence of the city name), then use an external API to show the weather for this city on the task card using the weather.com API. Swagger Link. API

I am sorry, but time did not allow me to complete this task. However, I think I would have done it in the following way:

1. Task is created in the UI.
2. A request is made to the backend.
3. On success of the request, parse the text for a city name, perhaps using an LLM to read the text, or use an NLP library like [compromise](https://www.npmjs.com/package/compromise) to analyze the text and return a city if it finds one.
4. If a city is found, make a request to the backend to add the weather to the task with an API request like `POST /tasks/id/weather-note`.

We could do this on the backend, but it could potentially cause the request to be slower than desired.

> Add snack bars

Again, no time, but if I were to do this I would have used the [antd notification](https://ant.design/components/notification/) library. A few places this could have been used are:

- After registration, when redirecting to the login page, store the notification in the store, or URL and use the hook to show it.
- When toggling complete or incomplete, a notification could show.

> Implement drag and drop

No time, but perhaps using the [React DnD](https://react-dnd.github.io/react-dnd/about) library may help.

> Responsive Layout

I did not have time to do this, but would have used media queries

## Things I Would Have Liked to Have Done

Below are some things I would have liked to have implemented:

- Remove the Firebase config from the repo and deploy online using GitHub secrets.
- Token refresh: Currently, the token only lasts 60 minutes. I would have wanted to implement a refresh strategy, perhaps by intercepting the requests and checking if it has expired, and if so, refreshing the token.
- The database is running in test mode, so the database is open to all. I would naturally have closed this off in a 'real' app.
- There is a slight bug when running locally related to the resize observer. I would have liked to have zeroed in on why this was being caused.
- Remove, or better code, the anonymous function event handlers in the table component. This is not good for app performance. Using `useCallback` would help here.
- Running on HTTPS.
- Better error handling: when the API is not running or the token has expired.
- Tests: I should really have written some tests!!! :)
- Provided a URL and not an IP for accessing the online version.

## Tech Used

- React UI
- NestJS backend
- Firebase for auth and the database
- Redux for state management
- RTK Query for API calls

## Hosting

The app is hosted on an AWS EC2 machine inside a Docker container. It is deployed via GitHub Actions when a push is made to the main branch. I did have some 'fun' implementing this. :)

## Online Links

To view the app, go to [http://18.170.225.239/sign-in](http://18.170.225.239/sign-in). Login details have been left in, or you can register and create your own account.

## Running Locally

1. Clone the [repo](https://github.com/InfinatechLTD/careology-task-ui).
2. Install the dependencies: `npm i`.
3. Create a `.env` file and add `REACT_APP_TASK_API_URL=http://localhost:3001`.
4. You will need to download and run the [API](https://github.com/InfinatechLTD/careology-task-api) for the backend calls.
5. Run the app: `npm start`.
