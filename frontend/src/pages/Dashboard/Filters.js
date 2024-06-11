import React, { useState } from 'react';
import { Box, TextField, FormControlLabel, Checkbox, Button, Typography, Grid, RadioGroup, Radio } from '@mui/material';

const Filters = ({ viewMode, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    product: {
      searchProduct: '',
      sort: {
        quantity: null,
        price: null,
        createdDate: null
      },
      integrationIdOrNickname: '',
      isActive: false,
      isHidden: false,
      priceMin: '',
      priceMax: '',
      quantityMin: '',
      quantityMax: '',
      createdDateStart: '',
      createdDateEnd: ''
    },
    order: {
      orderId: '',
      sort: {
        createdDate: null,
        shippedDate: null,
        paidDate: null
      },
      markets: {
        amazon: false,
        ebay: false,
        etsy: false,
        shopify: false
      },
      integrationIdOrNickname: '',
      isActive: false,
      isHidden: false,
      priceMin: '',
      priceMax: '',
      quantityMin: '',
      quantityMax: '',
      createdDateStart: '',
      createdDateEnd: ''
    },
    purchaseOrder: {
      purchaseOrderId: '',
      sort: {
        createdDate: null,
        shippedDate: null,
        paidDate: null
      },
      statuses: {
        shipped: false,
        paid: false,
        open: false
      },
      integrationIdOrNickname: '',
      isActive: false,
      isHidden: false,
      priceMin: '',
      priceMax: '',
      quantityMin: '',
      quantityMax: '',
      createdDateStart: '',
      createdDateEnd: ''
    }
  });

  const handleInputChange = (event, type, field) => {
    const { name, value, checked, type: inputType } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: {
        ...prevFilters[type],
        [field]: inputType === 'checkbox' ? checked : value
      }
    }));
  };

  const handleSortChange = (event, type, sortField) => {
    const { value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: {
        ...prevFilters[type],
        sort: {
          ...prevFilters[type].sort,
          [sortField]: value
        }
      }
    }));
  };

  const handleApply = () => {
    const sortField = Object.keys(filters.product.sort).find(key => filters.product.sort[key] !== null);
    const sortOrder = sortField ? filters.product.sort[sortField] : null;

    onApplyFilters({
      ...filters[viewMode.toLowerCase()],
      page: 0,
      size: 10,
      sortField,
      sortOrder
    });
  };

  return (
    <Box sx={{ width: '100%', padding: '16px', bgcolor: '#ffffff', borderRadius: 1, boxShadow: 1 }}>
      {viewMode === 'Products' && (
        <>
          <Typography variant="subtitle1" gutterBottom>Product</Typography>
          <TextField
            label="Search Product"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="searchProduct"
            value={filters.product.searchProduct}
            onChange={(event) => handleInputChange(event, 'product', 'searchProduct')}
          />
          <Typography variant="subtitle2" gutterBottom>Sort By</Typography>
          <Box sx={{ pl: 1 }}>
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.product.sort.quantity !== null} onChange={(event) => handleSortChange(event, 'product', 'quantity')} />}
              label={<Typography variant="body2">Quantity</Typography>}
            />
            <RadioGroup row value={filters.product.sort.quantity || ''} onChange={(event) => handleSortChange(event, 'product', 'quantity')}>
              <FormControlLabel value="asc" control={<Radio size="small" />} label={<Typography variant="body2">ASC</Typography>} />
              <FormControlLabel value="desc" control={<Radio size="small" />} label={<Typography variant="body2">DESC</Typography>} />
            </RadioGroup>
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.product.sort.price !== null} onChange={(event) => handleSortChange(event, 'product', 'price')} />}
              label={<Typography variant="body2">Price</Typography>}
            />
            <RadioGroup row value={filters.product.sort.price || ''} onChange={(event) => handleSortChange(event, 'product', 'price')}>
              <FormControlLabel value="asc" control={<Radio size="small" />} label={<Typography variant="body2">ASC</Typography>} />
              <FormControlLabel value="desc" control={<Radio size="small" />} label={<Typography variant="body2">DESC</Typography>} />
            </RadioGroup>
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.product.sort.createdDate !== null} onChange={(event) => handleSortChange(event, 'product', 'createdDate')} />}
              label={<Typography variant="body2">Created Date</Typography>}
            />
            <RadioGroup row value={filters.product.sort.createdDate || ''} onChange={(event) => handleSortChange(event, 'product', 'createdDate')}>
              <FormControlLabel value="asc" control={<Radio size="small" />} label={<Typography variant="body2">ASC</Typography>} />
              <FormControlLabel value="desc" control={<Radio size="small" />} label={<Typography variant="body2">DESC</Typography>} />
            </RadioGroup>
          </Box>

          <Typography variant="subtitle2" gutterBottom>Filter</Typography>
          <TextField
            label="Integration ID or NickName"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="integrationIdOrNickname"
            value={filters.product.integrationIdOrNickname}
            onChange={(event) => handleInputChange(event, 'product', 'integrationIdOrNickname')}
          />
          <FormControlLabel
            control={<Checkbox size="small" checked={filters.product.isActive} onChange={(event) => handleInputChange(event, 'product', 'isActive')} />}
            label={<Typography variant="body2">Is Active</Typography>}
          />
          <FormControlLabel
            control={<Checkbox size="small" checked={filters.product.isHidden} onChange={(event) => handleInputChange(event, 'product', 'isHidden')} />}
            label={<Typography variant="body2">Is Hidden</Typography>}
          />

          <Typography variant="subtitle2" gutterBottom>Price</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Min"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                name="priceMin"
                value={filters.product.priceMin}
                onChange={(event) => handleInputChange(event, 'product', 'priceMin')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Max"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                name="priceMax"
                value={filters.product.priceMax}
                onChange={(event) => handleInputChange(event, 'product', 'priceMax')}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle2" gutterBottom>Quantity</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Min"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                name="quantityMin"
                value={filters.product.quantityMin}
                onChange={(event) => handleInputChange(event, 'product', 'quantityMin')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Max"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                name="quantityMax"
                value={filters.product.quantityMax}
                onChange={(event) => handleInputChange(event, 'product', 'quantityMax')}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle2" gutterBottom>Created Date</Typography>
          <TextField
            label="Start Date"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="createdDateStart"
            value={filters.product.createdDateStart}
            onChange={(event) => handleInputChange(event, 'product', 'createdDateStart')}
          />
          <TextField
            label="End Date"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="createdDateEnd"
            value={filters.product.createdDateEnd}
            onChange={(event) => handleInputChange(event, 'product', 'createdDateEnd')}
          />

          <Button variant="contained" color="primary" fullWidth size="small" onClick={handleApply}>
            Apply
          </Button>

          <Typography variant="subtitle2" gutterBottom sx={{ marginTop: '16px' }}>Integration</Typography>
          {/* Integration List Placeholder */}
          <Typography variant="body2" color="textSecondary">Loading...</Typography>
        </>
      )}

      {/* Repeat similar structure for Orders and PurchaseOrders filters */}
    </Box>
  );
};

export default Filters;

