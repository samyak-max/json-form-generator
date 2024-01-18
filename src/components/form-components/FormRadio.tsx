import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import { useFormIgnore } from "@/context/formIgnoreProvider";

type FormRadioProps = {
    validate: {
        options: [],
        defaultValue: string,
        immutable: boolean
    };
    jsonKey: string;
    placeholder: string;
    description: string;
    label: string;
}

function FormRadio({validate, jsonKey, placeholder, description, label}: FormRadioProps) {
    const [tab, setTab] = useState<string>(validate.defaultValue);
    const {setValues} = useFormIgnore();
    
    useEffect(() => {
        setValues((prev: {}) => ({...prev, [jsonKey]: tab}));
    },[tab])

    return (
        <div>
            <Tabs defaultValue={validate.defaultValue} className="w-full" onValueChange={(value) => setTab(value)}>
            <TabsList
                className="flex justify-between items-center w-full"
            >
                {
                    validate.options?.map((item: any) => {
                        return (
                            <TabsTrigger value={item.value} className="w-full">
                                {item.label}
                            </TabsTrigger>
                        )
                    })
                }
            </TabsList>

            </Tabs>
        </div>
    )
}

export default FormRadio