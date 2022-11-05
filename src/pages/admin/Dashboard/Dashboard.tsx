import React, { useEffect } from 'react'
import apiService from '../../../api/apiService'

export default function Dashboard() {
  useEffect(() => {
    const fectData = async () => {
      try {
        const data = await apiService.getCategory()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fectData()
  }, [])

  return (
    <div>
      <h1>Hello world !!!</h1>
    </div>
  )
}
