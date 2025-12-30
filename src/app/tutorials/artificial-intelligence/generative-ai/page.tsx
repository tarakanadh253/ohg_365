'use client';

import TechLayout from '@/components/tech-layout';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

const ImageGallery = ({ images }: { images: GalleryImage[] }) => {
  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-8 mt-8">
      {images.map((image, index) => (
        <figure
          key={`${image.src}-${index}`}
          className="overflow-hidden rounded-2xl border border-gray-600 bg-[var(--bg-secondary)] shadow-lg shadow-purple-500/10 transition hover:shadow-purple-500/25"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            sizes="(min-width: 1280px) 100vw, (min-width: 768px) 100vw, 100vw"
            className="h-auto w-full object-contain bg-[var(--bg-secondary)]"
          />
          {image.caption && (
            <figcaption className="border-t border-gray-300 px-4 py-3 text-sm text-gray-700">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
};

// Generative AI images - will be populated with all 21 images
const genAiImages: Record<string, GalleryImage> = {
  // Images will be added here
};

const getImages = (...keys: (keyof typeof genAiImages)[]): GalleryImage[] =>
  keys.map(key => genAiImages[key]).filter(Boolean);

const PAGE_HEADINGS = [
  // Fundamentals Group
  { id: 'introduction-to-generative-ai', title: 'Introduction to Generative AI' },
  { id: 'foundations-of-generative-models', title: 'Foundations of Generative Models' },
  { id: 'core-mathematics-and-concepts', title: 'Core Mathematics and Concepts' },
  // Model Architectures Group
  { id: 'variational-autoencoders-vaes', title: 'Variational Autoencoders (VAEs)' },
  { id: 'generative-adversarial-networks-gans', title: 'Generative Adversarial Networks (GANs)' },
  { id: 'diffusion-models', title: 'Diffusion Models' },
  { id: 'transformer-models-and-large-language-models-llms', title: 'Transformer Models and Large Language Models (LLMs)' },
  { id: 'multimodal-generative-ai', title: 'Multimodal Generative AI' },
  // Practical Techniques Group
  { id: 'prompt-engineering-and-context-management', title: 'Prompt Engineering and Context Management' },
  { id: 'fine-tuning-and-adaptation', title: 'Fine-Tuning and Adaptation' },
  { id: 'retrieval-augmented-generation-rag', title: 'Retrieval-Augmented Generation (RAG)' },
  { id: 'generative-ai-for-code', title: 'Generative AI for Code' },
  // Tools and Evaluation Group
  { id: 'generative-ai-frameworks-and-tools', title: 'Generative AI Frameworks and Tools' },
  { id: 'evaluation-and-metrics-in-generative-ai', title: 'Evaluation and Metrics in Generative AI' },
  // Ethics and Advanced Group
  { id: 'ethics-safety-and-responsible-genai', title: 'Ethics, Safety, and Responsible GenAI' },
  { id: 'advanced-topics-in-generative-ai', title: 'Advanced Topics in Generative AI' },
  // Deployment and Applications Group
  { id: 'mlops-and-deployment-for-genai', title: 'MLOps and Deployment for GenAI' },
  { id: 'real-world-generative-ai-applications', title: 'Real-World Generative AI Applications' },
  { id: 'capstone-projects-and-assessments', title: 'Capstone Projects and Assessments' }
];

const SUBSECTION_PARENT: Record<string, string> = {
  // Fundamentals
  'introduction-to-generative-ai': 'fundamentals',
  'foundations-of-generative-models': 'fundamentals',
  'core-mathematics-and-concepts': 'fundamentals',
  // Model Architectures
  'variational-autoencoders-vaes': 'model-architectures',
  'generative-adversarial-networks-gans': 'model-architectures',
  'diffusion-models': 'model-architectures',
  'transformer-models-and-large-language-models-llms': 'model-architectures',
  'multimodal-generative-ai': 'model-architectures',
  // Practical Techniques
  'prompt-engineering-and-context-management': 'practical-techniques',
  'fine-tuning-and-adaptation': 'practical-techniques',
  'retrieval-augmented-generation-rag': 'practical-techniques',
  'generative-ai-for-code': 'practical-techniques',
  // Tools and Evaluation
  'generative-ai-frameworks-and-tools': 'tools-and-evaluation',
  'evaluation-and-metrics-in-generative-ai': 'tools-and-evaluation',
  // Ethics and Advanced
  'ethics-safety-and-responsible-genai': 'ethics-and-advanced',
  'advanced-topics-in-generative-ai': 'ethics-and-advanced',
  // Deployment and Applications
  'mlops-and-deployment-for-genai': 'deployment-and-applications',
  'real-world-generative-ai-applications': 'deployment-and-applications',
  'capstone-projects-and-assessments': 'deployment-and-applications'
};

const createModuleNavigationItems = (): Array<{ id: string; title: string; href: string; icon?: string; children?: Array<{ id: string; title: string; href: string }> }> => {
  const basePath = '/tutorials/artificial-intelligence/generative-ai';

  return [
    {
      id: 'fundamentals',
      title: 'Fundamentals',
      href: `${basePath}#fundamentals`,
      icon: '📚',
      children: [
        { id: 'introduction-to-generative-ai', title: 'Introduction to Generative AI', href: `${basePath}#introduction-to-generative-ai` },
        { id: 'foundations-of-generative-models', title: 'Foundations of Generative Models', href: `${basePath}#foundations-of-generative-models` },
        { id: 'core-mathematics-and-concepts', title: 'Core Mathematics and Concepts', href: `${basePath}#core-mathematics-and-concepts` }
      ]
    },
    {
      id: 'model-architectures',
      title: 'Model Architectures',
      href: `${basePath}#model-architectures`,
      icon: '🏗️',
      children: [
        { id: 'variational-autoencoders-vaes', title: 'Variational Autoencoders (VAEs)', href: `${basePath}#variational-autoencoders-vaes` },
        { id: 'generative-adversarial-networks-gans', title: 'Generative Adversarial Networks (GANs)', href: `${basePath}#generative-adversarial-networks-gans` },
        { id: 'diffusion-models', title: 'Diffusion Models', href: `${basePath}#diffusion-models` },
        { id: 'transformer-models-and-large-language-models-llms', title: 'Transformer Models and LLMs', href: `${basePath}#transformer-models-and-large-language-models-llms` },
        { id: 'multimodal-generative-ai', title: 'Multimodal Generative AI', href: `${basePath}#multimodal-generative-ai` }
      ]
    },
    {
      id: 'practical-techniques',
      title: 'Practical Techniques',
      href: `${basePath}#practical-techniques`,
      icon: '🛠️',
      children: [
        { id: 'prompt-engineering-and-context-management', title: 'Prompt Engineering', href: `${basePath}#prompt-engineering-and-context-management` },
        { id: 'fine-tuning-and-adaptation', title: 'Fine-Tuning and Adaptation', href: `${basePath}#fine-tuning-and-adaptation` },
        { id: 'retrieval-augmented-generation-rag', title: 'Retrieval-Augmented Generation (RAG)', href: `${basePath}#retrieval-augmented-generation-rag` },
        { id: 'generative-ai-for-code', title: 'Generative AI for Code', href: `${basePath}#generative-ai-for-code` }
      ]
    },
    {
      id: 'tools-and-evaluation',
      title: 'Tools and Evaluation',
      href: `${basePath}#tools-and-evaluation`,
      icon: '📊',
      children: [
        { id: 'generative-ai-frameworks-and-tools', title: 'Frameworks and Tools', href: `${basePath}#generative-ai-frameworks-and-tools` },
        { id: 'evaluation-and-metrics-in-generative-ai', title: 'Evaluation and Metrics', href: `${basePath}#evaluation-and-metrics-in-generative-ai` }
      ]
    },
    {
      id: 'ethics-and-advanced',
      title: 'Ethics and Advanced',
      href: `${basePath}#ethics-and-advanced`,
      icon: '🚀',
      children: [
        { id: 'ethics-safety-and-responsible-genai', title: 'Ethics, Safety, and Responsible GenAI', href: `${basePath}#ethics-safety-and-responsible-genai` },
        { id: 'advanced-topics-in-generative-ai', title: 'Advanced Topics', href: `${basePath}#advanced-topics-in-generative-ai` }
      ]
    },
    {
      id: 'deployment-and-applications',
      title: 'Deployment and Applications',
      href: `${basePath}#deployment-and-applications`,
      icon: '⚙️',
      children: [
        { id: 'mlops-and-deployment-for-genai', title: 'MLOps and Deployment', href: `${basePath}#mlops-and-deployment-for-genai` },
        { id: 'real-world-generative-ai-applications', title: 'Real-World Applications', href: `${basePath}#real-world-generative-ai-applications` },
        { id: 'capstone-projects-and-assessments', title: 'Capstone Projects', href: `${basePath}#capstone-projects-and-assessments` }
      ]
    }
  ];
};

export default function GenerativeAIPage() {
  const [activeSection, setActiveSection] = useState('introduction-to-generative-ai');
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const pageHeadings = PAGE_HEADINGS;
  const isUserScrollingRef = useRef(false);
  const shouldScrollRef = useRef(false);
  const isProgrammaticNavigationRef = useRef(false);

  // Custom setActiveSection that handles child items correctly
  const handleSetActiveSection = (sectionId: string) => {
    shouldScrollRef.current = true;
    isUserScrollingRef.current = false;
    isProgrammaticNavigationRef.current = true;

    // Check if this is a direct section (not a subsection)
    if (PAGE_HEADINGS.some(heading => heading.id === sectionId)) {
      setActiveSection(sectionId);
      setActiveSubsection(null);
      window.history.replaceState(null, '', `#${sectionId}`);
      setTimeout(() => {
        isProgrammaticNavigationRef.current = false;
      }, 100);
    } else if (SUBSECTION_PARENT[sectionId]) {
      const parentSection = SUBSECTION_PARENT[sectionId];
      setActiveSection(parentSection);
      setActiveSubsection(sectionId);
      window.history.replaceState(null, '', `#${sectionId}`);
      setTimeout(() => {
        isProgrammaticNavigationRef.current = false;
      }, 100);
    } else {
      console.warn(`Invalid section ID: ${sectionId}, defaulting to introduction-to-generative-ai`);
      setActiveSection('introduction-to-generative-ai');
      setActiveSubsection(null);
      window.history.replaceState(null, '', window.location.pathname);
      setTimeout(() => {
        isProgrammaticNavigationRef.current = false;
      }, 100);
    }
  };

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (isProgrammaticNavigationRef.current) {
        return;
      }

      const hash = window.location.hash.slice(1);
      const parentGroups = ['fundamentals', 'model-architectures', 'practical-techniques', 'tools-and-evaluation', 'ethics-and-advanced', 'deployment-and-applications'];

      if (!hash || parentGroups.includes(hash)) {
        setActiveSection('introduction-to-generative-ai');
        setActiveSubsection(null);
        if (hash && parentGroups.includes(hash)) {
          window.history.replaceState(null, '', window.location.pathname);
        }
        return;
      }

      if (PAGE_HEADINGS.some(heading => heading.id === hash)) {
        setActiveSection(hash);
        setActiveSubsection(null);
        shouldScrollRef.current = true;
      } else if (SUBSECTION_PARENT[hash]) {
        const parentSection = SUBSECTION_PARENT[hash];
        setActiveSection(parentSection);
        setActiveSubsection(hash);
        shouldScrollRef.current = true;
      } else {
        setActiveSection('introduction-to-generative-ai');
        setActiveSubsection(null);
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    if (!window.location.hash) {
      setActiveSection('introduction-to-generative-ai');
      setActiveSubsection(null);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    } else {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Scroll to active section after it renders
  useEffect(() => {
    if (activeSection && shouldScrollRef.current) {
      shouldScrollRef.current = false;
      isUserScrollingRef.current = true;

      const scrollTimeout = setTimeout(() => {
        const element = document.getElementById(activeSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (activeSubsection) {
          const subElement = document.getElementById(activeSubsection);
          if (subElement) {
            subElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }

        setTimeout(() => {
          isUserScrollingRef.current = false;
        }, 2000);
      }, 200);

      return () => clearTimeout(scrollTimeout);
    }
  }, [activeSection, activeSubsection]);

  const getCurrentSectionIndex = () => {
    return PAGE_HEADINGS.findIndex(heading => heading.id === activeSection);
  };

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < PAGE_HEADINGS.length - 1) {
      const nextSection = PAGE_HEADINGS[currentIndex + 1];
      handleSetActiveSection(nextSection.id);
    }
  };

  const goToPreviousSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      const prevSection = PAGE_HEADINGS[currentIndex - 1];
      handleSetActiveSection(prevSection.id);
    }
  };

  const currentIndex = getCurrentSectionIndex();
  const hasNext = currentIndex < PAGE_HEADINGS.length - 1;
  const hasPrevious = currentIndex > 0;

  return (
    <TechLayout
      technology="artificial-intelligence"
      onThisPage={pageHeadings}
      activeSection={activeSection}
      setActiveSection={handleSetActiveSection}
      activeSubsection={activeSubsection}
      setActiveSubsection={setActiveSubsection}
      customNavigationItems={createModuleNavigationItems()}
    >
      <div className="min-h-screen relative">
        <div className="text-center mb-16 relative z-10">

          <h1 className="text-5xl font-bold text-white mb-4">
            Generative AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Module</span>
          </h1>
          <p className="text-gray-400 text-xl">Master Generative AI models including GANs, VAEs, Diffusion Models, and their applications</p>
        </div>

        <section
          id="generative-ai"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">Generative AI</h3>

          <div className="space-y-12 relative z-10">
            <div id="introduction-to-generative-ai" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">1. Introduction to Generative AI</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">What is Generative AI?</h5>
                </div>
                <p className="mb-3">
                  Generative AI is a type of artificial intelligence that can create new data or content such as text, images, audio, video, or code. Generative Artificial Intelligence is a field of AI that focuses on creating new and original data instead of just analyzing or recognizing existing information. It uses deep learning algorithms and neural networks to learn patterns, structures, and relationships from massive datasets and then generates completely new outputs that resemble the original data. For example, it can write essays, generate artwork, compose music, design graphics, or even write code. Unlike traditional AI systems that rely on fixed rules, generative AI models learn creatively from examples and can produce realistic, high-quality content on their own. Models like GPT, DALL·E, and Stable Diffusion have made generative AI one of the most revolutionary advancements in modern technology, capable of mimicking human imagination and creativity.
                </p>
                <p className="mb-3">
                  Examples include ChatGPT for text, DALL·E for images, and MusicGen for audio.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Evolution of Generative AI</h5>
                </div>
                <p className="mb-3">
                  The evolution of generative AI has been a journey from simple data analysis to creative intelligence. In the early days, AI systems were rule-based, focusing mainly on classification and prediction tasks. As computing power and data availability increased, machine learning models became capable of identifying deeper patterns in data. The invention of Autoencoders allowed AI to learn compressed representations of data, and Generative Adversarial Networks (GANs), introduced in 2014, brought a breakthrough in generating realistic images. Later, Variational Autoencoders (VAEs) refined this process by introducing probabilistic latent spaces. In recent years, Diffusion Models and Transformer-based architectures like GPT have taken generative AI to new heights, enabling text, image, and multimodal generation with near-human quality. The biggest leap was the Transformer architecture (2017) by Google, leading to powerful large language models like GPT, Gemini, and Claude. Today, generative AI forms the backbone of advanced systems like ChatGPT, Midjourney, and Gemini, marking a new era where AI can not only analyze but also create.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Difference Between Predictive AI and Generative AI</h5>
                </div>
                <p className="mb-3">
                  Predictive AI and Generative AI differ mainly in their goals and functions. Predictive AI analyzes past data to make forecasts, classifications, or decisions about future outcomes for example, predicting sales, detecting fraud, or recognizing speech. Its role is to understand patterns and make accurate predictions. In contrast, Generative AI learns the underlying data distribution and uses that understanding to produce new and original outputs that didn't exist before, such as creating a new design, writing an article, or generating an image. Predictive AI is about accuracy and recognition, while generative AI is about creativity and innovation. Essentially, predictive models answer "What will happen?", whereas generative models answer "What can we create?". This difference highlights how generative AI moves beyond logic to imagination, making machines capable of producing human-like creative work.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Core Idea: Creation vs Classification</h5>
                </div>
                <p className="mb-3">
                  The fundamental difference between traditional AI and generative AI lies in their purpose and outcome. Traditional or predictive AI performs classification, meaning it identifies and labels input data. For example, a predictive model might recognize that a given picture is of a cat. Generative AI performs creation, meaning it produces something new, such as generating an entirely new image of a cat that never existed before. In creation, the model learns data distribution, while in classification, it learns decision boundaries. Generative AI thus goes beyond recognition to simulation mimicking how humans create new ideas from what they've seen before. This ability makes it valuable for tasks like content creation, storytelling, image synthesis, and design generation.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Applications of Generative AI (Text, Images, Audio, Video, Code)</h5>
                </div>
                <p className="mb-3">
                  Generative AI is highly versatile and has applications across multiple data types:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li><strong className="text-purple-400">Text Generation:</strong> Tools like ChatGPT and Gemini write essays, code, summaries, and articles.</li>
                  <li><strong className="text-purple-400">Image Generation:</strong> DALL·E, Midjourney, and Stable Diffusion create realistic or artistic images from text prompts.</li>
                  <li><strong className="text-purple-400">Audio Generation:</strong> Models like Jukebox or MusicGen compose songs or recreate voices.</li>
                  <li><strong className="text-purple-400">Video Generation:</strong> Tools like RunwayML and Sora generate videos directly from text or story board input.</li>
                  <li><strong className="text-purple-400">Code Generation:</strong> Codex, GitHub Copilot, and CodeLlama translate natural language to code. These applications are transforming industries such as education, entertainment, gaming, fashion, architecture, and marketing.</li>
                </ul>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Importance of Generative Models in the AI Era</h5>
                </div>
                <p className="mb-3">
                  Generative models play a crucial role in today's AI-driven world by pushing the boundaries of what machines can create. They can produce realistic content, design products, and even simulate data for research and training. They enable automation in creative tasks that previously required human imagination, such as design, storytelling, and content production. Beyond creativity, they help in producing synthetic data for machine learning, which improves model training and preserves privacy. Generative AI also enhances personalization like generating tailored marketing campaigns, personalized education content, or customized digital art. In industries like healthcare, it's used to simulate medical images and drug molecules for research. These models not only save time and cost but also open new possibilities in innovation, making them a cornerstone of the modern AI era. Their impact is comparable to the invention of the internet transformative, wide-reaching, and constantly evolving.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Real-World Use Cases (ChatGPT, DALL·E, Midjourney, Gemini, Claude)</h5>
                </div>
                <p className="mb-3">
                  Generative AI is already powering some of the world's most advanced tools and applications.
                </p>
                <p className="mb-3">
                  ChatGPT by OpenAI generates conversational text, helping users write, code, and learn.
                </p>
                <p className="mb-3">
                  DALL·E, also from OpenAI, creates high-quality images from simple text prompts, enabling creative design with minimal effort.
                </p>
                <p className="mb-3">
                  Midjourney specializes in artistic and stylistic visuals, popular among designers and digital artists.
                </p>
                <p className="mb-3">
                  Gemini by Google DeepMind combines text, image, and video understanding in a multimodal framework.
                </p>
                <p className="mb-3">
                  Claude by Anthropic focuses on safe, ethical, and context-aware text generation. These real-world tools demonstrate how generative AI can enhance creativity, improve productivity, and provide intelligent assistance in day-to-day tasks.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Generative AI Ecosystem Overview (Models, Frameworks, Tools)</h5>
                </div>
                <p className="mb-3">
                  The generative AI ecosystem is made up of interconnected components that enable building, training, and deploying intelligent models. Models like GPT (for text), Diffusion and GANs (for images), and Whisper (for audio) form the foundation. These models are built using frameworks such as TensorFlow and PyTorch, which support large-scale training and optimization. Libraries like Hugging Face Transformers and Diffusers provide pre-trained models that developers can adapt for their own use. Tools like LangChain and LlamaIndex help connect language models with data sources for advanced applications, while Gradio and Streamlit allow developers to create user interfaces for AI apps. Deployment platforms like OpenAI API, Stability AI, and ComfyUI make these technologies accessible to everyone. Together, they form a dynamic ecosystem that powers the global growth and accessibility of generative AI.
                </p>
              </div>
            </div>

            <div id="foundations-of-generative-models" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">2. Foundations of Generative Models</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">What Are Generative Models?</h5>
                </div>
                <p className="mb-3">
                  Generative models are a type of artificial intelligence system that learns how data is created so it can generate new data that looks and feels similar to real examples. Instead of just identifying or classifying information, they learn the underlying patterns, relationships, and structures within a dataset. For example, if trained on thousands of pictures of landscapes, a generative model can create completely new, realistic-looking landscapes that don't exist in the real world. These models use deep learning and neural networks to analyze data distributions and build an internal understanding of how data points relate to each other. Once trained, the model can generate new samples that belong to the same distribution. Generative models are the foundation of creative AI applications such as ChatGPT (text generation), DALL·E (image generation), Whisper (audio transcription), and Copilot (code generation). Their ability to produce original content has made them revolutionary in art, media, research, and business.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Generative vs Discriminative Models</h5>
                </div>
                <p className="mb-3">
                  AI models are broadly divided into discriminative and generative types. A discriminative model focuses on learning boundaries between data categories — for example, it can identify whether an image is of a cat or a dog. It predicts a label or output based on given input data and is used for classification or prediction tasks. A generative model, however, learns how data is formed and distributed. It captures the joint probability between input and output variables, which allows it to create new data points similar to the original dataset. For example, a discriminative AI can tell you this is a dog, while a generative AI can draw a new dog that doesn't exist yet. Discriminative models are great for accuracy and recognition, while generative models are great for creativity and simulation. Together, they complement each other — one understands the world, and the other recreates it.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Probabilistic Modeling Basics</h5>
                </div>
                <p className="mb-3">
                  Generative AI lies on probabilistic modeling, which helps the system handle uncertainty and randomness in data. Probabilistic modeling is the mathematical foundation of generative AI. It involves representing data and uncertainty using probability distributions. Every dataset — whether it's text, images, or audio — can be thought of as samples drawn from an unknown probability distribution. A generative model tries to learn this hidden probability distribution, so it can later generate new data points that fit naturally within it. This process makes the generated content look believable and varied instead of repetitive. For example, after learning what patterns and colors usually appear in pictures of sunsets, it can generate new sunsets that look real. This concept helps the AI system maintain variety, randomness, and realism, avoiding repetition or identical results. Probabilistic modeling is what gives generative AI its "creative variability," allowing it to produce unique outputs each time.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Latent Variables and Representations</h5>
                </div>
                <p className="mb-3">
                  Latent variables are hidden or unseen features within data that describe its most important characteristics. For example, in an image of a face, latent variables could represent things like hair color, age, or expression. Generative models use a latent space, a special compressed zone where these hidden features are stored and organized. Generative models convert complex input data into a compact, lower-dimensional latent space, which acts like a "map" of the data's hidden properties. When the AI wants to generate something new, it selects points in this space and transforms them back into real outputs. By adjusting these variables, the AI can control the style, tone, or structure of the output — like making a person smile or changing a photo's color. This concept helps generative AI understand not just data itself, but the essence behind it, enabling flexible and creative generation. It's one of the most powerful ideas behind how AI can "imagine" new versions of existing things.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Sampling and Density Estimation</h5>
                </div>
                <p className="mb-3">
                  Sampling and density estimation are key techniques in how generative AI produces new data. Sampling means the model takes examples from what it has learned to generate something new — like picking random points from a pattern. Density estimation measures how close the generated data is to real data, ensuring that the outputs look natural. Together, these steps help maintain a balance between creativity and realism. Good sampling ensures that generated outputs are both realistic and diverse, while density estimation ensures the model doesn't stray too far from reality. For instance, when generating text, AI samples one word at a time based on probability, ensuring the sentence makes sense. In image generation, sampling helps create fine details, while density estimation keeps them natural-looking. If sampling is done too randomly, results may look fake; if it's too strict, the model may repeat itself. By mastering this process, AI can create realistic text, images, and sounds that feel authentic to humans. Essentially, sampling gives generative AI its creative freedom, while density estimation keeps it believable.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Maximum Likelihood Estimation (MLE)</h5>
                </div>
                <p className="mb-3">
                  Maximum Likelihood Estimation (MLE) is a mathematical method used to train generative models. The idea is to adjust the model's internal parameters to maximize the likelihood that the model would produce the real observed data. It works by finding the set of model parameters that make the real training data most probable. In simpler terms, the model adjusts itself so that it becomes better at reproducing real examples. Each time it learns, it slightly changes its internal settings to increase the likelihood of generating data similar to the training set. MLE ensures that the model doesn't just generate random noise but realistic, structured outputs. It's one of the most stable and widely used techniques in training deep learning systems, including generative AI. By using MLE, AI learns to think statistically like humans, understanding what "fits" and what doesn't.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Energy-Based and Autoregressive Models</h5>
                </div>
                <p className="mb-3">
                  Energy-based and autoregressive models are two important approaches in generative AI. Energy-based models assign energy scores to possible outputs — lower energy means the result looks more natural or real. They try to find outputs with the least "energy," which usually correspond to realistic data. Autoregressive models, such as GPT, generate data one step at a time — predicting the next word, pixel, or sound based on the previous ones. This sequential generation process helps them maintain logical consistency and natural flow. Energy-based models are great for generating complex data distributions, while autoregressive models excel in sequence generation such as language, audio, and time-series data. This step-by-step process helps AI create smooth, logical sequences like human language or continuous music. Together, these approaches allow AI to produce data that's structured, coherent, and lifelike. They're especially powerful for generating text, audio, and time-based data such as speech or music.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Overview of Key Model Families</h5>
                </div>
                <p className="mb-3">
                  There are four main families of generative models used in AI today.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Variational Autoencoders (VAEs):</strong> Learn compressed representations (latent spaces) of data and then reconstruct similar outputs. They're used for tasks like image reconstruction and feature learning.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Generative Adversarial Networks (GANs):</strong> Use two neural networks — one creates data, and the other judges it — improving realism through competition. Use a generator and discriminator that compete with each other to produce ultra-realistic results, especially in images.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Diffusion Models:</strong> Start with random noise and gradually refine it into detailed images, used in tools like Stable Diffusion (used in Stable Diffusion and Midjourney).
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Transformer-Based Models (LLMs):</strong> Transformer Models, like GPT, rely on attention mechanisms to generate high-quality text, code, and even images.
                </p>
                <p className="mb-3">
                  Each family has unique strengths — VAEs for learning structure, GANs for realism, Diffusion for detail, and Transformers for versatility. Together, they make up the foundation of today's generative AI systems used across industries.
                </p>
              </div>
            </div>

            <div id="core-mathematics-and-concepts" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">3. Core Mathematics and Concepts</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Probability and Statistics for Generative AI</h5>
                </div>
                <p className="mb-3">
                  Probability and statistics form the mathematical foundation that allows generative AI to understand patterns and make decisions about what to create next. In generative modeling, AI assumes that all data — whether text, images, or sounds — is generated from some hidden probability distribution. The goal of the model is to learn this distribution accurately, so it can later produce new data that fits naturally within it. For example, ChatGPT predicts each next word in a sentence by estimating which word is most probable based on the previous ones. Similarly, image generators like Stable Diffusion learn which color or shape combinations are most likely to appear together in real photos. Statistics help the model understand averages, variances, and correlations in data, while probability enables it to handle uncertainty and randomness. Together, they allow AI to balance realism and creativity, producing content that looks both authentic and unique. Without probability and statistics, AI would be unable to handle variations or generate believable, human-like results. They help ensure that every output — whether it's a sentence or an image — feels natural, logical, and contextually correct.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Linear Algebra for Model Representations</h5>
                </div>
                <p className="mb-3">
                  Linear algebra is the core mathematical tool that makes deep learning and generative AI possible. It deals with vectors (lists of numbers), matrices (grids of numbers), and tensors (multi-dimensional data). In generative AI, all information — words, pixels, sounds — is represented as numerical vectors that capture their meaning or properties. For example, in language models, each word is converted into a vector that represents its context and relationships with other words (like "king" and "queen" being close in vector space). When data passes through a neural network, it undergoes matrix multiplications and linear transformations that adjust these values to create meaningful outputs. This process helps the model learn complex patterns and relationships in high-dimensional data. For image generation, linear algebra helps represent and modify features like color, brightness, and edges. In large models like GPT, millions of matrices work together to encode, transform, and decode data. Eigenvectors, eigenvalues, and vector spaces help AI compress large data and extract only the most important information.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Optimization in High-Dimensional Spaces</h5>
                </div>
                <p className="mb-3">
                  Optimization is the process of improving the model's performance by finding the best set of parameters (or weights) that minimize error. Generative AI models often have millions or even billions of parameters, forming a very large and complex "space" of possible configurations. Optimization algorithms like Gradient Descent help the model adjust these parameters step by step to make its predictions or creations more accurate. Each step moves the model closer to the best version of itself — the one that produces realistic, high-quality results. This process is like finding the lowest point in a massive, multi-dimensional landscape, where the lowest point represents the model's optimal settings. However, since the landscape is so large, optimization techniques must be smart and efficient to avoid getting stuck in wrong spots (local minima). Learning rates, batch sizes, and regularization methods are all tuning tools that help with stable optimization. In generative AI, optimization ensures the model generates realistic and consistent data while maintaining diversity. Without optimization, even the most powerful models would fail to learn meaningful patterns or produce coherent outputs.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">KL Divergence and Cross-Entropy</h5>
                </div>
                <p className="mb-3">
                  Kullback–Leibler (KL) Divergence and Cross-Entropy are key mathematical tools used to measure the difference between two probability distributions. In simple terms, they tell us how far the model's generated data distribution is from the real data distribution. KL Divergence quantifies how one distribution diverges from another — for example, how different the AI's generated images are from real ones. It's used heavily in Variational Autoencoders (VAEs) and Diffusion Models to push the model toward generating more realistic data. Cross-Entropy, on the other hand, measures how well a model predicts the correct output. In text generation, it compares the predicted next word probabilities to the actual next word and penalizes errors. Lower cross-entropy means better predictions, more natural text, and improved accuracy. Both KL Divergence and Cross-Entropy help guide model training, ensuring it learns the correct patterns instead of memorizing wrong ones. They act like a compass for the AI, steering it toward realism, accuracy, and coherence during generation.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Variational Inference</h5>
                </div>
                <p className="mb-3">
                  Variational Inference (VI) is a mathematical approach used when dealing with complex probability distributions that are difficult to compute directly. Instead of calculating exact probabilities (which can be impossible for large models), VI estimates them using simpler, easier-to-handle functions. In generative AI, it helps models like VAEs approximate hidden or latent variables — the unseen factors that define data. For example, when training on faces, the AI might learn latent variables like "smile," "age," or "lighting." VI allows the model to efficiently learn these hidden patterns and generate new, realistic examples based on them. This approach balances accuracy and computational efficiency, letting AI handle massive, high-dimensional datasets. Without variational inference, modern generative models would be too slow or unstable to train effectively. It's a smart shortcut that enables AI to approximate creativity mathematically.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Loss Functions in Generative Models (Reconstruction Loss, Adversarial Loss, KL Loss)</h5>
                </div>
                <p className="mb-3">
                  Loss functions measure how well or poorly a model is performing — they act like feedback or grades for AI during training. The goal of training is to minimize the loss, meaning the model's predictions become closer to real data. Different generative models use different types of loss functions:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li><strong className="text-purple-400">Reconstruction Loss</strong> (used in VAEs) measures how close the generated output is to the original input.</li>
                  <li><strong className="text-purple-400">Adversarial Loss</strong> (used in GANs) measures how well the generator fools the discriminator.</li>
                  <li><strong className="text-purple-400">KL Loss</strong> helps maintain realistic latent spaces by keeping generated distributions close to real ones.</li>
                </ul>
                <p className="mb-3">
                  By combining these losses, models can learn to create both accurate and diverse outputs. Loss functions guide the entire learning process — without them, the model wouldn't know how to improve. They are the bridge between mathematics and creativity in generative AI.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Gradient Descent and Backpropagation Refresher</h5>
                </div>
                <p className="mb-3">
                  Gradient Descent and Backpropagation are core learning algorithms in all deep learning models, including generative AI. Gradient Descent updates model parameters step by step to minimize the loss function, moving toward better accuracy. Backpropagation calculates how much each parameter contributed to the error, allowing targeted corrections. Together, they allow AI models to learn efficiently from data through repeated trial and error. In generative AI, this process helps the model refine its ability to produce realistic text, images, or sounds with every iteration. Think of it like sculpting — each gradient update chips away errors, making the final output smoother and more accurate. These algorithms make it possible for models like GPT or Diffusion to improve steadily and creatively over time.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Random Sampling and Noise Injection Techniques</h5>
                </div>
                <p className="mb-3">
                  Generative AI relies heavily on randomness to make outputs diverse and natural. Random sampling introduces variability by allowing the model to explore different possible outputs instead of repeating the same thing. Noise injection adds small random disturbances during training, helping the model learn to remove or interpret noise in meaningful ways. Diffusion Models, for instance, start by adding noise to an image and then learn how to reverse the process to recover it — generating entirely new, realistic visuals. These techniques prevent overfitting, encourage creativity, and ensure that AI doesn't just memorize examples but actually learns how to "create." Without randomness, every AI-generated image, text, or song would look identical.                   Controlled randomness, therefore, gives AI its artistic touch — the ability to surprise us while staying believable.
                </p>
              </div>
            </div>

            <div id="variational-autoencoders-vaes" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">4. Variational Autoencoders (VAEs)</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Introduction to Autoencoders</h5>
                </div>
                <p className="mb-3">
                  An Autoencoder is a type of neural network designed to learn efficient representations of data by compressing and reconstructing it. It consists of two main parts: an Encoder that reduces data into a smaller, meaningful form, and a Decoder that tries to recreate the original data from that compressed version. The goal is to teach the network how to capture the most important information while ignoring noise or unnecessary details. For example, if we feed an image into an autoencoder, it will learn to recognize key features like shapes and colors while ignoring minor pixel noise. Autoencoders are trained using reconstruction loss, which measures how close the reconstructed output is to the original input. They are often used for data compression, noise removal, dimensionality reduction, and feature learning. While traditional autoencoders are deterministic — meaning they always produce the same output for a given input — they are limited in creativity. They can only reconstruct data they've seen, not generate truly new examples. That's why the Variational Autoencoder (VAE) was introduced — it adds randomness and probability, allowing AI to create new data. In short, autoencoders teach AI how to understand and rebuild data, forming the foundation for generative creativity.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Encoder-Decoder Architecture</h5>
                </div>
                <p className="mb-3">
                  The architecture of a Variational Autoencoder is divided into two neural networks — the Encoder and the Decoder. The Encoder takes the input data (like an image or text) and compresses it into a smaller numerical form known as the latent vector. This process captures the key features of the data, removing less important details. Then the Decoder takes this latent vector and reconstructs the original data as closely as possible. Together, the Encoder and Decoder work like a translator — one encodes information into a compressed "language," and the other decodes it back into a meaningful form. In a VAE, however, the Encoder doesn't just produce a single value; it predicts two vectors — the mean (μ) and standard deviation (σ) — representing a probability distribution. This allows the model to sample different possible representations of the same input, adding randomness to the process. The Decoder then learns to rebuild data even from slightly different latent samples, giving the model creative flexibility. This two-part structure makes VAEs excellent at learning compressed, smooth, and meaningful representations of complex data.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Bottleneck Layer and Latent Space Representation</h5>
                </div>
                <p className="mb-3">
                  At the center of the encoder-decoder structure lies the bottleneck layer, which holds the latent space representation of the input. This bottleneck acts as a narrow passage that forces the model to retain only the most important information. Imagine it as squeezing a high-resolution image into a small summary of its features — the model must learn which details truly matter. The latent space is a multidimensional space where each point corresponds to a possible version of the input data. Nearby points represent similar data — for instance, two points close together might both represent smiling faces. This space allows the AI to explore variations smoothly; by moving slightly through it, the model can create new but realistic samples. The latent space is what gives VAEs their creative control — by manipulating latent variables, we can modify outputs (like changing a person's age or background in a generated image). This concept of compressing, representing, and expanding data is at the heart of all generative AI models today.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Regularization using KL Divergence</h5>
                </div>
                <p className="mb-3">
                  To make sure the latent space is well-organized and continuous, VAEs use a technique called regularization, based on Kullback–Leibler (KL) Divergence. KL Divergence is a mathematical measure of how one probability distribution differs from another. In VAEs, it ensures that the learned latent variables follow a normal (Gaussian) distribution — a smooth, continuous space without gaps or clusters. This regularization helps prevent the model from overfitting or memorizing individual training examples. The KL term in the loss function keeps the latent vectors evenly spread out, so every region in latent space can generate meaningful outputs. It also ensures that similar data points are located close together in latent space, which makes interpolation (blending features between examples) smooth and natural. Without this regularization, the latent space would be messy and unpredictable, causing unstable or unrealistic generations. Thus, KL Divergence acts as a "teacher," guiding the model to organize its imagination logically.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Reparameterization Trick</h5>
                </div>
                <p className="mb-3">
                  One challenge in training VAEs is that sampling from a probability distribution is not directly differentiable — meaning the model can't easily learn from it using gradient descent. To solve this, the Reparameterization Trick was introduced. Instead of sampling directly from the distribution, the model separates randomness from learning by using the formula: z = μ + σ * ε, where μ is the mean, σ is the standard deviation, and ε is random noise drawn from a normal distribution. This allows the model to keep gradients flowing during training while still introducing randomness in the generation process. In simple terms, the trick lets the AI "learn where to look" (mean and variance) while still keeping creativity (randomness) intact. It's what makes the VAE both trainable and generative at the same time — something earlier models struggled to achieve. This small but powerful idea is one of the main reasons VAEs became such a milestone in generative AI research.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Conditional VAEs (CVAE)</h5>
                </div>
                <p className="mb-3">
                  Conditional Variational Autoencoders (CVAEs) are an advanced form of VAEs that add conditional information to control what the model generates. In a normal VAE, the model learns to generate data in general. In a CVAE, you give the model extra input (like a label or description) to guide what kind of data it should create. For example, if you train a CVAE on handwritten digits and provide the number label (0–9), it can generate a specific digit when asked like "generate a 5." This makes CVAEs semi-controlled generators, capable of producing class-specific or context-based outputs. In text generation, they can produce sentences with a chosen emotion or style; in images, they can produce objects of a specified type or color. By conditioning on additional data, CVAEs give users control over the generation process while keeping the flexibility of a probabilistic model. They are widely used in image-to-image translation, style transfer, and personalized generation tasks.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Applications: Image Reconstruction, Anomaly Detection, Text Embeddings</h5>
                </div>
                <p className="mb-3">
                  VAEs have a wide range of practical applications in AI and data science. In image reconstruction, they can recreate images with missing or noisy parts by learning the essential patterns behind visual data. In anomaly detection, they learn what "normal" data looks like and can flag inputs that don't fit that pattern — useful in industries like finance, cybersecurity, or manufacturing. VAEs also produce text embeddings, meaning they can represent sentences or documents as numerical vectors that capture their meaning and context. This helps in tasks like document clustering, summarization, and search optimization. In healthcare, VAEs generate synthetic medical images for training models without using sensitive patient data. In creative arts, they help generate new designs, faces, or textures for games and animations. Their flexibility makes them valuable wherever data understanding, compression, and generation are needed.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Limitations of VAEs and Comparison with GANs</h5>
                </div>
                <p className="mb-3">
                  Although VAEs are powerful and stable, they also have some limitations. The main issue is that their generated outputs often look blurry or less detailed compared to results from Generative Adversarial Networks (GANs). This happens because VAEs focus on reconstructing averages of possible outcomes rather than fine-tuning sharp details. GANs, which use an adversarial generator-discriminator setup, tend to produce sharper and more realistic results. However, VAEs are much more mathematically grounded, easier to train, and more interpretable. They also have a continuous and smooth latent space, which GANs often lack. While GANs excel in producing realistic imagery, VAEs are preferred for representation learning, anomaly detection, and controlled generation. In fact, many modern models combine the strengths of both — creating VAE-GAN hybrids for best results.                   So, while VAEs may not always create perfect visuals, they remain one of the most elegant and foundational approaches to creative AI.
                </p>
              </div>
            </div>

            <div id="generative-adversarial-networks-gans" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">5. Generative Adversarial Networks (GANs)</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Introduction to GAN Architecture</h5>
                </div>
                <p className="mb-3">
                  Generative Adversarial Networks, or GANs, are one of the most groundbreaking architectures in modern AI, introduced by Ian Goodfellow in 2014. A GAN is made up of two main neural networks — the Generator and the Discriminator — which compete against each other in a game-like training process. The Generator's job is to create new, fake data that looks real (for example, generating realistic human faces). The Discriminator's job is to detect whether an input is real or fake, acting like a quality inspector. As training progresses, the Generator gets better at fooling the Discriminator, while the Discriminator becomes better at spotting fakes. This continuous competition helps both networks improve simultaneously, leading to highly realistic data generation. GANs can learn to produce high-quality images, videos, and audio from random noise. This architecture introduced a new era of creative artificial intelligence, where machines could generate content nearly indistinguishable from real data.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Generator vs Discriminator Framework</h5>
                </div>
                <p className="mb-3">
                  In the GAN framework, the Generator (G) and Discriminator (D) play a two-player zero-sum game. The Generator takes random noise as input and converts it into data that resembles the training dataset — such as fake images that look real. The Discriminator receives both real data (from the dataset) and fake data (from the Generator) and tries to correctly identify which is which. If the Discriminator correctly identifies fake data, it improves its ability to detect; if the Generator fools it, the Generator improves. This competition continues until the Discriminator can no longer tell the difference between real and generated samples. In the end, the Generator learns to model the data distribution perfectly, producing incredibly realistic outputs. The key idea is adversarial learning — improvement through competition. It's like an artist (Generator) improving by trying to fool an art critic (Discriminator) who keeps spotting flaws until both reach perfection.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Loss Function (Minimax Game)</h5>
                </div>
                <p className="mb-3">
                  GANs are trained through a minimax game, where one network tries to minimize the loss while the other tries to maximize it. The Discriminator wants to maximize its accuracy — identifying fake data correctly. The Generator wants to minimize its loss by producing outputs that the Discriminator believes are real. Mathematically, the objective is written as: min_G max_D [log D(x) + log(1 - D(G(z)))]. Here, D(x) is the probability that the Discriminator thinks a real image is real, and D(G(z)) is the probability it assigns to fake data being real. The Generator aims to make D(G(z)) as close to 1 as possible — meaning it wants its fake data to be accepted as genuine. This tug-of-war is what drives GANs to create increasingly realistic and detailed data over time. However, because both networks learn at once, training must be carefully balanced to avoid instability.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Training Challenges (Mode Collapse, Instability)</h5>
                </div>
                <p className="mb-3">
                  Despite their power, GANs are known for being difficult to train. One major issue is Mode Collapse, where the Generator produces limited variations of outputs — for example, generating the same type of face over and over. This happens when the Generator finds a small set of "tricks" that consistently fool the Discriminator. Another problem is Training Instability — if the Generator or Discriminator learns too fast or too slow, the training can diverge, and both models stop improving. GANs are also sensitive to hyperparameters like learning rate, batch size, and network architecture. Researchers have introduced various improvements, such as gradient penalties and Wasserstein loss, to stabilize GAN training. Despite these challenges, with careful tuning and balanced learning, GANs can achieve outstanding results that outperform many other generative models in realism.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Types of GANs</h5>
                </div>
                <p className="mb-3">
                  <strong className="text-purple-400">DCGAN (Deep Convolutional GAN):</strong> DCGANs use convolutional neural networks (CNNs) in both the Generator and Discriminator to handle image data effectively. They capture spatial hierarchies in images, producing clear and structured visuals. DCGANs were among the first to generate high-quality, detailed images from random noise.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">WGAN and WGAN-GP:</strong> The Wasserstein GAN (WGAN) introduced a new loss function based on the Wasserstein distance, which measures how far the generated data distribution is from the real one. This makes training more stable and helps avoid mode collapse. The WGAN-GP adds a "gradient penalty" for smoother optimization, improving performance further.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">CycleGAN:</strong> CycleGAN is designed for image-to-image translation without needing paired examples. For instance, it can convert photos of horses to zebras or summer scenes to winter ones. It works by training two GANs in a cycle to translate images back and forth between two domains.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">StyleGAN and StyleGAN2:</strong> StyleGAN, developed by NVIDIA, is famous for creating extremely realistic human faces. It introduces "style control," allowing fine-tuned manipulation of features like age, expression, and background. StyleGAN2 improves stability and detail, achieving photo-realism indistinguishable from real photography.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Conditional GAN (CGAN):</strong> Conditional GANs add a condition or label to both Generator and Discriminator. For example, by giving the label "cat," the model generates only cat images. This allows for controlled and guided generation — ideal for targeted content creation.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Applications: Image Generation, Style Transfer, Super-Resolution</h5>
                </div>
                <p className="mb-3">
                  Generative Adversarial Networks (GANs) are widely used in creative, scientific, and industrial fields because of their ability to generate new, realistic data. Their main applications include:
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Image Generation:</strong> GANs can create entirely new and realistic images from random noise. For example, models like StyleGAN generate human faces that don't exist in reality. They're used in fashion design, film, gaming, and virtual character creation because they can produce lifelike visuals instantly.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Style Transfer:</strong> GANs can combine the content of one image with the artistic style of another — for instance, converting a photo into a painting. CycleGANs even perform image-to-image translation without paired examples, such as turning a sunny photo into a rainy one or transforming horses into zebras. This is used in digital art, advertising, and AR filters.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Super-Resolution:</strong> In this task, GANs improve image clarity and detail, converting low-resolution or blurry images into high-resolution ones. Models like SRGAN can restore old photos, enhance medical scans, or sharpen satellite images. They're useful in healthcare, security, and multimedia enhancement.
                </p>
                <p className="mb-3">
                  Beyond these, GANs are also used for video creation, 3D modeling, data augmentation, and AI-based art generation. They bring imagination and realism together — allowing machines to act as digital artists, designers, and photographers.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Evaluation Metrics for GANs (FID, IS)</h5>
                </div>
                <p className="mb-3">
                  Evaluating GANs is challenging because their goal is to create realistic data, not exact copies. To measure how good the generated data is, two main metrics are used — Inception Score (IS) and Fréchet Inception Distance (FID).
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Inception Score (IS):</strong> IS checks the quality and diversity of generated images using a pre-trained image classifier. If the images look clear and belong to distinct categories, the score will be high. A higher IS means the GAN produces realistic and varied outputs. However, IS doesn't compare generated images to real ones, so it can be misleading if the dataset is biased.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Fréchet Inception Distance (FID):</strong> FID is the most reliable metric today. It compares real and generated images by measuring how close their statistical features are. A lower FID means the generated images are closer to real data in both quality and diversity. FID can detect subtle issues like blur, artifacts, or lack of variety that IS may miss.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Other Metrics:</strong> Researchers sometimes use additional methods like Precision and Recall, Perceptual Path Length (PPL), or even human judgment to evaluate realism. But FID remains the gold standard because it reflects both accuracy and authenticity.
                </p>
              </div>
            </div>

            <div id="diffusion-models" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">6. Diffusion Models</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Introduction to Diffusion-Based Models</h5>
                </div>
                <p className="mb-3">
                  Diffusion Models are one of the most advanced and powerful generative AI techniques today. They work by teaching an AI to generate new data (like images or videos) by learning how to reverse a noise process. In simple terms, they start with pure random noise (like static on a TV) — and gradually "denoise" it step by step to produce a clear, meaningful image. This process is inspired by how gases or particles diffuse — spreading randomly — hence the name diffusion models. They learn the exact pattern of how data turns into noise and then learn to reverse it. Compared to older models like GANs or VAEs, diffusion models are more stable, produce higher quality results, and can create incredibly detailed and realistic visuals. They have quickly become the backbone of text-to-image AI tools such as Stable Diffusion, Midjourney, and DALL·E 3. The beauty of diffusion models is their step-by-step refinement process, which makes generation more controlled and consistent, rather than chaotic or random. This fine-tuned generative process allows them to achieve unmatched realism in AI-generated content.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Forward and Reverse Diffusion Process</h5>
                </div>
                <p className="mb-3">
                  The concept of diffusion involves two main stages — the forward process and the reverse process. In the forward diffusion process, noise is gradually added to real data over many small steps until it becomes completely random noise. For example, if you take a clear photo and keep adding tiny amounts of noise, it will eventually turn into pure static. This stage teaches the model how images deteriorate.
                </p>
                <p className="mb-3">
                  The reverse diffusion process is where the model learns to remove that noise step-by-step, restoring structure and detail to turn noise back into a realistic image. By training on many examples, the model learns the exact way to reverse this destruction process. When generating new data, it starts from random noise and applies the reverse process to create a brand-new, realistic image. This slow, iterative denoising gives diffusion models their famous clarity, detail, and precision — each step brings the image closer to perfection.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Denoising Diffusion Probabilistic Models (DDPM)</h5>
                </div>
                <p className="mb-3">
                  Denoising Diffusion Probabilistic Models (DDPMs) are the core mathematical framework behind diffusion models. They were introduced by Ho et al. in 2020, and they define how the forward and reverse diffusion processes are modeled probabilistically. In DDPM, every step of noise addition and removal is treated as a small, controlled probabilistic transition. The model learns to predict and remove noise at each step, effectively "denoising" an image from random static back into a real-looking photo. Training a DDPM requires teaching the model on thousands of clean and noisy image pairs, so it learns the correct denoising patterns. The result is a model capable of generating very realistic and high-resolution images with fine details. However, because DDPMs perform hundreds or even thousands of steps to generate one image, they can be slow during inference. Despite this, their accuracy, stability, and output quality make them one of the most reliable generative AI methods ever created.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Denoising Diffusion Implicit Models (DDIM)</h5>
                </div>
                <p className="mb-3">
                  Denoising Diffusion Implicit Models (DDIMs) are an improved and faster version of DDPMs. They use a similar diffusion process but allow fewer denoising steps while keeping the quality of the output high. This makes DDIMs much more efficient, reducing the generation time from hundreds of steps to just a few dozen. DDIMs also introduce a level of deterministic control, meaning the same prompt or input can consistently produce the same image, unlike purely random methods. They achieve this by using a slightly different mathematical approach to the reverse process, allowing smoother transitions between noise states. In short, DDIMs preserve the realistic quality of DDPMs but generate results faster and more predictably, making them ideal for real-world applications. This balance between speed and quality is one reason diffusion-based systems like Stable Diffusion and Midjourney are so efficient today.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Latent Diffusion Models (LDM)</h5>
                </div>
                <p className="mb-3">
                  Latent Diffusion Models (LDMs) are an advanced form of diffusion model that make generation faster and less computationally heavy. Instead of applying diffusion directly on large image pixels (which is expensive), LDMs first compress images into a smaller latent space using an autoencoder. This means they don't denoise full-size images — they denoise compressed feature representations. Once the denoising process is complete, the autoencoder decodes the result back into a full-resolution image. This drastically reduces memory usage and speeds up training while maintaining high visual quality. LDMs are the foundation of Stable Diffusion, which can generate 1024×1024 images in seconds using only consumer GPUs. They also make it possible to train large-scale generative models on affordable hardware, democratizing access to AI creativity. In short, LDMs made diffusion models practical, efficient, and scalable for everyone — not just research labs.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Stable Diffusion and ControlNet</h5>
                </div>
                <p className="mb-3">
                  Stable Diffusion is one of the most famous implementations of latent diffusion models, developed by Stability AI in 2022. It takes a text prompt as input and generates detailed, realistic images that match the description — a process known as text-to-image generation. Stable Diffusion is open-source, allowing developers and artists worldwide to create AI tools, games, and artworks. It uses a neural component called a U-Net for denoising and a CLIP model for understanding text prompts. On top of Stable Diffusion, another model called ControlNet was introduced to add precise control over image generation. ControlNet allows users to guide the output using references — such as edge maps, poses, or sketches — making the generation more structured and predictable. Together, Stable Diffusion and ControlNet represent the next level of creativity in AI, combining freedom of imagination with fine-grained control over the result.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Text-to-Image Generation (Prompt-to-Pixel Mapping)</h5>
                </div>
                <p className="mb-3">
                  Text-to-image generation is one of the most popular and magical uses of diffusion models. In this process, the model takes a text prompt (like "a cat wearing sunglasses on the beach") and converts it into an image that visually matches the description. This is achieved through prompt-to-pixel mapping, where the AI first encodes the meaning of the text using a language model like CLIP or GPT. Then, it guides the diffusion process to fill in image pixels that align with the meaning of the prompt. The model repeatedly refines the image through denoising steps until it matches both the text and visual quality standards. This allows users to "paint with words" — simply describing what they want and letting AI visualize it. It has revolutionized digital art, design, and content creation, making creative generation accessible to everyone.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Applications: Image Synthesis, Video Generation, Art Creation</h5>
                </div>
                <p className="mb-3">
                  Diffusion models have become central to AI-based creativity and design. Their ability to generate high-quality, realistic, and creative data has made them one of the most important breakthroughs in modern artificial intelligence. They've opened up countless creative and industrial applications, particularly in:
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Image Synthesis:</strong> Generating completely new, realistic, or artistic images from text prompts or sketches. In image synthesis, diffusion models generate new and realistic images from random noise or text prompts. They gradually remove noise step by step to create lifelike visuals that match user descriptions. They're used in advertising, entertainment, product design, and architecture for fast and imaginative visual creation.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Video Generation:</strong> Extending diffusion to time-based data to create short AI-generated video clips or animations. Diffusion-based video generation extends image synthesis over time, creating moving, realistic videos frame by frame. Models like RunwayML Gen-2 and Pika Labs can turn text prompts or static images into short video clips. For example, a user can describe "a dog playing in a park," and the model generates a full motion sequence.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Art Creation:</strong> Empowering digital artists to create surreal or photorealistic artworks in seconds. They are also used in fashion design, architecture visualization, and film concept art. Diffusion models have redefined art by enabling AI-powered creativity. Anyone can create professional-quality artwork simply by typing a description — a process known as prompt-based art. Tools like Stable Diffusion and Midjourney let users experiment with style, mood, and detail to create illustrations, concept art, and designs. Artists now use AI as a creative partner — combining human imagination with machine precision.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </TechLayout>
  );
}

