import { useState, useEffect, useRef } from 'react';

const SelectBox = ({
  isMultiSelect,
  options,
  onChange,
  placeholder,
  disabled,
  selectedOptions // Dışarıdan gelen seçili seçenekler
}) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const selectBoxRef = useRef(null);

  const handleDropdown = () => {
    if (!disabled) {
      setIsDropDown((prev) => !prev);
    }
  };

  const handleOptionChange = (option) => {
    if (isMultiSelect) {
      const newSelected = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option) // Kaldır
        : [...selectedOptions, option]; // Ekle

      onChange(newSelected); // Parent'a yeni değerleri bildir
    } else {
      onChange([option]); // Tek seçim durumunda sadece bir değer gönderilir
    }
  };

  const handleOutsideClick = (e) => {
    if (selectBoxRef.current && !selectBoxRef.current.contains(e.target)) {
      setIsDropDown(false); // Dışarı tıklandığında dropdown'ı kapat
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={selectBoxRef} className="w-full text-white min relative">
      <div
        className="border text-sm h-full w-full rounded-lg block cursor-pointer p-2.5 bg-gray-700/80 border-gray-600 placeholder-gray-400 text-white"
        onClick={handleDropdown}
      >
        {placeholder}
      </div>

      <div
        className={`absolute z-50 top-[calc(100%+2px)] rounded-lg flex-col flex w-full max-h-32 backdrop-blur-sm overflow-y-auto transition-all duration-500 bg-gray-700/70 ${
          isDropDown ? 'opacity-100 visible ' : 'opacity-0 invisible '
        }`}
      >
        {options.map((option, index) => (
          <div
            onClick={() => handleOptionChange(option)}
            className="flex flex-row gap-2 p-2 cursor-pointer"
            key={index}
          >
            <input
              type="checkbox"
              checked={
                Array.isArray(selectedOptions)
                  ? selectedOptions?.includes(option)
                  : selectedOptions === option
              }
              readOnly
            />
            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectBox;
