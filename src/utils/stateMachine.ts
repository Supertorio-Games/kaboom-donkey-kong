// https://kentcdodds.com/blog/implementing-a-simple-state-machine-library-in-javascript

export type StateMachineState = {
  actions: {
    onEnter?: Function;
    onExit?: Function;
  };
  transitions: {
    [key: string]: {
      target: string;
      action?: Function;
    };
  };
};

export type StateMachineDefinition = {
  initialState: string;
  states: { [key: string]: StateMachineState };
};

export type StateMachine = {
  value: string;
  transition: (currentState: string, event: string) => string | undefined;
};

export default function createMachine(
  stateMachineDefinition: StateMachineDefinition
): StateMachine {
  const machine = {
    value: stateMachineDefinition.initialState,
    transition(currentState: string, event: string) {
      const currentStateDefinition =
        stateMachineDefinition.states[currentState];
      const destinationTransition = currentStateDefinition.transitions[event];
      if (!destinationTransition) {
        return;
      }
      const destinationState = destinationTransition.target;
      const destinationStateDefinition =
        stateMachineDefinition.states[destinationState];

      destinationTransition.action?.();
      currentStateDefinition?.actions.onExit?.();
      destinationStateDefinition?.actions.onEnter?.();

      machine.value = destinationState;

      return machine.value;
    },
  };
  return machine;
}
