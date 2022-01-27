import { Button, Modal } from 'solid-bootstrap';
import { createEffect, For } from 'solid-js';
import { Expense, useBudgetProvider } from '../context/BudgetProvider';

type Props = {
  show: boolean;
  budgetId: string;
  expenses: Expense[];
  handleClose: () => void;
};

const ViewExpensesModal = (props: Props) => {
  const [state, { getBudgetExpenses, deleteExpense, deleteBudget }] =
    useBudgetProvider();

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header>
        <Modal.Title>View expenses</Modal.Title>
        <Button variant='primary border-danger bg-danger'>Delete</Button>
      </Modal.Header>

      <Modal.Body>
        <For each={props.expenses}>
          {(expense: Expense) => {
            return <div>{expense.description}</div>;
          }}
        </For>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModal;
