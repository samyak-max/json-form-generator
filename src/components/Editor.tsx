import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-terminal";

type EditorProps = {
    handleEditorChange: (newData: string) => void;
}

const Editor = ({ handleEditorChange }: EditorProps) => {
    return (
        <div>
            <AceEditor
                style={{width:"100%", height:"100vh"}}
                mode="json"
                theme="terminal"
                name="UNIQUE_ID_OF_DIV"
                placeholder="Enter UI Scheme"
                editorProps={{ $blockScrolling: false }}
                onChange={(newData) => handleEditorChange(newData)}
            />
        </div>
    );
};

export default Editor