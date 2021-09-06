import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import { db, auth } from '../Firebase';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },

});

const SignIn = () => {
  const classes = useStyles();
  const { register, handleSubmit, formState: { errors } } = useForm()
  let history = useHistory()
  
  const onSubmit = async (data) => {
    const {email, password} = data
    try{
      const res = await auth.signInWithEmailAndPassword(email, password).then(()=>
      {
        alert("Welcome Back")
        history.push("/Shop")
    
      })

    }catch(error){
      console.log(error);
      alert(error.message)
    }
  
}
  
  function SignUp() {
    history.push("/SignUp");
  }
 
  return (
    <Container maxWidth="sm">
      <h2>LOGIn</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          id="standard-basic"
          label="Name"
          name="name"
          required
          fullWidth
          autoFocus
          {...register("name", { required: { value: true, message: "please enter your name" } })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <TextField
          id="standard-basic"
          name="password"
          label="Password"
          required
          fullWidth
          autoFocus
          type="password"
          {...register("password", { required: { value: true, message: "please enter your password" } })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <Button type="submit" className={classes.root}>LOGIN</Button>
        <Link href="#" onClick={()=>SignUp()}>Have an account? Login</Link>
      </form>
    </Container>

  );
};

export default SignIn;