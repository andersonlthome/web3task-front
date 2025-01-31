import { useRef, useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";

import InboxTwoToneIcon from "@mui/icons-material/InboxTwoTone";
import { styled } from "@mui/material/styles";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import MessageIcon from "@mui/icons-material/Message";
import { Address, createWalletClient, custom, http } from 'viem';
import { useConnect } from 'wagmi';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserConnect(props) {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isConnected, setConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<Address>();
  const {
    connect,
    connectors,
    error,
    isLoading,
    pendingConnector,
  } = useConnect();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">Connect</UserBoxLabel>
            <UserBoxDescription variant="body2">Dapp</UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >        
        <List sx={{ p: 1 }} component="nav">
          {
            connectors
            .map((connector) => (
              <ListItem button to="/" key={connector.id} onClick={() => connect({connector})} component={NavLink}>
                <ListItemText primary={connector.name || (isLoading && connector.id === pendingConnector?.id && ' (connecting)')} />
              </ListItem>
            ))
          }
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth>
            <MessageIcon sx={{ mr: 1 }} />
            Contact us to add new network.
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserConnect;
