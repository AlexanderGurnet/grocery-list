import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import groceryApi from '../pages/api/api';
import useInputValidation from './useInputValidation';
import { IUpdatingEntry } from '../types/types';

const useUpdatingEntry = ({ text, id, inputRef }: IUpdatingEntry) => {
  const queryClient = useQueryClient();

  const { isLoading: isChangingEntry, mutate: changeEntry } = useMutation({
    mutationFn: groceryApi.changeItemById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', id] });
    },
  });

  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
      inputRef?.current?.focus();
    }
  }, [isFocused, inputRef]);

  const handleOnEdit = () => {
    setIsFocused((prev) => !prev);
    if (isFocused) {
      handleEditOnClick();
    }
  };

  const handleEditOnClick = () => {
    handleOnClick(() => {
      changeEntry({ id, text: entryText });
    });
  };

  const {
    text: entryText,
    handleOnChange: handleInputOnChange,
    handleOnClick,
    handleOnKeyDown: handleInputKeyDown,
    error: isTextError,
  } = useInputValidation({ defaultValue: text });

  return { entryText, isFocused, isTextError, isChangingEntry, handleOnEdit, handleInputOnChange, handleInputKeyDown };
};

export default useUpdatingEntry;
