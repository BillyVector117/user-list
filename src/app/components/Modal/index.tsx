// Modal.tsx
import React from 'react';
import Button from '../Button';
import AddUserForm from '../AddUserForm';

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit?: (e: any) => void;
  children?: React.ReactNode;
  modalType?: string;
  id?: string
}

const Modal: React.FC<ModalProps> = ({ show, id, handleClose, handleSubmit, modalType, children }) => {
  if (!show) {
    return null;
  }
  return (

    <div /* id={id} */ tabIndex={-1} aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#06060694]">
      {children ? (
        <>
          <div className="flex flex-col ">
            <button type="button" onClick={handleClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            {children}
          </div>
        </>
      ) :
        (
          <>
            {modalType == 'Add' ? (
              <AddUserForm handleClose={handleClose} handleSubmit={handleSubmit} />
            ) : (
              <div className="relative p-4 w-full max-w-3xl max-h-full bg-[#060606d6]">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Update User
                    </h3>
                    <button type="button" onClick={handleClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <form className="p-4 md:p-5" onSubmit={(e) => handleSubmit && handleSubmit(e)}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Billy Rodriguez..." required />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Myemail@domain.com" required />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                        <select required id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                          <option value={""}>Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Prefer not to say</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Want to tell us more about you? (optional)</label>
                        <textarea id="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type something about you..."></textarea>
                      </div>
                    </div>
                    <Button label='Update' type='update' buttonType={'submit'} /*  onClick={openModal} */ />
                  </form>
                </div>
              </div>
            )}

          </>
        )}
    </div>
  )
};

export default Modal;
