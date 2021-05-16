# seek-asia-interview-task
* This repo contains 4 tasks.
* The description of tasks 1, 2 and 4 are mentioned on the top of the index.js file.
* Task 3 is an express.js server for creating and searching candidates based on their skills. More about the exposed endpoints mentioned [below](https://github.com/AmrHalim/seek-asia-interview-task/new/main?readme=1#endpoints).

## To run the application you need to do the following:
* npm install
* npm run test
* For task-3 run the application using node task-3/index.js and test the endpoints mentioned below using Postman.

# Endpoints

base_url: localhost:3000
### POST base_url/candidates
Create a new candidate.

Request body:
```
{
  id: "string",
  name: "string",
  skils: ["array of skills"]
}
```
`id` is unique.
### GET base_url/candidates/search?skills=skills,list
Search candidates.

`skills` a list of skills comma-separated i.e. skill1,skill2,skill3


Response object:
```
{
  id: "string",
  name: "string",
  skils: ["array of skills"]
}
