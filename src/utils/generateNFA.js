const generateNFA = () => {
  const states = ['q1', 'q2', 'q3'];
  const alphabet = ['a', 'b', ''];
  const startState = 'q1';
  const acceptStates = ['q3'];
  const transitions = [
    { from: 'q1', to: 'q2', with: 'a' },
    { from: 'q2', to: 'q3', with: 'b' },
    { from: 'q2', to: 'q2', with: 'a' },
    { from: 'q1', to: 'q3', with: '' }
  ];

  return { states, alphabet, startState, acceptStates, transitions };
};

export default generateNFA;
