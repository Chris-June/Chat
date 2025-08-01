import React from 'react';
import { Zap, Terminal, Lightbulb } from 'lucide-react';
import LivePromptGrader from '../../../components/LivePromptGrader';
import Accordion from '../../../components/Accordion';
import InlineChat from '../../../../../components/InlineChat';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import KeyTakeaways from '../../../components/KeyTakeaways';
import BestPractices from '../../../components/BestPractices';
import CheckpointQuiz from '@/pages/instructions/components/CheckpointQuiz';

const scheduleMeetingSchema = {
  name: 'schedule_meeting',
  description: 'Schedules a meeting with a specific topic and datetime.',
  parameters: {
    type: 'object',
    properties: {
      topic: {
        type: 'string',
        description: 'The subject or title of the meeting.'
      },
      datetime: {
        type: 'string',
        description: 'The date and time for the meeting, e.g., "2024-08-15T14:30:00"'
      }
    },
    required: ['topic', 'datetime']
  }
};

const stockPriceChecklist = [
  { id: '1', text: 'Analyze the provided JSON output', completed: false },
  { id: '2', text: 'Identify the function name: `get_stock_price`', completed: false },
  { id: '3', text: 'Identify the argument: `ticker` with value "AAPL"', completed: false },
  { id: '4', text: 'Formulate a natural language prompt that asks for the stock price of Apple', completed: false },
];

