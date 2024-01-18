import { Switch } from "@/components/ui/switch"
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useForm } from "@/context/formProvider"

type FormInputProps = {
    label: string;
    description: string;
    validate: {
        defaultValue: boolean,
        immutable: boolean
        required: boolean
    };
    jsonKey: string;
    placeholder: string;
}

function FormSwitch({label, description, validate, jsonKey, placeholder}: FormInputProps) {
    const { addValue, updateRequiredFields } = useForm();
    
    const [checked, setChecked] = useState<boolean>(validate.defaultValue);
    const handleChange = () => {
        setChecked(!checked)
        addValue(jsonKey, !checked)
        if(checked) updateRequiredFields(jsonKey, false);
        else updateRequiredFields(jsonKey, validate.required || false);
    }
    useEffect(() => {
        addValue(jsonKey, validate.defaultValue);
        updateRequiredFields(jsonKey, (validate.required && !checked) || false);
    },[checked])
  return (
    <div className="p-3">
        <div className="flex items-center gap-2">
            <div className="flex gap-1">
                <Label htmlFor={jsonKey}>{label}</Label>
                {validate.required && <span className="text-red-500">*</span>}
            </div>
            <Switch 
                key={jsonKey}
                defaultChecked={validate.defaultValue}
                onCheckedChange={() => handleChange()}
                disabled={validate.immutable}
            />
        </div>
        <div className="text-sm mt-1 text-gray-600">{description}</div>
    </div>
  )
}

export default FormSwitch