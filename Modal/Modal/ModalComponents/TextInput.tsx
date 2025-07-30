import * as React from 'react'

export interface TextInputProps {
    placeholder?: string;
    onInputTextChange: (newText: string) => void;
}

const TextInput = (props: TextInputProps) => {
  return (
    <div className="mt-2">
        <input
          placeholder = {props.placeholder ?? "Please input reason"}
          className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          style={{width: '-webkit-fill-available'}}
          onChange={(e) => {props.onInputTextChange(e.target.value) } }
        />
      </div>
  )
}

export default TextInput