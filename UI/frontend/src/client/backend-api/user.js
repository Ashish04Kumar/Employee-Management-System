const UserApi = {
  login: async (username, password) => {
    const res = await fetch("/user/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
    return res.json()
  },
  getProfile: async (id, token) => {
    const res = await fetch(`/user/id/?id=${id}`, {
      method: "GET",
      headers: { "Authorization": "Bearer " + token },
    })
    return res.json()
  },
  logout: async () => {
    const res = await fetch("/v1/user/logout", { method: "GET" })
    return res.json()
  },
  getNonAdminUsers: async(token) => {
    const res = await fetch("/user/get/non-admin-users/all", {
      method: "GET",
      headers: { "Authorization": "Bearer " + token },
    })
    return res.json()
  },
  deleteUser: async (id, token) => {
    const res = await fetch(`/user/delete/${id}`, {
      method: "DELETE",
      headers: { "Authorization": "Bearer " + token }
    })
    return res
  },
  addUser: async (data, token) => {
    const res = await fetch("/user/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    })
    return res.json()
  },
  updateUser: async (data, id, token) => {
    const res = await fetch("/user/update/"+id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    })
    return res.json()
  },
}

module.exports = { UserApi }
