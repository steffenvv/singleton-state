# singleton-state

This package contains a minimal module for centralized singleton state. The `createSingletonState` function
returns an object to access a named singleton variable, storing its value in a dictionary in the module's state.

## Motivation

Stateful singleton modules need special treatment from build tools, taking care not to duplicate the modules at run-time,
since a duplicated stateful module will lead to run-time bugs. It's unfortunate if a build tool needs to be aware of
specific clients of that build tool, as it creates a dependency that goes in the wrong direction.

The purpose of this package is to centralize module state so that there is a single stateful module that we need to worry
about, which both build tools and specific singleton implementations can take a dependency on.

## Usage

```ts
import { createSingletonState } from "singleton-state";

// Example: Implementing a singleton log message dispatcher abstraction. Nothing is
// being stored in this module, so it doesn't affect correctness if it gets duplicated,
// so long as the singleton-state module isn't duplicated.
type LogMessageDispatcher = {
  /* ... */
};

const dispatcherState = createSingletonState<LogMessageDispatcher | null>(
  "LogMessageDispatcher", // Could also consider using a GUID here
  null
);

export function getDispatcher(): LogMessageDispatcher | null {
  return dispatcher.get();
}

export function setDispatcher(value: LogMessageDispatcher): void {
  dispatcher.set(value);
}
```
