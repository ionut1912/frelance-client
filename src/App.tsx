import "./index.css"; // Tailwind import lives here

export default function App() {
  return (
    <main className="grid min-h-screen place-items-center bg-gray-50 p-6 dark:bg-gray-900">
      <section className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Tailwind × React 19 × TS
        </h1>
      </section>
    </main>
  );
}
