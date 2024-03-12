// @vitest-environment happy-dom

import { beforeEach, describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useSidebarStore } from "../sidebar.store";

class LocalStorageMock implements Storage {
  private store: Record<string, string>;

  constructor() {
    this.store = {};
  }

  get length(): number {
    return Object.keys(this.store).length;
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

// // Mock localStorage
// const localStorageMock = (() => {
//   let store = {};
//   return {
//     getItem(key) {
//       return store[key] || null;
//     },
//     setItem(key, value) {
//       store[key] = value.toString();
//     },
//     clear() {
//       store = {};
//     },
//   };
// })();

// Object.defineProperty(window, "localStorage", {
//   value: new LocalStorageMock(),
// });

Object.defineProperty(window, "localStorage", {
  value: new LocalStorageMock(),
});

// Reset localStorage for each test
beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("test", "test toole");
});

describe("useSidebarStore", () => {
  it("should initialize with the correct default state", () => {
    const { result } = renderHook(() => useSidebarStore());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.isExpanded).toBe(false);
  });

  it("should toggle sidebar open state through the store", () => {
    const { result } = renderHook(() => useSidebarStore());
    // Toggle isOpen state
    act(() => {
      result.current.setIsOpen(true);
    });
    expect(result.current.isOpen).toBe(true);
    // Toggle back
    act(() => {
      result.current.setIsOpen(false);
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("should toggle sidebar expanded state through the store", () => {
    const { result } = renderHook(() => useSidebarStore());
    // Toggle isExpanded state
    act(() => {
      result.current.setIsExpanded(true);
    });
    expect(result.current.isExpanded).toBe(true);
    // Toggle back
    act(() => {
      result.current.setIsExpanded(false);
    });
    expect(result.current.isExpanded).toBe(false);
  });

  it("should persist expanded state in localStorage", () => {
    const { result } = renderHook(() => useSidebarStore());

    // Set isExpanded to true
    act(() => {
      result.current.setIsExpanded(true);
    });

    window.localStorage.setItem("going-to-be-persisted", "true");
    console.log("window storage", window.localStorage.getItem("test"));
    // console.log("global local storage", global.localStorage);
    console.log("local storage", localStorage.getItem("sidebar-zustand"));
    console.log("length", localStorage.length);
    console.log("key", localStorage.key(0));
    console.log("key", localStorage.key(1));
    console.log("key", localStorage.key(2));

    // Check localStorage for the persisted state
    // const persistedState = JSON.parse(localStorage.getItem("sidebar-zustand"));

    // expect(persistedState).toBeDefined();
    // expect(persistedState.isExpanded).toBe(true);
  });

  //   it("should initialize store with persisted state from localStorage", () => {
  //     // Pre-populate localStorage with an initial state
  //     localStorage.setItem(
  //       "sidebar-zustand",
  //       JSON.stringify({ isExpanded: true }),
  //     );

  //     const { result } = renderHook(() => useSidebarStore());

  //     // Verify the store initializes with the state from localStorage
  //     expect(result.current.isExpanded).toBe(true);
  //   });
});
