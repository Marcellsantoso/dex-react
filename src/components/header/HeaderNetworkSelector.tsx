import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Networks } from '../../store/networks';
import { useDispatch, useSelector } from 'react-redux';
import { selectNetwork } from '../../store/actions/selectNetworkAction';
import { useEffect } from 'react';
import { ActionType } from '../../store/actionType';

export default function HeaderNetworkSelector() {
  const [selected, setSelected] = useState(Networks.ETH);
  const networkState = useSelector((state: any) => state.selectedNetwork);
  const dispatch = useDispatch();

  useEffect(() => {
    loadNetwork();

    function loadNetwork() {
      if (networkState == null) return;
      networkState.then((state: any) => {
        if (state == null) return;
        setSelected(state);
      });
    }
  }, [networkState]);

  return (
    <div className="w-48">
      <Listbox value={selected} onChange={(network) => dispatch(selectNetwork(ActionType.SELECT_NETWORK, network))}>
        <div className="relative">
          <Listbox.Button className="relative flex w-full py-3 pl-4 pr-10 h-12 text-left bg-zinc-800 rounded-xl shadow-xl cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
            <img src={selected.image} alt={selected.name} className="rounded-full w-6 h-6 mr-3" />
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div>
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-zinc-800 rounded-xl shadow-xl max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <p className="text-sm py-2 px-4 text-gray-500">Select a network</p>
                {Object.keys(Networks).map((key) => {
                  const keyTyped = key as keyof typeof Networks;
                  const network = Networks[keyTyped];

                  return (
                    <Listbox.Option
                      key={key}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 px-4 ${
                          active ? 'text-white bg-blue-500/20' : 'text-inherit'
                        }`
                      }
                      value={network}
                    >
                      {({ selected }) => (
                        <div className="flex">
                          <img src={network.image} alt={network.name} className="rounded-full w-6 h-6 mr-3" />
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {network.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500">
                              <CheckIcon className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                      )}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </div>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
