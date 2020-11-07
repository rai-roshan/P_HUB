import BorderColorIcon from '@material-ui/icons/BorderColor';
import { makeStyles, Card, Box,  CardActionArea, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      maxWidth: "100%",
      marginBottom: "1rem",
      padding: "1.2rem"
    },
    iconSize : {
        fontSize : "4rem"
    },
    fontWeight : {
        fontWeight : 600,
        marginTop: "1rem"
    }
  });

const NoPosts = () => {
    const classes = useStyles();
    return <Card className={classes.root}>
        <CardActionArea>
            <Link to="/posts/new">
            <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center">
                <BorderColorIcon color="action" className={classes.iconSize} />
                <Typography className={classes.fontWeight}>
                    No Posts Create One
                </Typography>
                </Box>
            </CardContent>
            </Link>
        </CardActionArea>
    </Card>
};

export default  NoPosts;