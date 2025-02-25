import React from 'react';
import { Filter, ChevronDown, Home, MapPin, ListChecks, Users, Euro } from 'lucide-react';
import { LeadFilter } from '../types';

interface LeadFiltersProps {
  filters: LeadFilter;
  onFilterChange: (newFilters: LeadFilter) => void;
  availableLocations: string[];
  availablePropertyTypes: string[];
  availableSources: string[];
  onPresetFilterChange: (newFilters: LeadFilter) => void;
}

export const LeadFilters: React.FC<LeadFiltersProps> = ({
  filters,
  onFilterChange,
  availableLocations,
  availablePropertyTypes,
  availableSources,
  onPresetFilterChange,
}) => {
  const handlePropertyTypeChange = (type: string) => {
    const newTypes = filters.propertyType.includes(type)
      ? filters.propertyType.filter((t) => t !== type)
      : [...filters.propertyType, type];
    onFilterChange({ ...filters, propertyType: newTypes });
  };

  const handleLocationChange = (location: string) => {
    const newLocations = filters.location.includes(location)
      ? filters.location.filter((l) => l !== location)
      : [...filters.location, location];
    onFilterChange({ ...filters, location: newLocations });
  };

  const handleStatusChange = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    onFilterChange({ ...filters, status: newStatus });
  };

  const handleUnitsChange = (field: 'min' | 'max', value: number | null) => {
    onFilterChange({
      ...filters,
      units: { ...filters.units, [field]: value },
    });
  };

  const handleBudgetChange = (field: 'min' | 'max', value: number | null) => {
    onFilterChange({
      ...filters,
      budget: { ...filters.budget, [field]: value },
    });
  };

  const applyPresetFilter = (presetFilters: LeadFilter) => {
    onPresetFilterChange(presetFilters);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 mb-1 flex items-center"><ListChecks className="w-4 h-4 mr-1 text-gray-500" /> Schnellfilter</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPresetFilter({
              propertyType: ['Mehrfamilienhaus'],
              location: [],
              status: [],
              source: [],
              units: { min: null, max: 50 },
              budget: { min: null, max: null },
            })}
            className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
          >
            MFH bis 50 Einheiten
          </button>
          <button
            onClick={() => applyPresetFilter({
              propertyType: ['Gewerbeimmobilie'],
              location: [],
              status: [],
              source: [],
              units: { min: null, max: null },
              budget: { min: null, max: null },
            })}
            className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
          >
            Gewerbeobjekte
          </button>
          <button
            onClick={() => applyPresetFilter({
              propertyType: [],
              location: [],
              status: ['new'],
              source: [],
              units: { min: null, max: null },
              budget: { min: null, max: null },
            })}
            className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors"
          >
            Neue Leads
          </button>
          <button
            onClick={() => applyPresetFilter({
              propertyType: [],
              location: [],
              status: [],
              source: [],
              units: { min: null, max: null },
              budget: { min: null, max: null },
            })}
            className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
          >
            Alle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="mb-2">
          <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 flex items-center"><Home className="w-4 h-4 mr-1 text-gray-500" /> Immobilientyp</label>
          <div className="mt-1">
            {availablePropertyTypes.map((type) => (
              <div key={type} className="flex items-center pl-3 py-1 rounded-md hover:bg-gray-100 cursor-pointer">
                <input
                  id={`property-type-${type}`}
                  type="checkbox"
                  value={type}
                  checked={filters.propertyType.includes(type)}
                  onChange={() => handlePropertyTypeChange(type)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={`property-type-${type}`} className="w-full py-1 ml-2 text-sm font-medium text-gray-900">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 flex items-center"><MapPin className="w-4 h-4 mr-1 text-gray-500" /> Standort</label>
          <div className="mt-1">
            {availableLocations.map((location) => (
              <div key={location} className="flex items-center pl-3 py-1 rounded-md hover:bg-gray-100 cursor-pointer">
                <input
                  id={`location-${location}`}
                  type="checkbox"
                  value={location}
                  checked={filters.location.includes(location)}
                  onChange={() => handleLocationChange(location)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={`location-${location}`} className="w-full py-1 ml-2 text-sm font-medium text-gray-900">
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 flex items-center"><ListChecks className="w-4 h-4 mr-1 text-gray-500" /> Status</label>
          <div className="mt-1">
            {['new', 'contacted', 'interested', 'not_interested'].map((status) => (
              <div key={status} className="flex items-center pl-3 py-1 rounded-md hover:bg-gray-100 cursor-pointer">
                <input
                  id={`status-${status}`}
                  type="checkbox"
                  value={status}
                  checked={filters.status.includes(status)}
                  onChange={() => handleStatusChange(status)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={`status-${status}`} className="w-full py-1 ml-2 text-sm font-medium text-gray-900">
                  {status === 'new'
                    ? 'Neu'
                    : status === 'contacted'
                    ? 'Kontaktiert'
                    : status === 'interested'
                    ? 'Interessiert'
                    : 'Nicht interessiert'}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="units-min" className="block text-sm font-medium text-gray-700 flex items-center"><Users className="w-4 h-4 mr-1 text-gray-500" /> Einheiten</label>
          <div className="flex space-x-2 mt-1">
            <input
              type="number"
              id="units-min"
              value={filters.units.min ?? ''}
              onChange={(e) => handleUnitsChange('min', e.target.value ? parseInt(e.target.value, 10) : null)}
              className="block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              placeholder="Min"
            />
            <input
              type="number"
              id="units-max"
              value={filters.units.max ?? ''}
              onChange={(e) => handleUnitsChange('max', e.target.value ? parseInt(e.target.value, 10) : null)}
              className="block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              placeholder="Max"
            />
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="budget-min" className="block text-sm font-medium text-gray-700 flex items-center"><Euro className="w-4 h-4 mr-1 text-gray-500" /> Budget €</label>
          <div className="flex space-x-2 mt-1">
            <input
              type="number"
              id="budget-min"
              value={filters.budget.min ?? ''}
              onChange={(e) => handleBudgetChange('min', e.target.value ? parseInt(e.target.value, 10) : null)}
              className="block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              placeholder="Min"
            />
            <input
              type="number"
              id="budget-max"
              value={filters.budget.max ?? ''}
              onChange={(e) => handleBudgetChange('max', e.target.value ? parseInt(e.target.value, 10) : null)}
              className="block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
