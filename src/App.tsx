import { Button, Container, Stack } from 'solid-bootstrap';
import type { Component } from 'solid-js';
import BudgetCard from './components/BudgetCard';

const App: Component = () => {
  return (
    <Container className='my-4'>
      <Stack className='d-flex' direction='horizontal' gap={2}>
        <h1 class='me-auto'>Budgets</h1>
        <Button variant='primary'>Add budget</Button>
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
        <BudgetCard name='Entertainment' gray amount={1200} max={1000} />
      </div>
    </Container>
  );
};

export default App;
