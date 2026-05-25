import React from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <div className="mb-6 mt-2">
    <h2 className="text-2xl font-bold text-blue-800 mb-1">{title}</h2>
    {subtitle && <p className="text-gray-500 text-base">{subtitle}</p>}
  </div>
);

export default SectionHeader;
