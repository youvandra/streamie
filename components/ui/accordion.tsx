"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, PlusIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import ShaodowBoxDiv from "../module/ShadowBoxDiv";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="">
    <ShaodowBoxDiv
      height="42px"
      backgroundColor="#C8AEFF"
      innerClassName="px-10 w-max flex flex-1 items-center justify-between py-4 font-medium transition-all "
    >
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-45",
          className
        )}
        {...props}
      >
        <p className="text-2xl font-normal">{children}</p>
        {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
        <PlusIcon className="shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </ShaodowBoxDiv>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    {/* <div className={cn("pb-4 pt-0", className)}>{children}</div> */}
    <ShaodowBoxDiv height="" widht="1000px" innerClassName="p-6 h-max">
      {children}
    </ShaodowBoxDiv>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
