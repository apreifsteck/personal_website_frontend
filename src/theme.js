import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    // Override theme stuff here
    bareLink: {
        textDecoration: "none",
        '&:visited': {
            color: "inherit"
        }
    }
});

export default theme;