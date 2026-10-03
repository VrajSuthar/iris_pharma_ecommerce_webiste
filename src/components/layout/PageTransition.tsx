import { useEffect, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";

export function PageTransition() {
  const location = useLocation();
  const outlet = useOutlet();

  const [displayedOutlet, setDisplayedOutlet] = useState(outlet);
  const [displayedKey, setDisplayedKey] = useState(location.key);
  const [stage, setStage] = useState<"in" | "out">("in");

  useEffect(() => {
    if (location.key !== displayedKey) {
      setStage("out");
    }
  }, [location.key, displayedKey]);

  function handleAnimationEnd() {
    if (stage !== "out") return;
    window.scrollTo(0, 0);
    setDisplayedOutlet(outlet);
    setDisplayedKey(location.key);
    setStage("in");
  }

  return (
    <div
      key={displayedKey}
      className={stage === "out" ? "page-transition-out" : "page-transition-in"}
      onAnimationEnd={handleAnimationEnd}
    >
      {displayedOutlet}
    </div>
  );
}
