import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { ListSubheader } from '@material-ui/core';

import LazyLoad from 'react-lazyload';

const data = [ { _id : 1, content : "I'll be in your neighborhood doing errands this…", authorName : "author 1" },
{ _id : 2, content : "I'll be in your neighborhood doing errands this…", authorName : "author2" },
{ _id : 3, content : "I'll be in your neighborhood doing errands this…", authorName : "author 3" }]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: "0.5rem"
  },
  inline: {
    display: 'inline',
  },
}));

const CommentBlock = ({ data }) => {


    return <div  >
        <ListItem alignItems="flex-start" >
        <ListItemAvatar>
          <Avatar alt={data.authorName} src="../../images/profilepic.png" />
        </ListItemAvatar>
        <ListItemText
          primary={data.authorName}
          secondary={
            <React.Fragment>
              { data.content }
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
}

export default function AlignItemsList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>

        <ListSubheader component="div" id="nested-list-subheader">
          All Comments :-
        </ListSubheader>

      { data.map(comm => <LazyLoad key={comm._id} placeholder="Loading...">
      <CommentBlock data={comm} key={ comm._id } /> 
      </LazyLoad> )}
      
    </List>
  );
}
