import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root : {
    display: "flex",
    minHeight: "30vh",
    padding : "1.5rem 0"
  },
  mtAuto : {
    marginTop : "auto"
  }
});

export default () => {
  const classes = useStyles();

  return <Container maxWidth="lg" style={ { minHeight: "80vh"}}>
    <Paper variant="outlined" className={ classes.root }>
      <Container maxWidth="lg">
      <Typography variant="h2">Welcome!</Typography>
      <p>This is a MERN stack based fully functioning blog system. Here, you can share your experience and ideas with other people.</p>
      
      <Link className={classes.mtAuto} to="/posts" role="button">
      <Button variant="contained" color="primary">
      Look the blog posts &raquo;
      </Button></Link>
      </Container>
      </Paper>

    <Grid
    container
    spacing={3}
    direction="row"
    justify="center"
    alignItems="center">
      <Grid item md={4} sm={6} xs={12}>
        <h2>Front-end</h2>
        <p>The front-end client is built as a simple-page-application using React and Redux (for middlewares and reducers). Besides, React-Router is used for navigation. Redux-Thunk is used for processing asynchronous requests. Bootstrap 4 is used for page styling.</p>
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <h2>Back-end</h2>
        <p>The back-end server is built with Express.js and Node.js , which provides completed REST APIs for data interaction. authentication middleware in the sever. JSON Web Token (JWT) is used for signing in user and making authenticated requests.</p>
      </Grid>
      <Grid item md={4} sm={12} xs={12}>
        <h2>Database</h2>
        <p>MongoDB is used as the back-end database, which include different data models/schemas (i.e., User, Post and Comment). Mongoose is used to access the MongoDB for CRUD actions (create, read, update and delete).</p>
      </Grid>
    </Grid>

    </Container>
 }