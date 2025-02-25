import React, { useState } from 'react';
import { FileText, Plus, ToggleLeft, ToggleRight } from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  interval: string;
  status: 'Aktiv' | 'Inaktiv';
}

const dummyAutomationRules: AutomationRule[] = [
  {
    id: '1',
    name: 'Nebenkostenabrechnung jährlich',
    interval: 'Jährlich',
    status: 'Aktiv',
  },
  {
    id: '2',
    name: 'Heizungswartung jährlich',
    interval: 'Jährlich',
    status: 'Inaktiv',
  },
];

export const AutomationRulesPage: React.FC = () => {
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>(dummyAutomationRules);
  const [showAddRuleForm, setShowAddRuleForm] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    interval: 'Jährlich',
    status: 'Aktiv' as 'Aktiv' | 'Inaktiv',
  });

  const handleStatusToggle = (ruleId: string) => {
    setAutomationRules(currentRules =>
      currentRules.map(rule =>
        rule.id === ruleId ? { ...rule, status: rule.status === 'Aktiv' ? 'Inaktiv' : 'Aktiv' } : rule
      )
    );
  };

  const handleAddRuleClick = () => {
    setShowAddRuleForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRule(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRule(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveRule = () => {
    const newId = String(Date.now());
    setAutomationRules(prev => [...prev, { id: newId, ...newRule }]);
    setNewRule({
      name: '',
      interval: 'Jährlich',
      status: 'Aktiv',
    });
    setShowAddRuleForm(false);
  };

  const handleCancelAddRule = () => {
    setShowAddRuleForm(false);
    setNewRule({
      name: '',
      interval: 'Jährlich',
      status: 'Aktiv',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center">
          <FileText className="w-6 h-6 mr-2" /> Automatisierungsregeln
        </h2>
        <button
          onClick={handleAddRuleClick}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" /> Neue Regel
        </button>
      </div>

      {showAddRuleForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Neue Regel hinzufügen</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newRule.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="interval" className="block text-sm font-medium text-gray-700">Intervall</label>
              <select
                id="interval"
                name="interval"
                value={newRule.interval}
                onChange={handleSelectChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="Jährlich">Jährlich</option>
                <option value="Monatlich">Monatlich</option>
                <option value="Wöchentlich">Wöchentlich</option>
                <option value="Täglich">Täglich</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                name="status"
                value={newRule.status}
                onChange={handleSelectChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="Aktiv">Aktiv</option>
                <option value="Inaktiv">Inaktiv</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              onClick={handleCancelAddRule}
            >
              Abbrechen
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleSaveRule}
            >
              Speichern
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Intervall
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody>
            {automationRules.map(rule => (
              <tr key={rule.id} className="hover:bg-gray-50">
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{rule.name}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  {rule.interval}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <button onClick={() => handleStatusToggle(rule.id)}>
                    {rule.status === 'Aktiv' ? (
                      <ToggleRight className="w-6 h-6 text-green-500 inline-flex align-middle" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400 inline-flex align-middle" />
                    )}
                    <span className="ml-2">{rule.status}</span>
                  </button>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Bearbeiten</button>
                  <button className="text-red-600 hover:text-red-800">Löschen</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {automationRules.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            Keine Automatisierungsregeln erstellt.
          </div>
        )}
      </div>
    </div>
  );
};
