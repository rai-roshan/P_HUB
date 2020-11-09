import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Button, Paper, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccessibilityNew , Code , GitHub, Devices } from '@material-ui/icons';

const useStyles = makeStyles({
  root : {
    display: "flex",
    minHeight: "30vh",
    padding : "1.5rem 0"
  },
  mt1 : {
    marginTop : "1rem"
  },
  iconSize: {
    fontSize: "3rem",
    margin: "0.5rem"
  }
});

const Welcome = () => {
  const classes = useStyles();

  return <Container maxWidth="lg" style={ { minHeight: "80vh"}}>
    <Paper variant="outlined" className={ classes.root }>
      <Container maxWidth="lg">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexWrap="wrap">
      <Typography variant="h2">Welcome!</Typography>
      <p>This is a MERN stack based fully functioning blog system. Here, you can share your experience and ideas with other people.</p>
      
      <Link className={classes.mt1} to="/posts" role="button">
      <Button variant="contained" color="primary">
      Look the blog posts &raquo;
      </Button></Link>

      <Box display="flex" justifyContent="center" flexWrap="wrap" mt="1rem">
        <AccessibilityNew className={classes.iconSize} />
        <Code className={classes.iconSize} />
        <GitHub className={classes.iconSize} />
        <Devices className={classes.iconSize} />
      </Box>

      </Box>
      </Container>
      </Paper>

    <Grid
    container
    spacing={3}
    direction="row"
    justify="center"
    alignItems="center">
      <Grid item md={4} sm={6} xs={12}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <h2>Front-end</h2>
        <p>The front-end client is built as a simple-page-application using React and Redux (for middlewares and reducers). Besides, React-Router is used for navigation. Redux-Thunk is used for processing asynchronous requests. Bootstrap 4 is used for page styling.</p>
        </Box>
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <h2>Back-end</h2>
        <p>The back-end server is built with Express.js and Node.js , which provides completed REST APIs for data interaction. authentication middleware in the sever. JSON Web Token (JWT) is used for signing in user and making authenticated requests.</p>
        </Box>
      </Grid>
      <Grid item md={4} sm={12} xs={12}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <h2>Database</h2>
        <p>MongoDB is used as the back-end database, which include different data models/schemas (i.e., User, Post and Comment). Mongoose is used to access the MongoDB for CRUD actions (create, read, update and delete).</p>
        </Box>
      </Grid>
    
    </Grid>

    </Container>
 };

 export default Welcome;