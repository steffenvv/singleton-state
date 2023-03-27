// We cannot strongly type the values in this dictionary.
// We must trust callers that agree on the name to also agree on what the
// type of the value should be. This is reasonable, since in the cases where
// there are multiple callers, these callers are expected to be duplicate
// instances of the same code.
const state: Record<string, unknown> = {};

export type SingletonState<T> = {
  /** Gets the current value of the singleton state. */
  readonly get: () => T;
  /** Sets the current value of the singleton state. */
  readonly set: (value: T) => void;
};

/**
 * Creates a named singleton variable whose value will be stored in the state of this module.
 *
 * @param name The name that uniquely identifies the variable. If the same name was
 * specified in a previous call, this function will return an object that accesses
 * the same variable.
 * @param defaultValue The default value, which will be set as the initial value
 * of the variable if it has not been accessed previously.
 * @returns An object with get() and set() methods to access the singleton variable.
 */
export function createSingletonState<T>(
  name: string,
  defaultValue: T
): SingletonState<T> {
  if (!(name in state)) {
    state[name] = defaultValue;
  }

  return {
    get: () => state[name] as T,
    set: (value: T) => (state[name] = value),
  };
}
