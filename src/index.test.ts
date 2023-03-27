import { createSingletonState } from "./index";

describe("createSingletonState", () => {
  it("stores one value per unique name", () => {
    const contextA1 = createSingletonState<string | null>("a", null);
    const contextA2 = createSingletonState<string | null>("a", null);
    const contextB = createSingletonState("b", undefined);
    const contextC = createSingletonState("c", "hello");

    expect(contextA1).not.toBe(contextA2);

    expect(contextA1.get()).toBe(null);
    expect(contextA2.get()).toBe(null);
    expect(contextB.get()).toBe(undefined);
    expect(contextC.get()).toBe("hello");

    contextA1.set("world");
    expect(contextA1.get()).toBe("world");
    expect(contextA2.get()).toBe("world");
    expect(contextB.get()).toBe(undefined);
    expect(contextC.get()).toBe("hello");
  });
});
