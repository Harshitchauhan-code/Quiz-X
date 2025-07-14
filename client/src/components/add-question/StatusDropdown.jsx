import React from "react";

const StatusDropdown = ({ selectedStatus, onStatusChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="block text-gray-700 font-medium" htmlFor="status">
        Status:
      </label>
      <select
        id="status"
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Deleted">Deleted</option>
      </select>
    </div>
  );
};

export default StatusDropdown;
