"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav, type Section } from "@/components/layout/BottomNav";

import { NewInspection } from "@/components/sections/NewInspection";
import { Vehicles } from "@/components/sections/Vehicles";
import { Maintenance } from "@/components/sections/Maintenance";
import { DotPm } from "@/components/sections/DotPm";
import { SpecsLibrary } from "@/components/sections/SpecsLibrary";
import { History } from "@/components/sections/History";
import { type Vehicle } from "@/lib/db";
import { SettingsSheet } from "@/components/layout/SettingsSheet";

const sectionTitles: Record<Section, string> = {
  "new-inspection": "New Inspection",
  vehicles: "Vehicles",
  maintenance: "Maintenance",
  "dot-pm": "DOT & PM",
  specs: "Specs Library",
  history: "History",
};

export default function ShopForgeTechSheets() {
  const [currentSection, setCurrentSection] = useState<Section>("new-inspection");
  const [pendingVehicle, setPendingVehicle] = useState<Vehicle | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Called from Vehicles detail sheet
  const handleStartInspectionFromVehicle = (vehicle: Vehicle) => {
    setPendingVehicle(vehicle);
    setCurrentSection("new-inspection");
  };

  const handleInspectionStarted = () => {
    // Clear pending vehicle after it's been consumed by NewInspection
    setPendingVehicle(null);
  };

  const renderSection = () => {
    switch (currentSection) {
      case "new-inspection":
        return (
          <NewInspection 
            initialVehicle={pendingVehicle} 
            onInspectionStarted={handleInspectionStarted} 
          />
        );
      case "vehicles":
        return <Vehicles onStartInspection={handleStartInspectionFromVehicle} />;
      case "maintenance":
        return <Maintenance />;
      case "dot-pm":
        return <DotPm />;
      case "specs":
        return <SpecsLibrary />;
      case "history":
        return <History />;
      default:
        return <NewInspection />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 no-pull-to-refresh">
      <Header 
        title={sectionTitles[currentSection]} 
        onSettings={() => setSettingsOpen(true)} 
      />

      <main className="max-w-lg mx-auto">
        {renderSection()}
      </main>

      <BottomNav 
        current={currentSection} 
        onChange={setCurrentSection} 
      />

      <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
