import {
  ChatOutlined,
  SendOutlined,
  ShareOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { React, forwardRef } from "react";
import "../css/post.css";
import InputOptions from "./InputOptions";

const Post = forwardRef(
  ({ id, name, description, message, photoUrl, image }, ref) => {
    return (
      <>
        <div ref={ref} key={id} className="post">
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
          <div className="post__img">
            {image && <img src={image} alt="img" />}
          </div>

          <div className="post__buttons">
            <InputOptions Icon={ThumbUpAltOutlined} title="Like" color="grey" />
            <InputOptions Icon={ChatOutlined} title="Comment" color="grey" />
            <InputOptions Icon={ShareOutlined} title="Share" color="grey" />
            <InputOptions Icon={SendOutlined} title="Send" color="grey" />
          </div>
        </div>
      </>
    );
  }
);

export default Post;
