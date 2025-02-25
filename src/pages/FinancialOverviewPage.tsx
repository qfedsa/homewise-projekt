import React, { useState } from 'react';
import { PropertyManagementLead } from '../types';
import { BarChart, FileBarChart, Plus, Trash2 } from 'lucide-react';

interface FinancialData {
  id: string;
  propertyName: string;
  address: string;
  units: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  notes: string;
}

interface FinancialOverviewPageProps {
  leads: PropertyManagementLead[];
}

const initialFinancialData: FinancialData[] = [
  {
    id: '1',
    propertyName: 'Objekt A',
    address: 'Musterstraße 1, 12345 Musterstadt',
    units: 10,
    monthlyRevenue: 5000,
    monthlyExpenses: 1500,
    notes: 'Gute Lage, hohe Nachfrage',
  },
  {
    id: '2',
    propertyName: 'Objekt B',
    address: 'Beispielweg 2, 54321 Beispielstadt',
    units: 5,
    monthlyRevenue: 3000,
    monthlyExpenses: 800,
    notes: 'Renovierungsbedarf',
  },
];

export const FinancialOverviewPage: React.FC<FinancialOverviewPageProps> = ({ leads }) => {
  const [financialData, setFinancialData] = useState<FinancialData[]>(initialFinancialData);
  const [showAddObjectForm, setShowAddObjectForm] = useState(false);
  const [newObject, setNewObject] = useState<Omit<FinancialData, 'id'>>({
    propertyName: '',
    address: '',
    units: 0,
    monthlyRevenue: 0,
    monthlyExpenses: 0,
    notes: '',
  });

  const handleAddObjectClick = () => {
    setShowAddObjectForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewObject(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewObject(prev => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSaveObject = () => {
    const newId = String(Date.now());
    setFinancialData(prev => [...prev, { id: newId, ...newObject }]);
    setNewObject({
      propertyName: '',
      address: '',
      units: 0,
      monthlyRevenue: 0,
      monthlyExpenses: 0,
      notes: '',
    });
    setShowAddObjectForm(false);
  };

  const handleCancelAddObject = () => {
    setShowAddObjectForm(false);
    setNewObject({
      propertyName: '',
      address: '',
      units: 0,
      monthlyRevenue: 0,
      monthlyExpenses: 0,
      notes: '',
    });
  };

  const handleDeleteObject = (id: string) => {
    setFinancialData(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center">
          <FileBarChart className="w-6 h-6 mr-2" /> Finanzübersicht
        </h2>
        <button
          onClick={handleAddObjectClick}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" /> Neues Objekt hinzufügen
        </button>
      </div>

      {showAddObjectForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Neues Objekt hinzufügen</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700">Objektname</label>
              <input
                type="text"
                id="propertyName"
                name="propertyName"
                value={newObject.propertyName}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
              <input
                type="text"
                id="address"
                name="address"
                value={newObject.address}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="units" className="block text-sm font-medium text-gray-700">Anzahl der Einheiten</label>
              <input
                type="number"
                id="units"
                name="units"
                value={newObject.units}
                onChange={handleNumberInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="monthlyRevenue" className="block text-sm font-medium text-gray-700">Monatliche Mieteinnahmen</label>
              <input
                type="number"
                id="monthlyRevenue"
                name="monthlyRevenue"
                value={newObject.monthlyRevenue}
                onChange={handleNumberInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="monthlyExpenses" className="block text-sm font-medium text-gray-700">Monatliche Ausgaben</label>
              <input
                type="number"
                id="monthlyExpenses"
                name="monthlyExpenses"
                value={newObject.monthlyExpenses}
                onChange={handleNumberInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Sonstige Notizen</label>
              <textarea
                id="notes"
                name="notes"
                value={newObject.notes}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              onClick={handleCancelAddObject}
            >
              Abbrechen
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleSaveObject}
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
                Objektname
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Adresse
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Einheiten
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Einnahmen (€)
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Ausgaben (€)
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Nettorendite (€)
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody>
            {financialData.map(item => (
              <tr key={item.id}>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.propertyName}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.address}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.units}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.monthlyRevenue.toLocaleString('de-DE')}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.monthlyExpenses.toLocaleString('de-DE')}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm font-semibold">{(item.monthlyRevenue - item.monthlyExpenses).toLocaleString('de-DE')}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <button
                    onClick={() => handleDeleteObject(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4 inline-block align-middle" /> Löschen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold mb-3 flex items-center"><BarChart className="w-5 h-5 mr-2 text-blue-600" /> Einnahmen vs. Ausgaben</h3>
        {/* Placeholder for Bar Chart - Implement Chart component here */}
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
          Balkendiagramm (folgt)
        </div>
      </div>
    </div>
  );
};
