import { Action, createHook, createStore } from "react-sweet-state";

type State = {
    tableValues: number[][],
    graphXis: any,
    functionValues: number[][][],
    showMenu: boolean,
    dataTable: any[],
    columns: any[]
};

const initialState: State = {
    tableValues: [[]],
    graphXis: [],
    functionValues: [[[]]],
    showMenu: false,
    dataTable: [],
    columns: []
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

  setShowMenu:
    (isShow: boolean): Action<State> =>
    ({ setState }) => {
      setState({
        showMenu: isShow
      });
    },
  
  setDataTable:
    (newData: any[]): Action<State> =>
    ({ setState }) => {
      setState({
        dataTable: newData
      });
    }
};

const Store = createStore({ initialState, actions });
export const useTable = createHook(Store);
