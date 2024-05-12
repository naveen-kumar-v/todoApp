export const SkeletonLoader = () => {
  return (
    <div className="flex flex-col bg-[rgba(255,255,255,0.1)] w-full h-fit animate-pulse rounded-lg p-2 gap-2">
      <div className="flex flex-col gap-1">
        <div className="bg-neutral-400/50 w-full h-3 animate-pulse rounded-md"></div>
        {/* <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div> */}
        <div className="bg-neutral-400/50 w-2/4 h-3 animate-pulse rounded-md"></div>
        <div className="self-end bg-neutral-400/50 w-2/4 h-3 animate-pulse rounded-md"></div>
      </div>
    </div>
  );
};

export const Loader = () => {
  return (
    <div className="flex flex-row gap-2 w-full h-full justify-center items-center py-[8px]">
      <div className="w-2 h-2 rounded-full bg-green-900 animate-bounce [animation-delay:.2s]"></div>
      <div className="w-2 h-2 rounded-full bg-green-900 animate-bounce [animation-delay:.1s]"></div>
      <div className="w-2 h-2 rounded-full bg-green-900 animate-bounce [animation-delay:.2s]"></div>
    </div>
  );
};
