# Breakout Game

An implementation of the classic Breakout game using TypeScript and HTML5 Canvas.

## Introduction

---
- This project is a web-based version of the classic Breakout game, developed using TypeScript and HTML5 Canvas. The game features multiple difficulty levels, responsive controls, and a modular codebase designed for scalability and maintainability.
- This game is based on and extends the development from the MDN 2D Breakout game tutorial. The original program was written in JavaScript, and the original source can be found here:
  - [MDN 2D Breakout Game Tutorial](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript)
- In this project, all code is written in TypeScript, modularized, and further extended as a personal Web App project.

## Features

---
- **Multiple Difficulty Levels**: Choose between **Easy**, **Medium**, **Hard**, and **Asian** difficulty levels.
- **Modular Codebase**: Organized into functional modules for better maintainability.
- **Responsive Controls**: Smooth paddle movement using keyboard input.
- **Score and Lives Tracking**: Keeps track of the player's score and remaining lives.
- **Collision Detection**: Accurate collision detection between the ball, paddle, and bricks.
- **Canvas Rendering**: Utilizes HTML5 Canvas for rendering game graphics.
- **Responsive Design**: Adaptable to different screen sizes.

## Project Structure

---
- **dist/**: Contains compiled JavaScript files.
- **scripts/**: Contains TypeScript source files.
    - **components/**: Game components like Ball, Paddle, Bricks, and Player.
    - **core/**: Core functionality such as canvas initialization, game logic, and input handling.
    - **main/**: Entry point of the game.
    - **shared/**: Shared utilities and settings.
- **pages/**: HTML pages for different sections of the application.
- **styles/**: CSS stylesheets.
- **node_modules/**: Project dependencies.
- **package.json & package-lock.json**: NPM configuration files.
- **tsconfig.json**: TypeScript compiler configuration.
- **index.html**: Main page with difficulty selection.
- **README.md**: Project documentation.

## Installation

---
### Prerequisites

- **Node.js** (Version 12 or higher)
- **NPM** (Node Package Manager)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/Breakout-and-Galaxian.git
   cd Breakout-and-Galaxian
   ```

2. **Project Setup**

    ```sh
    npm install
    ```

3. **Compile and Hot-Reload for Development**

    ```sh
    npm run dev
    ```

4. Type-Check, Compile and Minify for Production

    ```sh
    npm run build
    ```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Usage

---
1. **Open the Game**

   Navigate to `http://127.0.0.1:8080/index.html` in your web browser.

2. **Select Difficulty**

   Choose a difficulty level from the home page:

    - **Easy**
    - **Hard**
    - **Asian**

3. **Play the Game**

   Use the left and right arrow keys to move the paddle and prevent the ball from falling off the screen. Break all the bricks to win the game.

## Gaming 

---
### Controls

- **Move Paddle Left**: Left Arrow Key
- **Move Paddle Right**: Right Arrow Key

### Game Settings

- **Difficulty Levels**: New features would be added in the future.

    - **Easy**: Slower ball speed, more lives.
    - **Hard**: Faster ball speed, fewer lives.
    - **Asian**: Very fast ball speed, challenging gameplay.

- **Lives**: Starts with 3 lives. Game over when lives reach 0.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
2. **Create a New Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit Your Changes**

   ```bash
   git commit -am 'Add new feature'
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**


## Acknowledgements

- MDN 2D Breakout Game Tutorial: This game is based on and extends the development from the MDN 2D Breakout game tutorial. The original program was written in JavaScript, and the original source can be found here:
    - [MDN 2D Breakout Game Tutorial](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript)
- **TypeScript**: For providing a robust type system for JavaScript.
- **HTML5 Canvas**: For enabling rich graphics in web applications.
