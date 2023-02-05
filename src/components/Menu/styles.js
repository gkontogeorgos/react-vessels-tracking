const menuIconButton = {
  position: "absolute",
  left: "1rem",
  top: "10px",
  cursor: "pointer",
  color: "white",
};

export const styles = () => ({
  menu: { padding: 38, backgroundColor: "#093b42" },
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
  menuItem: {
    color: "#fff",
    background: "rgb(0, 157, 255)",
    width: "83%",
    padding: 25,
    display: "flex",
    justifyContent: "space-between",
    margin: "28px 28px 0px 28px",
    fontSize: "10pt",
    fontWeight: 600,
    fontFamily: "unset",
    borderRadius: 15,
    cursor: "pointer",
    alignItems: "center",
    "&:hover": {
      background: "#afecff",
      color: "#000",
    },
  },
  backButtonPosition: {
    position: "absolute",
    bottom: 0,
    margin: "22px 15px",
  },
});
