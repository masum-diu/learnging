import React, { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Stack,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        borderBottom: '1px solid #e0e0e0',
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        position: 'sticky',
        backdropFilter: 'saturate(180%) blur(4px)',
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <SchoolIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{ fontWeight: 'bold', flex: 1, textDecoration: 'none', color: 'inherit' }}
          >
            Learn English
          </Typography>

          <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Button color="inherit" href="#courses">Courses</Button>
            <Button color="inherit" href="#features">Features</Button>
            <Button color="inherit" component={Link} href="/gamers">🎮 Gamers</Button>
            <Button color="inherit" href="#about">About</Button>
            <Button color="inherit" component={Link} href="/admin/login" sx={{ fontWeight: 'bold' }}>⚙️ Admin</Button>
            <Button color="inherit" component={Link} href="/login" variant="outlined">Login</Button>
            
          </Stack>

          <IconButton
            onClick={handleMenuOpen}
            sx={{ display: { xs: 'flex', sm: 'none' } }}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose} component="a" href="#courses">Courses</MenuItem>
            <MenuItem onClick={handleMenuClose} component="a" href="#features">Features</MenuItem>
            <MenuItem onClick={handleMenuClose} component="a" href="/gamers">🎮 Gamers</MenuItem>
            <MenuItem onClick={handleMenuClose} component="a" href="#about">About</MenuItem>
            <MenuItem onClick={handleMenuClose} component="a" href="/admin/login" target="_blank" rel="noopener noreferrer">⚙️ Admin</MenuItem>
            <MenuItem onClick={handleMenuClose} component="a" href="/login">Login</MenuItem>
           
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
