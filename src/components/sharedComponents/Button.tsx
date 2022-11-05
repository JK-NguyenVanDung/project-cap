import React, { FC, useEffect, useState } from 'react'

interface ButtonType {
  onClick: Function | FC
  className?: string
  children?: string
}
export default function Button(props: ButtonType) {
  return (
    <button
      type="button"
      className={`btn ${props.className ? props.className : 'btn-primary'}`}
      onClick={() => props.onClick}
    >
      {props.children}
    </button>
  )
}
