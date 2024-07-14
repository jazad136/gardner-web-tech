const Spinner: React.FC = () => (
  <div className="animate-spin flex justify-center items-center after:content-[''] after:w-12 after:h-12 after:border-4 after:border-b-transparent after:border-l-transparent after:border-r-transparent after:border-t-black after:rounded-full">
    <span className="sr-only">Loading...</span>
  </div>
);

export default Spinner;
