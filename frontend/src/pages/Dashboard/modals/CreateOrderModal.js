import React, { useState, useEffect } from 'react';
import { fetchMarketIntegrations, createOrder } from '../../api'; // Adjust the import path as necessary
import { toast } from 'react-toastify';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const CreateOrderModal = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    marketId: '',
    orderNumber: '',
    marketOrderNumber: '',
    totalQty: 0,
    totalPrice: 0.0,
    shippingStatus: 'UNSHIPPED',
    paymentStatus: 'UNPAID',
    orderStatus: 'OPEN',
    companyId: 0,
  });
  const [marketIntegrations, setMarketIntegrations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const integrations = await fetchMarketIntegrations();
        setMarketIntegrations(integrations);
      } catch (error) {
        toast.error('Failed to fetch market integrations');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyId = localStorage.getItem('companyId');
    const orderData = { ...formData, companyId: Number(companyId) };

    try {
      await createOrder(orderData);
      toast.success('Order created successfully');
      handleClose();
    } catch (error) {
      console.error('Error from backend:', error);
      toast.error(error.error || 'There was an error creating the order');
    }
  };

  return (
    <Modal
      open
      onClose={handleClose}
      aria-labelledby="create-order-modal-title"
      aria-describedby="create-order-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <Typography id="create-order-modal-title" variant="h6" component="h2">
          Create Order
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Customer Name"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="market-select-label">Market</InputLabel>
            <Select
              labelId="market-select-label"
              id="market-select"
              name="marketId"
              value={formData.marketId}
              onChange={handleChange}
              label="Market"
            >
              <MenuItem value="local">Local</MenuItem>
              {marketIntegrations.map((market) => (
                <MenuItem key={market.id} value={market.id}>
                  {market.nickname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Order Number"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Market Order Number"
            name="marketOrderNumber"
            value={formData.marketOrderNumber}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Total Quantity"
            name="totalQty"
            type="number"
            value={formData.totalQty}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Total Price"
            name="totalPrice"
            type="number"
            value={formData.totalPrice}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
            Create Order
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default CreateOrderModal;

