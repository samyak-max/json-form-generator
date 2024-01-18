import { createContext, useState, useContext } from 'react';

interface FormProviderProps {
    children: React.ReactNode;
}

interface FormContextValue {
    formData: Record<string, any>;
    requiredFields: Record<string, boolean>;
    addValue: (name: string, value: any) => void;
    removeValue: (name: string) => void;
    updateRequiredFields: (name: string, value: boolean) => void;
}

export const FormContext = createContext<FormContextValue>({
    formData: {},
    requiredFields: {},
    addValue: () => {},
    removeValue: () => {},
    updateRequiredFields: () => {},
});

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [requiredFields, setRequiredFields] = useState<Record<string, boolean>>({});
    const addValue = (name: string, value: any) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const removeValue = (name: string) => {
        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData };
            delete newFormData[name];
            return newFormData;
        });
    }
    const updateRequiredFields = (name: string, value: boolean) => {
        setRequiredFields((prevRequiredFields) => ({
            ...prevRequiredFields,
            [name]: value,
        }));
    }
    return (
        <FormContext.Provider value={{ formData, requiredFields, addValue, removeValue, updateRequiredFields }}>
            {children}
        </FormContext.Provider>
    );
};

export const useForm = () => useContext(FormContext);