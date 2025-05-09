import Together from "together-ai";
const together = new Together({apiKey: process.env.TOGETHER_API_KEY});

if (!process.env.TOGETHER_API_KEY) throw new Error("missing API key");
export async function POST(Req: Request) {
  const { inputValue, selectedTone } = await Req.json();
  const runner = together.chat.completions.stream({
    model: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
    messages: [
      {
        role: "user",
        content: `rewrite this sentence 3 times in a ${selectedTone} tone and avoid explaining and only the sentences and seperate them by / ${inputValue}`,
      },
    ],
  });
  return new Response(runner.toReadableStream());
}

export const runtime = "edge";
