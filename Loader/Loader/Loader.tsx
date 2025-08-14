"use client";

import { useState } from "react";
import * as React from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

export interface loaderProps {
  containerHeight: number;
}

export default function Modal(props: loaderProps) {
  return (
    <div
    style={{
      backgroundColor: "RGBA(0, 0, 0, 0.49)",
      width: "100%",
      height: props.containerHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>

<Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'white' }} spin />} />

    </div>
  );
}
