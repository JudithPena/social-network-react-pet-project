// Adds jest-dom matchers like toBeInTheDocument()
import "@testing-library/jest-dom";

// Every test starts with the mock data, not with what a previous test saved
beforeEach(() => {
  window.localStorage.clear();
});
