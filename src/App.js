import "./App.css";
import { useNotifications } from "./useNotifications";
import { toastReducer } from "./toastReducer";
import { useReducer } from "react";
import Toast from "./Toast";
//useNotifications customHooks return showNotification function
// showNotification(type , message) type: 4 types
// error message will disappear in 2 seconds
// if hovered over it timer will stop
// multiple notification is allowed at once.

// const useNotifications = () => {
//   return {
//     showNotification: ({ type, message }) => {
//       console.log(type, message);
//     },
//   };
// };
function App() {
  const { showNotification } = useNotifications();
  const [toasts, dispatch] = useReducer(toastReducer, []);
  const getColor = (type) => {
    switch (type) {
      case "SUCCESS":
        return "green";
      case "WARNING":
        return "yellow";
      case "ERROR":
        return "red";
      case "INFO":
        return "blue";
      default:
        return "white";
    }
  };
  const handleClick = (e) => {
    const { target } = e;
    const type = target.getAttribute("data-type");

    showNotification({
      type,
      toasts,
      message: `${type} Notification`,
      dispatch,
      bgColor: getColor(type),
    });
  };

  return (
    <div className="content">
      <h1>Add Notification</h1>
      <div className="actions">
        <button className="info" onClick={handleClick} data-type="INFO">
          Info
        </button>
        <button className="success" onClick={handleClick} data-type="SUCCESS">
          Success
        </button>
        <button className="warning" onClick={handleClick} data-type="WARNING">
          Warning
        </button>
        <button className="error" onClick={handleClick} data-type="ERROR">
          Error
        </button>
      </div>
      <Toast toastList={toasts} dispatch={dispatch} />
    </div>
  );
}

export default App;
