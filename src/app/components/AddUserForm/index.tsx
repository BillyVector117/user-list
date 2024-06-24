import React, { useState } from 'react'
import Button from '../Button'
import { INewUser } from './types'
import { createUser } from './utils'
import { useDispatch } from 'react-redux'
import { addUser } from '@/app/lib/reducers/userSlice'

const AddUserForm = ({ handleClose }: any) => {
  const dispatch = useDispatch()
  const initialState = {
    name: '',
    email: '',
    gender: '',
    //bio: '',
  }
  const [newUser, setNewUser] = useState<INewUser>(initialState)

  const handleAddUser = async (e: any) => {
    e.preventDefault()
    const response = await createUser(newUser)
    if (response) {
      dispatch(addUser(response))
      handleClose()
    }
  };
  return (
    <div className="relative p-4 w-full max-w-3xl max-h-full bg-[#060606d6]">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create New User
          </h3>
          <button type="button" onClick={handleClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form className="p-4 md:p-5" onSubmit={(e) => {
          handleAddUser(e)
        }} >
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input value={newUser?.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Billy Rodriguez..." required />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" value={newUser?.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Myemail@domain.com" required />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
              <select required value={newUser?.gender} onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })} id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option value={""}>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Prefer not to say</option>
              </select>
            </div>
          </div>
          <Button label='Add new User' type='add' buttonType={'submit'} />
        </form>
      </div>
    </div>

  )
}

export default AddUserForm