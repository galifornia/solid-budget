import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { BudgetProvider } from '../context/BudgetProvider';

render(
  () => (
    <BudgetProvider>
      <App />
    </BudgetProvider>
  ),
  document.getElementById('root') as HTMLElement
);
