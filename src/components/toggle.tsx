import React from "react";

interface ToggleSwitchProps {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  label?: string;
}

const ToggleSwitchComponent = ({
  enabled,
  setEnabled,
  label = "Auto roll",
}: ToggleSwitchProps) => {
  return (
    <div className="flex flex-col items-start gap-3">
      <label className="text-white font-medium text-sm">{label}</label>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold-primary focus:ring-offset-2 ${
          enabled ? "bg-accent-blue" : "bg-dark-secondary"
        }`}
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        type="button"
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ${
            enabled ? "translate-x-6" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitchComponent;
