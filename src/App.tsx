import { Button, Container, Stack } from 'solid-bootstrap';
import type { Component } from 'solid-js';

const App: Component = () => {
  return (
    <Container className='my-4'>
      <Stack direction='horizontal' gap={2}>
        <h1 class='me-auto'>Budgets</h1>
        <Button variant='primary'>Add budget</Button>
        <Button variant='outline-primary'>Add Expense</Button>
      </Stack>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
          alignItems: 'flex-start',
        }}
        // <BudgetCard />
        // <BudgetCard />
        // <BudgetCard />
        // <BudgetCard />
      ></div>
    </Container>
  );
};

export default App;
