import {
  ChatOutlined,
  SendOutlined,
  ShareOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Avatar } from "@mui/material";
import { React, forwardRef } from "react";
import "../css/post.css";
import InputOptions from "./InputOptions";
import { useState } from "react";

const Post = forwardRef(
  ({ id, name, description, message, photoUrl, image }, ref) => {
    const [like, setLike] = useState(false);
    const likeBtn = () => {
      setLike(!like);
    };
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
            {image && <img src={image} loading="lazy" alt="img" />}
          </div>

          <div className="post__buttons">
            {like ? (
              <InputOptions
                Icon={ThumbUpIcon}
                onClick={likeBtn}
                title="Like"
                color="#24a0ed"
              />
            ) : (
              <InputOptions
                Icon={ThumbUpAltOutlined}
                onClick={likeBtn}
                title="Like"
                color="grey"
              />
            )}
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
