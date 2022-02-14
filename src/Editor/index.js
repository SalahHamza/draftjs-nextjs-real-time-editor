import React, { useState, useEffect } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
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
    if (room) initiateSocket(room);
    subscribeToChat((err, data) => {
      if (err) return;
      if (data) {
        console.log("=====");
        console.log(data);
        const item = convertFromRaw(JSON.parse(data));
        const getState = EditorState.createWithContent(item);
        setEditorState(getState); /*, ...oldChats*/
      }
    });
    return () => {
      disconnectSocket();
    };
  }, [room]);

  const changeState = (d) => {
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

  return (
    <>
      <div>
        <Editor
          style={{ border: "1px solid #ddd" }}
          editorState={editorState}
          onEditorStateChange={(state) => changeState(state)}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          customBlockRenderFunc={myBlockRenderer}
        />
      </div>
    </>
  );
}
