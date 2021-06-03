import { makeStyles } from "@material-ui/core/styles";
import backgroundImg from "../../images/Bg.png";

const useStyles = makeStyles((theme) => ({
  homeContainer: {
    minHeight: "100vh",
    background: `url(${backgroundImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  loginBtn: {
    backgroundColor: "#FF6E40",
    marginLeft: theme.spacing(3),
    color: "#FFF",
  },
}));

export default useStyles;
