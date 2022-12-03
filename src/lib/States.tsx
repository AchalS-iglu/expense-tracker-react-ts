import { createContext, useContext, useReducer } from "react";
import {
  monthYear_t,
  initialMonthYear,
  monthYearActionKind,
  monthYearAction,
  expense_t,
  expensesAction,
  expensesActionKind,
} from "./reusables";
interface IContext_t {
  monthYear: monthYear_t;
  dispatchMonthYear: React.Dispatch<monthYearAction>;
  expenses: expense_t[];
  dispatchExpenses: React.Dispatch<expensesAction>;
}

const StatesContext = createContext<IContext_t>({
  monthYear: {
    month: 0,
    year: 0,
    budget: 0,
  },
  dispatchMonthYear: () => {},
  expenses: [],
  dispatchExpenses: () => {},
});

const monthYearReducer = (state: monthYear_t, action: monthYearAction) => {
  switch (action.type) {
    case monthYearActionKind.SET_MONTH:
      return { ...state, month: action.payload };
    case monthYearActionKind.SET_YEAR:
      return { ...state, year: action.payload };
    case monthYearActionKind.SET_BUDGET:
      return { ...state, budget: action.payload };
    default:
      return state;
  }
};

const expensesReducer = (state: expense_t[], action: expensesAction) => {
  switch (action.type) {
    case expensesActionKind.ADD_EXPENSE:
      if (state.length === 0) {
        return [action.payload];
      } else if (
        state.map((expense) => expense.id).includes(action.payload.id)
      ) {
        return state;
      } else {
        let result = [...state, action.payload];
        return result.sort((a, b) => a.date.toMillis() - b.date.toMillis());
      }
    // if (state.length === 0) {
    //   return [action.payload];
    // } else {
    //   for (let expense of state) {
    //     if (expense.id === action.payload.id) {
    //       return state;
    //     } else {
    //       return [...state, action.payload];
    //     }
    //   }
    // }
    case expensesActionKind.REMOVE_EXPENSE:
      return state.filter((expense) => expense.id !== action.payload.id);
    case expensesActionKind.UPDATE_EXPENSE:
      return state.map((expense) => {
        if (expense.id === action.payload.id) {
          return action.payload;
        } else {
          return expense;
        }
      });
    case expensesActionKind.CLEAR_LIST:
      return [];
    default:
      return state;
  }
};

const StatesContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [monthYear, setMonthYear] = useState(initialMonthYear());
  const [monthYear, dispatchMonthYear] = useReducer(
    monthYearReducer,
    null,
    initialMonthYear
  );

  const [expenses, dispatchExpenses] = useReducer(expensesReducer, []);

  return (
    <StatesContext.Provider
      value={{
        monthYear,
        dispatchMonthYear,
        expenses,
        dispatchExpenses,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};

const State = () => {
  return useContext(StatesContext);
};

export { StatesContextProvider, State };
