"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateFormSchema } from "@/schemas/update-form-schema";
import { UpdateEvent } from "@/types/history-item";

export type UpdateFormProps = {
  onSubmit: (values: UpdateEvent) => void;
};

export default function UpdateForm({ onSubmit }: UpdateFormProps) {
  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      id: "",
      currentFloor: "",
      targetFloor: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof updateFormSchema>) => {
    form.reset();
    onSubmit({
      type: "update",
      id: Number(values.id),
      currentFloor: Number(values.currentFloor),
      targetFloor: Number(values.targetFloor),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 border p-2 rounded-md"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="ID of the elevator"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentFloor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Current floor</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Current floor of the elevator"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetFloor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Target floor</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Target floor of the elevator"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
