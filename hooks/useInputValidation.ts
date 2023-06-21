import { useState } from 'react';
import { IInputValidation } from '../types/types';

const useInputValidation = ({ defaultValue = '', resetInput = false }: IInputValidation) => {
  const [isTextError, setIsError] = useState({
    isShow: false,
    text: '',
  });

  const [text, setGroceryText] = useState(defaultValue);

  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setGroceryText(value);
    setIsError({
      isShow: value.length >= 40 || value.length === 0,
      text:
        value.length >= 40
          ? 'The input value cannot be more than 40 characters'
          : value.length === 0
          ? 'The input value cannot be empty'
          : '',
    });
  };

  const reset = () => {
    if (!isTextError.isShow && resetInput) {
      setGroceryText('');
    }
  };

  const handleOnClick = (handler?: any) => {
    reset();
    if (handler) {
      handler();
    }
  };

  const handleOnBlur = () => {
    setIsError({ ...isTextError, isShow: false });
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, handler?: any) => {
    const { target, key } = e;

    if (key === 'Enter') {
      e.preventDefault();
      if ((target as HTMLInputElement).value.length > 0 && (target as HTMLInputElement).value.length <= 40) {
        handleOnClick(handler);
      } else if ((target as HTMLInputElement).value.length >= 40) {
        setIsError({
          isShow: true,
          text: 'The input value cannot be more than 40 characters',
        });
      } else {
        setIsError({
          isShow: true,
          text: 'The input value cannot be empty',
        });
      }
    }
  };

  return { text, error: isTextError, handleOnBlur, handleOnKeyDown, handleOnClick, handleOnChange };
};

export default useInputValidation;
