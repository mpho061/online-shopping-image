import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import { db, auth } from '../Firebase';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '@fontsource/roboto';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { ButtonBase } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    maxWidth: '50%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: 10

  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '50%',
    maxHeight: '50%',
  },

}));

const Cart = () => {
  const classes = useStyles();
  let user = auth.currentUser
  const [cartList, setCartList] = useState([])
  const fetchCartItem = async () => {
    try {
      if (user) {
        const cartData = []
        const query = await db.collection("cart").where("uid", "==", user?.uid).get()
        query.forEach((doc) => {
          console.log(doc.data());
          cartData.push({ ...doc.data(), id: doc.id })
        })
        setCartList(cartData)
      } else {
        alert("Please Login")
      }
    } catch {
      // console.log(error.message);
    }
  }

  useEffect(() => {
    fetchCartItem()
  }, [])

  return (
    <div className={classes.root}>
      {cartList && cartList.map(cartItem => {
        <Paper>
          <Grid>
            <Grid item>
              <ButtonBase>
              <img className={classes.img}src={cartItem.product.ProductImage}  />
              </ButtonBase>
  
            </Grid>

            <Grid Container xm={12}>
              <Grid Container xs item direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBotton variant="subtitle1" >
                  {cartItem.product.ProductName}
                  </Typography>
                  <Typography variant="body2">
                  {cartItem.product.ProductDescription}
                  </Typography>

                </Grid>
              </Grid>
              <Button color="secondary">Remove</Button>
            </Grid>
            <Grid>
              <Typography variant ="subtitle1">
              {cartItem.product.ProductPrice}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      })

    }
    </div>
  );
};

export default Cart;