import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Divider,
  LinearProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import PaymentIcon from '@mui/icons-material/Payment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const drawerWidth = 250;

function AdminDashboard() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');

    if (!token) {
      router.push('/admin/login');
      return;
    }

    setAdminEmail(email);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: 'Overview', icon: <DashboardIcon />, id: 'overview' },
    { label: 'Students', icon: <PeopleIcon />, id: 'students' },
    { label: 'Courses', icon: <SchoolIcon />, id: 'courses' },
    { label: 'Payments', icon: <PaymentIcon />, id: 'payments' },
    { label: 'Reports', icon: <AnalyticsIcon />, id: 'reports' },
    { label: 'Settings', icon: <SettingsIcon />, id: 'settings' },
  ];

  const stats = [
    { label: 'Total Students', value: '1,245', color: '#667eea', icon: '👥' },
    { label: 'Active Courses', value: '18', color: '#764ba2', icon: '📚' },
    { label: 'Total Revenue', value: '$45,230', color: '#f093fb', icon: '💰' },
    { label: 'New Enrollments', value: '342', color: '#4facfe', icon: '✅' },
  ];

  const drawer = (
    <Box sx={{ width: drawerWidth, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          ⚙️ Admin Panel
        </Typography>
      </Box>
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={activeTab === item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileOpen(false);
              }}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              <ListItemIcon
                sx={{ color: activeTab === item.id ? 'white' : 'inherit' }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flex: 1, fontWeight: 'bold' }}>
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem>
                <Typography variant="body2">
                  {adminEmail}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mt: 8,
          }}
        >
          <Container maxWidth="lg">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <Box>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                  📊 Dashboard Overview
                </Typography>

                {/* Stats Grid */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Card>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Typography color="textSecondary" gutterBottom>
                                {stat.label}
                              </Typography>
                              <Typography variant="h5" sx={{ fontWeight: 'bold', color: stat.color }}>
                                {stat.value}
                              </Typography>
                            </Box>
                            <Typography variant="h3">{stat.icon}</Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Performance Metrics */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                          Student Satisfaction
                        </Typography>
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2">92% positive feedback</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={92} />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                          Course Completion
                        </Typography>
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2">78% average completion rate</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={78} />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <Box>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                  👥 Students Management
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: 'primary.main' }}>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Joined</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Courses</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Ahmed Khan</TableCell>
                        <TableCell>ahmed@example.com</TableCell>
                        <TableCell>2025-01-10</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>
                          <Button startIcon={<EditIcon />} size="small">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Fatima Ali</TableCell>
                        <TableCell>fatima@example.com</TableCell>
                        <TableCell>2025-01-15</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>
                          <Button startIcon={<EditIcon />} size="small">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <Box>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                  📚 Courses Management
                </Typography>
                <Grid container spacing={3}>
                  {[
                    { name: 'Beginner English (A1)', students: 234, price: 99 },
                    { name: 'Intermediate English (B1)', students: 156, price: 129 },
                  ].map((course, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {course.name}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            Students: <strong>{course.students}</strong> | Price: <strong>${course.price}</strong>
                          </Typography>
                          <Button variant="contained" startIcon={<EditIcon />}>
                            Edit
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <Box>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                  💳 Payments Management
                </Typography>
                <Card>
                  <CardContent>
                    <Typography>View and manage all payment transactions here.</Typography>
                  </CardContent>
                </Card>
              </Box>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <Box>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                  📈 Reports & Analytics
                </Typography>
                <Card>
                  <CardContent>
                    <Typography>Generate and view detailed reports and analytics.</Typography>
                  </CardContent>
                </Card>
              </Box>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <Box>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                  ⚙️ Settings
                </Typography>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      System Settings
                    </Typography>
                    <Typography>Configure system settings and preferences here.</Typography>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdminDashboard;
