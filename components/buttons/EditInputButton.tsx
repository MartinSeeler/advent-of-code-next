import { customPuzzleInputState, queuedPuzzlePartsState } from "@/lib/atoms";
import { PuzzleContext } from "@/lib/context";
import { Transition, Dialog } from "@headlessui/react";
import {
  PencilSquareIcon,
  PlayCircleIcon,
  PlayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilCallback, useRecoilValue } from "recoil";

type FormData = {
  input: string;
};

const EditInputButton = () => {
  const { day, input } = useContext(PuzzleContext);
  const customInput = useRecoilValue(customPuzzleInputState(day));
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      input: customInput || input,
    },
  });

  const updateCustomizedInput = useRecoilCallback(
    ({ set }) =>
      (day: string, input: string | null) => {
        set(customPuzzleInputState(day), input);
      }
  );

  const queueDay = useRecoilCallback(({ set }) => (day: string) => {
    set(queuedPuzzlePartsState, (old) => [...old, `${day}-1`, `${day}-2`]);
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const onSubmit = handleSubmit(async (data) => {
    console.log("submit", data);
    const cleanedInput = data.input.trim();
    setValue("input", cleanedInput);
    if (cleanedInput === input) {
      updateCustomizedInput(day, null);
      // without this, the input will not be updated int eh game logic,
      // see https://github.com/facebookexperimental/Recoil/issues/1993
      // if anyone knows a better way, please let me know!
      await new Promise((resolve) => setTimeout(resolve, 25));
      queueDay(day);
    } else {
      updateCustomizedInput(day, cleanedInput);
      // same as above
      await new Promise((resolve) => setTimeout(resolve, 25));
      queueDay(day);
    }
    closeModal();
  });
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="relative inline-flex items-center px-4 py-2 text-sm group rounded-l-md btn-defaults"
      >
        Edit Puzzle Input
        <PencilSquareIcon
          aria-hidden="true"
          className="w-4 h-4 ml-2 -mr-1 text-gray-400 dark:text-green-400 dark:group-hover:text-zinc-800 dark:group-focus:text-zinc-800"
        />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50 dark:bg-green-400/10" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl dark:border-green-400 dark:border dark:border-dashed dark:bg-zinc-800 sm:max-w-sm sm:my-8 sm:p-6">
                  <form
                    onSubmit={onSubmit}
                    onReset={() => {
                      setValue("input", input);
                    }}
                  >
                    <div className="sm:flex sm:items-start">
                      <div className="flex flex-col w-full mt-0 text-center sm:text-left">
                        <div className="flex justify-between">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900 dark:text-green-400"
                          >
                            Edit Puzzle Input
                          </Dialog.Title>
                          <button
                            type="button"
                            className="text-gray-400 bg-white rounded-md dark:text-zinc-500 dark:bg-zinc-800 hover:text-gray-500 dark:hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 dark:ring-offset-zinc-800 focus:ring-offset-2"
                            onClick={closeModal}
                          >
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-4">
                          <textarea
                            {...register("input")}
                            rows={10}
                            defaultValue={input}
                            className="block w-full border-gray-300 rounded-md shadow-sm resize-none dark:selection:bg-green-400 dark:selection:text-zinc-700 dark:bg-zinc-500/10 dark:text-zinc-300 dark:border-zinc-500/10 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            placeholder="Paste your puzzle input here"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm dark:text-zinc-900 dark:bg-green-400 hover:bg-green-700 dark:hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed dark:ring-offset-zinc-900"
                      >
                        Save and Run
                        <PlayIcon
                          aria-hidden="true"
                          className="w-4 h-4 ml-1.5 -mr-1 text-white dark:text-zinc-900"
                        />
                      </button>
                      <button
                        type="reset"
                        disabled={input === watch("input")}
                        className="relative inline-flex items-center rounded-md px-4 py-1.5 btn-defaults group"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default EditInputButton;
