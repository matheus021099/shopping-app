import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';

const SideNav = () => {
  const integrations = ['Products', 'Orders', 'Purchase Orders', 'FBA Shipments', 'Settings'];

  return (
    <Drawer variant="permanent">
      <List>
        {integrations.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><StoreIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNav;

