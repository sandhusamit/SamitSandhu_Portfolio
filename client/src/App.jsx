import MainRouter from './routes/MainRouter';
import { AuthProvider } from './contexts/AuthContext';

import '/Users/samitsandhu/Desktop/MERN/COMP229-Portfolio_301131044/client/src/components/globalStyle.css';

function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
}
export default App;
