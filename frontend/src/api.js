import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // or your Express server's base URL
});

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/api/auth/login', { email, password });
    localStorage.setItem('userId', response.data.id);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('companyId', response.data.companyId);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (formData) => {
  try {
    const response = await apiClient.post('/api/auth/register', formData);
    localStorage.setItem('userId', response.data.id);
    localStorage.setItem('companyId', response.data.companyId);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const isEmptyFilters = (filters) => {
  return Object.values(filters).every(value => value === '' || value === null);
};

export const fetchProducts = async (filters, page, size, sortField, sortOrder) => {
  try {
    const token = localStorage.getItem('token');
    const companyId = localStorage.getItem('companyId');

    const response = await apiClient.post(
      `/api/products/comp/${companyId}`,
      { page, size, filters, sortField, sortOrder },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token');
    const companyId = localStorage.getItem('companyId');

    const response = await apiClient.post(`/api/products/${companyId}`, productData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error from backend:', error);
    throw error.response.data;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.put(`api/products/${id}`, productData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error.response.data;
  }
};

export const getOrdersByUserId = async (page, size) => {
  try {
      const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const response = await apiClient.get('/api/orders/user/${userId}', {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMarketIntegrations = async () => {
  const companyId = localStorage.getItem('companyId');
  const token = localStorage.getItem('token');
  const response = await axios.get(`/api/markets/comp/${companyId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};


export const createOrder = async (orderData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post('/api/orders', orderData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const getPurchaseOrdersByUserId = async (page, size) => {
  try {
      const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const response = await apiClient.get('/api/purchase-orders/user/${userId}', {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.delete(`/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadProductImages = async (productId, images) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image_${index}`, image.file);
    });
    await apiClient.post(`/api/products/${productId}/images`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProductImage = async (imageId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.delete(`/images/${imageId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product image:', error);
    throw error.response.data;
  }
};

export const fetchHelpTopics = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.get(`/api/help/topics`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchHelpTopicDetails = async (id) => {
  try {
    const response = await apiClient.get(`/api/help/topics/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

