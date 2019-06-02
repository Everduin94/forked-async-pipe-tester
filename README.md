# AsyncDeepDive

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5.
Note, I forked the pipe from version 7, although I don't believe it's changed since significantly version 6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

**Important**:
- Run in production mode so that you do not see duplicate output on each change-detection cycle.
- app.component.html contains each component. The application is significantly easier to follow
if you comment out the other components and look at them one at a time.
- some of the logging is relevant/not-relevant based on the component you're testing. Thus, some of the log statements are commented out.

## Article
- https://medium.com/@erxk_verduin/angular-rxjs-async-pipe-deep-dive-2510b56f793a

## Code
*src/app/intro*: Looks at creation (component and container), destruction, completion, and reassignment when using async pipe.

*src/app/combine*: leverages combineLatest and a single async pipe

*src/app/dirty*: uses multiple async pipes for one observable

*src/app/clean*: uses a single async pipe for one observable

*src/app/toggle*: creation / destruction of a container
