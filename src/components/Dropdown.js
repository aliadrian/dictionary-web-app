import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center items-center gap-x-1.5 px-3 py-2 lg:text-lg text-sm font-semibold hover:bg-gray-50">
          Serif
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-purple" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform scale-95"
        enterTo="transform scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform scale-100"
        leaveTo="transform scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 focus:outline-none whitespace-nowrap">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 lg:text-lg text-sm text-black'
                  )}
                >
                  Sans-Serif
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}