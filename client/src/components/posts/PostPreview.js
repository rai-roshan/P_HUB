//import { Link } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Box, Chip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

export default ({ post }) => {
  const classes = useStyles();
  const handleTagClick = () =>{
    console.log("do nothing")
  };

  return (
    <Link to={`/posts/view/${post._id}`} key={post._id+"b"}>
    <Card className={classes.root} key={post._id+"c"} >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            { post.title }
          </Typography>
          <Typography>
            {`by : ${post.authorName}`}
          </Typography>
          <Typography className={classes.mute}>
            { new Date(post.time).toLocaleString() }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          
          </Typography>
          <Box display="flex" justifyContent="left">
            { post.categories.map(tag=> <Chip color="primary" variant="outlined" label={tag} onClick={ handleTagClick } className={classes.mr1} />) }
          </Box>
        </CardContent>
      </CardActionArea>
      {/*<CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>*/}
    </Card>
    </Link>);
}
