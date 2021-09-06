import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import { db, auth } from '../Firebase';
import {Link} from 'react-router-dom';
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

const SignUp = () => {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm();
    let history= useHistory();


    const onSubmit = async (data) => {
        const { name, email, password, contact } = data
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password).then(
                alert("Thank you for signing up")
            )
            const user = res.user;
            db.collection('users').doc(user.uid).set({
                uid: user.uid,
                name,
                email, contact
                }
            ).then(
                console.log("profile set!")
            ).catch((error)=>{
                console.error(error.message);
            })

        } catch (error) {
            console.error(error);
            alert(error.nessage)
        }
    }
    function login(){
        history.push("/SignIn");
    }
    return (
            <div className="container">
                <Container maxWidth="sm">
                <h1>Sign Up</h1>
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
                    {errors.name && <p>{errors.name.message}</p>}
                    <TextField
                        id="standard-basic"
                        name="email"
                        label="Email"
                        required
                        fullWidth
                        autoFocus
                        {...register("email", { required: { value: true, message: "please enter your email" } })}
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

                    <TextField
                        id="standard-basic"
                        label="Contact"
                        name="contact"
                        required
                        fullWidth
                        autoFocus
                        {...register("contact", { required: { value: true, message: "please enter your contact" } })}
                    />
                    {errors.contact && <p>{errors.contact.message}</p>}
                    <div className="spaceL">
                        <Button type="submit" className={classes.root}>Sign Up</Button>
                        <Link href="#" onClick={()=>login()}>Have an account? Login</Link>
                    </div>
                    
                </form>

                </Container>
            </div>
        

    );
};

export default SignUp; <p>Signup components</p>