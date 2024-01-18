import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "@/context/formProvider"
import { useEffect } from "react";

type FormInputProps = {
  label: string;
  placeholder: string;
  description: string;
  jsonKey: string;
  validate?: {
    required: boolean
  };
}

function FormInput( { label, placeholder, description, jsonKey, validate }: FormInputProps) {
  const { addValue, updateRequiredFields } = useForm();
  useEffect(() => {
    updateRequiredFields(jsonKey, (validate?.required) || false);
  },[])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value !== ""){
      addValue(jsonKey, e.target.value);
      updateRequiredFields(jsonKey, false);
    }
  }
  return (
    <div className="p-3">
        <div className="flex gap-1">
          <Label htmlFor={jsonKey}>{label}</Label>
          {validate?.required && <div className="text-red-500">*</div>}
        </div>
        <Input
          onChange={(e) => handleChange(e)}
          id={jsonKey}
          placeholder={placeholder}
        />
        <div className="text-sm mt-1 text-gray-600">{description}</div>
    </div>
  )
}

export default FormInput