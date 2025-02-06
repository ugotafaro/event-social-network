import React from "react";
import { AlertTriangle } from "lucide-react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="fixed ml-16 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl shadow-lg flex items-center space-x-2 animate-slide-in">
      <AlertTriangle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
