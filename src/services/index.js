const apiURL = import.meta.env.VITE_API_URL;

//              register
export const register = (data) => {
  return fetch(`${apiURL}api/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

//              signin
export const login = (data) => {
  return fetch(`${apiURL}api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

//              get the user information
export const getUserInfo = (userId, token) => {
  return fetch(`${apiURL}api/user/info/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
};

//              update the user information
export const updateUser = (updateFormData, userId, token) => {
  return fetch(`${apiURL}api/user/update/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(updateFormData),
  });
};

//             delete the user
export const deleteUser = (userId, token) => {
  return fetch(`${apiURL}api/user/delete/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
};

// create link
export const createLink = (linkData, token) => {
  return fetch(`${apiURL}api/link/createLink`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(linkData),
  });
};

//      get all the links
export const getAllLinks = (userId, token, currentPage) => {
  return fetch(
    `${apiURL}api/link/getAllLinks/?id=${userId}&page=${currentPage}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    }
  );
};

//      delete link by its id
export const deleteLinkById = (linkId, token) => {
  return fetch(`${apiURL}api/link/deleteLink/?id=${linkId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
};

// update link
export const updateLink = (linkData, token, linkId) => {
  return fetch(`${apiURL}api/link/updateLink?id=${linkId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(linkData),
  });
};

// get link by id
export const getLink = (linkId) => {
  return fetch(`${apiURL}api/link/getLink?id=${linkId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// get all clicks
export const getAllClicks = (userId, currentPage) => {
  return fetch(
    `${apiURL}api/link/getAllClicks?id=${userId}&page=${currentPage}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

// get all clicks for dashboard
export const getAllClicksForDashboard = (userId) => {
  return fetch(`${apiURL}api/link/getAllClicksForDashboard?id=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
