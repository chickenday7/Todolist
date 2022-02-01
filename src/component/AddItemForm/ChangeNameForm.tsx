import React, {Dispatch, SetStateAction, useState} from "react";


type ChangeNameFormType = {
    callback: (titleName: string) => void
    setChangeMode: Dispatch<SetStateAction<boolean>>
    name: string
}
export const ChangeNameForm = (props: ChangeNameFormType) => {
    let [name, setName] = useState<string>(props.name)
    const onSpanModeKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && props.callback(name)
        e.key === 'Enter' && props.setChangeMode(false)
    }
    const onSpanModeBlur = () => {
        props.callback(name)
        props.setChangeMode(false)
    }
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    return <input value={name}
                  onChange={onChangeName}
                  onBlur={onSpanModeBlur}
                  onKeyPress={onSpanModeKey}
                  autoFocus={true}
    />
}