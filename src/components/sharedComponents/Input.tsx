import React from 'react'

export default function Input({ label }: { label: string }) {
  return (
    <div>
      <p>{label}</p>
      <input />
    </div>
  )
}
