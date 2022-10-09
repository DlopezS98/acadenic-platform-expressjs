import { ObjectKeys } from './common.cd';

export interface PackageJson {
  name: string;
  version: string;
  description: string;
  author: string;
  homePage: string;
  repository: {
    type: string;
    url: string;
  };
  license: string;
}

export interface Settings {
  pkg: PackageJson;
  port: number;
  env: string;
}

export type SettingsKeys = ObjectKeys<Settings>;

export interface Locals {
  settings: Settings;
}
