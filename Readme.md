# 🎮 Cloudwalk Quake Log

This test is intended for candidates applying to Software Engineering positions at CloudWalk. [Documentation.](https://gist.github.com/cloudwalk-tests/704a555a0fe475ae0284ad9088e203f1)

- Node.js: v20.11
- Express: v4.19
- Typescript: v5.4

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies by running `yarn install`.
3. Create a `.env` file in the root directory of the project, based on `.env.example` file.
4. Set up environment variables in the `.env` file.
5. Start the development server by running `yarn dev`.
6. Visit `http://localhost:3000` in your browser to see the application running.

If you want to configure a different port, make sure to update the `PORT` variable in the `.env` file. For `GAME_LOG_URL` you must use [this file.](https://gist.githubusercontent.com/cloudwalk-tests/be1b636e58abff14088c8b5309f575d8/raw/df6ef4a9c0b326ce3760233ef24ae8bfa8e33940/qgames.log)

```
PORT=3000
GAME_LOG_URL="See above"
```
