import React, { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  CssBaseline,
  ThemeProvider,
  createTheme,
  TextField,
  Alert,
  Paper,
  Rating,
  Stack,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
  },
});

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const courses = [
    {
      id: 1,
      name: 'Beginner English (A1)',
      level: 'Beginner',
      price: 99,
      students: 234,
      image: '🔤',
      features: ['24 Lessons', 'Live Classes', 'Grammar Basics'],
    },
    {
      id: 2,
      name: 'Intermediate English (B1)',
      level: 'Intermediate',
      price: 129,
      students: 156,
      image: '📖',
      features: ['30 Lessons', 'Business English', 'Speaking Practice'],
      popular: true,
    },
    {
      id: 3,
      name: 'Advanced English (C1)',
      level: 'Advanced',
      price: 159,
      students: 89,
      image: '🎯',
      features: ['36 Lessons', 'IELTS Prep', 'Academic Writing'],
    },
  ];

  const features = [
    { icon: <PeopleIcon />, title: 'Expert Instructors', description: 'Learn from certified English teachers' },
    { icon: <FitnessCenterIcon />, title: 'Flexible Learning', description: 'Study at your own pace' },
    { icon: <ChatBubbleIcon />, title: 'Live Interactions', description: 'Join live classes and discussions' },
    { icon: <EmojiEventsIcon />, title: 'Certificates', description: 'Earn recognized certificates' },
    { icon: <TrendingUpIcon />, title: 'Progress Tracking', description: 'Monitor your improvement' },
    { icon: <FolderOpenIcon />, title: 'Global Community', description: 'Connect with learners worldwide' },
  ];

  const testimonials = [
    {
      name: 'Sarah Ahmed',
      avatar: 'SA',
      rating: 5,
      text: 'This course completely transformed my English skills! Highly recommended!',
      location: '🇧🇩 Bangladesh',
    },
    {
      name: 'Md. Khan',
      avatar: 'MK',
      rating: 5,
      text: 'I loved the flexibility and quality of teaching. Best investment ever!',
      location: '🇧🇩 Bangladesh',
    },
    {
      name: 'Fatima Sultana',
      avatar: 'FS',
      rating: 5,
      text: 'Made friends from around the world. Amazing community!',
      location: '🇧🇩 Bangladesh',
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Navigation Bar */}
        <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <SchoolIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', flex: 1 }}>
                Learn English
              </Typography>
              <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Button color="inherit" href="#courses">
                  Courses
                </Button>
                <Button color="inherit" href="#features">
                  Features
                </Button>
                <Button color="inherit" href="/gamers">
                  🎮 Gamers
                </Button>
                <Button color="inherit" href="#about">
                  About
                </Button>
                <Button color="inherit" href="/admin/login" sx={{ fontWeight: 'bold' }}>
                  ⚙️ Admin
                </Button>
                <Button color="inherit" variant="outlined">
                  Login
                </Button>
                <Button variant="contained" color="secondary">
                  Sign Up
                </Button>
              </Stack>
              <IconButton
                onClick={(e) => setMobileMenuOpen(e.currentTarget)}
                sx={{ display: { xs: 'flex', sm: 'none' } }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuOpen}
                open={Boolean(mobileMenuOpen)}
                onClose={() => setMobileMenuOpen(null)}
              >
                <MenuItem href="#courses">Courses</MenuItem>
                <MenuItem href="#features">Features</MenuItem>
                <MenuItem href="/gamers">🎮 Gamers</MenuItem>
                <MenuItem href="#about">About</MenuItem>
                <MenuItem href="/admin/login">⚙️ Admin</MenuItem>
              </Menu>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            color: 'white',
            py: { xs: 6, md: 12 },
            overflow: 'hidden',
          }}
        >
          {/* Background Video */}
          <Box
            component="video"
            autoPlay
            muted
            loop
            playsInline
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          >
            <source 
              src="ass"
              type="video/mp4" 
            />
          </Box>
          
          {/* Overlay Gradient */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
              zIndex: 1,
            }}
          />
          
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  Master English in 3 Months
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, opacity: 0.9, fontWeight: 400 }}>
                  Learn from expert instructors, join a global community, and unlock your potential with interactive lessons and real-world practice.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                  <Button variant="contained" color="inherit" size="large">
                    Explore Courses
                  </Button>
                  <Button variant="outlined" color="inherit" size="large">
                    Watch Demo
                  </Button>
                </Stack>
                <Stack direction="row" spacing={4} sx={{ mt: 4 }}>
                  <Box>
                    <Typography variant="h5">45K+</Typography>
                    <Typography>Active Students</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5">95%</Typography>
                    <Typography>Success Rate</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5">4.9★</Typography>
                    <Typography>Rating</Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                <Typography variant="h1">📚</Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Courses Section */}
        <Container maxWidth="lg" sx={{ py: 8 }} id="courses">
          <Typography variant="h3" sx={{ mb: 1, textAlign: 'center' }}>
            Our Popular Courses
          </Typography>
          <Typography sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
            Choose the perfect course for your English learning journey
          </Typography>
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: course.popular ? '0 10px 40px rgba(102, 126, 234, 0.3)' : 1,
                    transform: course.popular ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 3,
                    },
                  }}
                >
                  {course.popular && (
                    <Alert severity="warning" sx={{ m: 2, mb: 0 }}>
                      ⭐ Most Popular
                    </Alert>
                  )}
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h1" sx={{ mb: 1 }}>
                      {course.image}
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                      {course.name}
                    </Typography>
                    <Typography color="secondary" sx={{ mb: 2, fontWeight: 'bold' }}>
                      {course.level}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {course.features.map((feature, i) => (
                        <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                          ✓ {feature}
                        </Typography>
                      ))}
                    </Box>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                      ${course.price}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {course.students} students enrolled
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant="contained" color="primary">
                      Enroll Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Features Section */}
        <Box sx={{ bgcolor: '#f5f5f5', py: 8 }} id="features">
          <Container maxWidth="lg">
            <Typography variant="h3" sx={{ mb: 1, textAlign: 'center' }}>
              Why Choose Us?
            </Typography>
            <Typography sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
              Everything you need for English mastery
            </Typography>
            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ height: '100%', textAlign: 'center' }}>
                    <CardContent>
                      <Box sx={{ color: 'primary.main', mb: 2 }}>
                        {React.cloneElement(feature.icon, { sx: { fontSize: 40 } })}
                      </Box>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* About Section */}
        <Container maxWidth="lg" sx={{ py: 8 }} id="about">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <Typography variant="h1" sx={{ mb: 2 }}>
                🏢
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ mb: 2 }}>
                About Learn English Academy
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Founded in 2020, Learn English Academy has been dedicated to helping millions of students worldwide achieve their English language goals.
              </Typography>
              <Typography sx={{ mb: 3 }}>
                We believe that everyone deserves access to quality education. Our mission is to make English learning accessible, affordable, and effective.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" color="primary">
                      2020
                    </Typography>
                    <Typography>Founded</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" color="primary">
                      45+
                    </Typography>
                    <Typography>Countries</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" color="primary">
                      95%
                    </Typography>
                    <Typography>Success Rate</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" color="primary">
                      4.9★
                    </Typography>
                    <Typography>Rating</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>

        {/* Testimonials Section */}
        <Box sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" sx={{ mb: 1, textAlign: 'center' }}>
              What Our Students Say
            </Typography>
            <Typography sx={{ mb: 4, textAlign: 'center', opacity: 0.9 }}>
              Join thousands of satisfied learners
            </Typography>
            <Grid container spacing={3}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 1, color: '#ffd700' }} />
                    <Typography sx={{ mb: 2, fontStyle: 'italic' }}>
                      "{testimonial.text}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.3)' }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="caption">
                          {testimonial.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box sx={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))', py: 8 }}>
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Ready to Learn English?
            </Typography>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Join thousands of successful students. Start your journey today!
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Get Started Free
            </Button>
          </Container>
        </Box>

        {/* Newsletter Section */}
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 1, textAlign: 'center' }}>
              Stay Updated
            </Typography>
            <Typography sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
              Get the latest news, tips, and offers delivered to your inbox
            </Typography>
            <Box component="form" onSubmit={handleNewsletterSubscribe} sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Subscribe
              </Button>
            </Box>
            {isSubscribed && (
              <Alert severity="success" sx={{ mt: 2 }}>
                ✓ Thank you! Check your email for confirmation.
              </Alert>
            )}
          </Paper>
        </Container>

        {/* Footer */}
        <Box sx={{ bgcolor: '#333', color: 'white', py: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  About
                </Typography>
                <Typography variant="body2">About Us</Typography>
                <Typography variant="body2">Blog</Typography>
                <Typography variant="body2">Careers</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Courses
                </Typography>
                <Typography variant="body2">All Courses</Typography>
                <Typography variant="body2">Business English</Typography>
                <Typography variant="body2">IELTS Prep</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Support
                </Typography>
                <Typography variant="body2">Help Center</Typography>
                <Typography variant="body2">Contact Us</Typography>
                <Typography variant="body2">FAQ</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Legal
                </Typography>
                <Typography variant="body2">Privacy Policy</Typography>
                <Typography variant="body2">Terms of Service</Typography>
              </Grid>
            </Grid>
            <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                &copy; 2024 Learn English Academy. All rights reserved.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}