import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/MiniPalleteStyles";

const MiniPalette = (props) => {
  const { classes, paletteName, emoji, colors, id, handleClick } = props;
  const minicolorBoxes = colors.map((color) => {
    return (
      <div
        className={classes.miniColor}
        key={color.name}
        style={{ backgroundColor: color.color }}
      />
    );
  });
  return (
    <div className={classes.root} onClick={() => handleClick(id)}>
      <div className={classes.colors}>{minicolorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
};

export default withStyles(styles)(MiniPalette);
