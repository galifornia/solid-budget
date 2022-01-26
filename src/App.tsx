import { Button, Container, Stack } from 'solid-bootstrap';
import { Component, createEffect, createSignal, For } from 'solid-js';

import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from './components/BudgetCard';
import { Budget, Expense, useBudgetProvider } from './context/BudgetProvider';

const App: Component = (props) => {
  const [showAddBudgetModal, setShowAddBudgetModal] = createSignal(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = createSignal(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] =
    createSignal('');

  const [state, { getBudgetExpenses }] = useBudgetProvider();

  const openAddExpenseModal = (budgetId: string | undefined) => {
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
            onClick={() => openAddExpenseModal('')}
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
              const amount = getBudgetExpenses(budget.id).reduce(
                (total: number, expense: Expense) => total + expense.amount,
                0
              );
              return (
                <BudgetCard
                  name={budget.name}
                  // gray
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                  amount={amount}
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
