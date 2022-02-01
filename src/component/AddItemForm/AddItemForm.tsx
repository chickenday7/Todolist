import React, {ChangeEvent, useState} from "react";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import s from './AddItemFormStyle.module.scss'
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        plus:{
            color:'black',
            cursor:'pointer',
            position:'absolute',
            right:'0',
            bottom:'3px',
            '&:hover': {
                color:'#2d97e7'
            }
        },
        input:{
            width:'250px',
            padding: '12,5px',
            'input':{
                padding:'11,5px 14px'
            }
        }
    }),
)


type AddItemFormType = {
    callback: (text: string) => void
    label:string
}

export const AddItemForm = (props: AddItemFormType) => {

    let [name, setName] = useState<string>('')
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        addSymbol(e.currentTarget.value)
    }
    const onAddItemButton = () => {
        props.callback(name)
        setName('')
    }
    const addSymbol = (symbol: string) => {
        setName(symbol)
    }
    const onAddItemKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            setName('')
        }
        e.key === 'Enter' && props.callback(name)

    }
    const classes = useStyles()
    return (
        <div className={s.wrapperAddForm}>
            <TextField onKeyPress={onAddItemKey} onChange={onChangeInput} value={name} label={`Add ${props.label}`}/>
            <AddCircleIcon className={classes.plus}  onClick={onAddItemButton}/>
        </div>
    )
}