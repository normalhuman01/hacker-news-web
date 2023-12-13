import Image from "next/image";
import favorite from "../public/images/favorite.svg";
import favoriteOutline from "../public/images/favorite-outline.svg";
import time from "../public/images/time.svg";
import TimeAgo from "react-timeago";

export type Post = {
  objectID: string;
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
};

export const Card = ({
  post,
  isFavorite,
  toggleFavorite,
}: {
  post: Post;
  isFavorite: boolean;
  toggleFavorite: Function;
}) => {
  return (
    <div className="card hover:opacity-40 cursor-pointer">
      <a href={post.story_url} target="_blank" className="link">
        <div className="flex align-items title">
          <Image src={time} alt="favorite" />
          <div className="pl-2">
            <TimeAgo date={post.created_at} /> by {post.author}
          </div>
        </div>
        <p>{post.story_title}</p>
      </a>
      <div className="favorite-container">
        <Image
          src={isFavorite ? favorite : favoriteOutline}
          alt="favorite"
          width={24}
          height={24}
          onClick={() => toggleFavorite(post, isFavorite)}
        />
      </div>

      <style jsx>{`
        .favorite-container {
          // width: 15%;
          padding: 2.188rem 1.375rem 2.063rem;
          border-radius: 6px;
          border: solid 1px #f5f5f5;
          background-color: #f5f5f5;
        }

        .link {
          width: 85%;
        }

        .card {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding-left: 1.625rem;
          border-radius: 6px;
          border: solid 1px #979797;
          background-color: #fff;
        }

        p {
          padding-right: 2rem;
          // height: 2.5rem;
          margin: 0.375rem 1rem 0.875rem 0;
          font-size: 0.875rem;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.43;
          letter-spacing: 0.25px;
          color: var(--brownish-grey);
        }

        .title {
          padding-top: 1rem;
          font-size: 0.7rem;
          color: #767676;
        }
      `}</style>
    </div>
  );
};
