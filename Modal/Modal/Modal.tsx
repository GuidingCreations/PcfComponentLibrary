"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import * as React from "react";

export interface modalProps {
  containerHeight: number;
  modalHeader: string;
  modalText: string;
  confirmText: string;
  OnCancel: () => void;
  OnConfirm: () => void;
  
}

export default function Modal(props: modalProps) {
  return (
    <div
      style={{
        backgroundColor: "RGBA(0, 0, 0, 0.49)",
        width: "100%",
        height: props.containerHeight,
      }}
      className="all-centered-container"
    >
      <div
        style={{
          width: "35%",
          height: "fit-content",
          backgroundColor: "white",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "row",
          gap: ".8rem",
        }}
        className="p-4"
      >
        {/* Exclamation triangle */}

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 110 110"
            fill="none"
          >
            <circle cx="55" cy="55" r="55" fill="#FEE2E2" />
            <path
              d="M55.001 41.8631V55.1263M22.0784 67.0667C19.0137 72.3719 22.8464 79 28.9722 79H81.0297C87.152 79 90.9847 72.3719 87.9235 67.0667L61.8983 21.979C58.8336 16.6737 51.1683 16.6737 48.1036 21.979L22.0784 67.0667ZM55.001 65.7368H55.0257V65.7651H55.001V65.7368Z"
              stroke="#FE0000"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Vertical container  */}

        <div className="flex flex-col">

        {/* Modal header and text */}

          <p className="text-semibold w-full text-left">{props.modalHeader}</p>
          <p className="text-left">{props.modalText}</p>

          {/* Cancel / Confirm buttons container */}
          
          <div className="flex gap-1 items-end w-full flex-row-reverse mt-2">
            
            <button 
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 flex-1"
              onClick={props.OnConfirm}
              >
              Confirm
            </button>
            
            <button 
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 flex-1"
              onClick={props.OnCancel}
              >
              Cancel
            </button>


          </div>
        
        </div>

        {/* End vertical container */}
      </div>
    </div>
  );
}