import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Tooltip, Box, Menu, MenuItem, TablePagination, Typography, Modal, Fade, Backdrop } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import bundleIcon from '../../assets/products/bundle.png';
import variationIcon from '../../assets/products/variation.png';
import placeholderImage from '../../assets/products/placeholder.jpg';
import { fetchProducts, deleteProduct } from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProductModal from './modals/EditProductModal';

const ProductList = ({ filters }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(filters.page || 0);
  const [rowsPerPage, setRowsPerPage] = useState(filters.size || 10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const response = await fetchProducts(filters.filters, page, rowsPerPage, filters.sortField, filters.sortOrder);
        setProducts(response.content);
        setTotalCount(response.totalElements);
      } catch (error) {
        setError('Failed to fetch products. Please try again later.');
      }
    };
    fetchAndSetProducts();
  }, [filters, page, rowsPerPage]); // Re-fetch data when filters, page, or rowsPerPage change

  const handleMenuClick = (event, productId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProductId(productId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    const productToEdit = products.find(product => product.id === selectedProductId);
    setSelectedProduct(productToEdit);
    setShowEditModal(true);
    handleMenuClose();
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(selectedProductId);
      toast.success('Product deleted successfully');
      setProducts(products.filter((product) => product.id !== selectedProductId));
      handleMenuClose();
    } catch (error) {
      toast.error('Failed to delete product');
      handleMenuClose();
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((product) => product.id);
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

  if (error) {
    return (
      <Box>
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < products.length}
                  checked={products.length > 0 && selected.length === products.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Selling QTY</TableCell>
              <TableCell>Default Price</TableCell>
              <TableCell>Is Bundle</TableCell>
              <TableCell>Is Variant</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const isItemSelected = isSelected(product.id);
              return (
                <TableRow
                  key={product.id}
                  selected={isItemSelected}
                  onClick={() => setSelected((prevSelected) => {
                    if (isItemSelected) {
                      return prevSelected.filter(id => id !== product.id);
                    } else {
                      return [...prevSelected, product.id];
                    }
                  })}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <img src={product.defaultImage || placeholderImage} alt="Product" width="50" height="50" />
                  </TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <Tooltip
                      title={`Sellable: ${product.sellableQty}, Unsellable: ${product.unsellableQty}, Reserved: ${product.reservedQty}`}
                    >
                      <span>{product.sellableQty}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    {product.bundle && <img src={bundleIcon} alt="Bundle" width="20" height="20" />}
                  </TableCell>
                  <TableCell>
                    {product.variationParent && <img src={variationIcon} alt="Variant" width="20" height="20" />}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handleMenuClick(event, product.id)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedProductId === product.id}
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

      <Modal
        open={showEditModal}
        onClose={handleCloseEditModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showEditModal}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Edit Product
            </Typography>
            {selectedProduct && <EditProductModal handleClose={handleCloseEditModal} productData={selectedProduct} />}
          </Box>
        </Fade>
      </Modal>
    </Box>
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

export default ProductList;

