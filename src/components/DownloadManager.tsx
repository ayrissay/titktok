import React from 'react';
import { FolderOpen, Download, Trash2, Play, ExternalLink, RefreshCw } from 'lucide-react';

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

interface DownloadManagerProps {
  recordings: Recording[];
  setRecordings: (recordings: Recording[]) => void;
}

const DownloadManager: React.FC<DownloadManagerProps> = ({ recordings, setRecordings }) => {
  const openFile = (filename: string) => {
    // In Electron, this would open the file
    console.log('Opening file:', filename);
  };

  const openFolder = () => {
    // In Electron, this would open the downloads folder
    console.log('Opening downloads folder');
  };

  const deleteRecording = (id: string) => {
    setRecordings(recordings.filter(r => r.id !== id));
  };

  const retryRecording = (id: string) => {
    setRecordings(recordings.map(r => 
      r.id === id ? { ...r, status: 'recording', progress: 0 } : r
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'recording': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-400/10 border-green-400/20';
      case 'recording': return 'bg-yellow-400/10 border-yellow-400/20';
      case 'failed': return 'bg-red-400/10 border-red-400/20';
      default: return 'bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Download Manager</h3>
          <p className="text-gray-400 mt-1">{recordings.length} recordings total</p>
        </div>
        <button
          onClick={openFolder}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
        >
          <FolderOpen className="w-4 h-4" />
          Open Folder
        </button>
      </div>

      {/* Recordings List */}
      <div className="space-y-4">
        {recordings.length === 0 ? (
          <div className="bg-gray-800/40 rounded-2xl p-12 text-center border border-gray-700/50">
            <Download className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No recordings yet</h3>
            <p className="text-gray-500">Start recording TikTok videos to see them here</p>
          </div>
        ) : (
          recordings.map((recording) => (
            <div key={recording.id} className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                {/* Thumbnail placeholder */}
                <div className="w-20 h-16 bg-gray-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Play className="w-6 h-6 text-gray-400" />
                </div>

                {/* Recording Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium truncate">{recording.title}</h4>
                      <p className="text-gray-400 text-sm">{recording.filename}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBg(recording.status)}`}>
                      <span className={getStatusColor(recording.status)}>
                        {recording.status.charAt(0).toUpperCase() + recording.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar (for recording status) */}
                  {recording.status === 'recording' && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Recording Progress</span>
                        <span className="text-white">{Math.round(recording.progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${recording.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{recording.duration}s duration</span>
                      <span>{recording.size}</span>
                      <a 
                        href={recording.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Original
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      {recording.status === 'completed' && (
                        <button
                          onClick={() => openFile(recording.filename)}
                          className="px-3 py-2 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-400/10 rounded-lg transition-all duration-200"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      
                      {recording.status === 'failed' && (
                        <button
                          onClick={() => retryRecording(recording.id)}
                          className="px-3 py-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 rounded-lg transition-all duration-200"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => deleteRecording(recording.id)}
                        className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Storage Info */}
      <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <h4 className="text-white font-medium mb-4">Storage Information</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">1.2 GB</p>
            <p className="text-gray-400 text-sm">Total Used</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-400">{recordings.length}</p>
            <p className="text-gray-400 text-sm">Total Files</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{recordings.filter(r => r.status === 'completed').length}</p>
            <p className="text-gray-400 text-sm">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadManager;