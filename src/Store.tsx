import { Action, createHook, createStore } from "react-sweet-state";

type State = {
    tableValues: number[][],
    graphXis: any,
    functionValues: number[][][],
    dataTable: any[],
    columns: any[]
    calculationError: boolean
};

const initialState: State = {
    tableValues: [[]],
    graphXis: [],
    functionValues: [[[]]],
    dataTable: [],
    columns: [],
    calculationError: false
};

const actions = {
  setTableValues:
    (tableValue: [[]]): Action<State> =>
    ({ setState }) => {
      setState({
        tableValues: tableValue
      });
    },

  setTableColumns:
    (newColumns: any[]): Action<State> =>
    ({ setState }) => {
      setState({
        columns: newColumns
      });
    },
    
  setGraphXis:
    (graphXi: []): Action<State> =>
    ({ setState }) => {
      setState({
        graphXis: graphXi
      });
    },

  setFunctionValues:
    (functionValue: [[[]]]): Action<State> =>
    ({ setState }) => {
      setState({
        functionValues: functionValue
      });
    },
  
  setDataTable:
    (newData: any[]): Action<State> =>
    ({ setState }) => {
      setState({
        dataTable: newData
      });
    },

  setCalculationError:
    (isError: boolean): Action<State> =>
    ({ setState }) => {
      setState({
        calculationError: isError
      });
    }
};

const Store = createStore({ initialState, actions });
export const useTable = createHook(Store);
