import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

const SuccessMessage = ({ message }) => {
  return (
    <div className="fixed ml-36 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-2xl shadow-lg flex items-center space-x-2 animate-slide-in">
      <CheckCircle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
};

export default SuccessMessage;
