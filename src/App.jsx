import React, {Component} from 'react';

import logo from './assets/images/logo.svg';
import './assets/scss/App.scss';

//importar componentes
import ChatRoom from './components/ChatRoom';

class App extends Component {
  render() {
    return (
      <div>
        <nav className='navbar navbar-light bg-primary'>
          <a className='nav-brand text-white' href="#">Chat React</a>
        </nav>
        <div className='container p-5'>
          <div className='row'>
            <div className='col-md-6 offset-md-3'>
              <ChatRoom />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;