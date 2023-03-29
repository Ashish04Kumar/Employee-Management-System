const TaskApi = {
    getAllTasksByManager: async (id, token) => {
        const res = await fetch("/task/get/mgr/" + id, {
            method: "GET",
            headers: { "Authorization": "Bearer " + token }
        })
        return res.json();
    },
    addTask: async (data, token) => {
        const res = await fetch("/task/add", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
        })
        return res.json()
    },
    getAllTasksForEmployee: async (id, token) => {
        const res = await fetch("/task/get/emp/" + id, {
            method: "GET",
            headers: { "Authorization": "Bearer " + token }
        })
        return res.json();
    },
    updateTask: async (status, id, token) => {
        const res = await fetch("/task/update/" + id + "/?status=" + status, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
        })
        return res.json()
    },
  }
  
  module.exports = { TaskApi }
  