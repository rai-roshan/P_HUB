import { Typography, Container, makeStyles, Card, Paper } from '@material-ui/core';
import PreviewPost from './PreviewPost';

const dummy = {
    "blocks": [
        {
            "key": "8i090",
            "text": "Hello CodePulse!",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [
                {
                    "offset": 0,
                    "length": 16,
                    "style": "BOLD"
                }
            ],
            "entityRanges": [],
            "data": {}
        },
        {
            "key": "42ncd",
            "text": "This text should be underlined.",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [
                {
                    "offset": 0,
                    "length": 31,
                    "style": "UNDERLINE"
                }
            ],
            "entityRanges": [],
            "data": {}
        },
        {
            "key": "327r6",
            "text": "And this text should be italic.",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [
                {
                    "offset": 0,
                    "length": 31,
                    "style": "ITALIC"
                }
            ],
            "entityRanges": [],
            "data": {}
        }
    ],
    "entityMap": {}
};

const useStyles = makeStyles({
    root : {
        backgroundColor: "#f1f1f1"
    },
    blogTitle : {
        marginBottom: "2rem",
        fontWeight: "500"
    },
    paper : {
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem"
    },
    muteText : {
        color: "#6e6e6e"
    }
});

export default () => {

    const classes = useStyles();

    return <Container maxWidth="md" className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
            <Container maxWidth="lg">
            <Typography variant="h2" className={ classes.blogTitle }>
                Blog Title
            </Typography>

             <Typography className={classes.muteText}>Author name</Typography>

            <PreviewPost storedState={dummy} />
            </Container>
        </Paper>
    </Container>
};