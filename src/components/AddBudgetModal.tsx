import { Button, Form, Modal } from 'solid-bootstrap';
import { createStore } from 'solid-js/store';
import { useBudgetProvider } from '../context/BudgetProvider';

type Props = {
  show: boolean;
  handleClose: () => void;
};

type FormType = {
  name: string;
  max: number;
};
const AddBudgetModal = (props: Props) => {
  const [state, { addBudget }] = useBudgetProvider();

  const [fields, setFields] = createStore<FormType>({ name: '', max: 0 });

  const handleSubmit = (ev: any) => {
    ev.preventDefault();

    const budget = {
      name: fields.name,
      max: parseFloat(fields.max),
      total: 0,
    };
    addBudget(budget);

    props.handleClose();
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group
            className='mb-3'
            controlId='name'
            onChange={(ev) => setFields('name', ev.target.value)}
          >
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' required />
          </Form.Group>

          <Form.Group
            className='mb-3'
            controlId='max'
            onChange={(ev) => setFields('max', ev.target.value)}
          >
            <Form.Label>Maximum spending amount</Form.Label>
            <Form.Control type='number' required min={0} step={0.01} />
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

export default AddBudgetModal;
