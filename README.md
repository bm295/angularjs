# Angular 19 Constructor Lifecycle Demo

This repository is a focused Angular 19 demo that visualizes the **first lifecycle step: `constructor()`**.

## What the demo shows

- The root `AppComponent` constructor logs when Angular creates the app.
- A child component can be destroyed and recreated with a button.
- Every recreation triggers the child `constructor()` and writes a timestamped event to the UI log.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:4200`.
