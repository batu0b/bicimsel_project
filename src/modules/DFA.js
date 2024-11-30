class DFA {
  constructor(states, alphabet, transitions, startState, acceptStates) {
    this.states = states;
    this.alphabet = alphabet;
    this.transitions = transitions;
    this.startState = startState;
    this.acceptStates = acceptStates;
  }

  visualize() {
    let graph = 'digraph G {\n';

    this.states.forEach((state) => {
      const isAccept = this.acceptStates.includes(state)
        ? ' [shape=doublecircle]'
        : ' [shape=circle]';
      graph += `  "${state}"${isAccept};\n`;
    });

    Object.keys(this.transitions).forEach((state) => {
      Object.keys(this.transitions[state]).forEach((symbol) => {
        graph += `  "${state}" -> "${this.transitions[state][symbol]}" [label="${symbol}"];\n`;
      });
    });

    graph += '}';
    return graph;
  }
}

export default DFA;
