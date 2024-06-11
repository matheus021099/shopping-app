import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Tooltip, Box, Menu, MenuItem, TablePagination } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getPurchaseOrdersByUserId } from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PurchaseOrderList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPurchaseOrderId, setSelectedPurchaseOrderId] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSetPurchaseOrders = async () => {
      try {
      const response = await getPurchaseOrdersByUserId(page, rowsPerPage);
      setPurchaseOrders(response.content);
      setTotalCount(response.totalElements);
      } catch (error) {
        setError('Failed to fetch POs. Please try again later.');
      }
    };
    fetchAndSetPurchaseOrders();
  }, [page, rowsPerPage]);

  const handleMenuClick = (event, purchaseOrderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPurchaseOrderId(purchaseOrderId);
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
      const newSelecteds = purchaseOrders.map((purchaseOrder) => purchaseOrder.id);
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
                  indeterminate={selected.length > 0 && selected.length < purchaseOrders.length}
                  checked={purchaseOrders.length > 0 && selected.length === purchaseOrders.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Vendor Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Ship Status</TableCell>
              <TableCell>Paid Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseOrders.map((purchaseOrder) => {
              const isItemSelected = isSelected(purchaseOrder.id);
              return (
                <TableRow
                  key={purchaseOrder.id}
                  selected={isItemSelected}
                  onClick={() => setSelected((prevSelected) => {
                    if (isItemSelected) {
                      return prevSelected.filter(id => id !== purchaseOrder.id);
                    } else {
                      return [...prevSelected, purchaseOrder.id];
                    }
                  })}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell>{purchaseOrder.id}</TableCell>
                  <TableCell>{purchaseOrder.createdDate}</TableCell>
                  <TableCell>{purchaseOrder.vendorName}</TableCell>
                  <TableCell>{purchaseOrder.quantity}</TableCell>
                  <TableCell>{purchaseOrder.cost}</TableCell>
                  <TableCell>{purchaseOrder.shipStatus}</TableCell>
                  <TableCell>{purchaseOrder.paidStatus}</TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handleMenuClick(event, purchaseOrder.id)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedPurchaseOrderId === purchaseOrder.id}
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

export default PurchaseOrderList;

