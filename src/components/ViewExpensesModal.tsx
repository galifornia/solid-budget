import { Button, Modal, Stack } from 'solid-bootstrap';
import { createEffect, For } from 'solid-js';
import { Properties } from 'solid-js/web';
import { Budget, Expense, useBudgetProvider } from '../context/BudgetProvider';
import { currencyFormatter } from '../utils';

type Props = {
  show: boolean;
  budgetId: string;
  budgetName: string;
  expenses: Expense[];
  handleClose: () => void;
};

const ViewExpensesModal = (props: Props) => {
  const [state, { getBudgetExpenses, deleteExpense, deleteBudget }] =
    useBudgetProvider();

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header>
        <Stack direction='horizontal' gap={2}>
          <Modal.Title>Expenses - {props.budgetName}</Modal.Title>
          {'uncategorized' !== props.budgetId && (
            <Button
              variant='outline-danger'
              onClick={() => {
                deleteBudget(props.budgetId);
                props.handleClose();
              }}
            >
              Delete
            </Button>
          )}
        </Stack>
      </Modal.Header>

      <Modal.Body>
        <Stack direction='vertical' gap={2}>
          <For each={props.expenses}>
            {(expense: Expense) => {
              return (
                <Stack direction='horizontal' gap={2}>
                  <div className='me-auto fs-4'>{expense.description}</div>
                  <div className='ms-auto fs-5'>
                    {currencyFormatter.format(expense.amount)}
                  </div>
                  <Button
                    size='sm'
                    variant='outline-danger'
                    onClick={() => deleteExpense(expense.id)}
                  >
                    &times;
                  </Button>
                </Stack>
              );
            }}
          </For>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModal;
