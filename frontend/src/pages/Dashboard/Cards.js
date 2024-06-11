import React, { useState, useEffect } from 'react';
import {
  Grid, Card, CardContent, Typography, Button, Box, Modal, Fade, Backdrop, TextField, Checkbox, MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import PackageIcon from '@mui/icons-material/Inventory2';
import AddIcon from '@mui/icons-material/Add';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import OrderIcon from '@mui/icons-material/ShoppingCart';
import { useDropzone } from 'react-dropzone';
import { createProduct, createOrder, fetchMarketIntegrations } from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cards = () => {
  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const response = await fetchMarketIntegrations();
        setMarketIntegrations(response);
      } catch (error) {
        toast.error('Failed to fetch market integrations');
      }
    };

    fetchIntegrations();
  }, []);

  const [openProductModal, setOpenProductModal] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [openIntegrationModal, setOpenIntegrationModal] = useState(false);
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    price: 0,
    qty: 0,
    description: '',
    image: null,
    isVariationParent: false,
    isBundle: false,
    customerName: '',
    marketId: '',
    orderNumber: '',
    marketOrderNumber: ''
  });
  const [marketIntegrations, setMarketIntegrations] = useState([]);

  const [integrationData, setIntegrationData] = useState({
    marketName: '',
    marketNickname: ''
  });

  const handleOpenProductModal = () => setOpenProductModal(true);
  const handleCloseProductModal = () => {
    setOpenProductModal(false);
    setFormData({
      sku: '',
      name: '',
      price: 0,
      qty: 0,
      description: '',
      image: null,
      isVariationParent: false,
      isBundle: false,
    });
  };

  const handleOpenOrderModal = () => setOpenOrderModal(true);
  const handleCloseOrderModal = () => setOpenOrderModal(false);

  const handleOpenIntegrationModal = () => setOpenIntegrationModal(true);
  const handleCloseIntegrationModal = () => {
    setOpenIntegrationModal(false);
    setIntegrationData({
      marketName: '',
      marketNickname: ''
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleIntegrationChange = (e) => {
    const { name, value } = e.target;
    setIntegrationData({
      ...integrationData,
      [name]: value,
    });
  };

  const onDrop = (acceptedFiles) => {
    setFormData({
      ...formData,
      image: acceptedFiles[0],
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('sku', formData.sku);
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('qty', formData.qty);
    data.append('description', formData.description);
    if (formData.image) data.append('image', formData.image);
    data.append('isVariationParent', formData.isVariationParent);
    data.append('isBundle', formData.isBundle);

    try {
      await createProduct(data);
      toast.success('Product created successfully');
      handleCloseProductModal();
    } catch (error) {
      toast.error(error.error || 'There was an error creating the product');
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customerName: formData.customerName,
      marketId: formData.marketId,
      orderNumber: formData.orderNumber,
      marketOrderNumber: formData.marketOrderNumber,
      totalQty: formData.totalQty,
      totalPrice: formData.totalPrice,
    };

    try {
      await createOrder(orderData);
      toast.success('Order created successfully');
      handleCloseOrderModal();
    } catch (error) {
      toast.error(error.error || 'There was an error creating the order');
    }
  };

  const handleIntegrationSubmit = (e) => {
    e.preventDefault();
    // Call the API to add the integration
    toast.success('Integration added successfully');
    handleCloseIntegrationModal();
  };


  return (
    <>
      <Grid container spacing={3} style={{ padding: '16px' }}>
        <Grid item xs={3}>
          <Card sx={{ bgcolor: '#ffffff', borderRadius: 1, boxShadow: 1 }}>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <PackageIcon color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h6" component="div">
                  Create Product
                </Typography>
                <Button variant="contained" color="primary" size="small" style={{ marginTop: '8px' }} onClick={handleOpenProductModal}>
                  Create Product
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ bgcolor: '#ffffff', borderRadius: 1, boxShadow: 1 }}>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <OrderIcon color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h6" component="div">
                  Create Order
                </Typography>
                <Button variant="contained" color="primary" size="small" style={{ marginTop: '8px' }} onClick={handleOpenOrderModal}>
                  Create Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ bgcolor: '#ffffff', borderRadius: 1, boxShadow: 1 }}>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <AddIcon color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h6" component="div">
                  Add Integration
                </Typography>
                <Button variant="contained" color="primary" size="small" style={{ marginTop: '8px' }} onClick={handleOpenIntegrationModal}>
                  Add Integration
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ bgcolor: '#ffffff', borderRadius: 1, boxShadow: 1 }}>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <LightbulbIcon color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h6" component="div">
                  Did You Know?
                </Typography>
                <Button variant="contained" color="primary" size="small" style={{ marginTop: '8px' }}>
                  Know More
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Create Product Modal */}
      <Modal
        open={openProductModal}
        onClose={handleCloseProductModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openProductModal}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Create Product
            </Typography>
            <form onSubmit={handleProductSubmit}>
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
              <Box {...getRootProps()} sx={{ border: '1px dashed grey', padding: '16px', marginTop: '8px' }}>
                <input {...getInputProps()} />
                <Typography>Drag 'n' drop an image here, or click to select one</Typography>
              </Box>
              {formData.image && <Typography>{formData.image.name}</Typography>}
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
                Create Product
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>

      {/* Create Order Modal */}
      <Modal
        open={openOrderModal}
        onClose={handleCloseOrderModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openOrderModal}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Create Order
            </Typography>
            <form onSubmit={handleOrderSubmit}>
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
              <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                Create Order
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>

      {/* Add Integration Modal */}
      <Modal
        open={openIntegrationModal}
        onClose={handleCloseIntegrationModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openIntegrationModal}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Add Integration
            </Typography>
            <form onSubmit={handleIntegrationSubmit}>
              <TextField
                select
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Market Name"
                name="marketName"
                value={integrationData.marketName}
                onChange={handleIntegrationChange}
              >
                <MenuItem value="Amazon">Amazon</MenuItem>
                <MenuItem value="Ebay">Ebay</MenuItem>
                <MenuItem value="Etsy">Etsy</MenuItem>
                <MenuItem value="Shopify">Shopify</MenuItem>
              </TextField>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Market Nickname"
                name="marketNickname"
                value={integrationData.marketNickname}
                onChange={handleIntegrationChange}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                Add Integration
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>

      <ToastContainer />
    </>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default Cards;

