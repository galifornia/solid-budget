import { Button, Container, Stack } from 'solid-bootstrap';
import { Component, createEffect, createSignal, For } from 'solid-js';

import AddBudgetModal from './components/AddBudgetModal';
import BudgetCard from './components/BudgetCard';
import { Budget, useBudgetProvider } from './context/BudgetProvider';

const App: Component = (props) => {
  const [showAddBudgetModal, setShowAddBudgetModal] = createSignal(false);
  const [state, { getBudgetExpenses }] = useBudgetProvider();

  return (
    <>
      <Container className='my-4'>
        <Stack className='d-flex' direction='horizontal' gap={2}>
          <h1 class='me-auto'>Budgets</h1>
          <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>
            Add budget
          </Button>
          <Button variant='outline-primary'>Add Expense</Button>
        </Stack>
        <div
          className='my-3'
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            alignItems: 'flex-start',
          }}
        >
          <For each={state.budgets}>
            {(budget: Budget) => (
              <BudgetCard
                name={budget.name}
                // gray
                amount={getBudgetExpenses(budget.id)}
                max={budget.max}
              />
            )}
          </For>
        </div>
      </Container>

      <AddBudgetModal
        show={showAddBudgetModal()}
        handleClose={() => setShowAddBudgetModal(false)}
      />
    </>
  );
};

export default App;
