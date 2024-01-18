import FormGroup from "./FormGroup";
import { useFormIgnore } from "@/context/formIgnoreProvider";

type FormIgnoreProps = {
    jsonKey: string;
    conditions: [{
        jsonKey: string,
        value: string
    }];
    subParameters: [];
}

function FormIgnore({jsonKey, conditions, subParameters}: FormIgnoreProps) {
    const {values} = useFormIgnore();
    return (
        <div>
        {    conditions[0]?.value == values[conditions[0]?.jsonKey] && (
                <FormGroup
                    jsonKey={jsonKey}
                    conditions={conditions}
                    subParameters={subParameters}
                />
            )} 
    </div>
  )
}

export default FormIgnore