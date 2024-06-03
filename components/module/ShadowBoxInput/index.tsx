import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  name: string;
  type: React.HTMLInputTypeAttribute;
  label?: string;
  value?: string | number;
  placeholder?: string;
  min?: string | number;
  step?: string | number;
};

export default function ShadowBoxInput(props: Props) {
  return (
    <div className="w-full border-b border-black flex flex-col gap-1">
      <Label htmlFor={props.name} className="text-2xl font-normal">
        {props.label}
      </Label>
      <Input
        type={props.type}
        name={props.name}
        id={props.name}
        min={props.min}
        step={props.step} 
        autoComplete="off"
        placeholder={props.placeholder}
        className="w-full bg-transparent text-xl focus:bg-transparent border-none border-transparent focus:border-transparent
        focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0
              "
      />
    </div>
  );
}
