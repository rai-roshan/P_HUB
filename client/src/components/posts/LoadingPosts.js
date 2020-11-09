import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    marginBottom: "1rem"
  },
  title : {
    fontWeight : 600
  },
  mr1 : {
    marginRight : "0.5rem"
  },
  mute : {
    color: "#616161"
  }
});

const PostSkeleton = ( ) => {
  const classes = useStyles();


  return <Card className={classes.root} >
    
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            <Skeleton width="5rem" />
          </Typography>
          <Typography>
            <Skeleton width="4rem" />
          </Typography>
          <Typography className={classes.mute}>
            <Skeleton width="5rem" />
          </Typography>
        
          <Box display="flex" justifyContent="left" flexWrap="wrap" >
            <Skeleton className={classes.mr1} width="2.5rem" />
            <Skeleton className={classes.mr1} width="2.5rem" />
            <Skeleton className={classes.mr1} width="2.5rem" />
          </Box>
        </CardContent>
      </CardActionArea>
      
    </Card>;
};

const LoadingPosts = () => {

    return <Container maxWidth="md">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
    </Container>
};

export default LoadingPosts;
