import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastProvider} from 'react-toast-notifications';
import { Provider } from 'react-redux';
import store from '../store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <ToastProvider autoDismiss={true} autoDismissTimeout={5000}>
    <App />
    </ToastProvider>
    </Provider>
)
