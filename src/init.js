import React ,{ Component } from 'react' 
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from './ConfigStore'
//local imports
import App from './App' 
class Init extends Component{
  render(){
    return(<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App /> 
      </PersistGate>
    </Provider>)}
}
export default Init
