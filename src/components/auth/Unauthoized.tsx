import { Lock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Unauthorized() {
  const location = useLocation() as any;
  const fromPath = location?.state?.from?.pathname ?? "/";

  return (
    <main className="min-h-dvh grid place-items-center bg-gradient-to-b from-slate-50 to-white">
      <section className="w-full max-w-md mx-auto">
        <div className="rounded-2xl shadow-lg border bg-white p-8">
          <div className="mx-auto mb-6 h-14 w-14 rounded-full border grid place-items-center">
            <Lock className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 text-center">
            Access denied
          </h1>
          <p className="mt-2 text-slate-600 text-center">
            You must <span className="font-medium">log in</span> to access this
            content.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              to="/login"
              className="flex-1 inline-flex items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-slate-50 transition"
            >
              Go to Login
            </Link>
            <Link
              to={fromPath}
              className="flex-1 inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-4 py-2.5 text-sm font-medium hover:opacity-90 transition"
            >
              Back
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="underline underline-offset-4">
              Create one
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
