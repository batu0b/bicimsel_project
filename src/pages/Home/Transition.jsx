const Transition = ({ transitions, setTransitions, alphabetList, states }) => {
  const handleAddTransition = () => {
    const newTransition = { from: '', to: '', with: '' };

    setTransitions([...transitions, newTransition]);
  };

  const handleRemoveTransition = (index) => {
    const newTransitions = transitions?.filter((_, i) => i !== index);
    setTransitions(newTransitions);
  };

  const handleChange = (index, field, value) => {
    const newTransitions = transitions?.map((transition, i) =>
      i === index ? { ...transition, [field]: value } : transition
    );

    setTransitions(newTransitions);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-2xl mb-4 w-full flex">Geçişler</h1>
      {transitions?.map((transition, index) => (
        <div key={index} className="mb-4 w-full flex gap-2">
          <select
            className="border w-full p-2 mr-2"
            value={transition.from}
            onChange={(e) => handleChange(index, 'from', e.target.value)}
          >
            <option value="">Select From</option>
            {states?.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <select
            className="w-full border p-2 mr-2"
            value={transition.with}
            onChange={(e) => handleChange(index, 'with', e.target.value)}
          >
            <option value="">&Lambda;</option>
            {alphabetList?.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
          <select
            className="border p-2 mr-2 w-full"
            value={transition.to}
            onChange={(e) => handleChange(index, 'to', e.target.value)}
          >
            <option value="">Select To</option>
            {states?.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <button
            className="bg-red-500 text-white px-2 py-1"
            onClick={() => handleRemoveTransition(index)}
          >
            x
          </button>
        </div>
      ))}
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleAddTransition}>
        Yeni bir geçiş için tıklayın
      </button>
    </div>
  );
};

export default Transition;
