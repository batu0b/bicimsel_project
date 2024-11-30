import * as Viz from '@viz-js/viz';

import NFA from '../modules/NFA';

const handleDrawAutomata = (
  stateList,
  alphabetList,
  transitions,
  selectedStartState,
  selectedAcceptStates,
  nfaTagId,
  dfaTagId
) => {
  // Başlangıç ve kabul durumları seçilmemişse uyarı ver
  if (!selectedStartState || selectedAcceptStates.length === 0) {
    alert('Lütfen başlangıç ve kabul durumlarını seçiniz.');
    return;
  }

  const invalidTransition = transitions.find(({ from, to }) => !from || !to);
  if (invalidTransition) {
    alert('Lütfen tüm geçişlerde "from" ve "to" alanlarını doldurun.');
    return;
  }

  // Geçiş nesnesini oluştur
  const transitionObject = transitions.reduce((acc, { from, to, with: symbol }) => {
    if (!acc[from]) acc[from] = {};
    if (!acc[from][symbol]) acc[from][symbol] = [];
    acc[from][symbol].push(to);
    return acc;
  }, {});

  // NFA nesnesini oluştur
  const nfa = new NFA(
    stateList,
    alphabetList,
    transitionObject,
    selectedStartState,
    selectedAcceptStates
  );

  // Viz instance'ını kullanarak NFA ve DFA'yı görselleştir
  Viz.instance().then((viz) => {
    const nfaSvg = viz.renderSVGElement(nfa.visualize());
    const nfaElement = document.querySelector(`#${nfaTagId}`);
    nfaElement.innerHTML = '';
    nfaElement.appendChild(nfaSvg);

    const dfa = nfa.convertToDFA();
    const dfaSvg = viz.renderSVGElement(dfa.visualize());
    const dfaElement = document.querySelector(`#${dfaTagId}`);
    dfaElement.innerHTML = '';
    dfaElement.appendChild(dfaSvg);

    // Konsola NFA ve DFA'yı yazdır
    console.log('Oluşturulan NFA:', nfa);
    console.log('Oluşturulan DFA:', dfa);
  });
};

export default handleDrawAutomata;
