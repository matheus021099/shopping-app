import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CssBaseline, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Header from '../shared/LoggedInHeader';
import Cards from './Cards';
import Filters from './Filters';
import MainPanel from './MainPanel';
import { isTokenExpired } from '../../utils/jwt';

const Dashboard = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('Products');
  const [filters, setFilters] = useState({ page: 0, size: 10, filters: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      navigate('/login');
    }
  }, [navigate]);

  const handleViewChange = (event) => {
    setViewMode(event.target.value);
  };

const handleApplyFilters = (appliedFilters) => {
  setFilters({
    page: 0,
    size: 10,
    filters: appliedFilters
  });
};

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f7f7f7' }}>
      <CssBaseline />
      <Header />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs>
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel id="view-mode-label">View Mode</InputLabel>
              <Select
                labelId="view-mode-label"
                value={viewMode}
                onChange={handleViewChange}
                label="View Mode"
              >
                <MenuItem value="Products">Products</MenuItem>
                <MenuItem value="Orders">Orders</MenuItem>
                <MenuItem value="PurchaseOrders">Purchase Orders</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Cards />
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={3}>
            <Filters viewMode={viewMode} onApplyFilters={handleApplyFilters} />
          </Grid>
          <Grid item xs={12} md={9}>
            <MainPanel viewMode={viewMode} filters={filters} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;

