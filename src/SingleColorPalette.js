import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import FooterPalette from "./FooterPalette";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/PalleteStyles";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex" };
    this.changeFormat = this.changeFormat.bind(this);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
  }

  gatherShades(palette, colorTOFilterBv) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorTOFilterBv)
      );
    }
    return shades.slice(1);
  }

  changeFormat(val) {
    this.setState({ format: val });
  }

  render() {
    const { classes } = this.props;
    const { emoji, paletteName, id } = this.props.palette;
    const colorBoxes = this._shades.map((color) => {
      return (
        <ColorBox
          key={color.name}
          name={color.name}
          background={color[this.state.format]}
          showingFullPalette={false}
        />
      );
    });
    return (
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`} className="back-button">
              GO BACK
            </Link>
          </div>
        </div>
        <FooterPalette emoji={emoji} paletteName={paletteName} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
