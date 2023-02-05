const menuIconButton = {
  position: "absolute",
  left: "1rem",
  top: "10px",
  cursor: "pointer",
};

export const styles = () => ({
  container: {
    color: "white",
    fontSize: "15pt",
    textAlign: "center",
    fontWeight: "bold",
    display: "flex",
  },
  header: {
    backgroundColor: "rgb(0, 157, 255)",
    width: "100%",
  },
  menu: {
    padding: 38,
    backgroundColor: "#093b42",
  },
  activeMenuIcon: {
    ...menuIconButton,
    "&:hover": {
      color: "#c12222",
    },
  },
  inActiveMenuIcon: {
    ...menuIconButton,
    "&:hover": {
      color: "#07cfc6",
    },
  },
});
