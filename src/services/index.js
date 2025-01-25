const apiURL = import.meta.env.VITE_API_URL;

//              register 
export const register = (data) => {
    return fetch(`${apiURL}api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
};

//              signin
export const login = (data) => {
    return fetch(`${apiURL}api/user/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
};

//              get the user information
export const getUserInfo = (userId, token) => {
    return fetch(`${apiURL}api/user/info/${userId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    })
};

//              update the user information
export const updateUser = (updateFormData, userId, token) => {
    return fetch(`${apiURL}api/user/update/${userId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(updateFormData)
    })
};

//             delete the user
export const deleteUser = (userId, token) => {
    return fetch(`${apiURL}api/user/delete/${userId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    })
};
