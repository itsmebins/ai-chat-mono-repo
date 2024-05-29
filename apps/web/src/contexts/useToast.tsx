import React, {
  createContext,
  useCallback,
  useReducer,
  useContext,
  useRef,
  useEffect,
} from "react";
import { generateRandomId } from "@baserepo/utils";
import ToastAlertsComponent from "@/components/ToastAlert";
import config from "@/lib/config";

export const ToastContext = createContext<ContextType>({} as ContextType);
export enum AlertType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}
export type ToastAlert = {
  id: string;
  title: string;
  message?: string;
  type: AlertType;
};

type ReducerActionType = {
  type: "SET_TOAST_ALERT" | "REMOVE_TOAST_ALERT";
  payload: ToastAlert;
};

type ContextType = {
  alerts?: ToastAlert[];
  removeAlert: (id: string) => void;
  setToastAlert: (data: {
    title: string;
    type?: AlertType;
    message?: string | undefined;
  }) => void;
};

type StateType = {
  toastAlerts?: ToastAlert[];
};

type ReducerFunctionType = (
  state: StateType,
  action: ReducerActionType,
) => StateType;

export const initialState: StateType = {
  toastAlerts: [],
};

export const reducer: ReducerFunctionType = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_TOAST_ALERT":
      return {
        ...state,
        toastAlerts: [...(state.toastAlerts ?? []), payload],
      };

    case "REMOVE_TOAST_ALERT":
      return {
        ...state,
        toastAlerts: state.toastAlerts?.filter(
          (toastAlert) => toastAlert.id !== payload.id,
        ),
      };

    default: {
      return state;
    }
  }
};

export const useToast = () => {
  const toastContextData = useContext(ToastContext);
  if (!toastContextData) {
    throw new Error("useToast must be used within a ToastContextProvider");
  }
  return toastContextData;
};

export const ToastContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toastTimer = useRef<NodeJS.Timeout>();

  const removeAlert = useCallback((id: string) => {
    dispatch({
      type: "REMOVE_TOAST_ALERT",
      payload: { id, title: "", message: "", type: AlertType.SUCCESS },
    });
  }, []);

  const setToastAlert = useCallback(
    (data: { title: string; type?: AlertType; message?: string }) => {
      const id = generateRandomId();
      const { title, type, message } = data;
      dispatch({
        type: "SET_TOAST_ALERT",
        payload: { id, title, message, type: type ?? AlertType.SUCCESS },
      });

      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
      toastTimer.current = setTimeout(
        () => removeAlert(id),
        config.toastMessageAutoHideTime,
      );
    },
    [removeAlert],
  );

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{ setToastAlert, removeAlert, alerts: state.toastAlerts }}
    >
      <ToastAlertsComponent />
      {children}
    </ToastContext.Provider>
  );
};
