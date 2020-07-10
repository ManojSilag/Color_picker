import React from "react";
import logo from "./logo.svg";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelper.js";
import { Switch, Route } from "react-router-dom";
import PaletList from "./PaletList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.sessionStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  savePalette(newPalette) {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  }
  syncLocalStorage() {
    //save palettes to local storage
    window.sessionStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPaletteForm
              {...routeProps}
              savePalette={this.savePalette}
              palettes={this.state.palettes}
            />
          )}
        />

        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletList palettes={this.state.palettes} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>

      // <Palette palette={generatePalette(seedColors[5])} />
    );
  }
}

export default App;
// <Route
// exact
// path="/palette/:id"
// render={(routeProps) => {
//   <Palette
//     palette={generatePalette(
//       this.findPalete(routeProps.match.params.id)
//     )}
//   />;
// }}
// />
