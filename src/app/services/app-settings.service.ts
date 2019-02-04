import { Injectable } from '@angular/core';
import set = Reflect.set;

export type WalletStore = 'localStorage'|'none';
export type PoWSource = 'server'|'clientCPU'|'clientWebGL'|'best';

interface AppSettings {
  displayDenomination: string;
  walletStore: string;
  displayCurrency: string;
  lockOnClose: number;
  lockInactivityMinutes: number;
  powSource: PoWSource;
  backend: string;
}

@Injectable()
export class AppSettingsService {
  storeKey = `noswallet-appsettings`;

  settings: AppSettings = {
    displayDenomination: 'nos',
    walletStore: 'localStorage',
    displayCurrency: '',
    lockOnClose: 1,
    lockInactivityMinutes: 30,
    powSource: 'best',
    backend: 'token.nosnode.net'
  };

  constructor() { }

  loadAppSettings() {
    let settings: AppSettings = this.settings;
    const settingsStore = localStorage.getItem(this.storeKey);
    if (settingsStore) {
      settings = JSON.parse(settingsStore);
    }
    this.settings = Object.assign(this.settings, settings);

    return this.settings;
  }

  saveAppSettings() {
    localStorage.setItem(this.storeKey, JSON.stringify(this.settings));
  }

  getAppSetting(key) {
    return this.settings[key] || null;
  }

  setAppSetting(key, value) {
    this.settings[key] = value;
    this.saveAppSettings();
  }

  setAppSettings(settingsObject) {
    for (let key in settingsObject) {
      if (!settingsObject.hasOwnProperty(key)) continue;
      this.settings[key] = settingsObject[key];
    }

    this.saveAppSettings();
  }

  clearAppSettings() {
    localStorage.removeItem(this.storeKey);
    this.settings = {
      displayDenomination: 'nos',
      walletStore: 'localStorage',
      displayCurrency: '',
      lockOnClose: 1,
      lockInactivityMinutes: 30,
      powSource: 'best',
      backend: 'token.nosnode.net'
    };
  }

}
