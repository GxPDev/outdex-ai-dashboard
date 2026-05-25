import React from "react";

const ZinaxStatus = () => (
  <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
    AI engine active — tracking global financial markets
    <span className="ml-2 text-gray-400">1,333 signals processed today</span>
  </div>
);

export default ZinaxStatus;
