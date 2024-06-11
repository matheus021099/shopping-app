import React, { useState, useEffect } from 'react';
import { updateProduct, uploadProductImages } from '../../../api';
import { Modal, Tabs, Tab, Box, TextField, Checkbox, Typography, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import 'react-toastify/dist/ReactToastify.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const EditProductModal = ({ handleClose, productData }) => {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    price: '',
    qty: '',
    description: '',
    isVariationParent: false,
    isBundle: false,
    companyId: 0,
    images: []
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        file: file
      }));
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...newImages]
      }));
    }
  });

  useEffect(() => {
    if (productData) {
      setFormData((prevState) => ({
        ...prevState,
        ...productData,
        images: productData.images || []
      }));
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    const productId = productData.id;

    try {
      await updateProduct(productId, formData);
      toast.success('Product updated successfully');
      handleClose();
    } catch (error) {
      console.error('Error from backend:', error);
      toast.error(error.error || 'There was an error updating the product');
    }
  };

  const handleImageSubmit = async () => {
    const productId = productData.id;

    try {
      await uploadProductImages(productId, formData.images);
      toast.success('Images uploaded successfully');
      handleClose();
    } catch (error) {
      console.error('Error from backend:', error);
      toast.error(error.error || 'There was an error uploading the images');
    }
  };

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDeleteImage = (imageId) => {
    setFormData((prevState) => ({
      ...prevState,
      images: prevState.images.filter((image) => image.id !== imageId)
    }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = Array.from(formData.images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);

    setFormData((prevState) => ({
      ...prevState,
      images: reorderedImages
    }));
  };

  return (
    <Box>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="General" />
        <Tab label="Images" />
        <Tab label="Markets" />
        <Tab label="Orders" />
        <Tab label="Purchasing" />
      </Tabs>

      {activeTab === 0 && (
        <form onSubmit={handleGeneralSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="SKU"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Quantity"
            name="qty"
            type="number"
            value={formData.qty}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Box display="flex" alignItems="center" marginTop="8px">
            <Checkbox
              checked={formData.isVariationParent}
              onChange={handleChange}
              name="isVariationParent"
            />
            <Typography>Is Variation Parent</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              checked={formData.isBundle}
              onChange={handleChange}
              name="isBundle"
            />
            <Typography>Is Bundle</Typography>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
            Update Product
          </Button>
        </form>
      )}

      {activeTab === 1 && (
        <Box>
          <div {...getRootProps()} style={{ border: '1px dashed grey', padding: '16px', marginTop: '8px' }}>
            <input {...getInputProps()} />
            <Typography>Drag 'n' drop images here, or click to select files</Typography>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="images">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {formData.images.map((image, index) => (
                    <Draggable key={image.id} draggableId={image.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '10px',
                            ...provided.draggableProps.style
                          }}
                        >
                          <img src={URL.createObjectURL(image.file)} alt={image.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                          <Typography>{image.name}</Typography>
                          <Button onClick={() => handleDeleteImage(image.id)}>Delete</Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Button variant="contained" color="primary" onClick={handleImageSubmit} style={{ marginTop: '16px' }}>
            Save Images
          </Button>
        </Box>
      )}
      {activeTab === 2 && <div>Markets content</div>}
      {activeTab === 3 && <div>Orders content</div>}
      {activeTab === 4 && <div>Purchasing content</div>}
    </Box>
  );
};

export default EditProductModal;

