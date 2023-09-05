import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import {TextField} from 'formik-material-ui'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Formik,Field,Form, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import Grid from '@mui/material/Grid'
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';



export default function Login({onLogin,msg}) {
  
const navigate = useNavigate()
  return (
    <Container maxWidth="sm" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px',marginTop:"20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login Form
      </Typography>
      <Formik  
        initialValues={{
          email:"",
          password:""
        }}
        
        onSubmit={(values,{setSubmitting})=>{
          onLogin(values)
          setSubmitting(false)
        }}
        validationSchema={Yup.object({
            email:Yup.string().required("Email Required").matches("@gmail.com","Invalid Email"),
            password:Yup.string().required("Password Required").min(8,"atleast 8 characters")
          })
        }
      >
      
          <Form>
            <Field
              component={TextField}
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              
            />
            <Field
              component={TextField}
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
            <Grid
            marginTop={0.7}>
            {msg!==""&&<Alert severity='error' variant='filled' >{msg}</Alert>}
            </Grid>
          </Form>
      </Formik>
    </Container>
  );
}