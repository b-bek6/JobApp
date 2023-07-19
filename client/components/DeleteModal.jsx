import { useState } from 'react';

export default function Modal(){
  const [isModalOpen, setIsModalOpen] = useState(false);



  return (
    <>
        <div
          className="fixed  z-50 p-4 bg-white"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="p-6 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete this Job?</h3>
                <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Yes, I'm sure
                </button>
                <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

