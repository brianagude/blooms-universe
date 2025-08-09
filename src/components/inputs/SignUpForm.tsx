"use client"
import { useState } from "react";

const INIT = "INIT";
const SUBMITTING = "SUBMITTING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";
const formStates = [INIT, SUBMITTING, ERROR, SUCCESS] as const;

const formConfig = {
  id: "cme245rje0hlm200iv2ighfiw",
  placeholderText: "What's your email?",
  buttonText: "Subscribe",
  successMessage: "Thank you! We'll be in touch soon!",
  userGroup: "Prelaunch Signups",
};

const domain = "app.loops.so";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<typeof formStates[number]>(INIT);
  const [errorMessage, setErrorMessage] = useState("");
  const [fields, setFields] = useState({});

  const resetForm = () => {
    setEmail("");
    setFormState(INIT);
    setErrorMessage("");
  };

  const hasRecentSubmission = () => {
    const timestamp = Date.now();
    const prev = localStorage.getItem("loops-form-timestamp");

    if (prev && Number(prev) + 60_000 > timestamp) {
      setFormState(ERROR);
      setErrorMessage("Too many signups, please try again in a little while");
      return true;
    }

    localStorage.setItem("loops-form-timestamp", timestamp.toString());
    return false;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState !== INIT) return;
    if (!isValidEmail(email)) {
      setFormState(ERROR);
      setErrorMessage("Please enter a valid email");
      return;
    }
    if (hasRecentSubmission()) return;

    setFormState(SUBMITTING);

    const additionalFields = Object.entries(fields)
      .filter(([_, val]) => val)
      .map(([key, val]) => `&${key}=${encodeURIComponent(val as string)}`)
      .join("");

    const formBody = `userGroup=${encodeURIComponent(
      formConfig.userGroup
    )}&email=${encodeURIComponent(email)}&mailingLists=${additionalFields}`;

    fetch(`https://${domain}/api/newsletter-form/${formConfig.id}`, {
      method: "POST",
      body: formBody,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => [res.ok, res.json(), res] as const)
      .then(([ok, dataPromise, res]) => {
        if (ok) {
          resetForm();
          setFormState(SUCCESS);
        } else {
          dataPromise.then((data) => {
            setFormState(ERROR);
            setErrorMessage(data.message || res.statusText);
            localStorage.removeItem("loops-form-timestamp");
          });
        }
      })
      .catch((err) => {
        setFormState(ERROR);
        setErrorMessage(
          err.message === "Failed to fetch"
            ? "Too many signups, please try again in a little while"
            : err.message || "Something went wrong"
        );
        localStorage.removeItem("loops-form-timestamp");
      });
  };

  if (formState === SUCCESS) {
    return (
      <div className="flex flex-col gap-2 p-2 bg-blue border border-green rounded-3xl w-full md:flex-row">
        <p className="rounded-2xl w-full font-colby text-xs leading-6 uppercase py-3 px-4 text-center focus:outline-none focus:ring focus:border-blue sm:text-sm md:text-left">{formConfig.successMessage}</p>
        <BackButton />
      </div>
    );
  }

  if (formState === ERROR) {
    return (
      <div className="flex flex-col gap-2 p-2 bg-blue border border-green rounded-3xl w-full md:flex-row">
        <SignUpFormError />
        <BackButton />
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-2 p-2 bg-yellow border border-green rounded-3xl w-full md:flex-row"
    >
      <input
        type="email"
        name="email"
        placeholder={formConfig.placeholderText}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="rounded-2xl w-full font-colby text-xs leading-6 uppercase py-3 px-4 text-center focus:outline-none focus:ring focus:border-blue sm:text-sm md:text-left"
      />
      {/* Honeypot field for bots */}
      <div aria-hidden="true" className="sr-only">
        <input type="text" tabIndex={-1} />
      </div>
      <SignUpFormButton />
    </form>
  );

  function SignUpFormError() {
    return (
        <p className="rounded-2xl w-full font-colby text-xs leading-6 uppercase py-3 px-4 text-center focus:outline-none focus:ring focus:border-blue sm:text-sm md:text-left">{errorMessage || "Oops! Something went wrong, please try again"}</p>
    );
  }

  function BackButton() {
    return (
      <button
        type="button"
        onClick={resetForm}
        className="bg-black hover:bg-green-light rounded-2xl text-white font-colby text-base leading-6 uppercase py-3 px-4 cursor-pointer focus:ring sm:px-6 transition-colors ease-in-out"
      >
        Reset&nbsp;Form
      </button>
    );
  }

  function SignUpFormButton() {
    return (
      <button
        type="submit"
        className="bg-green hover:bg-green-light rounded-2xl text-white font-colby text-base leading-6 uppercase py-3 px-4 cursor-pointer focus:ring sm:px-6 transition-colors ease-in-out"
      >
        {formState === SUBMITTING ? "Please wait..." : formConfig.buttonText}
      </button>
    );
  }
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
