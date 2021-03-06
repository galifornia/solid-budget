import { Button, Card, ProgressBar, Stack } from 'solid-bootstrap';
import { currencyFormatter } from '../utils';

type Props = {
  name: string;
  amount: number;
  max?: number;
  gray?: boolean;
  hideBtns?: boolean;
  onAddExpenseClick?: () => void;
  onViewExpenseClick?: () => void;
};

const getProgressBarVariant = (amount: number, max: number) => {
  const ratio = amount / max;
  if (ratio < 0.5) return 'primary';
  if (ratio < 0.75) return 'warning';
  return 'danger';
};

const BudgetCard = (props: Props) => {
  const classNames = [];
  // !FIXME: make this reactive
  if (props.amount > props.max) {
    classNames.push('bg-danger', 'bg-opacity-10');
  } else if (props.gray) {
    classNames.push('bg-light');
  }
  return (
    <Card className={classNames.join(' ')}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
          <div className='me-2'>{props.name}</div>
          <div className='d-flex align-items-baseline'>
            {currencyFormatter.format(props.amount)}
            {props.max && (
              <span className='text-muted fs-6 ms-1'>
                / {currencyFormatter.format(props.max)}
              </span>
            )}
          </div>
        </Card.Title>

        {!props.hideBtns && (
          <ProgressBar
            className='rounded-pill'
            variant={getProgressBarVariant(props.amount, props.max)}
            min={0}
            max={props.max}
            now={props.amount}
          />
        )}

        {!props.hideBtns && (
          <Stack
            className='d-flex mt-4 justify-content-end'
            direction='horizontal'
            gap={2}
          >
            <Button
              variant='outline-primary'
              onClick={
                props.onAddExpenseClick
                  ? () => props.onAddExpenseClick()
                  : undefined
              }
            >
              Add expense
            </Button>
            <Button
              variant='outline-secondary'
              onClick={
                props.onViewExpenseClick
                  ? () => props.onViewExpenseClick()
                  : undefined
              }
            >
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
