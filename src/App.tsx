import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to the Platform
          </h2>
          <p className="text-gray-600">Games will appear here soon!</p>
        </div>
      </main>
    </div>
  );
}

export default App;
