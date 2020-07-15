import React from "react";
import logo from "./logo.svg";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelper.js";
import { Switch, Route } from "react-router-dom";
import PaletList from "./PaletList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.sessionStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  deletePalette(id) {
    this.setState(
      st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }),
      this.syncLocalStorage
    );
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
      <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='fade' timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path='/palette/new'
                render={routeProps => (
                  <div className='page'>
                    <NewPaletteForm
                      savePalette={this.savePalette}
                      palettes={this.state.palettes}
                      {...routeProps}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path='/palette/:paletteId/:colorId'
                render={routeProps => (
                  <div className='page'>
                    <SingleColorPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                      )}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path='/'
                render={routeProps => (
                  <div className='page'>
                    <PaletList
                      palettes={this.state.palettes}
                      deletePalette={this.deletePalette}
                      {...routeProps}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path='/palette/:id'
                render={routeProps => (
                  <div className='page'>
                    <Palette
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.id)
                      )}
                    />
                  </div>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
    
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
