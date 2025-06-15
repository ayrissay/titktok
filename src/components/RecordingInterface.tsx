import React, { useState } from 'react';
import { Play, Square, Clock, Video, Download, AlertTriangle, CheckCircle, Link, Timer } from 'lucide-react';

interface Recording {
  id: string;
  url: string;
  title: string;
  duration: number;
  status: 'recording' | 'completed' | 'failed';
  progress: number;
  filename: string;
  size: string;
}

interface RecordingInterfaceProps {
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
  recordings: Recording[];
  setRecordings: (recordings: Recording[]) => void;
}

const RecordingInterface: React.FC<RecordingInterfaceProps> = ({
  isRecording,
  setIsRecording,
  recordings,
  setRecordings
}) => {
  const [url, setUrl] = useState('');
  const [duration, setDuration] = useState(30);
  const [quality, setQuality] = useState('1080p');
  const [validUrl, setValidUrl] = useState(true);

  const validateTikTokUrl = (url: string) => {
    const tikTokRegex = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)/;
    return tikTokRegex.test(url);
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (value) {
      setValidUrl(validateTikTokUrl(value));
    } else {
      setValidUrl(true);
    }
  };

  const startRecording = () => {
    if (!url || !validUrl) return;
    
    setIsRecording(true);
    
    // Simulate recording process
    const newRecording: Recording = {
      id: Date.now().toString(),
      url,
      title: 'Recording in progress...',
      duration,
      status: 'recording',
      progress: 0,
      filename: `tiktok_${Date.now()}.mp4`,
      size: '0 MB'
    };

    setRecordings([newRecording, ...recordings]);
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        setIsRecording(false);
        setRecordings(recordings => 
          recordings.map(r => 
            r.id === newRecording.id 
              ? { ...r, status: 'completed', progress: 100, title: 'Amazing TikTok Video', size: '15.3 MB' }
              : r
          )
        );
        clearInterval(interval);
      } else {
        setRecordings(recordings => 
          recordings.map(r => 
            r.id === newRecording.id 
              ? { ...r, progress }
              : r
          )
        );
      }
    }, 500);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* URL Input Section */}
      <div className="bg-gray-800/40 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <Link className="w-6 h-6 text-indigo-400" />
          <h3 className="text-xl font-semibold text-white">TikTok URL</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <input
              type="url"
              placeholder="https://www.tiktok.com/@user/video/..."
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              className={`w-full px-4 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                !validUrl 
                  ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500' 
                  : 'border-gray-600/50 focus:ring-indigo-500/30 focus:border-indigo-500'
              }`}
            />
            {!validUrl && (
              <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                <AlertTriangle className="w-4 h-4" />
                Please enter a valid TikTok URL
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recording Settings */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Timer className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Duration</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="180"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="bg-gray-700/50 px-3 py-2 rounded-lg min-w-[80px] text-center">
                <span className="text-white font-medium">{duration}s</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Set the recording duration (5-180 seconds)</p>
          </div>
        </div>

        <div className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Video className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Quality</h3>
          </div>
          
          <div className="space-y-3">
            {['720p', '1080p', '1440p'].map((q) => (
              <label key={q} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="quality"
                  value={q}
                  checked={quality === q}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 focus:ring-indigo-500"
                />
                <span className="text-gray-300 group-hover:text-white transition-colors">{q} Quality</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Recording Controls */}
      <div className="bg-gray-800/40 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              disabled={!url || !validUrl}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            >
              <Play className="w-5 h-5" />
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Square className="w-5 h-5" />
              Stop Recording
            </button>
          )}
        </div>
        
        {isRecording && (
          <div className="mt-6 text-center">
            <p className="text-gray-400">Recording will continue in the background</p>
            <p className="text-sm text-gray-500 mt-1">You can close this window and the recording will continue</p>
          </div>
        )}
      </div>

      {/* Recent Recordings Preview */}
      {recordings.length > 0 && (
        <div className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Recordings</h3>
          <div className="space-y-3">
            {recordings.slice(0, 3).map((recording) => (
              <div key={recording.id} className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-lg">
                <div className="flex-shrink-0">
                  {recording.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-400" />}
                  {recording.status === 'recording' && <Clock className="w-5 h-5 text-yellow-400 animate-spin" />}
                  {recording.status === 'failed' && <AlertTriangle className="w-5 h-5 text-red-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{recording.title}</p>
                  <p className="text-gray-400 text-sm">{recording.filename}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{recording.size}</p>
                  <p className="text-gray-400 text-sm">{recording.duration}s</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordingInterface;