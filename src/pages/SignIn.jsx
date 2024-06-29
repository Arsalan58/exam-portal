import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import CustomSnackBar from '../components/CustomSnackBar'; // Ensure this import is correct
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        TCS EXAM PORTAL
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ message: '', type: '' });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      mobile: "",
      password: ""
    },
    onSubmit: async (values) => {
      try {
        // navigate("/dashboard");
        // localStorage.setItem("token", "token");
        const response = await axios.post("https://genuine-guided-snipe.ngrok-free.app/panel/auth/login", values, {
          "ngrok-skip-content-warning": true
        })
          if (response.data.type === "error") {
            setSnackbar({ message: response.data.message, type: 'error' });
          } else if(response.data.type == "success"){
            console.log(response.data.data.userToken)
            localStorage.setItem("token", response.data.data.userToken);
            navigate("/dashboard");
            setSnackbar({ message: 'Login successful!', type: 'success' });

          }

      } catch (error) {
        setSnackbar({ message: error.message, type: 'error' });
      }
    }
  });

  const [disable, setDisable] = useState(true);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Box position={"relative"}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="mobile"
                label="Mobile Number"
                name="mobile"
                autoComplete="mobile"
                autoFocus
                onChange={handleChange}
                value={values.mobile}
                onBlur={handleBlur}
                error={touched.mobile && errors.mobile}
                helperText={touched.mobile && errors.mobile}
                FormHelperTextProps={{
                  sx: {
                    position: 'absolute',
                    bottom: '-20px',
                  },
                }}
              />
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              error={touched.password && errors.password}
              helperText={touched.password && errors.password}
              FormHelperTextProps={{
                sx: {
                  position: 'absolute',
                  bottom: '-20px',
                },
              }}
            />
            <FormControlLabel sx={{ marginTop: 1 }}
              control={<Checkbox onChange={(e) => {
                e.target.checked ? setDisable(false) : setDisable(true)
              }} value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              disabled={disable}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <CustomSnackBar message={snackbar.message} type={snackbar.type} />
      </Container>
    </ThemeProvider>
  );
}
