import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import groceryApi from '../pages/api/api';
import { IModel, ICompletionParameters } from '../types/types';

const useCompletion = ({ defaultValue, id }: ICompletionParameters) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(defaultValue);

  const queryClient = useQueryClient();

  const { isLoading, mutate: toggleCompletion } = useMutation({
    mutationFn: groceryApi.changeItemById,
    onSuccess: (obj: Partial<IModel>) => {
      queryClient.invalidateQueries({ queryKey: ['todos', obj.id] });
    },
  });

  const handleOnCompletion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(e.target.checked);
    toggleCompletion({ id, isFinished: e.target.checked });
  };

  return { isCompleted, isLoading, handleOnCompletion };
};

export default useCompletion;
