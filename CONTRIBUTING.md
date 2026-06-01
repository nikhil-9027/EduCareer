# Contributing to EduCareer 🎓

Thank you for your interest in contributing to EduCareer! We welcome contributions from everyone. This guide will help you get started.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)

---

## Code of Conduct

By participating in this project, you agree to be respectful and inclusive. We are committed to providing a welcoming and inspiring community for all.

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating a bug report, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected behavior vs actual behavior**
- **Screenshots** (if applicable)
- **Environment** (OS, Node version, browser)

### 💡 Suggesting Features

Feature requests are welcome! Open an issue with:

- **Clear description** of the feature
- **Use case** explaining why it would be useful
- **Possible implementation** (optional)

### 🔧 Submitting Code Changes

1. Look for issues labeled `good first issue` or `help wanted`
2. Comment on the issue to let others know you're working on it
3. Fork the repo and create your branch
4. Write clean, well-documented code
5. Submit a pull request

---

## Development Setup

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/EduCareer.git
cd EduCareer/Edu-career

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

---

## Pull Request Process

1. **Branch naming**: Use descriptive branch names
   - `feature/add-mentor-profile`
   - `fix/auth-modal-bug`
   - `docs/update-api-docs`

2. **Keep PRs focused**: One feature or fix per PR

3. **Update documentation**: Update `README.md` if needed

4. **Test your changes**: Ensure nothing is broken

5. **Link related issues**: Use `Closes #123` in your PR description

---

## Coding Standards

### TypeScript / React
- Use **TypeScript** for all new frontend files
- Use **functional components** with hooks
- Keep components **small and focused**
- Use **meaningful variable and function names**

### Backend (Node.js / Express)
- Use **async/await** for asynchronous operations
- Always handle errors with **try/catch**
- Validate request inputs before processing

### Styling
- Use **Tailwind CSS** utility classes
- Follow the existing **design system** (colors, spacing, typography)
- Ensure **responsive design** for all screen sizes

---

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>: <short description>

[optional body]
[optional footer]
```

### Types

| Type | Description |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, etc.) |
| `refactor` | Code refactoring |
| `test` | Adding or updating tests |
| `chore` | Build process or tooling changes |

### Examples

```bash
feat: add mentor profile page
fix: resolve auth modal not closing on mobile
docs: update API endpoint documentation
style: format navigation component
```

---

## 📬 Questions?

Open a [GitHub Discussion](../../discussions) or create an issue — we're happy to help!

Thank you for contributing to EduCareer! 🙏
