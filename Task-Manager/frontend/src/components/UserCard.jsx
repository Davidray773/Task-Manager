import React from "react"

const UserCard = ({ userInfo, onRoleChange }) => {
  const handleRoleChange = () => {
    const newRole = userInfo?.role === "admin" ? "user" : "admin"
    onRoleChange(userInfo._id, newRole)
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userInfo?.profileImageUrl || null}
            alt={userInfo?.name}
            className="h-12 w-12 rounded-full object-cover border-2 border-white"
          />

          <div className="">
            <p className="text-lg font-medium">{userInfo?.name}</p>
            <p className="text-sm text-gray-500">{userInfo?.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                userInfo?.role === "admin"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-100 text-blue-800"
              }`}>
                {userInfo?.role === "admin" ? "Admin" : "User"}
              </span>
              <button
                onClick={handleRoleChange}
                className="px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Change to {userInfo?.role === "admin" ? "User" : "Admin"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-3 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="pending"
        />

        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="in-progress"
        />

        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="completed"
        />
      </div>
    </div>
  )
}

export default UserCard

const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"

      case "in-progress":
        return "bg-blue-100 text-blue-800"

      case "completed":
        return "bg-green-100 text-green-800"

      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <div
      className={`flex flex-1 text-[10px]  font-medium ${getStatusTagColor()} px-4 py-0.5 rounded-lg items-center gap-1`}
    >
      <span className="text-[12px] font-semibold">{count}</span>{" "}
      <span>{label}</span>
    </div>
  )
}
