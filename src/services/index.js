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

export const getUserInfo = () => {
    return fetch(`${apiURL}api/user/info`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
};

export const updateUser = (data) => {
    // return fetch(`${apiURL}api/user/update`, {

    // })
};