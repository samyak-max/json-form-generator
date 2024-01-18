import { useEffect, useState } from 'react';
import FormInput from '../components/form-components/FormInput'
import FormSelect from '../components/form-components/FormSelect'
import FormGroup from '../components/form-components/FormGroup'
import FormSwitch from '../components/form-components/FormSwitch'
import FormRadio from '../components/form-components/FormRadio'
import { Button } from '../components/ui/button'
import { useForm } from '../context/formProvider'
import { Skeleton } from "@/components/ui/skeleton"
import FormIgnore from '../components/form-components/FormIgnore';
import { useToast } from "@/components/ui/use-toast"

function RenderForm(jsonData: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const {formData, requiredFields } = useForm();
  const { toast } = useToast()

  useEffect(() => {
    if (jsonData.jsonData.length > 0) {
      try {
        //Validate JSON
        setLoading(false);
      } catch (e) {
        console.log("Error parsing JSON: ", e);
      }
    } else {
      setLoading(true);
    }
  }, [jsonData]);

  const onSubmit = () => {
    for(let key in requiredFields){
      if(requiredFields[key]){
        toast({
          title: "Please fill out all required fields",
        })
        return;
      }
    }
    toast({
      title: "Form Data:",
      description: JSON.stringify(formData, null, 2),
    });
  }

  return (
    <div className='p-2 h-screen overflow-scroll overflow-x-hidden'>
      {loading ? (
        <div className='flex h-screen justify-center items-center'>
          <Skeleton className="w-[45vw] h-[90vh] rounded-md" />
        </div>
      ) : (
        <div className='border rounded-md p-2'>
          {jsonData.jsonData.map((item: any) => {
            if (item.uiType === 'Input') {
              return (
                <FormInput
                  jsonKey={item.jsonKey} 
                  label={item.label}
                  placeholder={item.placeholder} 
                  description={item.description}
                  validate={item.validate}
                />
              );
            } else if (item.uiType === 'Select') {
              return (
                <FormSelect
                  jsonKey={item.jsonKey} 
                  label={item.label}
                  placeholder={item.placeholder} 
                  description={item.description}
                  validate={item.validate}
                />
              );
            } else if (item.uiType === 'Group') {
              return (
                <FormGroup
                  jsonKey={item.jsonKey} 
                  label={item.label}
                  placeholder={item.placeholder} 
                  description={item.description}
                  subParameters={item.subParameters}
                />
              );
            }else if (item.uiType === 'Switch') {
              return (
                <FormSwitch
                  jsonKey={item.jsonKey} 
                  label={item.label}
                  placeholder={item.placeholder} 
                  description={item.description}
                  validate={item.validate}
                />
              );
            }else if (item.uiType === 'Radio') {
              return (
                <FormRadio
                  jsonKey={item.jsonKey} 
                  label={item.label}
                  placeholder={item.placeholder} 
                  description={item.description}
                  validate={item.validate}
                />
              );
            }else if (item.uiType === 'Ignore') {
              return (
              <FormIgnore
                  jsonKey={item.jsonKey} 
                  conditions={item.conditions}
                  subParameters={item.subParameters}
              />
              );
            }else {
              return null;
            }
          })}
          <div className="p-3 flex justify-end mt-2">
            <Button onClick={() => {
              onSubmit();
              console.log("formData: ", formData);
            }}>Submit</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RenderForm;
