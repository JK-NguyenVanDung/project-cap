import React, { useEffect } from 'react'
import apiService from '../../../api/apiService'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from '../../../components/sharedComponents/Input'

export default function Dashboard() {
  useEffect(() => {
    const fectData = async () => {
      try {
        const data = await apiService.getCategories()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fectData()
  }, [])

  return <div>{/* <Input /> */}</div>
}
