import React from "react";
import headerStyles from "./HeaderStyle";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useHistory, withRouter } from "react-router";
import { Button, useTheme } from "@material-ui/core";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory(); // for routing through link //
  const classes = headerStyles(); // for styling //

  // responsive functions start//
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  //   console.log(isMobile);
  // to see if the breakpoint is correct or not : will return true/false //
  // responsive functions end//

  // menu handler start //
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };
  // menu handler end //

  // menu items//
  const headerItems = [
    {
      headerTitle: "Home",
      pageURL: "/",
    },
    {
      headerTitle: "Blog",
      pageURL: "/blog",
    },
    {
      headerTitle: "Contact",
      pageURL: "/contact",
    },
    {
      headerTitle: "Sign Up",
      pageURL: "/signUp",
    },
  ];

  return (
    <>
      <div className={classes.root}>
        <Toolbar>
          <Typography
            noWrap
            align="left"
            variant="h4"
            className={classes.title}
          >
            CITY RIDE
            <br />
            <Typography variant="subtitle2" color="textSecondary">
              Comfort || Safety || Convenience
            </Typography>
          </Typography>

          <div>
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  onClick={handleMenu}
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {/* mapping for responsive */}
                  {headerItems.map((headerItem) => {
                    const { headerTitle, pageURL } = headerItem;
                    return (
                      <MenuItem
                        key={headerTitle}
                        onClick={() => handleMenuClick(pageURL)}
                      >
                        {headerTitle}
                      </MenuItem>
                    );
                  })}

                  {/* {loggedInUser ? (
                    <Link to="/home">
                      <MenuItem>Sign Out</MenuItem>
                    </Link>
                  ) : (
                    <Link to="/signUp">
                      <MenuItem>Sign Up</MenuItem>
                    </Link>
                  )} */}
                </Menu>
              </>
            ) : (
              //   mapping for non-responsive //
              <div className={classes.menuList}>
                {headerItems.map((headerItem) => {
                  const { headerTitle, pageURL } = headerItem;
                  return (
                    <Button
                      className={classes.navBtn}
                      key={pageURL}
                      onClick={() => handleMenuClick(pageURL)}
                      size="large"
                    >
                      {headerTitle}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        </Toolbar>
      </div>
    </>
  );
};

export default withRouter(Header);
