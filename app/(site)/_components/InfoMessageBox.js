import React from "react";

export default function InfoMessageBox({ label, message }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 p-4 rounded-lg text-center mt-2">
      <p className="font-medium">{label}</p>
      <p>{message}</p>
    </div>
  );
}
