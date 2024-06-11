import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Tooltip, Box, Menu, MenuItem, TablePagination } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getOrdersByUserId } from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSetOrders = async () => {
      try {
      const response = await getOrdersByUserId(page, rowsPerPage);
      setOrders(response.content);
      setTotalCount(response.totalElements);
      } catch (error) {
        setError('Failed to fetch orders. Please try again later.');
      }
    };
    fetchAndSetOrders();
  }, [page, rowsPerPage]);

  const handleMenuClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // Handle edit logic
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete logic
    handleMenuClose();
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orders.map((order) => order.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < orders.length}
                  checked={orders.length > 0 && selected.length === orders.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Market</TableCell>
              <TableCell>Market ID</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Ship Status</TableCell>
              <TableCell>Paid Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const isItemSelected = isSelected(order.id);
              return (
                <TableRow
                  key={order.id}
                  selected={isItemSelected}
                  onClick={() => setSelected((prevSelected) => {
                    if (isItemSelected) {
                      return prevSelected.filter(id => id !== order.id);
                    } else {
                      return [...prevSelected, order.id];
                    }
                  })}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.market}</TableCell>
                  <TableCell>{order.marketId}</TableCell>
                  <TableCell>{order.createdDate}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{order.shipStatus}</TableCell>
                  <TableCell>{order.paidStatus}</TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handleMenuClick(event, order.id)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedOrderId === order.id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleEdit}>Edit</MenuItem>
                      <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <ToastContainer />
    </Box>
  );
};

export default OrderList;

