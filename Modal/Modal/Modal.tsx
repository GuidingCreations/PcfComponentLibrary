"use client";

import { useState } from "react";
import * as React from "react";
import ConfirmationModal from "./ModalComponents/ConfirmationModal";
import DeleteModal from "./ModalComponents/DeleteModal";

export interface modalProps {
  containerHeight: number;
  containerWidth: number;
  modalHeader: string;
  modalText: string | string[];
  confirmText: string;
  OnCancel: () => void;
  OnConfirm: () => void;
  modalType: string | null;
  includeTextInput: boolean;
  inputTextPlaceholder: string;
  onInputTextChange: (newText: string) => void;
  requiredConfirmationText?: string | null;
}

export default function Modal(props: modalProps) {

  return (
    <div style={{height: `${props.containerHeight}px`, width: `${props.containerWidth}px`}}>

    {
    
      props.modalType?.toLowerCase() == "confirm" ? <ConfirmationModal {...props}/> :
      props.modalType?.toLowerCase() == "delete" ? <DeleteModal {...props}/> 
    
      : <ConfirmationModal {...props} />
    
    }

    </div>
   
  );
}
