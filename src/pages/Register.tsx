import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionLabel } from "../components/common/SectionLabel";
import { Reveal } from "../components/common/Reveal";
import { Button } from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";

const INPUT_CLASS =
  "w-full border-0 border-b border-brown outline-none bg-transparent py-[13px] text-[14px]";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const { showToast } = useUI();
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      register(name, email, password);
      showToast("Welcome to Iris");
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <Reveal as="section" className="px-[7vw] py-[160px] max-mobile:py-[100px]">
      <div className="max-w-[420px] mx-auto text-center">
        <SectionLabel>Join Iris</SectionLabel>

        <h1 className="mt-[20px] font-serif text-[clamp(44px,6vw,64px)] font-normal leading-[.95] -tracking-[.04em]">
          Create your <em className="italic text-rose-dark">account.</em>
        </h1>

        <form onSubmit={handleSubmit} className="mt-[50px] text-left">
          <div className="mb-[25px]">
            <label className="block text-[9px] uppercase tracking-[.18em] mb-[8px]">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className={INPUT_CLASS}
            />
          </div>

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

          <div className="mb-[25px]">
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

          <div className="mb-[10px]">
            <label className="block text-[9px] uppercase tracking-[.18em] mb-[8px]">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              minLength={6}
              className={INPUT_CLASS}
            />
          </div>

          {error && (
            <p className="mt-[15px] text-[12px] text-rose-dark leading-[1.6]">{error}</p>
          )}

          <Button type="submit" className="w-full mt-[35px]">
            Create Account
          </Button>
        </form>

        <p className="mt-[30px] text-[12px] text-brown-light">
          Already have an account?{" "}
          <Link to="/login" className="underline text-brown">
            Sign in
          </Link>
        </p>
      </div>
    </Reveal>
  );
}
