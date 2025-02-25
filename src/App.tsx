import React, { useState, useEffect, useMemo } from 'react';
import { Building2, Search, Radar, Mail, Filter, ChevronDown, BarChart, ListChecks, FileText, Power, HelpCircle } from 'lucide-react';
import { LeadCard } from './components/LeadCard';
import { LeadFilters } from './components/LeadFilters';
import { LeadStats } from './components/LeadStats';
import { EmailNotification } from './components/EmailNotification';
import { EmailHistoryPage } from './pages/EmailHistoryPage';
import { TimeSavings } from './components/TimeSavings';
import { FinancialOverviewPage } from './pages/FinancialOverviewPage';
import { TaskManagementPage } from './pages/TaskManagementPage';
import { AutomationRulesPage } from './pages/AutomationRulesPage';
import { OnboardingTour } from './components/OnboardingTour';
import { PropertyManagementLead, LeadFilter, LeadStatsData, EmailTemplate, EmailHistory } from './types';
import { initialLeads, generateNewLead } from './data/leads';
import { generateEmailTemplate } from './utils/emailTemplates';
import { HelpModal } from './components/HelpModal';

function App() {
  const [leads, setLeads] = React.useState<PropertyManagementLead[]>(initialLeads);
  const [nextLeadId, setNextLeadId] = React.useState(initialLeads.length + 1);
  const [showNotification, setShowNotification] = React.useState(false);
  const [scanning, setScanning] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filters, setFilters] = React.useState<LeadFilter>({
    propertyType: [],
    location: [],
    status: [],
    source: [],
    units: { min: null, max: null },
    budget: { min: null, max: null },
  });
  const [emailNotification, setEmailNotification] = React.useState<EmailTemplate | null>(null);
  const [emailHistory, setEmailHistory] = React.useState<EmailHistory[]>([]);
  const [showEmailHistory, setShowEmailHistory] = React.useState(false);
  const [automatedEmailsCount, setAutomatedEmailsCount] = React.useState(0);
  const [showFinancialOverview, setShowFinancialOverview] = React.useState(false);
  const [showTaskManagement, setShowTaskManagement] = React.useState(false);
  const [showAutomationRules, setShowAutomationRules] = React.useState(false);
  const [showLeadScanner, setShowLeadScanner] = React.useState(true);
  const [showOnboardingTour, setShowOnboardingTour] = React.useState<boolean>(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    return hasVisited === null;
  });
  const [showHelpModal, setShowHelpModal] = useState(false);

  React.useEffect(() => {
    if (!showOnboardingTour) {
      localStorage.setItem('hasVisited', 'true');
    }
  }, [showOnboardingTour]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!scanning) return;

    const interval = setInterval(() => {
      const newLead1 = generateNewLead(String(nextLeadId));
      const newLead2 = generateNewLead(String(nextLeadId + 1));

      setLeads(prev => [newLead1, newLead2, ...prev]);
      setNextLeadId(prev => prev + 2);
      setShowNotification(true);

      const email1 = generateEmailTemplate(newLead1);
      const email2 = generateEmailTemplate(newLead2);

      setEmailHistory(prev => [
        {
          id: `email-${Date.now()}-1`,
          recipient: newLead1.name,
          email: email1,
          timestamp: new Date().toISOString(),
          type: 'seller'
        },
        {
          id: `email-${Date.now()}-2`,
          recipient: newLead2.name,
          email: email2,
          timestamp: new Date().toISOString(),
          type: 'seller'
        },
        ...prev
      ]);

      setEmailNotification(email1);
      setTimeout(() => {
        setEmailNotification(email2);
      }, 3000);

      setTimeout(() => setShowNotification(false), 3000);
      setAutomatedEmailsCount(prevCount => prevCount + 2);
    }, 10000);

    return () => clearInterval(interval);
  }, [scanning, nextLeadId]);

  const handleStatusChange = (id: string, status: PropertyManagementLead['status']) => {
    setLeads(prev => prev.map(lead =>
      lead.id === id ? { ...lead, status } : lead
    ));
  };

  const stats: LeadStatsData = React.useMemo(() => {
    const result = {
      total: leads.length,
      byStatus: {} as Record<string, number>,
      byType: {} as Record<string, number>,
      bySource: {} as Record<string, number>,
      byUnits: {} as Record<string, number>,
      byBudget: {} as Record<string, number>,
    };

    leads.forEach(lead => {
      result.byStatus[lead.status] = (result.byStatus[lead.status] || 0) + 1;
      result.byType[lead.propertyType] = (result.byType[lead.propertyType] || 0) + 1;
      result.bySource[lead.source] = (result.bySource[lead.source] || 0) + 1;

      const unitsRange = lead.units <= 10 ? '0-10' : lead.units <= 20 ? '11-20' : lead.units <= 30 ? '21-30' : '31+';
      result.byUnits[unitsRange] = (result.byUnits[unitsRange] || 0) + 1;

      if (lead.budget) {
        const avgBudget = (lead.budget.min + lead.budget.max) / 2;
        const budgetRange = avgBudget <= 25 ? '0-25' : avgBudget <= 30 ? '26-30' : avgBudget <= 35 ? '31-35' : '36+';
        result.byBudget[budgetRange] = (result.byBudget[budgetRange] || 0) + 1;
      }
    });

    return result;
  }, [leads]);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPropertyType = filters.propertyType.length === 0 ||
      filters.propertyType.includes(lead.propertyType);
    const matchesLocation = filters.location.length === 0 ||
      filters.location.includes(lead.location);
    const matchesStatus = filters.status.length === 0 ||
      filters.status.includes(lead.status);
    const matchesSource = filters.source.length === 0 ||
      filters.source.includes(lead.source);

    const matchesUnits =
      (filters.units.min === null || lead.units >= filters.units.min) &&
      (filters.units.max === null || lead.units <= filters.units.max);

    const matchesBudget =
      (filters.budget.min === null || (lead.budget && lead.budget.min >= filters.budget.min)) &&
      (filters.budget.max === null || (lead.budget && lead.budget.max <= filters.budget.max));

    return matchesSearch && matchesPropertyType && matchesLocation && matchesStatus && matchesSource && matchesUnits && matchesBudget;
  });

  const availableLocations = Array.from(new Set(leads.map(lead => lead.location)));
  const availablePropertyTypes = Array.from(new Set(leads.map(lead => lead.propertyType)));
  const availableSources = Array.from(new Set(leads.map(lead => lead.source)));

  const handleCloseOnboardingTour = () => {
    setShowOnboardingTour(false);
  };

  const showLeadScannerPage = () => {
    setShowEmailHistory(false);
    setShowFinancialOverview(false);
    setShowTaskManagement(false);
    setShowAutomationRules(false);
    setShowLeadScanner(true);
  };

  const showEmailHistoryPage = () => {
    setShowEmailHistory(true);
    setShowFinancialOverview(false);
    setShowTaskManagement(false);
    setShowAutomationRules(false);
    setShowLeadScanner(false);
  };

  const showFinancialOverviewPage = () => {
    setShowEmailHistory(false);
    setShowTaskManagement(false);
    setShowAutomationRules(false);
    setShowFinancialOverview(true);
    setShowLeadScanner(false);
  };

  const showTaskManagementPage = () => {
     setShowEmailHistory(false);
    setShowFinancialOverview(false);
    setShowAutomationRules(false);
    setShowTaskManagement(true);
    setShowLeadScanner(false);
  };

  const showAutomationRulesPage = () => {
    setShowEmailHistory(false);
    setShowFinancialOverview(false);
    setShowTaskManagement(false);
    setShowAutomationRules(true);
    setShowLeadScanner(false);
  };

  const toggleScanning = () => {
    setScanning(prev => !prev);
  };

  const openHelpModal = () => {
    setShowHelpModal(true);
  };

  const closeHelpModal = () => {
    setShowHelpModal(false);
  };


  return (
    <div className="min-h-screen bg-gray-100">
      {showOnboardingTour && (
        <OnboardingTour onClose={handleCloseOnboardingTour} />
      )}
      {showNotification && (
        <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in z-50">
          <Radar className="w-5 h-5 animate-pulse flex-shrink-0" />
          <span className="text-sm sm:text-base">2 neue Eigentümer gefunden!</span>
        </div>
      )}

      {emailNotification && (
        <EmailNotification
          email={emailNotification}
          onClose={() => setEmailNotification(null)}
        />
      )}

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600 mr-2" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Homewise Lead Scanner
                </h1>
                <p className="text-sm text-gray-600">
                  {scanning ? 'Scanner aktiv' : 'Scanner inaktiv'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={showLeadScannerPage}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Radar className="w-5 h-5 mr-2" />
                <span>Lead Scanner</span>
              </button>
              <button
                onClick={showEmailHistoryPage}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                <span>E-Mail-Verlauf</span>
                {emailHistory.length > 0 && (
                  <span className="ml-2 bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
                    {emailHistory.length}
                  </span>
                )}
              </button>
              <button
                onClick={showFinancialOverviewPage}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <BarChart className="w-5 h-5 mr-2" />
                <span>Finanzübersicht</span>
              </button>
               <button
                onClick={showTaskManagementPage}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <ListChecks className="w-5 h-5 mr-2" />
                <span>Aufgaben</span>
              </button>
               <button
                onClick={showAutomationRulesPage}
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" />
                <span>Prozesse</span>
              </button>
              <button
                onClick={toggleScanning}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <Power className="w-5 h-5 mr-2" />
                <span>{scanning ? 'Scanner aus' : 'Scanner an'}</span>
              </button>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Suche..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showEmailHistory ? (
          <EmailHistoryPage emails={emailHistory} />
        ) : showFinancialOverview ? (
          <FinancialOverviewPage leads={filteredLeads} />
        ) : showTaskManagement ? (
          <TaskManagementPage />
        ) : showAutomationRules ? (
          <AutomationRulesPage />
        ) : (
          <div className="space-y-6">
            <LeadStats stats={stats} />

            <details className="bg-white rounded-lg shadow-md p-4">
              <summary className="flex items-center justify-between font-semibold text-gray-700 list-none cursor-pointer">
                <div className="flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-blue-600" />
                  Filter
                </div>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </summary>
              <LeadFilters
                filters={filters}
                onFilterChange={setFilters}
                availableLocations={availableLocations}
                availablePropertyTypes={availablePropertyTypes}
                availableSources={availableSources}
                onPresetFilterChange={setFilters}
              />
            </details>

            <TimeSavings automatedEmailsCount={automatedEmailsCount} leadsGeneratedCount={leads.length} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>

            {filteredLeads.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Keine Leads gefunden</p>
              </div>
            )}
          </div>
        )}
      </main>
       <button
        onClick={openHelpModal}
        className="fixed bottom-4 left-4 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition-colors shadow-lg"
        aria-label="Hilfe"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      <HelpModal isOpen={showHelpModal} onClose={closeHelpModal} />
    </div>
  );
}

export default App;
