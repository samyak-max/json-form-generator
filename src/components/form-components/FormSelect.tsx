import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useForm } from "@/context/formProvider"
import { useEffect } from "react";

type FormInputProps = {
    label: string;
    placeholder: string;
    description: string;
    jsonKey: string;
    validate: {
        options: [],
        defaultValue: string,
        required: boolean
    },
}

function FormSelect({ label, placeholder, description, jsonKey, validate }: FormInputProps) {
    const { addValue, updateRequiredFields } = useForm();
    const handleChange = (value: string) => {
        addValue(jsonKey, value)
        updateRequiredFields(jsonKey, false);
    }
    useEffect(() => {
        updateRequiredFields(jsonKey, validate.required || false);
    },[])
  return (
    <div className="p-3 flex justify-between items-center">
        <div className="flex gap-1">
            <Label htmlFor={jsonKey}>{label}</Label>
            {validate.required && <span className="text-red-500">*</span>}
        </div>
        <Select key={jsonKey}
            onValueChange={(value) => handleChange(value)}
        >
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={placeholder} defaultValue={validate.defaultValue}/>
        </SelectTrigger>
        <SelectContent>
            {
                validate.options?.map((item: any) => {
                    return (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    )
                })
            }
        </SelectContent>
        </Select>
        <div className="text-sm mt-1 text-gray-600">{description}</div>
    </div>
  )
}

export default FormSelect