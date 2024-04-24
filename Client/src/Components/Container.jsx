const Container = ({ children }) => {
  return (
    <div className="bg-gray-50 py-4 pb-8 min-w-2xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
      {children}
    </div>
  );
};

export default Container;
