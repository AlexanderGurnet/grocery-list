import { useMutation, useQueryClient } from '@tanstack/react-query';

import groceryApi from '../pages/api/api';
import useNumberInputValidation from './useNumberInputValidation';
import { IModel, IUpdatingAmountParameters } from '../types/types';

const useUpdatingAmount = ({ amount, id }: IUpdatingAmountParameters) => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdatingAmountLoading, mutate: updating } = useMutation({
    mutationFn: groceryApi.changeItemById,
    onSuccess: (obj: Partial<IModel>) => {
      queryClient.invalidateQueries({ queryKey: ['todos', obj.id] });
    },
  });

  const handleUpdatingOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOnChange(e, () => {
      updating({ id, amount: Number(e.target.value) });
    });
  };

  const {
    inputValue: validatedUpdating,
    error: isUpdatingError,
    handleOnBlur: handleUpdatingOnBlur,
    handleOnChange,
  } = useNumberInputValidation(amount);

  return {
    isUpdatingError,
    isUpdatingAmountLoading,
    validatedUpdating,
    handleUpdatingOnBlur,
    updating,
    handleUpdatingOnChange,
  };
};

export default useUpdatingAmount;
