import React, { useState } from 'react';
import { FolderOpen, Save, RotateCcw, HardDrive, Volume2, Video, Shield } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState({
    downloadPath: '/Users/username/Downloads/TikTokRecorder',
    defaultQuality: '1080p',
    defaultDuration: 30,
    audioQuality: 'high',
    autoStart: false,
    darkMode: true,
    notifications: true,
    parallelDownloads: 3,
    storageLimit: 5000, // MB
    autoCleanup: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    // In Electron, this would save to electron-store
    console.log('Saving settings:', settings);
  };

  const resetSettings = () => {
    setSettings({
      downloadPath: '/Users/username/Downloads/TikTokRecorder',
      defaultQuality: '1080p',
      defaultDuration: 30,
      audioQuality: 'high',
      autoStart: false,
      darkMode: true,
      notifications: true,
      parallelDownloads: 3,
      storageLimit: 5000,
      autoCleanup: false
    });
  };

  const selectFolder = () => {
    // In Electron, this would open a folder dialog
    console.log('Opening folder dialog');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* General Settings */}
      <div className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <HardDrive className="w-6 h-6 text-indigo-400" />
          <h3 className="text-xl font-semibold text-white">General Settings</h3>
        </div>

        <div className="space-y-6">
          {/* Download Path */}
          <div>
            <label className="block text-white font-medium mb-2">Download Location</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={settings.downloadPath}
                onChange={(e) => handleSettingChange('downloadPath', e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
              />
              <button
                onClick={selectFolder}
                className="px-4 py-3 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-200"
              >
                <FolderOpen className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Parallel Downloads */}
          <div>
            <label className="block text-white font-medium mb-2">Parallel Downloads</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="5"
                value={settings.parallelDownloads}
                onChange={(e) => handleSettingChange('parallelDownloads', Number(e.target.value))}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="bg-gray-700/50 px-3 py-2 rounded-lg min-w-[60px] text-center">
                <span className="text-white font-medium">{settings.parallelDownloads}</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-1">Number of simultaneous downloads</p>
          </div>

          {/* Storage Management */}
          <div>
            <label className="block text-white font-medium mb-2">Storage Limit (MB)</label>
            <input
              type="number"
              value={settings.storageLimit}
              onChange={(e) => handleSettingChange('storageLimit', Number(e.target.value))}
              className="w-32 px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            />
            <p className="text-gray-400 text-sm mt-1">Maximum storage space for recordings</p>
          </div>
        </div>
      </div>

      {/* Recording Settings */}
      <div className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <Video className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Recording Settings</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Default Quality */}
          <div>
            <label className="block text-white font-medium mb-3">Default Video Quality</label>
            <div className="space-y-2">
              {['720p', '1080p', '1440p'].map((quality) => (
                <label key={quality} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="defaultQuality"
                    value={quality}
                    checked={settings.defaultQuality === quality}
                    onChange={(e) => handleSettingChange('defaultQuality', e.target.value)}
                    className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">{quality}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Audio Quality */}
          <div>
            <label className="block text-white font-medium mb-3">Default Audio Quality</label>
            <div className="space-y-2">
              {[
                { value: 'low', label: 'Low (128kbps)' },
                { value: 'medium', label: 'Medium (192kbps)' },
                { value: 'high', label: 'High (320kbps)' }
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="audioQuality"
                    value={option.value}
                    checked={settings.audioQuality === option.value}
                    onChange={(e) => handleSettingChange('audioQuality', e.target.value)}
                    className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Default Duration */}
        <div className="mt-6">
          <label className="block text-white font-medium mb-2">Default Recording Duration</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="5"
              max="180"
              value={settings.defaultDuration}
              onChange={(e) => handleSettingChange('defaultDuration', Number(e.target.value))}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="bg-gray-700/50 px-3 py-2 rounded-lg min-w-[80px] text-center">
              <span className="text-white font-medium">{settings.defaultDuration}s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Application Settings */}
      <div className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-semibold text-white">Application Settings</h3>
        </div>

        <div className="space-y-4">
          {/* Toggle Settings */}
          {[
            { key: 'autoStart', label: 'Auto-start recordings', description: 'Automatically start recording after entering URL' },
            { key: 'notifications', label: 'Desktop notifications', description: 'Show notifications when recordings complete' },
            { key: 'autoCleanup', label: 'Auto cleanup', description: 'Automatically delete old recordings when storage limit is reached' },
            { key: 'darkMode', label: 'Dark mode', description: 'Use dark theme (recommended)' }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between py-3">
              <div>
                <h4 className="text-white font-medium">{setting.label}</h4>
                <p className="text-gray-400 text-sm">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[setting.key as keyof typeof settings] as boolean}
                  onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4">
        <button
          onClick={resetSettings}
          className="flex items-center gap-2 px-6 py-3 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </button>
        <button
          onClick={saveSettings}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;