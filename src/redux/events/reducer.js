import {
  ERROR_FETCHING_EVENTS,
  START_FETCHING_EVENTS,
  SUCCESS_FETCHING_EVENTS,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_EVENTS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_EVENTS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_EVENTS:
      return {
        ...state,
        status: statuslist.success,
        data: action.events,
      };

    default:
      return state;
  }
}
