import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SectionLabel } from "../components/common/SectionLabel";
import { Reveal } from "../components/common/Reveal";
import { Button } from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";

const INPUT_CLASS =
  "w-full border-0 border-b border-brown outline-none bg-transparent py-[13px] text-[14px]";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { showToast } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      login(email, password);
      showToast("Welcome back");
      const redirectTo = (location.state as { from?: string } | null)?.from ?? "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <Reveal as="section" className="px-[7vw] py-[160px] max-mobile:py-[100px]">
      <div className="max-w-[420px] mx-auto text-center">
        <SectionLabel>Welcome Back</SectionLabel>

        <h1 className="mt-[20px] font-serif text-[clamp(44px,6vw,64px)] font-normal leading-[.95] -tracking-[.04em]">
          Sign in to <em className="italic text-rose-dark">Iris.</em>
        </h1>

        <form onSubmit={handleSubmit} className="mt-[50px] text-left">
          <div className="mb-[25px]">
            <label className="block text-[9px] uppercase tracking-[.18em] mb-[8px]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className={INPUT_CLASS}
            />
          </div>

          <div className="mb-[10px]">
            <label className="block text-[9px] uppercase tracking-[.18em] mb-[8px]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              className={INPUT_CLASS}
            />
          </div>

          {error && (
            <p className="mt-[15px] text-[12px] text-rose-dark leading-[1.6]">{error}</p>
          )}

          <Button type="submit" className="w-full mt-[35px]">
            Sign In
          </Button>
        </form>

        <p className="mt-[30px] text-[12px] text-brown-light">
          New to Iris?{" "}
          <Link to="/register" className="underline text-brown">
            Create an account
          </Link>
        </p>
      </div>
    </Reveal>
  );
}
