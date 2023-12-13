import { Card, Post } from "@/components/Card";
import { Select } from "@/components/Select";
import { TabValues, Tabs } from "@/components/Tabs";
import { Header } from "@/components/Header";
import Head from "next/head";
import { useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import useSWRInfinite from "swr/infinite";
import { useDebouncedCallback } from "use-debounce";
import { useLocalStorage } from "usehooks-ts";

type Page = {
  hits: Post[];
  page: number;
  nbPages: number;
};

function hasRequiredProperties(x: Post): boolean {
  return [x.author, x.created_at, x.story_title, x.story_url].every((x) =>
    Boolean(x)
  );
}

const fetcher = (url: string) => fetch(url).then<Page>((res) => res.json());

export const Home = () => {
  const [activeTab, setActiveTab] = useLocalStorage<TabValues>(
    "activeTab",
    "all"
  );
  const [favoritePosts, setFavoritePosts] = useLocalStorage<Post[]>(
    "favoritePosts",
    []
  );

  const [query, setQuery] = useState("");

  const { data, size, setSize, isLoading, error } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData?.page == pageIndex) return null;
      return activeTab === "all"
        ? `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${pageIndex}`
        : null;
    },
    fetcher,
    {
      revalidateFirstPage: false,
    }
  );
  const postPages =
    activeTab === "all" ? data : [{ hits: favoritePosts, page: 0, nbPages: 1 }];

  const toggleFavorite = (post: Post, isFavorite: boolean) => {
    if (isFavorite) {
      setFavoritePosts((prev) =>
        prev.filter((x) => x.objectID !== post.objectID)
      );
    } else {
      setFavoritePosts((prev) => [...prev, post]);
    }
  };

  const loadMore = useDebouncedCallback(() => setSize(size + 1), 500);

  const hasNextPage = true;
  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, #ececec -32%, #fff 124%)",
        height: "100vh",
      }}
    >
      <Head>
        <title>Hacker news</title>
      </Head>
      <Header />
      <div className="py-16 flex justify-center">
        <Tabs activeTab={activeTab} onChangeTab={setActiveTab} />
      </div>
      <div className="container mx-auto lg:px-20 px-3">
        {activeTab === "all" && (
          <div className="pb-4">
            <Select
              placeholder="Select your news"
              value={query}
              onSelect={setQuery}
            />
          </div>
        )}
        <div className="posts py-4">
          {postPages?.map(
            (posts) =>
              posts &&
              posts.hits
                .filter(hasRequiredProperties)
                .map((post) => (
                  <Card
                    key={post.objectID}
                    post={post}
                    isFavorite={favoritePosts
                      .map((x) => x.objectID)
                      .includes(post.objectID)}
                    toggleFavorite={toggleFavorite}
                  />
                ))
          )}
        </div>
        {activeTab === "all" && (isLoading || hasNextPage) && (
          <div ref={sentryRef} className="py-2">
            Loading..
          </div>
        )}
      </div>
      <style jsx>{`
        .posts {
          display: grid;
          grid-gap: 2rem;
          grid-template-columns: repeat(2, 1fr);

          @media (max-width: 425px) {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </div>
  );
};
