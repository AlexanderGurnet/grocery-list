import { useMutation, useQueryClient } from '@tanstack/react-query';
import groceryApi from '../pages/api/api';

const useDeletion = (id: string) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteItem } = useMutation({
    mutationFn: groceryApi.deleteItenById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleOnDeletion = () => deleteItem(id);

  return { isLoading, handleOnDeletion };
};

export default useDeletion;
