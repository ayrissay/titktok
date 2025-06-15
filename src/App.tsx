import React, { useState } from 'react';
import { Download, Video, Settings, FolderOpen, PlayCircle, StopCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import RecordingInterface from './components/RecordingInterface';
import SettingsPanel from './components/SettingsPanel';
import DownloadManager from './components/DownloadManager';

function App() {
  const [activeTab, setActiveTab] = useState('record');
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([
    {
      id: '1',
      url: 'https://tiktok.com/@user/video/123',
      title: 'Amazing Dance Video',
      duration: 30,
      status: 'completed',
      progress: 100,
      filename: 'tiktok_dance_123.mp4',
      size: '24.5 MB'
    },
    {
      id: '2',
      url: 'https://tiktok.com/@user/video/456',
      title: 'Cooking Tutorial',
      duration: 45,
      status: 'recording',
      progress: 65,
      filename: 'tiktok_cooking_456.mp4',
      size: '18.2 MB'
    }
  ]);

  const tabs = [
    { id: 'record', label: 'Record', icon: Video },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800/50 border-r border-gray-700/50 backdrop-blur-sm">
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TikTok Recorder</h1>
                <p className="text-sm text-gray-400">Professional Video Capture</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Stats */}
          <div className="p-4 mt-auto">
            <div className="bg-gray-700/30 rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-medium text-gray-300">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Downloads</span>
                  <span className="text-white font-medium">247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Storage Used</span>
                  <span className="text-white font-medium">1.2 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Active Records</span>
                  <span className="text-green-400 font-medium">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gray-800/30 border-b border-gray-700/50 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white capitalize">{activeTab}</h2>
                <p className="text-gray-400 mt-1">
                  {activeTab === 'record' && 'Capture TikTok videos with perfect quality'}
                  {activeTab === 'downloads' && 'Manage your recorded videos'}
                  {activeTab === 'settings' && 'Configure recording preferences'}
                </p>
              </div>

              {isRecording && (
                <div className="flex items-center gap-3 bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 font-medium">Recording Active</span>
                </div>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-auto">
            {activeTab === 'record' && (
              <RecordingInterface 
                isRecording={isRecording}
                setIsRecording={setIsRecording}
                recordings={recordings}
                setRecordings={setRecordings}
              />
            )}
            {activeTab === 'downloads' && (
              <DownloadManager recordings={recordings} setRecordings={setRecordings} />
            )}
            {activeTab === 'settings' && <SettingsPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;