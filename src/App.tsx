import React from 'react';
import Menu from './Components/Menu';
import { Provider } from 'react-redux';
import store from './redux/store'; // Seu arquivo com a configuração do Redux

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Menu />
    </Provider>
  );
};

export default App;
// No seu arquivo index.tsx ou App.tsx

