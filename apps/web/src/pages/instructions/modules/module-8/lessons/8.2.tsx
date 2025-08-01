import { MessageSquareQuote, Lightbulb } from 'lucide-react';
import InlineChat, { ChallengeChecklistItem } from '@/components/InlineChat';
import LessonTemplate from '@/components/layouts/LessonTemplate';

const Lesson8_2 = () => {
  const quizQuestions = [
    {
      questionText: 'What is the key difference between Transparency and Explainability in AI?',
      options: [
        'They are the same thing.',
        'Transparency shows WHAT the system did, while Explainability shows WHY it did it.',
        'Transparency is for users, and Explainability is for developers.',
        'Explainability shows the code, while Transparency shows the output.'
      ],
      correctAnswer: 'Transparency shows WHAT the system did, while Explainability shows WHY it did it.',
      explanation: 'Transparency is about seeing the process (e.g., which tools were called), while Explainability is about understanding the reasoning behind a decision (e.g., why a loan was denied).'
    },
    {
      questionText: 'In a RAG application that answers questions based on a set of documents, which feature best demonstrates transparency?',
      options: [
        'Making the user interface dark mode.',
        'Providing links or references to the source documents used for an answer.',
        'Answering the question very quickly.',
        'Using a very large language model.'
      ],
      correctAnswer: 'Providing links or references to the source documents used for an answer.',
      explanation: 'Citing sources is a core transparency technique. It allows users to see the evidence the AI used, verify the information, and build trust in the system.'
    },
    {
      questionText: 'When communicating a sensitive AI decision to a user, which principle is NOT considered a key part of a good explanation?',
      options: [
        'Clarity (being easy to understand)',
        'Empathy (acknowledging the user\'s feelings)',
        'Technicality (using complex jargon)',
        'Actionability (providing next steps)'
      ],
      correctAnswer: 'Technicality (using complex jargon)',
      explanation: 'Good explanations should be simple and free of jargon. The goal is to build trust and understanding, not to confuse the user with technical details.'
    },
    {
      questionText: 'What is the primary goal of XAI (Explainable AI) techniques like LIME and SHAP?',
      options: [
        'To make the model bigger.',
        'To identify which features most influenced a model\'s specific decision.',
        'To hide the model\'s decisions from the user.',
        'To speed up the model\'s response time.'
      ],
      correctAnswer: 'To identify which features most influenced a model\'s specific decision.',
      explanation: 'These techniques help us peek inside the \'black box\' to understand what parts of the input (e.g., specific words, pixels) led to the output, which is key to debugging and trusting the model.'
    },
    {
      questionText: 'Showing a user the model\'s confidence score alongside its prediction is a practical technique for...',
      options: [
        'Hiding the model\'s uncertainty.',
        'Making the output more reliable.',
        'Helping the user gauge the reliability of the output.',
        'Making the system more complex.'
      ],
      correctAnswer: 'Helping the user gauge the reliability of the output.',
      explanation: 'A confidence score gives the user important context. A prediction with 99% confidence is treated differently than one with 60% confidence, allowing the user to make a more informed judgment.'
    }
  ];

  const explainabilityExpertPrompt = `You are an AI Explainability and User Experience (UX) expert. Your task is to review a user-submitted explanation for a sensitive AI decision.

**The User's Goal:** To communicate a loan denial to a user in a way that is clear, empathetic, and actionable.

**The Core Problem:** An AI model denied a loan application based on a low credit score and a high debt-to-income ratio. The explanation must be delivered without using technical jargon.

**Your Evaluation Criteria:**
1.  **Clarity & Simplicity:** Is the explanation easy to understand for a non-technical user? Does it avoid jargon?
2.  **Empathy:** Does the tone acknowledge the user's potential disappointment or frustration?
3.  **Actionability:** Does it provide clear, concrete next steps the user can take (e.g., how to check their credit report, who to contact)?
4.  **Transparency (without oversharing):** Does it explain the *key factors* of the decision (credit score, debt) without revealing proprietary model details?

Provide constructive feedback. If the user's explanation is good, validate it and praise its strengths. If it's weak, gently guide them. For example, if it lacks empathy, ask, "This is a clear explanation. How might you adjust the tone to be more supportive of the user during this disappointing moment?"`;

  const explanationChecklist: ChallengeChecklistItem[] = [
    { id: 'clarity', text: 'Explain the decision using simple, non-technical language.', completed: false },
    { id: 'empathy', text: 'Use an empathetic and supportive tone.', completed: false },
    { id: 'actionability', text: 'Provide clear, actionable next steps for the user.', completed: false },
    { id: 'transparency', text: 'Mention the key factors (e.g., credit information) without being overly technical.', completed: false },
  ];

  return (
    <LessonTemplate
      moduleNumber={8}
      lessonNumber={2}
      title="Transparency and Explainability"
      subtitle="Building trust by showing the 'what' and the 'why'"
      quizQuestions={quizQuestions}
    >
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <MessageSquareQuote className="w-7 h-7 mr-3 text-purple-400" />
          Transparency vs. Explainability
        </h2>
        <p className="text-gray-300 mb-4">
          While often used interchangeably, these concepts are distinct but related. Think of it this way:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong>Transparency</strong> is about showing the 'what.' It's providing visibility into the system's operations. For an AI agent, this could mean logging the sequence of tools it called to arrive at an answer. You can see the process.</li>
          <li><strong>Explainability</strong> is about showing the 'why.' It's understanding the reasoning behind a specific decision. Why was a loan application denied? Why was a certain medical diagnosis suggested? It's about making the model's logic intelligible to humans.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Practical Techniques for Trust</h2>
        <p className="text-gray-300 mb-4">
          Building trust isn't magic; it's good design. Here are practical ways to make your AI systems more transparent and explainable:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong>Show Confidence Scores:</strong> Display the model's confidence in its own prediction. A user will treat a 99% confident answer very differently from a 60% confident one.</li>
          <li><strong>Cite Sources:</strong> In RAG applications, always provide links or references to the source documents used. This allows users to verify the information for themselves.</li>
          <li><strong>Visualize Decisions:</strong> For image-based models, use heatmaps to show which parts of an image were most influential in a decision.</li>
          <li><strong>Expose the Agent's 'Thoughts':</strong> For complex agents, log the step-by-step reasoning process, including which tools were considered, chosen, and what their outputs were.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Case Study: Explaining an AI's Decision
        </h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-4">
          <div>
            <h3 className="font-semibold text-white">The Scenario</h3>
            <p className="text-gray-300">An AI-powered system has just denied a loan application. The model's internal reasons are a low credit score and a high debt-to-income ratio. Your goal is to communicate this sensitive decision to the user in a way that is clear, empathetic, and actionable.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Your Task</h3>
            <p className="text-gray-300">Write a customer-facing message that explains the AI's decision. Focus on building trust by being transparent without being overly technical. Use the chat window below to submit your explanation and receive expert feedback.</p>
          </div>
          {/* InlineChat for AI explanation exercise */}
          <InlineChat 
            moduleId="module-8.2-ai-explanation"
            maxAttempts={5}
            maxFollowUps={4}
            placeholder="Write your user-facing explanation here..."
            systemPrompt={explainabilityExpertPrompt}
            initialMessages={[
              {
                role: 'assistant' as const,
                content: 'Welcome to the AI Explanation Workshop! I\'m here to help you craft a clear, empathetic explanation for a loan denial decision.\n\nIn this scenario, the AI denied the application due to a low credit score and high debt-to-income ratio. Your task is to explain this to the applicant in a way that is transparent, understandable, and constructive.\n\nConsider these questions as you write your explanation:\n1. How can you explain the decision without using technical terms?\n2. How can you show empathy for the user\'s situation?\n3. What clear next steps can you offer?\n\nI\'ll provide feedback on your explanation and suggest improvements.'
              }
            ]}
            challengeChecklist={explanationChecklist}
          />
        </div>
      </section>
    </LessonTemplate>
  );
};

export default Lesson8_2;
