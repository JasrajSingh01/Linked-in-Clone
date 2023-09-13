import { React, forwardRef } from "react";
import "../css/post.css";
import { Avatar } from "@mui/material";
import InputOptions from "./InputOptions";
import {
  ChatOutlined,
  SendOutlined,
  ShareOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";

const Post = forwardRef(({ name, description, message, photoUrl }, ref) => {
  return (
    <div ref={ref} className="post">
      <div className="post__header">
        <Avatar src={photoUrl}>{name[0]}</Avatar>
        <div className="post__info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="post__body">
        <p>{message}</p>
      </div>

      <div className="post__buttons">
        <InputOptions Icon={ThumbUpAltOutlined} title="Like" color="grey" />
        <InputOptions Icon={ChatOutlined} title="Comment" color="grey" />
        <InputOptions Icon={ShareOutlined} title="Share" color="grey" />
        <InputOptions Icon={SendOutlined} title="Send" color="grey" />
      </div>
    </div>
  );
});

export default Post;
