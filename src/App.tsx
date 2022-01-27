import { Button, Container, Stack } from 'solid-bootstrap';
import { Component, createSignal, For } from 'solid-js';

import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from './components/BudgetCard';
import { Budget, useBudgetProvider } from './context/BudgetProvider';

const App: Component = (props) => {
  const [showAddBudgetModal, setShowAddBudgetModal] = createSignal(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = createSignal(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] =
    createSignal('');

  const [state] = useBudgetProvider();

  const openAddExpenseModal = (budgetId: string) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  return (
    <>
      <Container className='my-4'>
        <Stack className='d-flex' direction='horizontal' gap={2}>
          <h1 class='me-auto'>Budgets</h1>
          <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>
            Add budget
          </Button>
          <Button
            variant='outline-primary'
            onClick={() => openAddExpenseModal('uncategorized')}
          >
            Add Expense
          </Button>
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
            {(budget: Budget) => {
              if (budget.id === 'uncategorized' && budget.total === 0) return;
              return (
                <BudgetCard
                  name={budget.name}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                  amount={budget.total}
                  gray={budget.id === 'uncategorized'}
                  max={budget.max}
                />
              );
            }}
          </For>
        </div>
      </Container>

      <AddBudgetModal
        show={showAddBudgetModal()}
        handleClose={() => setShowAddBudgetModal(false)}
      />

      <AddExpenseModal
        defaultBudgetId={addExpenseModalBudgetId()}
        show={showAddExpenseModal()}
        handleClose={() => {
          setShowAddExpenseModal(false);
          setAddExpenseModalBudgetId('');
        }}
      />
    </>
  );
};

export default App;
