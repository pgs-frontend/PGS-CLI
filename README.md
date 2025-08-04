# PGS CLI - Project Generator System

![PGS CLI Banner](https://storage.devpgs.app/u/IvaTp6.png)

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/pgs-cli)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)

## 🚀 Overview

The **PGS CLI** is a lightweight, developer-friendly command-line interface that streamlines project and management with built-in authentication. Whether you're bootstrapping a new project or managing secure workflows, PGS keeps things fast, consistent, and secure.

**PGS CLI – Project Generator System**: Quickly scaffold projects, fetch boilerplates, and access dev tools from your terminal.

## ✨ Features

- 🔐 **Secure Authentication** - Built-in login/logout system with token management
- 🎯 **Project Templates** - Create new projects from predefined templates
- 👥 **User Management** - Create and delete user accounts
- 🎨 **Beautiful CLI** - Colorful, gradient-styled interface with ASCII art
- ⚡ **Fast & Lightweight** - Minimal dependencies, maximum performance
- 🛠️ **Developer Tools** - Integrated development utilities

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g pgs-cli
```

### Local Installation

```bash
npm install pgs-cli
```

### From Source

```bash
git clone https://github.com/yourusername/pgs-cli.git
cd pgs-cli
npm install
npm link
```

## 🎯 Quick Start

After installation, you can start using PGS CLI immediately:

```bash
# Show help and available commands
pgs -h

# Login to your account
pgs login

# Create a new project
pgs create

# Show version information
pgs -v
```

## 📖 Commands

### Authentication Commands

```bash
# Login to the system
pgs login
pgs login -e your@email.com -p yourpassword

# Logout from the system
pgs logout
```

### Project Commands

```bash
# Create a new project from template
pgs create
pgs create -t template-name
```

### User Management

```bash
# Create a new user
pgs -u create

# Delete a user
pgs -u delete
```

### Information Commands

```bash
# Show help information
pgs -h

# Show version information
pgs -v
```

## 🔧 Configuration

PGS CLI stores its configuration in `cli.json` and authentication tokens in `.pgscli.cred`. These files are automatically managed by the CLI.

### CLI Configuration (`cli.json`)

```json
{
    "name": "PGS CLI",
    "fullname": "PGS Command Line Interface",
    "version": "1.0.0",
    "build": "pgs-cli/pgsio",
    "description": "The PGS CLI is a lightweight, developer-friendly command-line interface...",
    "author": "Alan Sha Salim",
    "website": "https://cli.pgsio.com"
}
```

## 🏗️ Project Structure

```
PGS-CLI/
├── cli/
│   ├── commands/          # Command implementations
│   │   ├── auth.js        # Authentication commands
│   │   ├── create.js      # Project creation commands
│   │   ├── initCLI.js     # CLI initialization
│   │   └── defaultSelector.js
│   ├── api.js             # API client
│   ├── config.js          # Configuration loader
│   ├── index.js           # CLI command router
│   └── start.js           # Startup and help commands
├── cli.json               # CLI configuration
├── index.js               # Main entry point
├── package.json           # Package configuration
└── README.md              # This file
```

## 🛠️ Development

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn package manager

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/yourusername/pgs-cli.git
cd pgs-cli

# Install dependencies
npm install

# Link for local development
npm link

# Test the CLI
pgs -h
```

### Dependencies

- **[Commander.js](https://github.com/tj/commander.js/)** - Command-line framework
- **[Inquirer.js](https://github.com/SBoudrias/Inquirer.js/)** - Interactive prompts
- **[Chalk](https://github.com/chalk/chalk)** - Terminal styling
- **[Figlet](https://github.com/patorjk/figlet.js)** - ASCII art text
- **[Gradient String](https://github.com/bokub/gradient-string)** - Gradient colors
- **[Ora](https://github.com/sindresorhus/ora)** - Loading spinners
- **[Axios](https://github.com/axios/axios)** - HTTP client
- **[Validator](https://github.com/validatorjs/validator.js)** - String validation

### Building

```bash
# Run tests (when available)
npm test

# Package the application
npm pack
```

## 🌐 API Integration

PGS CLI integrates with the PGS API for authentication and project management. The API client is configured in `cli/api.js` and automatically handles:

- Authentication token management
- Request/response handling
- Error handling and retries

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Alan Sha Salim**

- Website: [https://cli.pgsio.com](https://cli.pgsio.com)
- GitHub: [@yourusername](https://github.com/yourusername)

## 🆘 Support

If you encounter any issues or need help:

1. Check the [documentation](https://cli.pgsio.com)
2. Search [existing issues](https://github.com/yourusername/pgs-cli/issues)
3. Create a [new issue](https://github.com/yourusername/pgs-cli/issues/new)

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Authentication system (login/logout)
- Project template creation
- User management features
- CLI interface with help commands

---

<div align="center">
  <p>Made with ❤️ by <a href="https://cli.pgsio.com">PGSiO</a></p>
  <p>🚀 <strong>PGS CLI</strong> - Streamline your development workflow</p>
</div>
