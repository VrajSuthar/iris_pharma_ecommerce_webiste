import { useUI } from "../../context/UIContext";

export function Toast() {
  const { toast } = useUI();

  return (
    <div
      className={`fixed bottom-[25px] left-1/2 -translate-x-1/2 bg-brown text-white px-[25px] py-[15px] text-[10px] tracking-[.1em] z-[20000] transition-transform duration-[400ms] ${
        toast.visible ? "translate-y-0" : "translate-y-[120px]"
      }`}
    >
      {toast.message}
    </div>
  );
}
