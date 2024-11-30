import DFA from './DFA.js';

class NFA {
  constructor(states, alphabet, transitions, startState, acceptStates) {
    this.states = states;
    this.alphabet = alphabet;
    this.transitions = transitions;
    this.startState = startState;
    this.acceptStates = acceptStates;
  }

  getTransitions(state, symbol) {
    return this.transitions[state]?.[symbol] || [];
  }

  // Epsilon kapanışını hesapla
  getEpsilonClosure(state) {
    const closure = new Set([state]);
    const stack = [state];

    while (stack.length > 0) {
      const current = stack.pop();
      const epsilonTransitions = this.getTransitions(current, ''); // Epsilon geçişleri
      epsilonTransitions.forEach((nextState) => {
        if (!closure.has(nextState)) {
          closure.add(nextState);
          stack.push(nextState);
        }
      });
    }

    return Array.from(closure);
  }

  // DFA'ya dönüştürme fonksiyonu
  convertToDFA() {
    const dfaStates = {}; // DFA durumları
    const dfaTransitions = {}; // DFA geçişleri
    const dfaAcceptStates = new Set(); // DFA kabul durumları
    const unprocessedStates = []; // İşlenmeyen DFA durumları

    // Başlangıç durumu (epsilon kapanışı ile)
    const startStateClosure = this.getEpsilonClosure(this.startState);
    const startStateName = this.getStateName(startStateClosure);
    dfaStates[startStateName] = startStateName;
    unprocessedStates.push(startStateClosure);

    // DFA dönüşümü işlemi
    while (unprocessedStates.length > 0) {
      const currentState = unprocessedStates.shift();
      const currentStateName = this.getStateName(currentState);

      // Eğer geçişleri olmayan bir durumsa, boş küme ile göster
      if (currentState.length === 0) {
        dfaStates[currentStateName] = '∅'; // Boş küme
        continue;
      }

      // Her sembol için geçişler (epsilon hariç)
      this.alphabet.forEach((symbol) => {
        if (symbol === '') return; // Epsilon geçişini atla

        let nextState = new Set();

        currentState.forEach((state) => {
          this.getTransitions(state, symbol).forEach((next) => {
            // Epsilon kapanışı ile ekle
            this.getEpsilonClosure(next).forEach((closureState) => {
              nextState.add(closureState);
            });
          });
        });

        nextState = Array.from(nextState);

        // Eğer yeni bir durum varsa, ekle
        if (nextState.length > 0) {
          const nextStateName = this.getStateName(nextState);

          if (!dfaStates[nextStateName]) {
            unprocessedStates.push(nextState);
            dfaStates[nextStateName] = nextStateName;
          }

          // Geçişleri ekle
          dfaTransitions[currentStateName] = dfaTransitions[currentStateName] || {};
          dfaTransitions[currentStateName][symbol] = nextStateName;

          // Kabul durumu kontrolü
          if (nextState.some((state) => this.acceptStates.includes(state))) {
            dfaAcceptStates.add(nextStateName);
          }
        } else {
          // Boş geçiş olduğunda, bu durumu ölü durum olarak işaretle
          dfaTransitions[currentStateName] = dfaTransitions[currentStateName] || {};
          dfaTransitions[currentStateName][symbol] = '∅'; // Ölü duruma geçiş
        }
      });
    }

    // DFA'ya dönüştürülmüş hali döndür
    return new DFA(
      Object.values(dfaStates),
      this.alphabet.filter((symbol) => symbol !== ''), // Epsilon hariç
      dfaTransitions,
      this.getStateName(startStateClosure),
      Array.from(dfaAcceptStates)
    );
  }

  // Durum adını kümeye göre oluşturma
  getStateName(state) {
    return state.sort().join(',');
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
        this.transitions[state][symbol].forEach((nextState) => {
          graph += `  "${state}" -> "${nextState}" [label="${symbol || 'ε'}"];\n`;
        });
      });
    });

    graph += '}';
    return graph;
  }
}

export default NFA;
