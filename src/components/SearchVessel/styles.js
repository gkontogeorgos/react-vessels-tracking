const actionUnderline = {
  "&:before": {
    bottom: 0,
    boxSizing: "border-box",
    content: "''",
    left: 0,
    position: "absolute",
    width: "100%",
    height: 2,
    transition: "all 0.3s ease-in-out",
    transform: "scaleX(0)",
    background: "#0050B5",
    visibility: "hidden",
  },
  "&:hover:before": {
    visibility: "visible",
    height: 2,
    transform: "scaleX(1)",
  },
};

export const styles = () => ({
  textField: { width: "100%" },
  input: { marginLeft: 10 },
  container: { width: "80%", padding: 20 },
  datepicker: { marginTop: 20 },
  searchButton: {
    marginTop: 50,
    width: "100%",
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
  },
  error: {
    padding: 15,
    fontWeight: 600,
    fontSize: "10pt",
    color: "red",
    textAlign: "center",
  },
  daysContainer: {
    marginTop: 15,
  },
  animationLink: {
    padding: 5,
  },
  animationIcon: {
    width: 20,
    height: 20,
    color: "#0050B5",
  },
  animationItemFlex: {
    display: "flex",
    cursor: "pointer",
    margin: "25px 0px",
  },
  animationActionLabel: {
    fontSize: "10pt",
    fontWeight: 600,
    color: "#0050B5",
    cursor: "pointer",
    padding: 7,
    position: "relative",
    ...actionUnderline,
  },
});
