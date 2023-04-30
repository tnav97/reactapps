import { init as initialize, Mixpanel } from 'mixpanel-browser';

export default class Analytics {
  private static _instance: Analytics;

  private mixpanel: Mixpanel | undefined;

  static getInstance(): Analytics {
    if (!Analytics._instance) {
      Analytics._instance = new Analytics();
    }
    return Analytics._instance;
  }

  initialize(mixpanelProjectToken: string, name = 'main', config: any = {}) {
    const disableAnalytics = new URLSearchParams(window.location.search).has(
      '_disableAnalytics'
    );

    // Unless we provide a name to the init function, mixpanel will not return an instance
    if (!disableAnalytics)
      this.mixpanel = initialize(
        mixpanelProjectToken,
        { ...config, ignore_dnt: true },
        name
      );
  }

  track(eventName: string, data?: any) {
    if (this.mixpanel) this.mixpanel.track(eventName, data || undefined);
  }

  identify(email: string, profile?: any) {
    if (this.mixpanel) {
      this.mixpanel.identify(email);
      if (profile) this.mixpanel.people.set(profile);
    }
  }

  trackWithCategory(category: string, eventName: string, data?: any) {
    this.track(eventName, { ...data, Category: category });
  }

  timeEvent(eventName: string) {
    if (this.mixpanel) this.mixpanel.time_event(eventName);
  }
}
