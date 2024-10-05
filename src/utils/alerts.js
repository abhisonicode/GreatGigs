import toast from "react-hot-toast";

// Function to show a success alert
const showSuccessAlert = (message) => {
  toast.success(message);
};

// Function to show an error alert
const showErrorAlert = (message) => {
  toast.error(message);
};

export { showSuccessAlert, showErrorAlert };