const Lesson4_1: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What does it mean when an AI performs \'function calling\'?',
      options: [
        'The AI executes external code directly on its own servers.',
        'The AI generates a JSON object telling your application which function to run and with what arguments.',
        'The AI is calling you on the telephone.',
        'The AI is rewriting its own source code.'
      ],
      correctAnswer: 'The AI generates a JSON object telling your application which function to run and with what arguments.',
      explanation: 'The key concept is that the AI does not execute the function. It only provides the structured data your application needs to execute it on your behalf.'
    },
    {
      questionText: 'What is the purpose of providing a function schema to the model?',
      options: [
        'To confuse the AI.',
        'To describe the function\'s name, purpose, and parameters, so the AI knows when and how to use it.',
        'To provide the actual code for the function.',
        'To set a password for the function.'
      ],
      correctAnswer: 'To describe the function\'s name, purpose, and parameters, so the AI knows when and how to use it.',
      explanation: 'The schema is like a user manual for the function. It gives the AI the metadata it needs to understand what the function does and what inputs it requires.'
    },
    {
      questionText: 'If you give the AI a function to get the weather, and you ask, \'What\'s the weather like in Paris?\', what would you expect the AI to output?',
      options: [
        'A weather forecast for London.',
        'A JSON object like `{"name": "get_weather", "arguments": {"location": "Paris"}}`',
        'A long essay about the history of Paris.',
        'The actual code for the `get_weather` function.'
      ],
      correctAnswer: 'A JSON object like `{"name": "get_weather", "arguments": {"location": "Paris"}}`',
      explanation: 'The AI identifies the correct function (`get_weather`) and extracts the necessary argument (`location: \'Paris\'`) from your prompt, returning it in a structured JSON format.'
    },
    {
      questionText: 'What is a critical security best practice when implementing function calling?',
      options: [
        'Trust all inputs from the model completely.',
        'Only use functions that have very short names.',
        'Always validate and sanitize the arguments provided by the model before executing any function.',
        'Run the function calls on a public, unsecured server.'
      ],
      correctAnswer: 'Always validate and sanitize the arguments provided by the model before executing any function.',
      explanation: 'Never trust the model\'s output implicitly. Treat its function arguments as user input that must be validated to prevent security vulnerabilities like injection attacks.'
    },
    {
      questionText: 'Why is it a good practice to keep functions \'atomic\' (having a single, well-defined purpose)?',
      options: [
        'It makes the AI\'s JSON output much larger.',
        'It makes the functions harder for the AI to understand.',
        'It makes your code more flexible, easier to debug, and gives the AI clearer, more reliable tools to choose from.',
        'It is not a good practice; functions should do as many things as possible.'
      ],
      correctAnswer: 'It makes your code more flexible, easier to debug, and gives the AI clearer, more reliable tools to choose from.',
      explanation: 'Single-purpose functions are like sharp, specialized tools. They are less ambiguous for the AI and make your overall system more robust and maintainable.'
    }
  ];

  return (
    <LessonTemplate
      moduleNumber={4}
      lessonNumber={1}
      title="Advanced API Integration"
      subtitle="Connecting AI to external tools and APIs to perform real-world actions."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8 p-4 md:p-6">
        <p className="text-lg text-gray-300">
          Imagine AI as a highly intelligent assistant who can't physically do things themselves, but can perfectly tell you exactly what to do. Function calling is like giving your AI assistant a set of specialized tools - a calculator, a calendar, a weather app - and teaching them to say: "To get the current temperature, use the weather tool with location 'New York'." They don't actually check the weather, but they give you the precise instructions to do it yourself.
        </p>

        <Accordion title="What is Function Calling?" icon={<Zap />} isInitiallyOpen>
          <p className="text-gray-300 mb-4">
            Function calling is a mechanism that allows a large language model (LLM) to request the execution of a specific function you've defined in your code. The AI doesn't run the function itself; instead, it generates a structured JSON object telling your application which function to run and with what arguments.
          </p>
          
          <div className="my-4">
            {/* Placeholder for a visual diagram */}
            <div className="bg-gray-900 p-4 rounded-lg border-2 border-dashed border-gray-600 text-center">
              <p className="text-gray-400">[Visual Diagram: Prompt → Function Call JSON → Server Call → Response → Final Message]</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white mt-6 mb-4">Defining a Function Schema</h3>
          <p className="text-gray-300 mb-4">To use function calling, you must first describe your functions to the model. This is done by providing a JSON schema that details the function's name, description, and parameters.</p>
          
          <h4 className="font-semibold text-white mb-2">TypeScript Interface</h4>
          <p className="text-gray-300 mb-2">First, you might define the data structure in your application code:</p>
          <div className="bg-gray-900 p-3 rounded-md">
            <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">{`interface CreateReminder {
  task: string;
  due_date: string;
}`}</code>
          </div>

          <h4 className="font-semibold text-white mt-4 mb-2">OpenAI-style Function Schema</h4>
          <p className="text-gray-300 mb-2">Then, you describe it to the model using a specific JSON format:</p>
          
          <CheckpointQuiz
            question={quizQuestions[0].questionText}
            options={quizQuestions[0].options}
            correctAnswerIndex={quizQuestions[0].options.indexOf(quizQuestions[0].correctAnswer)}
            explanation={quizQuestions[0].explanation}
          />

          <div className="bg-gray-900 p-3 rounded-md">
            <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">{`{
  "name": "create_reminder",
  "description": "Creates a reminder for a task with a due date",
  "parameters": {
    "type": "object",
    "properties": {
      "task": { "type": "string" },
      "due_date": { "type": "string" }
    },
    "required": ["task", "due_date"]
  }
}`}</code>
          </div>
        </Accordion>

        <Accordion title="Why Use Function Calling?" icon={<Lightbulb />}>
          <div className="space-y-4 text-gray-300">
            <p><strong>Think of it like a restaurant kitchen:</strong> The AI is the head chef who can't physically cook, but can perfectly coordinate the kitchen. Function calling gives them specific tools - the oven, the mixer, the thermometer - and they tell each tool exactly what to do.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Real-time data:</strong> Like having a live news feed instead of yesterday's newspaper</li>
              <li><strong>Actions:</strong> Instead of just talking about booking flights, actually booking them</li>
              <li><strong>Accuracy:</strong> Getting exact stock prices instead of "around $150"</li>
              <li><strong>Integration:</strong> Connecting your AI chef to your actual kitchen appliances</li>
            </ul>
          </div>
        </Accordion>

        <Accordion title="How it Works" icon={<Terminal />}>
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Why is it a Game-Changer?</h2>
          
          <h3 className="text-xl font-semibold text-white mt-6 mb-4">Real-World Examples by Industry</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>🏥 Healthcare:</strong> Look up prescriptions, schedule follow-up appointments.</li>
            <li><strong>🛠️ Field Service:</strong> Fetch service history for a device, update a job's status.</li>
            <li><strong>📊 Finance:</strong> Pull real-time portfolio performance, trigger trade alerts.</li>
            <li><strong>🧠 Education:</strong> Generate lesson summaries, schedule study reminders for students.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mt-6 mb-4">Security Considerations</h3>
          <p className="text-gray-300 mb-2">Never blindly execute functions based on model output. Always:</p>
          <ul className="list-disc pl-5 space-y-2 text-red-400">
            <li><strong>Validate Arguments:</strong> Ensure the arguments provided by the model are of the correct type and within expected ranges.</li>
            <li><strong>Confirm Actions:</strong> For sensitive operations (e.g., sending an email, deleting data), ask the user for confirmation before executing the function.</li>
          </ul>
        </Accordion>

        <Accordion title="Real-World Applications">
            <div className="space-y-3 text-gray-300">
              <p><strong>Weather Bot:</strong> "Get me the weather in Tokyo" → AI calls weather API with location Tokyo</p>
              <p><strong>Stock Tracker:</strong> "What's Apple stock at?" → AI calls finance API with ticker AAPL</p>
              <p><strong>Calendar Assistant:</strong> "Schedule lunch with Sarah next Tuesday" → AI calls calendar API with details</p>
              <p><strong>Travel Planner:</strong> "Find flights to London next month" → AI calls travel API with search criteria</p>
            </div>
            <CheckpointQuiz
              question={quizQuestions[2].questionText}
              options={quizQuestions[2].options}
              correctAnswerIndex={quizQuestions[2].options.indexOf(quizQuestions[2].correctAnswer)}
              explanation={quizQuestions[2].explanation}
            />
        </Accordion>

        <Accordion title="Implementation Patterns">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Implementation Patterns</h2>
          <h3 className="text-xl font-semibold text-white mb-2">Function Router Pattern</h3>
          <p className="text-gray-300 mb-4">To handle multiple functions, create a dispatcher that maps the function name from the model to your actual backend logic.</p>
          <div className="bg-gray-900 p-3 rounded-md">
            <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">{`// Your app's function registry
