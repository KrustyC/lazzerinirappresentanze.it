"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export const Studio: React.FC = () => <NextStudio config={config} />;
