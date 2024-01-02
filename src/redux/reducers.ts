import { enableAddArea, disableAddArea, addArea, showInfo } from "./actions";

// reducers.ts
type Action =
  | ReturnType<typeof enableAddArea>
  | ReturnType<typeof disableAddArea>
  | ReturnType<typeof addArea>
  | ReturnType<typeof showInfo>;


interface State {
  addAreaEnabled: boolean;
  areasData: { id: number; points: { x: number; y: number }[] }[];
  info: string;
}

const initialState: State = {
  addAreaEnabled: false,
  areasData: [],
  info: "",
};

const rootReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "ENABLE_ADD_AREA":
      return {
        ...state,
        addAreaEnabled: true,
      };
    case "DISABLE_ADD_AREA":
      return {
        ...state,
        addAreaEnabled: false,
      };
    case "ADD_AREA":
      return {
        ...state,
        areasData: [...state.areasData, action.payload],
      };

    case "SHOW_INFO":
      return {
        ...state,
        info: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
