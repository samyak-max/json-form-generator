import {createContext, useContext, useState} from 'react';

interface FormIgnoreProviderProps {
    children: React.ReactNode;
}

type FormIgnoreContextType = {
    values: {
        [key: string]: string;
    },
    setValues: (values: {}) => void,
}

const initialContext: FormIgnoreContextType = {
    values: {},
    setValues: ({}) => {},
}

const FormIgnoreContext = createContext<FormIgnoreContextType>(initialContext);

export const FormIgnoreProvider: React.FC<FormIgnoreProviderProps> = ({ children }) => {
    const [values, setValues] = useState({});

    return (
        <FormIgnoreContext.Provider value={{values, setValues}}>
            {children}
        </FormIgnoreContext.Provider>
    );
};

export const useFormIgnore = () => useContext(FormIgnoreContext);