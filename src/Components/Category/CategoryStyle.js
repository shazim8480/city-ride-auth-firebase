import { makeStyles } from "@material-ui/core/styles";

const categoryStyles = makeStyles((theme) => ({
  //  card content starts here//
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardHeader: {
    fontWeight: 700,
  },
  cardContent: {
    flexGrow: 1,
  },
  cardButton: {
    justifyContent: "center",
  },
  //  card content ends here//
}));

export default categoryStyles;
