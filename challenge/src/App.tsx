// Styles
import '@fontsource-variable/onest';
import '@park-ui/tailwind-plugin/preset.css';
import './App.css';

// Router
import Router from '../src/infrastructure/providers/Router';

// Providers
import User from '../src/infrastructure/providers/User';

// Components
import Background from '../src/presentation/components/atoms/Background';

function App() {
  return (
    <User>
      <Background>
        <Router/>
      </Background>
    </User>
  );
}

export default App;
