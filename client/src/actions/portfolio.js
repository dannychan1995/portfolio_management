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
export function getPortfolio({ id, token }) {
  return dispatch => {
    return fetch(`/api/portfolios/${id}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      return response.json().then(json => {
        if (response.ok) {
          dispatch({
            type: "GETPOFOLIO_SUCCESS",
            portfolio: json.portfolio
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
export function cashInjection({ amount, portfolioId, token }) {
  return dispatch => {
    return fetch(`/api/portfolios/cashInjection`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({amount:amount, portfolioId:portfolioId})
    }).then(response => {
      return response.json().then(json => {
        if (response.ok) {
          dispatch({
            type: "GETPOFOLIO_SUCCESS",
            portfolio: json.portfolio
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
export function makeOrder({ order, portfolioId, token }) {
  return dispatch => {
    dispatch({
      type: "CLEAR_MESSAGES"
    });
    return fetch(`/api/portfolios/makeOrder`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({order:order, portfolioId:portfolioId})
    }).then(response => {
      return response.json().then(json => {
        if (response.ok) {
          console.log(json);
          dispatch({
            type: "GETPOFOLIO_SUCCESS",
            portfolio: json.portfolio
          });
          dispatch({
            type: "MESSAGE_SUCCESS",
            messages: [{msg:"Order success!"}]
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
