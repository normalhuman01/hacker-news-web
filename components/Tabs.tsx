export type TabValues = "all" | "my-faves";
export const Tabs = ({
  activeTab,
  onChangeTab,
}: {
  activeTab: TabValues;
  onChangeTab: Function;
}) => {
  return (
    <div>
      <button
        className={`rectangle ${activeTab === "all" ? "isActive" : ""} `}
        onClick={() => onChangeTab("all")}
      >
        All
      </button>
      <button
        className={`rectangle ${activeTab === "my-faves" ? "isActive" : ""} `}
        onClick={() => onChangeTab("my-faves")}
      >
        My faves
      </button>
      <style jsx>{`
        .rectangle {
          width: 6.125rem;
          height: 1.938rem;
          border-radius: 2px;
          border: solid 1px #d6d6d6;
          color: #606060;
        }

        .isActive {
          color: var(--azure);
          border: solid 1px var(--azure);
        }
      `}</style>
    </div>
  );
};
