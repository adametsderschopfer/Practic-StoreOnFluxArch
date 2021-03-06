import auxiliary from "./Auxiliary";

class Dispatcher extends auxiliary.AuxiliaryFunctionsForStore {
  constructor() {
    super();
  }

  dispatch(action) {
    // if (typeof action === "function") {
    //   return action(this.dispatch.bind(this));
    // }
    this.state = this.reducer(this.state, action);
    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener) {
    this.listeners.push(listener);

    return {
      unsubscribe: () => {
        const idx = this.listeners.indexOf(listener);
        this.listeners.splice(idx, 1);
      },
    };
  }
}

export default Dispatcher;
