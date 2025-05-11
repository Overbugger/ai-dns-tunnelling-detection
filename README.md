# AI DNS Tunneling Detection

An intelligent DNS traffic analyzer that uses machine learning to detect potential DNS tunneling attacks in network traffic.

## Features

- Upload and analyze PCAP/CSV files containing DNS queries
- AI-powered detection of suspicious DNS patterns
- Real-time analysis with visual feedback
- Detailed results with query-level information
- Filter and sort capabilities for investigation
- Responsive design for desktop and mobile
- Dark mode support

## Tech Stack

This project is built with modern web technologies:

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Data Tables**: TanStack Table
- **Toast Notifications**: React Toast

## Getting Started

### Prerequisites

- Node.js (v18.17.0 or higher)
- npm (v9.0.0 or higher)

### Installation

```sh
# Clone the repository
git clone https://github.com/yourusername/ai-dns-tunnelling-detection.git

# Navigate to project directory
cd ai-dns-tunnelling-detection

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. Launch the application
2. Upload a PCAP or CSV file containing DNS queries
3. Click "Run AI Analysis" to start the detection process
4. Review the results in the interactive dashboard
5. Use filters and sorting to investigate suspicious queries

## File Requirements

- Supported formats: `.pcap`, `.csv`
- Maximum file size: 50MB
- Required columns for CSV:
  - domain
  - query_type
  - timestamp

## Local Development

```sh
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── types/             # TypeScript interfaces
├── utils/             # Helper functions
└── styles/            # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/)
- DNS analysis techniques based on current security research
- Inspired by real-world DNS tunneling detection systems
