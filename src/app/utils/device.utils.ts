export class DeviceUtils {
  static isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  static isTablet(): boolean {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  }

  static isDesktop(): boolean {
    return window.innerWidth > 1024;
  }

  static getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    if (this.isMobile()) return 'mobile';
    if (this.isTablet()) return 'tablet';
    return 'desktop';
  }
}