import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import AddNote from '../components/AddNote';

export default function AddNoteModal({open, setOpen }) {
  const cancelButtonRef = useRef();

  function closeModal() {
    setOpen(false);
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        static
        open={open}
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md px-8 py-10 my-8 overflow-hidden text-left align-top md:align-middle transition-all transform bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-50 shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-800 dark:text-gray-50"
              >
                Add a New Note
              </Dialog.Title>
              <div className="mt-2">
                <AddNote closeModal={closeModal} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
