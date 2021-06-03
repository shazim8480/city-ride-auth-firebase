import { makeStyles } from "@material-ui/core/styles";
const headerStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(9),
    paddingTop: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    fontWeight: 700,
  },
  navBtn: {
    fontWeight: 700,
    marginLeft: theme.spacing(5),
  },
  menuList: {
    display: "flex",
    flex: 1,
  },
  title: {
    // [theme.breakpoints.down("xs")]: {},
    flexGrow: 1,
    fontWeight: 700,
    // marginRight: theme.spacing(4),
  },
}));
export default headerStyles;
