import React, { useState } from 'react';
import { X, Building2, Mail, FileBarChart, ListChecks, Clock, Users, FileText, Radar } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('lead-scanner');

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl space-y-6 relative" style={{ height: '80vh' }}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Hilfe</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Schließen"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-grow overflow-hidden">
          <nav className="flex flex-col bg-gray-100 w-48 p-4 space-y-2">
            <button
              onClick={() => setActiveSection('lead-scanner')}
              className={`text-left hover:bg-gray-200 p-2 rounded-md ${activeSection === 'lead-scanner' ? 'bg-blue-200 text-blue-800' : 'text-gray-700'}`}
            >
              Lead Scanner
            </button>
            <button
              onClick={() => setActiveSection('email-history')}
              className={`text-left hover:bg-gray-200 p-2 rounded-md ${activeSection === 'email-history' ? 'bg-blue-200 text-blue-800' : 'text-gray-700'}`}
            >
              E-Mail-Verlauf
            </button>
            <button
              onClick={() => setActiveSection('financial-overview')}
              className={`text-left hover:bg-gray-200 p-2 rounded-md ${activeSection === 'financial-overview' ? 'bg-blue-200 text-blue-800' : 'text-gray-700'}`}
            >
              Finanzübersicht
            </button>
            <button
              onClick={() => setActiveSection('task-management')}
              className={`text-left hover:bg-gray-200 p-2 rounded-md ${activeSection === 'task-management' ? 'bg-blue-200 text-blue-800' : 'text-gray-700'}`}
            >
              Aufgaben
            </button>
            <button
              onClick={() => setActiveSection('automation-rules')}
              className={`text-left hover:bg-gray-200 p-2 rounded-md ${activeSection === 'automation-rules' ? 'bg-blue-200 text-blue-800' : 'text-gray-700'}`}
            >
              Prozesse
            </button>
          </nav>

          <div className="p-6 flex-grow overflow-y-auto">
            {activeSection === 'lead-scanner' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                  <Radar className="w-6 h-6 mr-2 text-blue-600" />
                  Lead Scanner
                </h3>
                <p className="text-gray-600">
                  Diese Seite scannt automatisch das Internet nach neuen potenziellen Immobilienbesitzern, die einen Verwalter suchen. Die gefundenen Leads werden hier übersichtlich dargestellt.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li><b>Automatische Lead-Generierung:</b> Finden Sie neue Eigentümer auf Verwaltungssuche – automatisch und in Echtzeit.</li>
                  <li><b>Filter:</b> Verwenden Sie die Filter, um die Leads nach Ihren Kriterien zu sortieren.</li>
                  <li><b>Lead-Details:</b> Klicken Sie auf einen Lead, um weitere Informationen anzuzeigen und den Status zu ändern.</li>
                </ul>
              </div>
            )}

            {activeSection === 'email-history' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-blue-600" />
                  E-Mail-Verlauf
                </h3>
                <p className="text-gray-600">
                  Hier finden Sie eine Übersicht aller automatisch versendeten E-Mails.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li><b>E-Mail-Liste:</b> Sehen Sie alle versendeten E-Mails mit Empfänger, Betreff und Sendedatum.</li>
                  <li><b>Details anzeigen:</b> Klicken Sie auf eine E-Mail, um den vollständigen Inhalt anzuzeigen.</li>
                  <li><b>Filter und Suche:</b> Verwenden Sie die Filter und die Suche, um bestimmte E-Mails zu finden.</li>
                </ul>
              </div>
            )}

            {activeSection === 'financial-overview' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                  <FileBarChart className="w-6 h-6 mr-2 text-blue-600" />
                  Finanzübersicht
                </h3>
                <p className="text-gray-600">
                  Zeigt die wichtigsten Finanzkennzahlen zu den verwalteten Immobilien, inklusive Einnahmen, Ausgaben und Nettorendite.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li><b>Objektliste:</b> Sehen Sie eine Übersicht aller verwalteten Objekte.</li>
                  <li><b>Finanzdaten:</b> Überprüfen Sie Einnahmen, Ausgaben und Nettorendite für jedes Objekt.</li>
                  <li><b>Neues Objekt hinzufügen:</b> Fügen Sie manuell neue Objekte hinzu, um die Finanzübersicht zu erweitern.</li>
                  <li><b>Objekte löschen:</b> Entfernen Sie Objekte aus der Finanzübersicht.</li>
                </ul>
              </div>
            )}

            {activeSection === 'task-management' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                  <ListChecks className="w-6 h-6 mr-2 text-blue-600" />
                  Aufgabenverwaltung
                </h3>
                <p className="text-gray-600">
                  Hier können Sie Aufgaben für die Immobilienverwaltung erstellen, zuweisen und den Fortschritt verfolgen. Durch Drücken der Buttons wird der Status schnell geändert.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li><b>Aufgabenlisten:</b> Organisieren Sie Aufgaben nach Status (Offen, In Bearbeitung, Erledigt).</li>
                  <li><b>Statusanpassung:</b> Verschieben Sie Aufgaben einfach zwischen den Statusspalten.</li>
                  <li><b>Neue Aufgabe hinzufügen:</b> Erstellen Sie neue Aufgaben und weisen Sie sie Mitarbeitern zu.</li>
                  <li><b>Aufgaben löschen:</b> Entfernen Sie Aufgaben, die nicht mehr benötigt werden.</li>
                </ul>
              </div>
            )}

            {activeSection === 'automation-rules' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-600" />
                  Prozesse
                </h3>
                <p className="text-gray-600">
                  Automatisieren Sie wiederkehrende Verwaltungsaufgaben. Senden Sie automatische Erinnerungen, erstellen Sie Wartungsaufgaben und mehr.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li><b>Regelübersicht:</b> Sehen Sie eine Liste aller automatisierten Prozesse.</li>
                  <li><b>Neue Regel erstellen:</b> Definieren Sie neue Regeln, um Verwaltungsaufgaben zu automatisieren.</li>
                  <li><b>Status verwalten:</b> Aktivieren oder deaktivieren Sie Regeln nach Bedarf.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
