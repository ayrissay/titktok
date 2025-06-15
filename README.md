# TikTok Recorder

A professional desktop application for recording TikTok videos with excellent quality and seamless background operation.

## Features

- **High-Quality Recording**: Capture TikTok videos in 720p, 1080p, or 1440p resolution
- **Perfect Audio**: Crystal clear audio capture with configurable quality settings
- **Background Operation**: Continue recording even when the app is minimized
- **Clean Interface**: Modern, intuitive design with dark theme
- **Download Management**: Organize and manage all your recorded videos
- **Flexible Duration**: Set custom recording durations from 5 to 180 seconds
- **Local Storage**: All recordings saved locally on your computer

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd tiktok-recorder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run electron-dev
```

### Building for Production

```bash
npm run build
npm run dist
```

## Usage

1. **Enter TikTok URL**: Paste any TikTok video URL in the input field
2. **Set Duration**: Adjust the recording duration using the slider (5-180 seconds)
3. **Choose Quality**: Select your preferred video quality (720p, 1080p, 1440p)
4. **Start Recording**: Click the "Start Recording" button
5. **Background Operation**: The recording continues even if you minimize the app
6. **Manage Downloads**: View and manage all recordings in the Downloads tab

## Technical Details

### Architecture

- **Frontend**: React + TypeScript + Tailwind CSS
- **Desktop Framework**: Electron
- **Video Processing**: FFmpeg integration
- **Storage**: Local file system with organized folders

### Key Components

- `RecordingInterface`: Main recording controls and URL input
- `DownloadManager`: File management and download history
- `SettingsPanel`: Configuration and preferences
- `Electron Main Process`: System integration and file operations

### Recording Process

1. URL validation and parsing
2. Video stream extraction
3. Quality optimization
4. Local file saving with proper naming
5. Progress tracking and completion notification

## Configuration

The app includes comprehensive settings for:

- **Download Location**: Choose where to save recordings
- **Default Quality**: Set preferred video quality
- **Audio Settings**: Configure audio bitrate
- **Storage Management**: Set storage limits and auto-cleanup
- **Notifications**: Desktop notifications for completed recordings

## Legal Notice

This application is intended for personal use only. Please respect TikTok's terms of service and content creators' rights. Only record content you have permission to use.

## License

This project is for personal use. Please check TikTok's terms of service regarding content downloading.

## Support

For issues or questions, please open an issue in the repository.