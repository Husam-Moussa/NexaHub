# NexaHub - AI-Driven Productivity Platform

NexaHub is a comprehensive productivity platform that combines three powerful tools: Resume & Portfolio Builder, StudyGPT Module, and Text Toolkit (Insightify). Each tool is designed to enhance your productivity and learning experience using AI technology.

## Features

### Resume & Portfolio Builder
- Smart resume building with AI-powered content generation
- Professional portfolio creation
- Customizable templates
- Export to multiple formats (PDF, DOCX)
- Real-time preview

### StudyGPT Module
- AI-powered study material generation
- Smart summarization of complex topics
- Interactive flashcards creation
- Quiz generation
- Progress tracking

### Text Toolkit (Insightify)
- Text summarization
- Content rewriting
- Translation
- Text simplification
- Multiple language support

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Hugging Face Inference API
- Zustand (State Management)
- React Router
- React Dropzone
- Vitest (Testing)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Hugging Face API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nexahub.git
   cd nexahub
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your Hugging Face API key:
   ```
   VITE_HUGGINGFACE_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Running Tests

The project uses Vitest for testing. You can run tests using the following commands:

```bash
# Run tests in watch mode
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
nexahub/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── features/
│   ├── pages/
│   ├── store/
│   ├── utils/
│   └── test/
├── public/
├── tests/
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Hugging Face for providing the AI models
- The React and Vite communities for their excellent documentation
- All contributors who have helped shape this project
