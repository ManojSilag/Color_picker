import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/PalletListstyles";

class PaletList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.goToPallete = this.goToPallete.bind(this);
  }

  goToPallete(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes, classes, deletePalette  } = this.props;
    console.log('dev: PaletList -> render -> palettes', palettes)
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React colors</h1>
            <Link to="/palette/new">create palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map((p) => {
              return <MiniPalette {...p} handleClick={this.goToPallete}  handleDelete={deletePalette}
              key={p.id}
              id={p.id}/>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletList);
