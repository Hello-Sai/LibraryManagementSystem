import React, { useState } from 'react'
import {Formik,Form,Field,ErrorMessage, validateYupSchema} from 'formik'
import {Alert, Button, Grid} from '@mui/material'
import { Container, Typography } from '@mui/material';
import { TextField } from 'formik-material-ui';

import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
const Register = ({onRegister,msg}) => {
  // const [name,setName] = useState("");
  // const [phone,setphone] = useState("");
  // const [college,setCollege] = useState("");
  // const [email,setEmail] = useState("");
  // const [password,setPassword] = useState("");
  const navigate = useNavigate()
  return (
    


    <Container maxWidth="sm"  style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px',marginTop:"20px" }}>
    <Typography variant="h4" align="center" gutterBottom>
      Registration Form
    </Typography>
    <Formik
      initialValues={{
              name:"",
              phone:"",
              college:"",
              address:"",
              email:"",
              password:""
            }}
            onSubmit={(values,{setSubmitting})=>{
              setSubmitting(false)
              onRegister(values)
              navigate("/login")
            }}
            validationSchema={Yup.object({
              name:Yup.string().required("Name required"),
              phone:Yup.number().required("phone number required").typeError("please provide numbers only from (0-9)"),
              college:Yup.string().required("college Required"),
              email:Yup.string().required("Email Required").matches("@gmail.com","InValid Email"),
              address:Yup.string().min(5,"Add atleast 5 characters").required("Address must be provide"),
              password:Yup.string().required("Password Required").min(8,"atleast 8 characters")
            })}
    >
      <Form>
        <Field
          component={TextField}
          label="Name"
          name="name"
          fullWidth
          margin="normal"
        />
        <Field
          component={TextField}
          label="phone"
          name="phone"
          fullWidth
          margin="normal"
        />
        
        <Field
          component={TextField}
          label="College"
          name="college"
          fullWidth
          margin="normal"
          
        />
        
        <Field
          component={TextField}
          label="address"
          name="address"
          fullWidth
          margin="normal"
        />

        <Field
          component={TextField}
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
        />
        <small style={{color:"red"}}>{msg}</small>
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
        >Register</Button>
      </Form>
    </Formik>
    </Container>
  )
}

export default Register
