import React, { useEffect } from 'react'
import SideBar from '../index'

export default function Dashboard() {
  useEffect(() => {
    // const fectData = async () => {
    //   console.log
    //   try {
    //     const data = await apiService.getTest()
    //     console.log(data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // fectData()
  }, [])

  return (
    <div>
      <h1>Hello world !!!</h1>
    </div>
  )
}
