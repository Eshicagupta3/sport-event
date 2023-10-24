import React, { createContext, useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import Snackbar from "./Snackbar";

const types = {
  ADD_TOAST: "ADD_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

type ToastType = {
  message: string;
  id: string;
  type?: string;
  duration?: string;
  action: (arg: string) => void;
  actionTitle: string;
  actionBtn: string;
  icon?: string;
  toastStyle?: { [key: string]: string };
  toastClass?: string;
};

function createPortalElement() {
  const divEle = document.createElement("div");
  divEle.className = "toast-portal";
  document.body.appendChild(divEle);
  return divEle;
}
const portalEle = createPortalElement();
const toastReducer = (
  state: [] | ToastType[],
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case types.ADD_TOAST:
      return [...state, action.payload];
    case types.REMOVE_TOAST:
      return state.filter((toast) => toast.id !== action.payload);
    default:
      return [...state];
  }
};

export const ToastContext = createContext<any | null>(null);
ToastContext.displayName = "ToastContext";

export const ToastProvider = ({ children }: { children: any }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const toast = (message: string, toastProps: ToastType) => {
    const duration = toastProps?.duration || 2000;
    const id = toastProps.id || Math.random().toString(36).substring(2, 9);

    const newToast: ToastType = {
      ...toastProps,
      message,
      id,
    };

    if (message) {
      dispatch && dispatch({ type: types.ADD_TOAST, payload: newToast });
      if (typeof duration === "number" && duration !== Infinity) {
        setTimeout(
          () => dispatch({ type: types.REMOVE_TOAST, payload: id }),
          duration
        );
      }
    } else {
      console.warn("VISION: 'message' is required for toast");
    }
  };

  toast.success = (message = "", toastProps = {}) =>
    toast(message, { ...toastProps, type: "success" } as ToastType);
  toast.error = (message = "", toastProps = {}) =>
    toast(message, { ...toastProps, type: "error" } as ToastType);
  toast.info = (message = "", toastProps = {}) =>
    toast(message, { ...toastProps, type: "info" } as ToastType);
  toast.delete = (id: string) =>
    dispatch({ type: types.REMOVE_TOAST, payload: id });

  const renderToasts = () =>
    toasts.map((toastProps: ToastType) => (
      <Snackbar key={toastProps.id} {...toastProps} />
    ));

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {ReactDOM.createPortal(renderToasts(), portalEle)}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
