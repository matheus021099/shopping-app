import React from 'react';
import ProductList from './ProductList';
import OrderList from './OrderList';
import PurchaseOrderList from './PurchaseOrderList';

const MainPanel = ({ viewMode, filters }) => {
  return (
    <div style={{ flexGrow: 1, padding: '16px' }}>
      {viewMode === 'Products' && <ProductList filters={filters} />}
      {viewMode === 'Orders' && <OrderList filters={filters} />}
      {viewMode === 'PurchaseOrders' && <PurchaseOrderList filters={filters} />}
    </div>
  );
};

export default MainPanel;

