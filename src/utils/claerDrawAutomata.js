const claerDrawAutomata = (nfaTagId, dfaTagId) => {
  document.querySelector(`#${dfaTagId}`).innerHTML = '';
  document.querySelector(`#${nfaTagId}`).innerHTML = '';
};

export default claerDrawAutomata;
