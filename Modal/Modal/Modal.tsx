"use client";

import { useState } from "react";
import * as React from "react";
import ConfirmationModal from "./ModalComponents/ConfirmationModal";
import DeleteModal from "./ModalComponents/DeleteModal";

export interface modalProps {
  containerHeight: number;
  modalHeader: string;
  modalText: string;
  confirmText: string;
  OnCancel: () => void;
  OnConfirm: () => void;
  modalType: string | null;
}

export default function Modal(props: modalProps) {

  const confirmationButtonClasses  =  `inline-flex w-full justify-center rounded-md ${props.modalType == "Confirm" ? "bg-green-500" : "bg-red-500"} px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 flex-1`
  

  

  return (
    props.modalType?.toLowerCase() == "confirm" ? <ConfirmationModal {...props}/> :
    props.modalType?.toLowerCase() == "delete" ? <DeleteModal {...props}/> 
    
    
    
    : <ConfirmationModal {...props} />
   
  );
}
