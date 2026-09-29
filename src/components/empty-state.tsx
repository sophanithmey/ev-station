type Props = {
  onReset: () => void;
};

const EmptyState = ({ onReset }: Props) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl mb-4">
      🔌
    </div>
    <h2 className="text-lg font-semibold text-gray-800 mb-1">No stations found</h2>
    <p className="text-sm text-gray-500 mb-6 max-w-xs">
      No charging stations match your current filters. Try adjusting your search or clearing the filters.
    </p>
    <button
      id="reset-filters-btn"
      onClick={onReset}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-colors"
    >
      Reset Filters
    </button>
  </div>
);

export default EmptyState;
