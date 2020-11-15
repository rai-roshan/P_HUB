import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Box, Chip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
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

  return <Card className={classes.root} >
    <Link to={`/posts/view/${post._id}`}>
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
        
          <Box display="flex" justifyContent="left" flexWrap="wrap" >
            { post.categories ? post.categories.map(tag=> <Chip key={ "tag"+tag } color="primary" variant="outlined" label={tag} onClick={ handleTagClick } className={classes.mr1} />) : null }
          </Box>
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>;
}
