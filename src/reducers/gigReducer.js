const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
export const INITIAL_STATE = {
  userId: loggedInUser?._id,
  title: "",
  desc: "",
  cat: "graphic-design",
  price: 0,
  cover: "",
  images: [],
  shortTitle: "",
  shortDesc: "",
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
};

const removeFeature = (features, index) => {
  features.splice(index, 1);
  return features;
};

export const gigReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    case "ADD_FEATURE":
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter((_, i) => i !== action.payload.index),
      };

    default:
      return state;
  }
};
