export interface IJwtPayload {
  sub: string;
  email: string;
}
export interface DeviceInfo {
  deviceId: string;
  deviceName: string;
  deviceType: 'mobile' | 'desktop' | 'tablet' | 'unknown';
  userAgent: string;
  ipAddress: string;
}
export interface SessionConfig {
  maxConcurrentSessions: number;
  sessionTimeoutMinutes: number;
  allowSameDeviceMultipleSessions: boolean;
}
