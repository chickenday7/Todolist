import React, {ChangeEvent, useState} from "react";


type AddItemFormType = {
    callback:(text:string)=>void
}
export const AddItemForm = (props:AddItemFormType) => {

    let [name, setName] = useState<string>('')
    const onChangeInput = (e:ChangeEvent<HTMLInputElement>) => {
        addSymbol(e.currentTarget.value)
    }
    const onAddItem = () => {
            props.callback(name)
    }
    const addSymbol = (symbol: string) => {
        setName(symbol)
    }
    const onAddItemKey = (e:React.KeyboardEvent<HTMLInputElement>) => {
      e.key === 'Enter' && props.callback(name)
    }

    return(
        <div>
            <input onKeyPress={onAddItemKey} value={name} onChange={onChangeInput} />
            <button onClick={onAddItem}>+</button>
        </div>
    )
}