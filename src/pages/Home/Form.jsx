import React, { useState } from 'react';

import SelectBox from '../../components/Inputs/SelectBox';
import { TextInput } from '../../components/Inputs/TextInput';
import { generateNFA, handleDrawAutomata } from '../../utils';
import claerDrawAutomata from '../../utils/claerDrawAutomata';

import Transition from './Transition';

var INITIAL_VALUES = {
  stateList: [],
  stateInput: '',
  selectedStartState: null,
  selectedAcceptStates: [],
  alphabetList: [],
  alphabetInput: '',
  transitions: [{ from: '', to: '', with: '' }]
};

export const Form = () => {
  const [inputs, setInputs] = useState(INITIAL_VALUES);

  const handleState = (value) => {
    const formattedValue = value.trim().replace(/\s+/g, '');
    const newStateList = formattedValue
      ? formattedValue?.includes(',')
        ? [...new Set(formattedValue.split(','))]
        : [formattedValue]
      : null;
    setInputs((prev) => ({ ...prev, stateInput: value, stateList: newStateList ?? [] }));
  };

  const handleAlphabet = (value) => {
    const formattedValue = value.trim().replace(/\s+/g, '');
    const newStateList = formattedValue
      ? formattedValue?.includes(',')
        ? [...new Set(formattedValue.split(','))]
        : [formattedValue]
      : null;
    setInputs((prev) => ({ ...prev, alphabetInput: value, alphabetList: newStateList ?? [] }));
  };

  const handleDraw = () => {
    handleDrawAutomata(
      inputs.stateList,
      inputs.alphabetList,
      inputs.transitions,
      inputs.selectedStartState,
      inputs.selectedAcceptStates,
      'nfa',
      'dfa'
    );
  };

  const handleGenerateRandomNFA = () => {
    const { acceptStates, alphabet, startState, states, transitions } = generateNFA();

    setInputs({
      alphabetInput: alphabet.join(' , '),
      stateInput: states.join(' , '),
      stateList: states,
      alphabetList: alphabet,
      selectedAcceptStates: acceptStates,
      selectedStartState: startState,
      transitions: transitions
    });
  };

  const handleReset = () => {
    setInputs(INITIAL_VALUES);
    claerDrawAutomata('nfa', 'dfa');
  };

  const handleSetStartState = (value) => {
    setInputs((prev) => ({ ...prev, selectedStartState: value }));
  };

  const handleSetAcceptStates = (value) => {
    setInputs((prev) => ({ ...prev, selectedAcceptStates: value }));
  };

  const handleSetTransitions = (value) => {
    setInputs((prev) => ({ ...prev, transitions: value }));
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl mb-4 w-full flex">NFA Oluştur</h1>
      <div className="flex flex-row gap-2 w-full justify-center">
        <TextInput
          helperText={
            "Lütfen kullanacağınız alfabeyi virgül (' , ') ile ayırarak belirleyiniz. Lambda geçişi için boşluk bırakabilirsiniz."
          }
          label={'Alfabe'}
          onChange={handleAlphabet}
          placeholder={'örn: a,b,c veya boşluk'}
          value={inputs.alphabetInput}
        />
        <TextInput
          label={'Durumlar'}
          onChange={handleState}
          placeholder={'örn: q1,q2,q3'}
          value={inputs.stateInput}
          helperText={"Lütfen kullanacağınız durumları virgül (' , ') ile ayırarak belirleyiniz."}
        />
      </div>
      <div className="flex flex-row gap-2 w-full ">
        <div className="flex flex-col gap w-full">
          <SelectBox
            disabled={inputs.stateList.length === 0}
            selectedOptions={inputs.selectedStartState}
            isMultiSelect={false}
            options={inputs.stateList}
            onChange={handleSetStartState}
            placeholder="Başlangıç Durumu Seçin"
          />
          <h3>Seçilen başlangıç durumu: {inputs.selectedStartState}</h3>
        </div>
        <div className="flex flex-col gap w-full">
          <SelectBox
            disabled={inputs.stateList.length === 0}
            isMultiSelect={true}
            selectedOptions={inputs.selectedAcceptStates}
            options={inputs.stateList}
            onChange={handleSetAcceptStates}
            placeholder="Kabul Durumu/Durumlarını Seçin"
          />
          <h3>Seçilen kabul durumları: {inputs.selectedAcceptStates?.join(', ')}</h3>
        </div>
      </div>
      <Transition
        alphabetList={inputs.alphabetList}
        states={inputs.stateList}
        setTransitions={handleSetTransitions}
        transitions={inputs.transitions}
      />
      <div className="flex flex-row gap-2">
        <button className="bg-green-500 text-white px-4 py-2" onClick={handleDraw}>
          Çiz
        </button>
        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleGenerateRandomNFA}>
          Örnek
        </button>
        <button className="bg-red-500 text-white px-4 py-2" onClick={handleReset}>
          Sıfırla
        </button>
      </div>
    </div>
  );
};
