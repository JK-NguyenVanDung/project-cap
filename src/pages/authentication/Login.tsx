import { Button, Input } from '@material-tailwind/react'
import React, { useCallback } from 'react'
import { loadFull } from 'tsparticles'
import Particle from '../../components/Particles/Particle'
export default function Login() {
  const submit = () => {
    console.log('login')
  }
  return (
    <div className="bg-slate-500">
      <main className="fixed w-full h-full top-0 place-content-center items-center flex bg-[#252b42]">
        <form className="w-1/5 h-1/2 flex flex-col bg-slate-50 bg-white ">
          <div className="flex flex-col items-start  mb-6">
            <label>email</label>
            <Input />
          </div>
          <div className="flex flex-col items-start  mb-6">
            <label>email</label>
            <Input />
          </div>
          <div className="flex flex-col items-start ">
            <div className="md:w">
              <Button onClick={submit}>Login</Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
