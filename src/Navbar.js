import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Link } from "react-router-dom";
import styles from "./styles/NavbarStyles";
import { withStyles } from "@material-ui/styles";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex", open: false };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
  }

  handleFormatChange(e) {
    this.setState({ format: e.target.value, open: true }, () => {
      this.props.handleChange(this.state.format);
    });
  }

  closeSnackBar() {
    this.setState({ open: false });
  }

  render() {
    const { level, changeLevel, showingAllColors, classes } = this.props;
    const { format } = this.state;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/">reactcolor</Link>
        </div>

        {showingAllColors && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                step={100}
                max={900}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,0.3)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={2000}
          message={
            <span id="message-id">
              Format Changed To {format.toUpperCase()}
            </span>
          }
          ContentProps={{
            "aria-describedy": "message-id"
          }}
          onClose={this.closeSnackBar}
          action={[
            <IconButton onClick={this.closeSnackBar} color="inherit">
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);
