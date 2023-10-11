import { Skeleton } from "@mui/material";
import React from "react";

function PostSkeleton({ posts, id }) {
  return Array(posts)
    .fill(0)
    .map((_, i) => (
      <>
        <div className="post" id={id}>
          <div className="post__header">
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
            <div className="post__info">
              <Skeleton
                variant="text"
                animation="wave"
                width={100}
                sx={{ fontSize: "1rem" }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width={80}
                sx={{ fontSize: "1rem" }}
              />
            </div>
          </div>

          <div className="post__body">
            <Skeleton
              variant="text"
              animation="wave"
              width="auto"
              sx={{ fontSize: "1rem" }}
            />
          </div>
          <div className="img__skeleton">
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100%"
              height={300}
            />
          </div>

          <div className="post__buttons">
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100%"
              height={44}
            />
          </div>
        </div>
      </>
    ));
}

export default PostSkeleton;
