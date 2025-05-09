"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream.mjs";
import { toast } from "sonner";

const UserInput = () => {
  const [selectedTone, setSelectedTone] = useState("better");
  const [inputValue, setInputValue] = useState("");
  const [generatedsentence, setGeneratedsentence] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const Generate = async (inputValue: string, selectedTone: string) => {
    setIsLoading(true);
    setGeneratedsentence("");
    const response = await fetch("/api/together", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputValue,
        selectedTone,
      }),
    });

    if (!response.ok) throw new Error("Failed to generate text");

    const runner = ChatCompletionStream.fromReadableStream(response.body!);
    runner.on("content", (delta) =>
      setGeneratedsentence((prev) => prev + delta)
    );
    setIsLoading(false);
  };

  const answers = generatedsentence ? generatedsentence.split(" / ") : [];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard");
  };

  return (
    <div className="flex flex-col gap-1 w-3xl text-sm sm:text-base">
      <div className="flex flex-col gap-1 w-full">
        <Input
          type="text"
          placeholder="Enter your sentence"
          value={inputValue}
          required
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-white text-sm sm:text-base"
        />
        <section className="text-sm sm:text-base">

        <Select onValueChange={setSelectedTone}>
          <SelectTrigger className="w-full bg-white ">
            <SelectValue placeholder="Select a Tone" />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              <SelectLabel>Tone</SelectLabel>
              <SelectItem value="better">better</SelectItem>
              <SelectItem value="funny">funny</SelectItem>
              <SelectItem value="formal">formal</SelectItem>
              <SelectItem value="informal">informal</SelectItem>
            </SelectContent>
          </SelectGroup>
        </Select>
        </section>

        <Button onClick={() => Generate(inputValue, selectedTone)} className="cursor-pointer">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      <div>
        {generatedsentence && (
          <p className="text-left text-md font-medium p-3">
            Here is your generated sentences
          </p>
        )}
        {answers.map((answer, index) => {
          return (
            <div
              key={index}
              className="p-5 outline rounded-md my-2 text-center duration-300 cursor-pointer bg-white font-medium"
              onClick={(e) =>
                copyToClipboard((e.target as HTMLElement).textContent!)
              }
            >
              <p>{answer}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default UserInput;
