import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ed3343',

    },
    secondary: {
      main: '#f3bb45'
    }
  },

  overrides: {
    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }
      }
    },
    MuiAppBar: {
        colorPrimary: {
            backgroundColor: "#66615b"
        }
    },
    MuiGrid: {
      root: {
        outline: "none"
      }
    }

  },
});

export default theme;