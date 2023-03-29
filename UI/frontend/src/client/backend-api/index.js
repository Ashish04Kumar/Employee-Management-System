const { LeavsApi } = require("./leaves")
const { TaskApi } = require("./task")
const { UserApi } = require("./user")

const BackendApi = {
  user: UserApi,
  task: TaskApi,
  leaves: LeavsApi
}

module.exports = { BackendApi }
