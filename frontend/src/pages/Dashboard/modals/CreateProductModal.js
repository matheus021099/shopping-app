import React, { useState, useEffect } from 'react';
import { createProduct } from './api';
import { toast } from 'react-toastify';

const CreateProductModal = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    price: '',
    qty: '',
    description: '',
    isVariationParent: false,
    isBundle: false,
    companyId: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      sku: formData.sku,
      name: formData.name,
      price: parseFloat(formData.price),
      qty: parseInt(formData.qty, 10),
      description: formData.description,
      isVariationParent: formData.isVariationParent,
      isBundle: formData.isBundle
    };

    try {
      const createdProduct = await createProduct(productData);
      toast.success('Product created successfully');
      handleClose();
    } catch (error) {
      console.error('Error from backend:', error);
      toast.error(error.error || 'There was an error creating the product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="sku"
        value={formData.sku}
        onChange={handleChange}
        placeholder="SKU"
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        type="text"
        name="qty"
        value={formData.qty}
        onChange={handleChange}
        placeholder="Quantity"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <label>
        Is Variation Parent:
        <input
          type="checkbox"
          name="isVariationParent"
          checked={formData.isVariationParent}
          onChange={handleChange}
        />
      </label>
      <label>
        Is Bundle:
        <input
          type="checkbox"
          name="isBundle"
          checked={formData.isBundle}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProductModal;

