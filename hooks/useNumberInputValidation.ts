import { useState } from 'react';

const useNumberInputValidation = (initialValue: number) => {
  const [error, setIsInputError] = useState({
    isShow: false,
    text: '',
  });

  const [inputValue, setInputValue] = useState<number>(initialValue);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, handler?: any) => {
    const value = Number(e.target.value);

    if (value >= 1 && value <= 100) {
      setIsInputError({
        isShow: false,
        text: '',
      });
      setInputValue(value);
      handler();
    } else {
      setIsInputError({
        isShow: true,
        text: "The amount field can't be empty, should be a number from 1 to 100",
      });
    }
  };

  const handleOnBlur = () => {
    setIsInputError({
      isShow: false,
      text: '',
    });
  };

  return { error, inputValue, handleOnBlur, handleOnChange };
};

export default useNumberInputValidation;
