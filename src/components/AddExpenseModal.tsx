import { Button, Form, Modal } from 'solid-bootstrap';
import { createEffect, For } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Budget, useBudgetProvider } from '../context/BudgetProvider';

type Props = {
  show: boolean;
  defaultBudgetId: string;
  handleClose: () => void;
};

type FormType = {
  description: string;
  amount: number;
  budgetId: string;
};

const AddExpenseModal = (props: Props) => {
  const [state, { addExpense }] = useBudgetProvider();

  const [fields, setFields] = createStore<FormType>({
    description: '',
    amount: 0,
    budgetId: props.defaultBudgetId,
  });

  const handleSubmit = (ev: any) => {
    ev.preventDefault();

    const expense = {
      description: fields.description,
      budgetId:
        fields.budgetId === '' ? props.defaultBudgetId : fields.budgetId,
      amount: parseFloat(fields.amount),
    };
    addExpense(expense);

    props.handleClose();

    // clear fields
    setFields({
      description: '',
      amount: 0,
      budgetId: props.defaultBudgetId,
    });
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group
            className='mb-3'
            controlId='description'
            onChange={(ev) => setFields('description', ev.target.value)}
          >
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' required />
          </Form.Group>

          <Form.Group
            className='mb-3'
            controlId='amount'
            onChange={(ev) => setFields('amount', ev.target.value)}
          >
            <Form.Label>Amount spent</Form.Label>
            <Form.Control type='number' required min={0} step={0.01} />
          </Form.Group>

          <Form.Group
            className='mb-3'
            controlId='budgetId'
            onChange={(ev) => setFields('budgetId', ev.target.value)}
          >
            <Form.Label>BudgetId</Form.Label>
            <Form.Select value={props.defaultBudgetId}>
              <option value='uncategorized'>Uncategorized</option>
              <For each={state.budgets}>
                {(budget: Budget) => {
                  return <option value={budget.id}>{budget.name}</option>;
                }}
              </For>
            </Form.Select>
          </Form.Group>

          <div className='d-flex justify-content-end'>
            <Button variant='primary' type='submit'>
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
