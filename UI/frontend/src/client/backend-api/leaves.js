const LeavsApi = {
    getLeavesByManager: async (id, token) => {
      const res = await fetch(`/leaves/all/mgr/${id}`, {
        method: "GET",
        headers: { "Authorization": "Bearer " + token },
      })
      const result = await res.json();
      console.log("got leaves " + result);
      return result;
    },
    getLeavesByEmployee: async (id, token) => {
      const res = await fetch(`/leaves/get/${id}`, {
        method: "GET",
        headers: { "Authorization": "Bearer " + token },
      })
      const result = await res.json();
      console.log("got leaves " + result);
      return result;
    },
    applyForLeave: async (data, token) => {
      const res = await fetch("/leaves/apply", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
      })
      return res.json()
    },
    acceptLeave: async (id, token) => {
      const res = await fetch(`/leaves/accept/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
      })
      return res.json()
    },
    rejectLeave: async (id, token) => {
      const res = await fetch(`leaves/reject/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
      })
      return res.json()
    },
  }
  
  module.exports = { LeavsApi }
  