type PageIndicatorProps = {
  currentPage: number;
  totalPages: number;
};

export const PageIndicator = ({
  currentPage,
  totalPages,
}: PageIndicatorProps) => {
  return (
    <div className="fixed bottom-8 left-8 z-50 pointer-events-none mix-blend-exclusion">
      <div className="flex flex-col items-center gap-1 text-white">
        <div className="text-lg leading-none">
          {String(currentPage).padStart(2, '0')}
        </div>
        <div className="text-sm opacity-60 leading-none">──</div>
        <div className="text-lg opacity-80 leading-none">
          {String(totalPages).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};
