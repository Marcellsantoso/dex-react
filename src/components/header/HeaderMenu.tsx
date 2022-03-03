import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

const arrMenu = ['Menu 1', 'Menu 2', 'Menu 3'];
export default function HeaderMenu() {
  return (
    <div className="w-auto">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="h-12 inline-flex justify-center w-full px-4 py-3.5 text-sm font-medium bg-zinc-800 hover:bg-zinc-800/80 rounded-xl shadow-xl">
            <HiOutlineDotsHorizontal className="text-xl" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-zinc-800 rounded-xl shadow-xl">
            {arrMenu.map((key) => (
              <div className="px-1 py-1" key={key}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-blue-500' : ''
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {key}
                    </button>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