const availableFunctions = {
  create_reminder: createReminder, // your actual function
  get_weather: getWeather,       // your actual function
};

const functionName = modelResponse.function_call.name;
const functionToCall = availableFunctions[functionName];

if (functionToCall) {
  const functionArgs = JSON.parse(modelResponse.function_call.arguments);
  const functionResult = await functionToCall(functionArgs);
  // ... send result back to model
}`}</code>
          </div>

          <h3 className="text-xl font-semibold text-white mt-6 mb-4">Best Practices</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Always Validate Input:</strong> Sanitize and validate all arguments from the model before execution.</li>
            <li><strong>Keep Functions Atomic:</strong> Each function should have a single, well-defined purpose.</li>
            <li>Use Semantic Naming: Use short, descriptive names for functions and arguments to help the model understand their purpose.</li>
          </ul>
          <CheckpointQuiz
            question={quizQuestions[3].questionText}
            options={quizQuestions[3].options}
            correctAnswerIndex={quizQuestions[3].options.indexOf(quizQuestions[3].correctAnswer)}
            explanation={quizQuestions[3].explanation}
          />
        </Accordion>

        <div className="bg-blue-900/20 text-center p-6 rounded-lg shadow-lg border border-blue-700">
            <p className="text-2xl font-bold text-blue-300 italic">“Function calling is where AI stops being a librarian and becomes a project manager - directing real tools to get real work done.”</p>
        </div>

        <Accordion title="Conceptual Exercise: Guess the Call" icon={<Lightbulb />}>
          
          <div className="mb-6">
            <h3 className="font-semibold text-white mb-2">Tool Coordination Challenge</h3>
            <p className="text-gray-300 mb-4">
              Imagine you're the AI chef coordinating a kitchen. You have a "schedule_meeting" tool. Write a prompt that tells this tool exactly what meeting to schedule. Think like giving precise instructions to a sous chef!
            </p>
            <LivePromptGrader 
              functionSchema={scheduleMeetingSchema}
              initialPrompt="Schedule a team check-in for next Monday at 10am"
            />
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">Reverse Detective Challenge</h3>
            <p className="text-gray-300 mb-4">Here's a completed order ticket from our AI chef to the stock price tool. What customer order (prompt) would have produced this exact ticket? Try asking the AI in the chat window!</p>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-4">
              <div className="bg-gray-700 p-3 rounded-md">
                <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">{`{
  "name": "get_stock_price",
  "arguments": { "ticker": "AAPL" }
}`}</code>
              </div>
            </div>
            {/* InlineChat for reverse engineering function calls with a focus on stock price queries */}
            <InlineChat 
              moduleId="module-4.1-stock-price"
              placeholder='What prompt makes the AI call the get_stock_price function for Apple?'
              systemPrompt="You are a helpful assistant that helps users understand how to properly structure prompts to trigger specific function calls. When the user provides a prompt, analyze whether it would correctly trigger the 'get_stock_price' function with the appropriate ticker symbol. Provide guidance on how to improve the prompt if needed."
              initialMessages={[
                {
                  role: 'assistant',
                  content: 'I can help you craft a prompt that will trigger the get_stock_price function. Try asking me something like: "What is the current stock price of Apple?" or "Can you get me the latest AAPL stock price?"'
                }
              ]}
              simulatedResponse={`{\n  "name": "get_stock_price",\n  "arguments": { "ticker": "AAPL" }\n}`}
              challengeChecklist={stockPriceChecklist}
              maxAttempts={3}
              maxFollowUps={2}
            />
          </div>
        </Accordion>

        <KeyTakeaways
          points={[
            'Function calling allows LLMs to connect to external tools and APIs, enabling real-world actions.',
            'A function schema (name, description, parameters) is required to describe the tool to the AI.',
            'The AI does not execute code; it generates a JSON object telling your application which function to run.',
            'Security is critical: Always validate arguments from the model before executing any function.',
          ]}
        />

        <BestPractices
          dos={[
            'Keep functions atomic, with a single, well-defined purpose.',
            'Use clear, descriptive names for functions and arguments.',
            'Validate and sanitize all arguments from the model before execution.',
            'Implement user confirmation steps for sensitive or irreversible actions.',
          ]}
          donts={[
            'Never trust model output implicitly; treat it as untrusted user input.',
            'Avoid creating overly complex functions that perform multiple, unrelated tasks.',
            'Do not pass sensitive data like API keys in the function schema.',
            'Don\'t let the model execute functions that could have harmful side effects without safeguards.',
          ]}
        />

      </div>
    </LessonTemplate>
  );
};

export default Lesson4_1;
