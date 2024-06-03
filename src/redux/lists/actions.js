/* eslint-disable no-undef */
import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
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

let debouncedFetchListsEventCategory = debounce(getData, 1000);
let debouncedFetchListsVendor = debounce(getData, 1000);
let debouncedFetchListsDate = debounce(getData, 1000);

export const startFetchingListsEventCategory = () => {
  return {
    type: START_FETCHING_LISTS_EVENTCATEGORY,
  };
};

export const successFetchingListsEventCategory = ({ eventCategorys }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_EVENTCATEGORY,
    eventCategorys,
  };
};

export const errorFetchingListsEventCategory = () => {
  return {
    type: ERROR_FETCHING_LISTS_EVENTCATEGORY,
  };
};

export const fetchListsEventCategory = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsEventCategory());

    try {
      let res = await debouncedFetchListsEventCategory("/categoryName");

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.name,
          target: { value: res._id, name: "EventCategoryName" },
        });
      });

      dispatch(
        successFetchingListsEventCategory({
          eventCategorys: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListsEventCategory());
    }
  };
};

export const startFetchingListsVendor = () => {
  return {
    type: START_FETCHING_LISTS_VENDOR,
  };
};

export const successFetchingListsVendor = ({ vendors }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_VENDOR,
    vendors,
  };
};

export const errorFetchingListsVendor = () => {
  return {
    type: ERROR_FETCHING_LISTS_VENDOR,
  };
};

export const fetchListsVendor = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsVendor());

    try {
      let res = await debouncedFetchListsVendor("/vendor");

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.name,
          target: { value: res._id, name: "VendorName" },
        });
      });

      dispatch(successFetchingListsVendor({ vendors: _temp }));
    } catch (error) {
      dispatch(errorFetchingListsVendor());
    }
  };
};

export const startFetchingListsDate = () => {
  return {
    type: START_FETCHING_LISTS_PURPOSED_DATE,
  };
};

export const successFetchingListsDate = ({ dates }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_PURPOSED_DATE,
    dates,
  };
};

export const errorFetchingListsDate = () => {
  return {
    type: ERROR_FETCHING_LISTS_PURPOSED_DATE,
  };
};

export const fetchListsDate = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsDate());

    try {
      let res = await debouncedFetchListsDate("/purposedDate");

      let _temp = [];

      res.data.data.forEach((res) => {
        const date = new Date(res.purposed_date);

        const formattedDate = date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        const formattedDateTime = `${formattedDate}, ${formattedTime}`;

        _temp.push({
          value: res._id,
          label: formattedDateTime,
          target: { value: res._id, name: "Purposed_Date" },
        });
      });

      dispatch(successFetchingListsDate({ dates: _temp }));
    } catch (error) {
      dispatch(errorFetchingListsDate());
    }
  };
};
