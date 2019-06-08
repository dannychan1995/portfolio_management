const initialState = {
  portfolio: {}
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "GETPOFOLIO_SUCCESS":
      return Object.assign({}, state, {
        portfolio: action.portfolio
      });
    default:
      return state;
  }
}
