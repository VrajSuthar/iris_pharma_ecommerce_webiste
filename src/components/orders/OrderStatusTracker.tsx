import type { Order } from "../../types";
import { getOrderSteps } from "../../utils/orderStatus";

export function OrderStatusTracker({ order }: { order: Order }) {
  const steps = getOrderSteps(order);

  return (
    <>
      <div className="hidden mobile:flex">
        {steps.map((step, index) => (
          <div key={step.status} className="flex-1 flex items-start">
            <div className="flex flex-col items-center w-full">
              <div
                className={`w-[30px] h-[30px] shrink-0 rounded-full flex items-center justify-center text-[12px] border transition-colors duration-300 ${
                  step.done
                    ? "bg-brown border-brown text-white"
                    : "bg-transparent border-border text-brown-light"
                } ${step.active ? "ring-4 ring-rose/30" : ""}`}
              >
                {step.done && !step.active ? "✓" : index + 1}
              </div>

              <span
                className={`mt-[10px] text-[10px] uppercase tracking-[.1em] text-center ${
                  step.done ? "text-brown" : "text-brown-light"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-px mt-[15px] ${step.done ? "bg-brown" : "bg-border"}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex mobile:hidden flex-col gap-[20px]">
        {steps.map((step, index) => (
          <div key={step.status} className="flex items-center gap-[15px]">
            <div
              className={`w-[30px] h-[30px] shrink-0 rounded-full flex items-center justify-center text-[12px] border ${
                step.done
                  ? "bg-brown border-brown text-white"
                  : "bg-transparent border-border text-brown-light"
              } ${step.active ? "ring-4 ring-rose/30" : ""}`}
            >
              {step.done && !step.active ? "✓" : index + 1}
            </div>
            <span
              className={`text-[11px] uppercase tracking-[.1em] ${
                step.done ? "text-brown" : "text-brown-light"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
