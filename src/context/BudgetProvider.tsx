import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from 'solid-js';
import { createStore, SetStoreFunction, Store } from 'solid-js/store';
import { v4 as uuidV4 } from 'uuid';

type BudgetStore = [
  { state: State },
  {
    getBudgetExpenses?: (budgetId: string) => void;
    addExpenses?: (expense: Expense) => void;
    addBudget?: (budget: Budget) => void;
    deleteBudget?: (id: string) => void;
    deleteExpense?: (id: string) => void;
  }
];

const BudgetContext = createContext<BudgetStore>();

type Props = {
  children?: any;
};

export type Budget = {
  id?: string;
  name: string;
  max: number;
};

export type Expense = {
  id?: string;
  budgetId: string;
  amount: number;
  description: string;
};

type State = {
  budgets: Budget[];
  expenses: Expense[];
};

export function createLocalStore<T>(
  initState: T
): [Store<T>, SetStoreFunction<T>] {
  const [state, setState] = createStore(initState);
  if (localStorage.budgetState) setState(JSON.parse(localStorage.budgetState));
  createEffect(() => (localStorage.budgetState = JSON.stringify(state)));
  return [state, setState];
}

export const BudgetProvider = (props: Props) => {
  const [state, setState] = createLocalStore<State>({
      budgets: [],
      expenses: [],
    }),
    store = [
      state,
      {
        getBudgetExpenses(budgetId: string) {
          return state.expenses.filter(
            (expense) => expense.budgetId === budgetId
          );
        },
        addExpense(expense: Expense) {
          const newExpenses = [...state.expenses, { ...expense, id: uuidV4() }];
          setState({ ...state, expenses: newExpenses });
        },
        addBudget(budget: Budget) {
          // Insert new budget only if name is not already taken
          if (state.budgets.find((b) => b.name === budget.name)) {
            return state;
          }

          const newBugdets = [...state.budgets, { ...budget, id: uuidV4() }];
          setState({ ...state, budgets: newBugdets });
        },
        deleteBudget(id: string) {
          // !TODO: deal with uncategorized expenses
          setState({
            ...state,
            budgets: state.budgets.filter((budget) => budget.id !== id),
          });
        },

        deleteExpense(id: string) {
          setState({
            ...state,
            expenses: state.expenses.filter((expense) => expense.id !== id),
          });
        },
      },
    ];

  return (
    <BudgetContext.Provider value={store}>
      {props.children}
    </BudgetContext.Provider>
  );
};

export function useBudgetProvider() {
  return useContext(BudgetContext);
}
