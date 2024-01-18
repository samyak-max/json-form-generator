import Editor from "./components/Editor";
import { useState } from "react";
import RenderForm from "./components/RenderForm";
import { FormIgnoreProvider } from "./context/formIgnoreProvider";
import { FormProvider } from "./context/formProvider";
import { Toaster } from "@/components/ui/toaster"

function App() {
  const [jsonData, setJsonData] = useState<JSON>({} as JSON);

  const handleEditorChange = (newData: string) => {
    try {
      const parsedData = JSON.parse(newData);
      try {
        const sortedData = parsedData.sort((a: any, b: any) => {
          return a.sort - b.sort;
        });
        // console.log("sortedData: ", sortedData);
        setJsonData(sortedData);
      } catch (e) {
        console.log("Sorting Error: ", e);
      }
      // try {
      //   const uiSchema = parsedData.map((item: any) => {
      //     return {
      //       key: item.jsonKey,
      //       "ui:label": item.label,
      //       "ui:placeholder": item.placeholder
      //     };
      //   });
      //   console.log("uiSchema: ", uiSchema);
      //   setUiSchema(uiSchema);
      // } catch (e) {
      //   console.log("Error creating new JSON: ", e);
      // }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <FormIgnoreProvider>
      <FormProvider>
      <div className="grid grid-cols-10">
        <div className="w-full col-span-4">
          <Editor handleEditorChange={handleEditorChange} />
        </div>
        <div className="w-full col-span-6 h-screen">
          <RenderForm jsonData={jsonData} />
        </div>
      </div>
      <Toaster />
      </FormProvider>
      </FormIgnoreProvider>
    </div>
  );
}

export default App;
