'use client'
import React, { useEffect, useState } from 'react'
import Button from './Button'
import Modal from './Modal';
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, fetchUsers, increment } from '@/app/lib/reducers/userSlice'
import { useRouter } from 'next/navigation';
import { IUser } from '../lib/reducers/types';
import { removeUser } from './utils';
import Loader from './Loader';

const UsersLayout = () => {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('')
    const { users, loading }: { users: IUser[], loading: boolean } = useSelector((state: any) => state.user);
    const dispatch: any = useDispatch();

    useEffect(() => {
        // fetch API call only if state is empty
        !users.length && dispatch(fetchUsers());
    }, [users]);
    const openModal = (modalType: string) => {
        setIsModalOpen(true);
        setModalType(modalType)
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleSubmit = (e: any) => {
        e?.preventDefault()
        console.log('adding user...', e)
    };
    const handleOnRemoveUser = async (user: any) => {
        const userConfirmed = window.confirm(`Continue with the deletion of user ${user.id} - (${user.name}) ?`);
        if (userConfirmed) {
            const response = await removeUser(user.id)
            if (response) {
                dispatch(deleteUser(user.id))
            }
        }
    };
    if (loading) return (<Loader />)
    return (
        <ul role="list" className="w-3/4 p-2.5 rounded-3xl	bg-[#00000057] divide-y divide-gray-100">
            <div className="flex justify-center pb-8">

                <Button onClick={() => openModal('Add')} label='Add new User' type='add' buttonType={'button'} />
            </div>

            {users.map((person) => (
                <li key={person.email} className="flex justify-between gap-x-6 py-5 hover:bg-[#141414] cursor-pointer" onClick={() => router.push(`/user/${person.id}`)}>
                    <div className="flex min-w-60 max-w-60 gap-x-4 hover:bg-[#141414] " >
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.gender == 'female' ? 'https://cdn4.iconfinder.com/data/icons/jetflat-2-people/60/005_043_user_profile_avatar_woman_girl_round-512.png' : 'data:image/png;base64,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'} alt="profile_picture" />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-50">{person.name}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-300">{person.email}</p>
                        </div>
                    </div>
                    <div className="min-w-56 max-w-56 hover:bg-[#141414]">
                        {person.status == 'active' ? (
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <p className="text-xs leading-5 text-gray-500">Online</p>
                            </div>
                        ) : (
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Offline
                            </p>
                        )}
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <Button label='Edit' type='update' onClick={(event) => {
                            event.stopPropagation()
                            router.push(`/edit/${person.id}`)
                        }}  /* onClick={() => openModal('Edit')} */ />


                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <Button label='Remove' type='remove' onClick={(event) => {
                            event.stopPropagation()
                            handleOnRemoveUser(person)
                        }} />


                    </div>
                </li>
            ))}
            {
                modalType == 'Add' ? (
                    <Modal show={isModalOpen} handleClose={closeModal} handleSubmit={handleSubmit} modalType='Add' />

                ) : (
                    /* We can use this modal instead of redirecting to a new page (/edit/:id) */
                    <Modal show={isModalOpen} handleClose={closeModal} handleSubmit={handleSubmit} modalType='Edit' />
                )
            }
        </ul>
    )
}

export default UsersLayout