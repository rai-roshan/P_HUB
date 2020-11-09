import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  mtauto : {
    marginTop: "auto"
  }
});

const Footer = () => {
  
  const classes = useStyles();

  return (
    <Box 
    className={ classes.mtauto }
    height="4rem"
    display="flex"
    flexWrap="wrap"
    alignItems="center"
    justifyContent="center">
        <span className="text-muted">@2020 R@i Roshan</span>
    </Box>
  );
};

export default Footer;