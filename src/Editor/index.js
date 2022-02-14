import React, { useState, useEffect } from "react";
import { EditorState, convertFromRaw, convertToRaw, conver } from "draft-js";
//import draftToHtml from 'draftjs-to-html';
import { stateToHTML } from "draft-js-export-html";
import {
  initiateSocket,
  disconnectSocket,
  subscribeToChat,
  sendMessage
} from "./socketService";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Typography } from "@mui/material";

export default function MyEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const [room] = useState("Test");

  useEffect(() => {
    EditorState.moveSelectionToEnd(editorState);
  }, [editorState]);

  useEffect(() => {
    if (room) initiateSocket(room);

    subscribeToChat((err, data) => {
      console.log("=====>", data);
      if (err) return;
      if (data) {
        const item = convertFromRaw(JSON.parse(data));
        console.log(item);
        const getState = EditorState.createWithContent(item);
        setEditorState(getState); /*, ...oldChats*/
      }
    });
    return () => {
      disconnectSocket();
    };
  }, [room]);

  const changeState = (d) => {
    console.log(convertToRaw(d.getCurrentContent()));
    sendMessage(room, JSON.stringify(convertToRaw(d.getCurrentContent())));
    setEditorState(d);
  };

  function myBlockRenderer(contentBlock) {
    const type = contentBlock.getType();
    if (type === "header-one") {
      return {
        component: Typography,
        editable: false,
        props: {
          variant: "h1"
        }
      };
    }
  }

  let htmlOptions = {
    blockRenderers: {
      "header-one": (block) => {
        return <Typography variant="h1">escape(block.getText()</Typography>;
      }
    }
  };

  return (
    <>
      <div>
        <Editor
          style={{ border: "1px solid #ddd" }}
          editorState={editorState}
          onEditorStateChange={(state) => changeState(state)}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          // toolbar={toolbarOptions}
          customBlockRenderFunc={myBlockRenderer}
        />
      </div>
    </>
  );
}
