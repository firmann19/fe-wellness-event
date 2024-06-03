import {
  ERROR_FETCHING_LISTS_EVENTCATEGORY,
  ERROR_FETCHING_LISTS_PURPOSED_DATE,
  ERROR_FETCHING_LISTS_VENDOR,
  START_FETCHING_LISTS_EVENTCATEGORY,
  START_FETCHING_LISTS_PURPOSED_DATE,
  START_FETCHING_LISTS_VENDOR,
  SUCCESS_FETCHING_LISTS_EVENTCATEGORY,
  SUCCESS_FETCHING_LISTS_PURPOSED_DATE,
  SUCCESS_FETCHING_LISTS_VENDOR,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  eventCategorys: [],
  statusEventCategorys: statuslist.idle,
  vendors: [],
  statusVendors: statuslist.idle,
  dates: [],
  statusDates: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_LISTS_EVENTCATEGORY:
      return { ...state, statusEventCategorys: statuslist.process };

    case ERROR_FETCHING_LISTS_EVENTCATEGORY:
      return { ...state, statusEventCategorys: statuslist.error };

    case SUCCESS_FETCHING_LISTS_EVENTCATEGORY:
      return {
        ...state,
        statusEventCategorys: statuslist.success,
        eventCategorys: action.eventCategorys,
      };

    case START_FETCHING_LISTS_VENDOR:
      return { ...state, statusVendors: statuslist.process };

    case ERROR_FETCHING_LISTS_VENDOR:
      return { ...state, statusVendors: statuslist.error };

    case SUCCESS_FETCHING_LISTS_VENDOR:
      return {
        ...state,
        statusVendors: statuslist.success,
        vendors: action.vendors,
      };

    case START_FETCHING_LISTS_PURPOSED_DATE:
      return { ...state, statusDates: statuslist.process };

    case ERROR_FETCHING_LISTS_PURPOSED_DATE:
      return { ...state, statusDates: statuslist.error };

    case SUCCESS_FETCHING_LISTS_PURPOSED_DATE:
      return {
        ...state,
        statusDates: statuslist.success,
        dates: action.dates,
      };

    default:
      return state;
  }
}
