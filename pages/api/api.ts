import { api } from './configs/axiosConfig';
import { IModel } from '../../types/types';

const groceryApi = {
  getAllItems: async function () {
    const response = await api.request({
      url: `/posts`,
      method: 'GET',
    });
    return response.data;
  },

  addItem: async function (item: IModel) {
    await api.request({
      url: `/posts`,
      method: 'POST',
      data: item,
    });
  },

  changeItemById: async function (item: Partial<IModel>) {
    const response = await api.request({
      url: `/posts/${item.id}`,
      method: 'PATCH',
      data: item,
    });
    return response.data;
  },

  deleteItenById: async function (id: string) {
    const response = await api.request({
      url: `/posts/${id}`,
      method: 'DELETE',
    });
    return response.data;
  },
};

export default groceryApi;
