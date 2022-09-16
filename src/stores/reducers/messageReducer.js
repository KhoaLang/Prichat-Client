const initialState = {
  messagesList: [],
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MESSAGE_LIST":
      return { ...state, messagesList: action.data };
    case "GET_UPDATED_LIST":
      if (
        action.data._id ===
        state.messagesList[state.messagesList.length - 1]._id
      ) {
        console.log(
          action.data._id +
            " " +
            state.messagesList[state.messagesList.length - 1]._id
        );
        return state;
      }
      return { ...state, messagesList: [...state.messagesList, action.data] };
    default:
      return state;
  }
};
