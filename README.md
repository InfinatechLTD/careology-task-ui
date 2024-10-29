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
- [ ] If a new task contains a city name in it
- [ ] Neptune
- [ ] Comet Haley

## Requirements not completed

> If a new task contains a city name in it (use first occurrence of city name)then use an external API to show the weather for this city on the task card using weather.com API. Swagger Link. API

I am sorry, but time to not allow me to complete this task. However, I think I would have done it in the following way.

1. Task is created in the UI
2. Request made to backend
3. On success of the request, parse the text for a city name, perhaps using an LLM read the text, or use and NLP library like [compromise](https://www.npmjs.com/package/compromise) to analyse the text and return a city if it find one
4. If a city is found, make a request to the backend to add the weather to the task with an API request like `POST /tasks/id/weather-note`

We could do this on the backend but it could potentially cause the request to be slow.
