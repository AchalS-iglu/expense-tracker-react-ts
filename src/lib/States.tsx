import { createContext, useContext, useReducer, useState } from "react";
import { monthYear_t, initialMonthYear, monthYearActionKind } from "./reusables";

interface monthYearAction {
  type: monthYearActionKind;
  payload: number;
}

interface IContext_t {
  monthYear: monthYear_t;
  dispatchMonthYear: React.Dispatch<monthYearAction>;
}

const StatesContext = createContext<IContext_t>({
  monthYear: {
    month: 0,
    year: 0,
  },
  dispatchMonthYear: () => {},
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

const StatesContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [monthYear, setMonthYear] = useState(initialMonthYear());
  const [monthYear, dispatchMonthYear] = useReducer(
    monthYearReducer,
    null,
    initialMonthYear
  );

  return (
    <StatesContext.Provider value={{ monthYear, dispatchMonthYear }}>
      {children}
    </StatesContext.Provider>
  );
};

const State = () => {
  return useContext(StatesContext);
};

export { StatesContextProvider, State };
