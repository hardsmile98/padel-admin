import {
  Box, Button, Tab, Tabs,
} from '@mui/material';
import { useLogoutMutation } from 'services';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout as logoutAction } from 'store/slices/auth';
import logo from 'assets/images/logo.svg';
import { NavLink, useLocation } from 'react-router-dom';

const tabs = [
  {
    label: 'Игроки',
    value: '/players',
  },
  {
    label: 'Турниры',
    value: '/tournaments',
  },
];

function Header() {
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const [logout, { isLoading, isSuccess, reset }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(logoutAction());

      reset();
    }
  }, [isSuccess, dispatch]);

  const getTabValue = () => tabs
    .find((tab) => pathname.includes(tab.value))?.value || tabs[0].value;

  const tabValue = getTabValue();

  return (
    <Box mb={3}>
      <Box
        mb={1}
        display="flex"
        justifyContent="space-between"
      >
        <Box
          mb={3}
          width="auto"
          height={24}
          component="img"
          src={logo}
          alt="logo"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => logout({})}
          loading={isLoading}
        >
          Выйти
        </Button>
      </Box>

      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={tabValue}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            component={NavLink}
            to={tab.value}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default Header;
