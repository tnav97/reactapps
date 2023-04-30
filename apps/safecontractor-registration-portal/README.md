# safecontractor-registration-portal

A starter app for frontend projects with Typescript, material-ui and redux support

## Project Structure

The application uses a fairly modern folder structure for project organization that goes into a universal react app.

```
src               : This is where code for the application goes, along with unit tests for components
|- client         : All client specific integration code for the react app goes here
|-- redux         : Everything redux related goes in here
|--- reducers     : This is where all reducers are defined to listen to event broadcast and handle state management
|--- actions.ts   : Defines all actions and events that are broadcast by the actions using redux-api-middleware
|-- index.ts      : Hydrates and renders client side react app with code-splitting support using loadable-components
|-- renderApp.tsx : The client-side react app
|- common         : This is where everything shared between the client and server can go e.g. components, constants, contexts etc.
|-- components    : All react components with related tests and stories are placed in this folder. If a component needs to use multiple (non-reusable) components, then either define them in same component file or place them in separate files within same component folder.
|-- constants     : All application constants are defined here
|-- context       : A place to preserve any and all contexts used by the react app that can be integrated with createContext and useContext
|-- prop-types    : All reusable component prop-types are specified here
|-- styles        : Style variables are defined here
|-- router.tsx    : The application router that specifies which routes can be consumer by application
|- lib/utils      : All common utilities can be found here
|- server         : All server-side integration code goes into here
|-- middleware    : Defines middlewares that can be integrated with requests
|-- models        : Defines different models with their methods to consume APIs
|-- routes        : All server-side route handlers are defined here to help preload client state and perform necessary server work
|--- api          : The server-exposed client api route handlers are written here for client app to make XMLHttpRequests to talk to server through redux-api-middleware
|-- index.ts      : The server side express application is exposed from here
|-- Server.ts     : Runs the application on server
tests             : This is where test helpers and tests for utilities and integration can be written
```

## Conventions

- If a route needs to preload some state to load page faster with data, then route handlers must be defined for that specific route in `src/server/routes`

- Any APIs needed for client use to make XMLHttpRequests should be defined in `src/server/routes/api`

- It is preferred to write a reusable react component in a separate folder within `src/common/components`; however if the component becomes complex and inner components can be extracted which are component-specific then those leaf components should be placed within same component folder.

- Unit tests must be written using `jest` and `@testing-library/react` for each component to verify its rendering in different states

- It is preferred to keep component separate from consuming redux data directly and instead use the component's index file to inject redux state data and dispatchers
