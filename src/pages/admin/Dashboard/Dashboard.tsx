import React, { useEffect } from 'react'
import apiService from '../../../api/apiService'
import SideBar from '../index'

export default function Dashboard() {
  useEffect(() => {
    const fectData = async () => {
      try {
        const data = await apiService.getValues()
        console.log('data', data)
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
