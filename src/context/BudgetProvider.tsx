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
  total: number;
  max?: number;
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
  totalExpenses: number;
  totalBudget: number;
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
      budgets: [{ name: 'Uncategorized', total: 0, id: 'uncategorized' }],
      expenses: [],
      totalExpenses: 0,
      totalBudget: 0,
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
          const budget = state.budgets.find((v) => v.id === expense.budgetId);

          if (!budget) return;

          const index = state.budgets.findIndex(
            (v) => v.id === expense.budgetId
          );
          const updatedBudget = {
            ...budget,
            total: budget.total + expense.amount,
          };

          const newBudgets = [
            ...state.budgets.slice(0, index),
            updatedBudget,
            ...state.budgets.slice(index + 1),
          ];

          setState({
            ...state,
            budgets: newBudgets,
            expenses: newExpenses,
            totalExpenses: state.totalExpenses + expense.amount,
          });
        },
        addBudget(budget: Budget) {
          if (!budget.max) return;
          // Insert new budget only if name is not already taken
          if (state.budgets.find((b) => b.name === budget.name)) {
            return state;
          }

          const newBugdets = [{ ...budget, id: uuidV4() }, ...state.budgets];
          setState({
            ...state,
            budgets: newBugdets,
            totalBudget: state.totalBudget + budget.max,
          });
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
