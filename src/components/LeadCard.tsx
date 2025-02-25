import React from 'react';
import { MapPin, Home, Users, AlertCircle, Briefcase, Euro, Clock, Phone, Mail } from 'lucide-react';
import { PropertyManagementLead } from '../types';

interface LeadCardProps {
  lead: PropertyManagementLead;
  onStatusChange: (id: string, status: PropertyManagementLead['status']) => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, onStatusChange }) => {
  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    interested: 'bg-green-100 text-green-800',
    not_interested: 'bg-gray-100 text-gray-800'
  };

  const statusLabels = {
    new: 'Neu',
    contacted: 'Kontaktiert',
    interested: 'Interessiert',
    not_interested: 'Kein Interesse'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 transition-all hover:shadow-xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-1">{lead.name}</h3>

      <div className="space-y-3">
        <section className="pb-3 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">Objekt Details</h4>
          <div className="space-y-2">
            <div className="flex items-center text-gray-700 text-sm">
              <Home className="w-4 h-4 mr-2 text-gray-500" />
              <span>{lead.propertyType}</span>
            </div>
            <div className="flex items-center text-gray-700 text-sm">
              <Users className="w-4 h-4 mr-2 text-gray-500" />
              <span>{lead.units} Einheiten</span>
            </div>
            {lead.budget && (
              <div className="flex items-center text-gray-700 text-sm">
                <Euro className="w-4 h-4 mr-2 text-gray-500" />
                <span>Budget: {lead.budget.min} - {lead.budget.max} €</span>
              </div>
            )}
            <div className="flex items-center text-gray-700 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
              <span className="line-clamp-1">{lead.location}</span>
            </div>
          </div>
        </section>

        <section className="pb-3 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">Kontakt Info</h4>
          <div className="space-y-2">
            <div className="flex items-center text-gray-700 text-sm">
              <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
              <span className="line-clamp-1">{lead.company}</span>
            </div>
             <div className="flex items-center text-gray-700 text-sm">
              <AlertCircle className="w-4 h-4 mr-2 text-gray-500" />
              <span className="line-clamp-1">Grund: {lead.reason}</span>
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-sm font-semibold text-gray-500 mb-2">Details</h4>
          <div className="space-y-2">
            <div className="flex items-center text-gray-700 text-sm">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              <span>
                Letzte Änderung: {new Date(lead.timestamp).toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </section>
      </div>


      <div className="mt-4 pt-4 border-t border-gray-200">
        <select
          value={lead.status}
          onChange={(e) => onStatusChange(lead.id, e.target.value as PropertyManagementLead['status'])}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="new">Neu</option>
          <option value="contacted">Kontaktiert</option>
          <option value="interested">Interessiert</option>
          <option value="not_interested">Kein Interesse</option>
        </select>
      </div>
    </div>
  );
};
