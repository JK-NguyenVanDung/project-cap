import React, { useCallback } from 'react'
import { loadFull } from 'tsparticles'
import Particle from '../../components/Particles/Particle'
import Button from '../../components/sharedComponents/Button'
export default function Login() {
  const submit = () => {
    console.log('login')
  }
  return (
    <div className="bg-slate-500">
      <main className="fixed w-full h-full top-0 place-content-center items-center flex">
        <form className="w-1/5 h-1/2 flex flex-col bg-slate-50">
          <div className="md:flex md:items-center mb-6">
            <label>email</label>
            <input />
          </div>
          <div className="md:flex md:items-center mb-6">
            <label>email</label>
            <input />
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w">
              <Button onClick={submit}>Login</Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
