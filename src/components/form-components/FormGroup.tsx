import { Label } from "@radix-ui/react-label";
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import FormSwitch from './FormSwitch'
import FormRadio from './FormRadio'
import FormIgnore from './FormIgnore'

type FormGroupProps = {
    label?: string;
    description?: string;
    subParameters: [];
    placeholder?: string;
    jsonKey: string;
    conditions?: [{
      jsonKey: string,
      value: string
    }];
}

function FormGroup({ label, description, subParameters, jsonKey }: FormGroupProps) {
  return (
    <div className="p-3">
        <Label>{label}</Label>
        <div className="text-sm mt-1 text-gray-600">{description}</div>
        <div className="p-2 rounded-md border flex flex-col">
        {
            subParameters.map((item: any) => {
                if (item.uiType === 'Input') {
                    return (
                      <FormInput 
                        jsonKey={jsonKey+'.'+item.jsonKey} 
                        label={item.label} 
                        placeholder={item.placeholder} 
                        description={item.description}
                      />
                    );
                } else if (item.uiType === 'Select') {
                return (
                    <FormSelect
                    jsonKey={jsonKey+'.'+item.jsonKey} 
                    label={item.label}
                    placeholder={item.placeholder} 
                    description={item.description}
                    validate={item.validate}
                    />
                );
                } else if (item.uiType === 'Group') {
                return (
                    <FormGroup
                    jsonKey={jsonKey+'.'+item.jsonKey} 
                    label={item.label}
                    placeholder={item.placeholder} 
                    description={item.description}
                    subParameters={item.subParameters}
                    conditions={item.conditions}
                    />
                );
                }else if (item.uiType === 'Switch') {
                    return (
                      <FormSwitch
                        jsonKey={jsonKey+'.'+item.jsonKey} 
                        label={item.label}
                        placeholder={item.placeholder} 
                        description={item.description}
                        validate={item.validate}
                      />
                    );
                }else if (item.uiType === 'Radio') {
                    return (
                      <FormRadio
                        jsonKey={jsonKey+'.'+item.jsonKey} 
                        label={item.label}
                        placeholder={item.placeholder} 
                        description={item.description}
                        validate={item.validate}
                      />
                    );
                }else if (item.uiType === 'Ignore') {
                    return (
                      <FormIgnore
                        jsonKey={jsonKey+'.'+item.jsonKey} 
                        conditions={item.conditions}
                        subParameters={item.subParameters}
                      />
                    );
                }else {
                return null;
                }
            })
        }
        </div>
    </div>
  )
}

export default FormGroup