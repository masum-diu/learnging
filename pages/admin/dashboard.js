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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
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
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

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
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [form, setForm] = useState({ id: null, name: '', level: '', duration: '', price: '', students: 0, description: '' });
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

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

  // Fetch courses when courses tab is active
  useEffect(() => {
    if (activeTab !== 'courses') return;
    let mounted = true;
    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const res = await axios.get('/api/courses');
        if (mounted) setCourses(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch courses', err);
        setSnack({ open: true, message: 'Failed to load courses', severity: 'error' });
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
    return () => { mounted = false; };
  }, [activeTab]);

  const openCreateDialog = () => {
    setDialogMode('create');
    setForm({ id: null, name: '', level: '', duration: '', price: '', students: 0, description: '' });
    setDialogOpen(true);
  };

  const openEditDialog = (course) => {
    setDialogMode('edit');
    setForm({ ...course });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleFormChange = (field) => (e) => {
    const value = e.target.value;
    setForm((s) => ({ ...s, [field]: value }));
  };

  const saveCourse = async () => {
    setSaving(true);
    try {
      if (dialogMode === 'create') {
        const res = await axios.post('/api/courses', { ...form, price: Number(form.price), students: Number(form.students) });
        setCourses((c) => [...c, res.data.data]);
        setSnack({ open: true, message: 'Course created', severity: 'success' });
      } else {
        const res = await axios.put(`/api/courses/${form.id}`, { ...form, price: Number(form.price), students: Number(form.students) });
        setCourses((c) => c.map((it) => (it.id === res.data.data.id ? res.data.data : it)));
        setSnack({ open: true, message: 'Course updated', severity: 'success' });
      }
      setDialogOpen(false);
    } catch (err) {
      console.error('Save course error', err);
      setSnack({ open: true, message: err?.response?.data?.error || 'Failed to save', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const deleteCourse = async (id) => {
    if (!confirm('Delete this course?')) return;
    try {
      await axios.delete(`/api/courses/${id}`);
      setCourses((c) => c.filter((it) => it.id !== id));
      setSnack({ open: true, message: 'Course deleted', severity: 'success' });
    } catch (err) {
      console.error('Delete course error', err);
      setSnack({ open: true, message: 'Failed to delete', severity: 'error' });
    }
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
                    <Grid size={{ xs: 12, md: 3 }} key={index}>
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
                  <Grid size={{ xs: 12, md: 6 }}>
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
                  <Grid size={{ xs: 12, md: 6 }}>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    📚 Courses Management
                  </Typography>
                  <Button startIcon={<AddIcon />} variant="contained" onClick={openCreateDialog}>New Course</Button>
                </Box>

                {loadingCourses ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Grid container spacing={3}>
                    {courses.map((course) => (
                      <Grid item size={{ xs: 12, md: 4 }} key={course.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                              {course.name}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                              Students: <strong>{course.students}</strong> | Price: <strong>${course.price}</strong>
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                              Level: <strong>{course.level}</strong> | Duration: <strong>{course.duration}</strong>
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                              {course.description.slice(0, 100)}{course.description.length > 100 ? '...' : ''}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                              <Button variant="contained" startIcon={<EditIcon />} onClick={() => openEditDialog(course)}>
                                Edit
                              </Button>
                              <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteCourse(course.id)}>
                                Delete
                              </Button>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}

                <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
                  <DialogTitle>{dialogMode === 'create' ? 'New Course' : 'Edit Course'}</DialogTitle>
                  <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                      <TextField label="Name" value={form.name} onChange={handleFormChange('name')} fullWidth />
                      <TextField label="Level" value={form.level} onChange={handleFormChange('level')} fullWidth />
                      <TextField label="Duration" value={form.duration} onChange={handleFormChange('duration')} fullWidth />
                      <TextField label="Price" value={form.price} onChange={handleFormChange('price')} type="number" fullWidth />
                      <TextField label="Students" value={form.students} onChange={handleFormChange('students')} type="number" fullWidth />
                      <TextField label="Description" value={form.description} onChange={handleFormChange('description')} fullWidth multiline minRows={3} />
                    </Stack>
                  </DialogContent>
                  <DialogActions>
                    <Button startIcon={<CloseIcon />} onClick={closeDialog} disabled={saving}>Cancel</Button>
                    <Button startIcon={<SaveIcon />} variant="contained" onClick={saveCourse} disabled={saving}>
                      {saving ? 'Saving...' : dialogMode === 'create' ? 'Create' : 'Save'}
                    </Button>
                  </DialogActions>
                </Dialog>

                <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
                  <Alert onClose={() => setSnack((s) => ({ ...s, open: false }))} severity={snack.severity} sx={{ width: '100%' }}>
                    {snack.message}
                  </Alert>
                </Snackbar>

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
