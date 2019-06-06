export function addPortfolio({ portfolio, token }) {
  return dispatch => {
    dispatch({
      type: "CLEAR_MESSAGES"
    });
    return fetch("/api/portfolios", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(portfolio)
    }).then(response => {
      return response.json().then(json => {
        if (response.ok) {
          dispatch({
            type: "ADDPOFOLIO_SUCCESS",
            user: json
          });
          // history.push("/");
        } else {
          dispatch({
            type: "SIGNUP_FAILURE",
            messages: Array.isArray(json) ? json : [json]
          });
        }
      });
    });
  };
}
