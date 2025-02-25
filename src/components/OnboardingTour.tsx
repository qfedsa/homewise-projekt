import React from 'react';
import { Building2, Mail, FileBarChart, ListChecks, Clock, Users, FileText } from 'lucide-react';

interface OnboardingTourProps {
  onClose: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Willkommen bei Homewise Lead Scanner</h2>
        <p className="text-gray-700">
          Entdecken Sie, wie Homewise Ihnen hilft, Zeit zu sparen, Prozesse zu automatisieren und Ihre Immobilienverwaltung zu optimieren.
        </p>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            <p className="text-gray-700">
              <b>Automatische Lead-Generierung:</b> Finden Sie neue Eigentümer auf Verwaltungssuche – automatisch und in Echtzeit.
              Sparen Sie bis zu 10 Stunden pro Woche bei der manuellen Suche.
            </p>
          </div>
          <div className="flex space-x-2">
            <Mail className="w-6 h-6 text-blue-600" />
            <p className="text-gray-700">
              <b>Automatisierter E-Mail-Versand:</b> Personalisierte E-Mails werden automatisch an qualifizierte Leads versendet.
              Reduzieren Sie den Zeitaufwand für die E-Mail-Kommunikation um 80%.
            </p>
          </div>
          <div className="flex space-x-2">
            <FileBarChart className="w-6 h-6 text-blue-600" />
            <p className="text-gray-700">
              <b>Finanzübersicht:</b> Behalten Sie Einnahmen und Ausgaben Ihrer Objekte im Blick und optimieren Sie Ihre Rendite.
              Verbessern Sie Ihre finanzielle Übersicht und treffen Sie fundierte Entscheidungen.
            </p>
          </div>
          <div className="flex space-x-2">
            <ListChecks className="w-6 h-6 text-blue-600" />
            <p className="text-gray-700">
              <b>Aufgabenmanagement:</b> Organisieren Sie Aufgaben effizient und verpassen Sie keine Fristen mehr.
              Steigern Sie die Effizienz Ihres Teams um 30% durch optimierte Aufgabenverteilung.
            </p>
          </div>
           <div className="flex space-x-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <p className="text-gray-700">
              <b>Prozesse:</b> Definieren und automatisieren Sie wiederkehrende Verwaltungsaufgaben, um Zeit zu sparen und Fehler zu minimieren.
            </p>
          </div>
          <div className="flex space-x-2">
            <Clock className="w-6 h-6 text-blue-600" />
            <p className="text-gray-700">
              <b>Zeitersparnis:</b> Automatisieren Sie Routineaufgaben und gewinnen Sie wertvolle Zeit für Ihr Team.
              Sparen Sie insgesamt bis zu 20 Stunden pro Woche durch die Automatisierung von Prozessen.
            </p>
          </div>
           <div className="flex space-x-2">
            <Users className="w-6 h-6 text-blue-600" />
            <p className="text-gray-700">
              <b>Zentrale Lead-Verwaltung:</b> Verwalten Sie alle Ihre Leads an einem Ort und verpassen Sie keine Gelegenheit.
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Tour beenden
          </button>
        </div>
      </div>
    </div>
  );
};
