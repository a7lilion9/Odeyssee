import React, { useState } from "react";

const Notification = ({ message, type }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <div
          className={`fixed bottom-0 right-0 mb-4 mr-4 bg-green-200 text-green-800 py-2 px-4 rounded-lg shadow-md z-50`}
        >
          <div
            onClick={handleClose}
            className="cursor-pointer flex justify-between gap-2 items-center"
          >
            <span className=" px-2 text-sm font-semibold">{message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
