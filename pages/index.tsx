import dynamic from "next/dynamic";

const NextPageHacker = dynamic(
  () => import("../components/Home").then((mod) => mod.Home),
  {
    ssr: false,
  }
);
export default NextPageHacker;
