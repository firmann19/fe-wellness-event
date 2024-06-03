import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";
import { ERROR_FETCHING_EVENTS, START_FETCHING_EVENTS, SUCCESS_FETCHING_EVENTS } from "./constants";

let debouncedFetchEvents = debounce(getData, 1000);

export const startFetchingEvents = () => {
  return {
    type: START_FETCHING_EVENTS,
  };
};

export const successFetchingEvents = ({ events }) => {
  return {
    type: SUCCESS_FETCHING_EVENTS,
    events,
  };
};

export const errorFetchingEvents = () => {
  return {
    type: ERROR_FETCHING_EVENTS,
  };
};

export const fetchEvents = () => {
  return async (dispatch) => {
    dispatch(startFetchingEvents());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 3000);

      let res = await debouncedFetchEvents("/wellnessEvent");
      console.log(res);

      res.data.data.forEach((res) => {
        res.Judul = res.JudulEvent;
        res.Vendor = res.VendorName.name;
        
        // Check if Purposed_Date is not null and has purposed_date property
        if (res.Purposed_Date && res.Purposed_Date.purposed_date) {
          res.purposedDate = res.Purposed_Date.purposed_date;
        } else {
          res.purposedDate = "Belum Diketahui";
        }
      
        res.dateCreated = res.Date_created;
        res.Status = res.StatusEvent;
      });
      
      

      dispatch(
        successFetchingEvents({
          events: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingEvents());
    }
  };
};
