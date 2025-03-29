'use client';

import React, { useState } from 'react';
import { Mail, Save } from 'lucide-react';

interface EmailSettings {
  primaryEmail: string;
  backupEmail: string;
  emailSignature: string;
  emailTemplates: {
    id: number;
    name: string;
    subject: string;
    content: string;
  }[];
}

export default function EmailSettings() {
  const [settings, setSettings] = useState<EmailSettings>({
    primaryEmail: 'john@example.com',
    backupEmail: 'john.backup@example.com',
    emailSignature: 'Best regards,\nJohn Doe\nKitchen Manager\nPlate2Share',
    emailTemplates: [
      {
        id: 1,
        name: 'Donation Confirmation',
        subject: 'Thank you for your donation',
        content: 'Dear {NGO_NAME},\n\nThank you for your generous donation. We have received {QUANTITY} {UNIT} of {ITEM_NAME}.\n\nBest regards,\nPlate2Share Team'
      },
      {
        id: 2,
        name: 'Food Preparation Update',
        subject: 'Food Preparation Status Update',
        content: 'Dear {NGO_NAME},\n\nYour food preparation request has been {STATUS}.\nDetails:\n- Item: {ITEM_NAME}\n- Quantity: {QUANTITY} {UNIT}\n- Prepared by: {CHEF_NAME}\n\nBest regards,\nPlate2Share Team'
      }
    ]
  });

  const [selectedTemplate, setSelectedTemplate] = useState(settings.emailTemplates[0]);
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);

  const handleSave = () => {
    // TODO: Implement save functionality with backend
    alert('Email settings updated successfully!');
  };

  const handleTemplateEdit = () => {
    if (isEditingTemplate) {
      setSettings(prev => ({
        ...prev,
        emailTemplates: prev.emailTemplates.map(template =>
          template.id === selectedTemplate.id ? selectedTemplate : template
        )
      }));
    }
    setIsEditingTemplate(!isEditingTemplate);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Email Settings</h1>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* Email Addresses */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-medium text-white mb-4">Email Addresses</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Primary Email
              </label>
              <input
                type="email"
                value={settings.primaryEmail}
                onChange={(e) => setSettings({ ...settings, primaryEmail: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Backup Email
              </label>
              <input
                type="email"
                value={settings.backupEmail}
                onChange={(e) => setSettings({ ...settings, backupEmail: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Email Signature */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-medium text-white mb-4">Email Signature</h2>
          <textarea
            value={settings.emailSignature}
            onChange={(e) => setSettings({ ...settings, emailSignature: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Templates */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-medium text-white mb-4">Email Templates</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <select
                value={selectedTemplate.id}
                onChange={(e) => setSelectedTemplate(settings.emailTemplates.find(t => t.id === Number(e.target.value)) || settings.emailTemplates[0])}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {settings.emailTemplates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleTemplateEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isEditingTemplate ? 'Save Template' : 'Edit Template'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={selectedTemplate.subject}
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                  disabled={!isEditingTemplate}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Content
                </label>
                <textarea
                  value={selectedTemplate.content}
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, content: e.target.value })}
                  disabled={!isEditingTemplate}
                  rows={6}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Available Variables:</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-400">{'{NGO_NAME}'}</div>
                <div className="text-sm text-gray-400">{'{ITEM_NAME}'}</div>
                <div className="text-sm text-gray-400">{'{QUANTITY}'}</div>
                <div className="text-sm text-gray-400">{'{UNIT}'}</div>
                <div className="text-sm text-gray-400">{'{STATUS}'}</div>
                <div className="text-sm text-gray-400">{'{CHEF_NAME}'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 