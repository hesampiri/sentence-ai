import UserInput from "./components/userInput";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center h-screen text-center mx-5 ">
      <div className="flex flex-col items-center justify-center font-medium text-center my-5 gap-y-4">
      <h1 className="sm:text-5xl text-2xl font-bold capitalize">
        Generated your sentence with sentenceAI
      </h1>
      <p className="text-xs sm:text-base sm:w-3/4 w-full text-gray-700">
        SentenceAI is an AI-powered tool that transforms simple prompts into
        well-crafted, expressive sentences—perfect for writing, communication,
        or content enhancement.
      </p>
      </div>
      <div className="w-full flex gap-y-1 justify-center">
        <UserInput />
      </div>
    </section>
  );
}
