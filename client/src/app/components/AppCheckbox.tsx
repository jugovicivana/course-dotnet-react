import { Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps{
    label:string;
    isDirty: boolean;
}
export default function AppCheckbox(props:Props){
    const {field}=useController({...props, defaultValue:false})
    const [isDisabled, setIsDisabled]=useState(!props.isDirty);

    useEffect(()=>{
        setIsDisabled(!props.isDirty);
    },[props.isDirty]);

    return(
        <FormControlLabel 
            control={
                <Checkbox
                    {...field}  //ovo su onchange, onblur, name....
                    checked={field.value}
                    color="secondary"
                    disabled={isDisabled}
                />
            }
            label={props.label}
        />
    )

}