import React, {Component} from 'react';

import logo from './assets/images/logo.svg';
import './assets/scss/App.scss';

//importar componentes

import MyComponent from './components/myComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <section className="components">
          <MyComponent />
        </section>
        </header>
        
      </div>
    );
  }
}

export default App;